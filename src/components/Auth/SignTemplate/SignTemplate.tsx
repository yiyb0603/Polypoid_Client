import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Layout from '~/constants/Layout';
import SignInContainer from '~/containers/Auth/SignIn';
import SignUpContainer from '~/containers/Auth/SignUp';
import { authPageTypes } from '~/enum/AuthPage';

const { width, height } = Layout.window;

const SignTemplate = ({ navigation }: any): JSX.Element => {
  const { LOGIN } = authPageTypes;
  const { container, imageWrap, logoStyle } = styles;

  const [pageType, setPageType] = useState<authPageTypes>(LOGIN);

  return (
    <View style={container}>
      <View style={imageWrap}>
        <Image style={logoStyle} source={require('~/assets/images/FullLogo.png')} />
      </View>

      {
        pageType === LOGIN ?
        <SignInContainer navigation={navigation} setPageType={setPageType} /> :
        <SignUpContainer setPageType={setPageType} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrap: {
    marginBottom: 10,
  },

  logoStyle: {
    width: 150,
    height: 150,
  },
});

export default SignTemplate;