import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import parseTime from '~/lib/TimeCounting';
import { palette } from '~/styles/Palette';

interface PropTypes {
  idx: number;
  title: string;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  requestPostDelete: (idx: number) => void;
  onModify: (idx: number) => Promise<void>;
}

const { gray } = palette;
const PostItem = ({ idx, title, contents, createdAt, updatedAt, requestPostDelete, onModify }: PropTypes): JSX.Element => {
  const { container, titleWrap, titleStyle, contentStyle, buttonWrap } = styles;
  
  return (
    <View style={container}>
      <View style={titleWrap}>
        <Text style={titleStyle}>{title}</Text>
        <Text>{parseTime(createdAt)}</Text>
      </View>

      <View>
        <Text style={contentStyle}>{contents}</Text>
      </View>

      <View style={buttonWrap}>
        <Button title='수정하기' onPress={() => onModify(idx)} containerStyle={{ width: '45%' }} />
        <Button title='삭제하기' onPress={() => requestPostDelete(idx)} containerStyle={{ width: '45%' }} />
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  titleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: gray,
    borderBottomWidth: 1,
  },
  
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  contentStyle: {
    fontSize: 16,
  },

  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});