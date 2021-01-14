import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '~/components/Home/Post/PostList';
import { setStorage } from '~/lib/Storage';
import { handlePostDelete, handlePostList } from '~/stores/Post/action';

const PostListContainer = ({ navigation }: any): JSX.Element => {
  const { postList, error } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();

  const requestPostDelete = useCallback((idx: number) => {
    dispatch(handlePostDelete(idx))
    .then(({ response }) => {
      if (response?.status === 200) {
        dispatch(handlePostList());
      }
    })
  }, [dispatch]);

  const onModify = useCallback(async (idx: number): Promise<void> => {
    await setStorage("modifyIdx", idx);
    navigation.navigate("Form");
  }, [navigation]);

  useEffect(() => {
    dispatch(handlePostList());
  }, [dispatch]);

  return (
    <PostList
      postList={postList}
      requestPostDelete={requestPostDelete}
      onModify={onModify}
    />
  )
};

export default PostListContainer;