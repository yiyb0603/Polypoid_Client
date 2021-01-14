import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sha256 } from 'js-sha256';
import SignUp from '~/components/Auth/SignUp';
import { authPageTypes } from '~/enum/AuthPage';
import { handleSignUp } from '~/stores/Auth/action';
import { SignUpDto } from '~/types/dto/Auth.dto';
import AuthError from '~/error/AuthError';
import { validateSignUp } from '~/validation/AuthValidation';

interface PropTypes {
  setPageType: Dispatch<SetStateAction<authPageTypes>>;
}

const SignUpContainer = ({ setPageType }: PropTypes): JSX.Element => {
  const { error } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // optimization annonymous function
  const onChangeId = useCallback((text: string): void => {
    setId(text);
  }, [setId]);

  const onChangeName = useCallback((text: string): void => {
    setName(text);
  }, [setName]);

  const onChangePassword = useCallback((text: string): void => {
    setPassword(text);
  }, [setPassword]);

  const onChangeRePassword = useCallback((text: string): void => {
    setRePassword(text);
  }, [setRePassword]);

  const requestSignUp = useCallback((): void => {
    setIsLoading(true);
    const request: SignUpDto = {
      id,
      name,
      password,
      rePassword,
    };

    if (!validateSignUp(request)) {
      return;
    }

    delete request.rePassword;
    request.password = sha256(password);

    dispatch(handleSignUp(request))
    .then(({ response }: any) => {
      if (response.status === 200) {
        setPageType(authPageTypes.LOGIN);
      }
    })

    .catch((error) => console.log(error.response.data));
    setIsLoading(false);
  }, [id, name, password, dispatch, setPageType]);

  useEffect(() => {
    if (error !== null) {
      new AuthError(error).signUpError();
    }
  }, [error]);

  return (
    <SignUp
      id={id}
      onChangeId={onChangeId}
      name={name}
      onChangeName={onChangeName}
      password={password}
      onChangePassword={onChangePassword}
      rePassword={rePassword}
      onChangeRePassword={onChangeRePassword}
      isLoading={isLoading}
      setPageType={setPageType}
      requestSignUp={requestSignUp}
    />
  );
};

export default SignUpContainer;