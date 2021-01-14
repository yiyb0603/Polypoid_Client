import React from 'react';
import PostFormContainer from '~/containers/Post/PostForm';

const FormScreen = ({ navigation }: any): JSX.Element => {
  return (
    <PostFormContainer navigation={navigation} />
  )
};

export default FormScreen;