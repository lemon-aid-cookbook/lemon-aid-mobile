import { ratio, COLOR } from 'config/themeUtils';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CText } from 'components';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

export interface Props {
  item: any;
}
const defaultProps = {
  item: {
    id: 1,
    favCount: 30,
    userId: 3,
    userName: 'stevenblack1717',
    icon: 'https://source.unsplash.com/random',
    ava: 'https://source.unsplash.com/random',
    title: 'Salad ngon ngon',
    time: 3600,
  },
};
const RecipeItem: React.FC<Props> = (props) => {

  const renderItem = ({item, index}: {item: any; index: string}) => {
    return (
        <View style={styles.cardItem}>
        <Image
          source={{
            uri: item.icon,
          }}
          style={{
            width: '100%',
            height: 135 * ratio,
            borderTopLeftRadius: 9 * ratio,
            borderTopRightRadius: 9 * ratio,
          }}
        />
        <View style={{ margin: 10 * ratio}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name={'clock'}
              size={14 * ratio}
              color={COLOR.DEACTIVE_GRAY}
              style={{marginRight: 8 * ratio}}
            />
            <CText color={COLOR.DEACTIVE_GRAY}>{item.time / 60} phút</CText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Foundation
              name={'heart'}
              size={14 * ratio}
              color={COLOR.PRIMARY_ACTIVE}
              style={{marginRight: 8 * ratio}}
            />
            <CText bold>{item.favCount}</CText>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8 * ratio}}>
          <Image
            source={{
              uri: item.ava,
            }}
            style={{
              width: 30 * ratio,
              height: 30 * ratio,
              borderRadius: 15 * ratio,
              marginRight: 8 * ratio,
            }}
          />
          <View>
            <CText bold fontSize={16} numberOfLines={1}>
              {item.title}
            </CText>
            <CText bold fontSize={12} color={COLOR.DEACTIVE_GRAY}>
              {item.userName}
            </CText>
          </View>
        </View>
        </View>
      </View>
    );
  };

  return <View>{renderItem}</View>;
};

RecipeItem.defaultProps = defaultProps;

export default RecipeItem;
const styles = StyleSheet.create({

  cardItem: {
    marginHorizontal: 16 * ratio,
    marginTop: 10 * ratio,
    marginBottom: 20 * ratio,
    height: 220 * ratio,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 9 * ratio,
  },
});
