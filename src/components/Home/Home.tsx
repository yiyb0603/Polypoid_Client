import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '~/constants/Layout';
import PostListContainer from '~/containers/Post/PostList';
import Topbar from '../Common/Topbar';

const { width, height } = Layout.window;

const Home = ({ navigation }: any): JSX.Element => {
  const { container } = styles;
  
  return (
    <View style={container}>
      <Topbar navigation={navigation} />
      <PostListContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingVertical: 30,
    paddingHorizontal: 20
  },
})

export default Home;