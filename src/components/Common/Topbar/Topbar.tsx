import React, { useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { palette } from '~/styles/Palette';
import { removeStorage } from '~/lib/Storage';

const { gray } = palette;

const Topbar = ({ navigation }: any): JSX.Element => {
  const { topNavbar, navLogo } = styles;

  const onLogout = useCallback(async (): Promise<void> => {
    await removeStorage('polypoid-token');
    navigation.navigate("Auth");
  }, [navigation]);

  return (
    <View style={topNavbar}>
      <SimpleLineIcons name="logout" size={24} color="black" onPress={onLogout} />
      <Image style={navLogo} source={require('~/assets/images/TextLogo.png')} />
      <FontAwesome name="pencil" size={24} color="black" onPress={() => navigation.navigate("Form")} />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },

  navLogo: {
    width: 140,
    height: 50,
  },
})

export default Topbar;