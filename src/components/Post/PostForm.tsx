import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Layout from '~/constants/Layout';
import { palette } from '~/styles/Palette';

const { width, height } = Layout.window;
const { gray } = palette;

interface PropTypes {
  isLoading: boolean;

  title: string;
  onChangeTitle: (text: string) => void;

  contents: string;
  onChangeContents: (text: string) => void;

  requestFunction: () => void;
};

const PostForm = ({
  isLoading,
  title,
  onChangeTitle,
  contents,
  onChangeContents,
  requestFunction,
}: PropTypes): JSX.Element => {
  const { container, textArea } = styles;

  return (
    <View style={container}>
      <Input
        value={title}
        onChangeText={onChangeTitle}
        placeholder="제목을 입력하세요."
      />

      <Input
        style={textArea}
        value={contents}
        onChangeText={onChangeContents}
        multiline={true}
        placeholder="내용을 입력하세요."
      />
      
      <Button
        title="작성 완료"
        loading={isLoading}
        onPress={requestFunction}
      />
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  textArea: {
    borderColor: gray,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlignVertical: 'top',
    minHeight: 400,
    maxHeight: 400,
  },
});