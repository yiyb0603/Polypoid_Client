import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { authPageTypes } from '~/enum/AuthPage';
import { palette } from '~/styles/Palette';

const { primary, lighterGray, red } = palette;

interface PropTypes {
  id: string;
  onChangeId: (text: string) => void;
  password: string;
  onChangePassword: (text: string) => void;
  setPageType: Dispatch<SetStateAction<authPageTypes>>;
  authLoading: boolean;
  googleLoading: boolean;
  requestSignIn: () => void;
  requestGoogleSign: () => Promise<void>;
}

const SignIn = ({
  id,
  onChangeId,
  password,
  onChangePassword,
  setPageType,
  authLoading,
  googleLoading,
  requestSignIn,
  requestGoogleSign,
} : PropTypes): JSX.Element => {
  const { REGISTER } = authPageTypes;
  const { container, forms, loginButton, otherSigns, googleButton } = styles;

  return (
    <View style={container}>
      <View style={forms}>
        <Input value={id} onChangeText={onChangeId} placeholder="아이디를 입력하세요." />
        <Input value={password} onChangeText={onChangePassword} secureTextEntry={true} placeholder="비밀번호를 입력하세요." />

        <Button
          title="로그인"
          buttonStyle={loginButton}
          onPress={requestSignIn}
          loading={authLoading}
				/>
      </View>

      <View style={otherSigns}>
        <Button
          title="Google 로그인"
          onPress={requestGoogleSign}
          loading={googleLoading}
          style={{ width: 100, height: 100 }}
        />
        
        <Button
          title="회원가입"
          buttonStyle={loginButton}
          onPress={() => setPageType(REGISTER)}
				/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  forms: {
    width: '90%',
  },

  loginButton: {
    backgroundColor: primary,
    marginTop: 10,
  },

  otherSigns: {
    width: '90%',
    borderTopColor: lighterGray,
    borderTopWidth: 2,
    paddingTop: 10,
  },

  googleButton: {
    backgroundColor: red,
    marginBottom: 10,
  },
});

export default SignIn;