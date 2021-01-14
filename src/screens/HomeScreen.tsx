import React from 'react';
import Home from '~/components/Home';

const HomeScreen = ({ navigation }: any): JSX.Element => {
  return (
    <Home navigation={navigation} />
  );
};

export default HomeScreen;