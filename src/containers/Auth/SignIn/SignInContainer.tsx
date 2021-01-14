import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sha256 } from 'js-sha256';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import { CLIENT_ID } from '~/config/config.json';
import SignIn from '~/components/Auth/SignIn';
import { authPageTypes } from '~/enum/AuthPage';
import { handleSignIn } from '~/stores/Auth/action';
import { SignInDto } from '~/types/dto/Auth.dto';
import { setStorage } from '~/lib/Storage';
import AuthError from '~/error/AuthError';
import { validateSignIn } from '~/validation/AuthValidation';

interface PropTypes {
  setPageType: Dispatch<SetStateAction<authPageTypes>>;
  navigation: any;
}

const SignInContainer = ({ setPageType, navigation }: PropTypes): JSX.Element => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const onChangeId = useCallback((text: string): void => {
    setId(text);
  }, [setId]);

  const onChangePassword = useCallback((text: string): void => {
    setPassword(text);
  }, [setPassword]);

  const requestSignIn = useCallback((): void => {
    setAuthLoading(true);
    const request: SignInDto = {
      id,
      password,
    };

    if (!validateSignIn(request)) {
      return;
    }

    request.password = sha256(password);

    dispatch(handleSignIn(request))
    .then(async ({ response }) => {
      setAuthLoading(false);
      if (response) {
        const { status, data } = response;
        if (status === 200) {
          const { userToken } = data;
          await setStorage('polypoid-token', userToken);
          navigation.navigate("Home");
        }
      }
    })

    .catch((error) => console.log(error));
  }, [id, password, dispatch, navigation]);

  const requestGoogleSign = useCallback(async (): Promise<void> => {
    setGoogleLoading(true);

    const result = await Google.logInAsync({
      androidClientId: CLIENT_ID,
      clientId: CLIENT_ID,
      androidStandaloneAppClientId: CLIENT_ID,
      scopes: ['profile', 'email'],
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect`,
    });

    if (result.type === "success") {
      const { accessToken } = result;
      const request = {
        accessToken,
      };

      dispatch(handleSignIn(request, "google"))
      .then(async ({ response }) => {
        const { data: { userToken } } = response;
        await setStorage('polypoid-token', userToken);
        navigation.navigate("Home");
      });
    }

    setGoogleLoading(false);
  }, [Google, navigation, handleSignIn]);

  useEffect(() => {
    if (error !== null) {
      new AuthError(error).signInError();
    }
  }, [error]);

  return (
    <SignIn
      id={id}
      onChangeId={onChangeId}
      password={password}
      onChangePassword={onChangePassword}
      setPageType={setPageType}
      authLoading={authLoading}
      googleLoading={googleLoading}
      requestSignIn={requestSignIn}
      requestGoogleSign={requestGoogleSign}
    />
  );
};

export default SignInContainer;