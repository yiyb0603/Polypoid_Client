import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '~/components/Post';
import PostError from '~/error/PostError';
import { getStorage, removeStorage } from '~/lib/Storage';
import { handlePostList, handlePostModify, handlePostView, handlePostWrite } from '~/stores/Post/action';
import { PostDto } from '~/types/dto/Post.dto';
import { validateForm } from '~/validation/PostValidation';

const PostFormContainer = ({ navigation }: any): JSX.Element => {
  const [isModify, setIsModify] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.post);

  const onChangeTitle = useCallback((text: string): void => {
    setTitle(text);
  }, []);

  const onChangeContents = useCallback((text: string): void => {
    setContents(text);
  }, []);

  const onClearStorage = useCallback(async (): Promise<void> => {
    await removeStorage('modifyIdx');
  }, []);

  const onSuccess = useCallback((): void => {
    navigation.navigate("Home");
    dispatch(handlePostList());
  }, [dispatch, navigation]);

  const requestDefaultData = useCallback(async (): Promise<void> => {
    const modifyIdx: number = Number(await getStorage("modifyIdx"));

    if (modifyIdx) {
      dispatch(handlePostView(modifyIdx))
      .then(({ postInfo }) => {
        setIsModify(true);
        setTitle(postInfo!.title);
        setContents(postInfo!.contents);
      });
    };
  }, [dispatch]);

  const requestPostWrite = useCallback((): void => {
    setIsLoading(true);
    const request: PostDto = {
      title,
      contents,
    };

    dispatch(handlePostWrite(request))
    .then(({ response }) => {
      if (response?.status === 200) {
        onSuccess();
      }
    });

    setIsLoading(false);
  }, [title, contents, onSuccess, dispatch]);

  const requestPostModify = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const modifyIdx: number = Number(await getStorage("modifyIdx"));

    const request: PostDto = {
      title,
      contents,
    };
    
    if (!validateForm(request)) {
      return;
    }

    dispatch(handlePostModify(modifyIdx, request))
    .then(({ response }) => {
      if (response?.status === 200) {
        onSuccess();
      }
    })

    setIsLoading(false);
  }, [title, contents, dispatch, onSuccess]);

  useEffect(() => {
    requestDefaultData();
  }, [requestDefaultData]);

  useEffect(() => {
    return () => {
      onClearStorage();
    }
  }, [onClearStorage]);

  useEffect(() => {
    if (error !== null) {
      new PostError(error);
    }
  }, [error]);

  return (
    <PostForm
      isLoading={isLoading}
      title={title}
      onChangeTitle={onChangeTitle}
      contents={contents}
      onChangeContents={onChangeContents}
      requestFunction={isModify ? requestPostModify : requestPostWrite}
    />
  );
};

export default PostFormContainer;