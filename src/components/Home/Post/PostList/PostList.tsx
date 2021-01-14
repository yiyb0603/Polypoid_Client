import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IPostView } from '~/types/PostTypes';
import PostItem from '../PostItem';

interface PropTypes {
  postList: IPostView[];
  requestPostDelete: (idx: number) => void;
  onModify: (idx: number) => Promise<void>;
};

const PostList = ({ postList, requestPostDelete, onModify }: PropTypes): JSX.Element => {
  const { container } = styles;

  return (
    <View style={container}>
      {
        postList && postList.map((post: IPostView) => {
          const { idx, title, contents, created_at, updated_at } = post;

          return (
            <PostItem
              key={idx}
              idx={idx}
              title={title}
              contents={contents}
              createdAt={created_at}
              updatedAt={updated_at}
              requestPostDelete={requestPostDelete}
              onModify={onModify}
            />
          );
        })
      }
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingVertical: 12,
  },
});