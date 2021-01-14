import React from 'react';
import SignTemplate from '~/components/Auth/SignTemplate';

const AuthScreen = ({ navigation }: any): JSX.Element => {
  return (
    <SignTemplate navigation={navigation} />
  );
};

export default AuthScreen;