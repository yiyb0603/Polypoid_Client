import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { authPageTypes } from '~/enum/AuthPage';
import { palette } from '~/styles/Palette';

const { primary, gray } = palette;

interface PropTypes {
  id: string;
  onChangeId: (text: string) => void;
  
  name: string;
  onChangeName: (text: string) => void;
  
  password: string;
  onChangePassword: (text: string) => void;

  rePassword: string;
  onChangeRePassword: (text: string) => void;

  isLoading: boolean;
  
  setPageType: Dispatch<SetStateAction<authPageTypes>>;
  requestSignUp: () => void;
}

const SignUp = ({
  id,
  onChangeId,
  name,
  onChangeName,
  password,
  onChangePassword,
  rePassword,
  onChangeRePassword,
  isLoading,
  setPageType,
  requestSignUp,
}: PropTypes): JSX.Element => {
  const { LOGIN } = authPageTypes;
  const { container, formWrap, registerButton, registerWrap, existText } = styles;

  return (
    <View style={container}>
      <View style={formWrap}>
        <Input value={id} onChangeText={onChangeId} placeholder="아이디를 입력하세요." />
        <Input value={name} onChangeText={onChangeName} placeholder="닉네임을 입력하세요." />
        <Input value={password} onChangeText={onChangePassword} secureTextEntry={true} placeholder="비밀번호를 입력하세요." />
        <Input value={rePassword} onChangeText={onChangeRePassword} secureTextEntry={true} placeholder="비밀번호를 재입력하세요." />
      </View>

      <View style={registerWrap}>
        <Button
          title="회원가입"
          buttonStyle={registerButton}
          onPress={requestSignUp}
          loading={isLoading}
        />
      </View>

      <Text onPress={() => setPageType(LOGIN)} style={existText}>이미 계정이 있으신가요?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  formWrap: {
    width: '90%',
  },

  registerWrap: {
    width: '90%',
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  registerButton: {
    backgroundColor: primary,
  },

  existText: {
    fontSize: 20,
    marginVertical: 10,
    color: primary,
  },
});

export default SignUp;