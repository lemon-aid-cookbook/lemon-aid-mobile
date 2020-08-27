import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from 'react-navigation-hooks';
export interface Props {
  detailRecipe: any;
}

const defaultProps = {
  detailRecipe: {
    id: 0,
    userId: 3,
    favNum: 30,
    name: 'Steven Black',
    icon: 'https://source.unsplash.com/random',
    ava: 'https://source.unsplash.com/random',
    title: 'Salad ngon ngon',
    time: 3600,
    ration: 4,
    category: ['Rau', '100gr thịt heo'],
    steps: [
      {description: 'Rửa rau', img: 'https://source.unsplash.com/random'},
      {description: 'Xào rau', img: 'https://source.unsplash.com/random'},
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img: 'https://source.unsplash.com/random',
      },
    ],
  },
};

const DetailTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [isFavorite, setFavorite] = useState(false);

  const renderProfile = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 9 * ratio,
        }}>
        <Image
          source={{
            uri: props.detailRecipe.ava,
          }}
          style={{
            width: 30 * ratio,
            height: 30 * ratio,
            borderRadius: 15 * ratio,
            marginRight: 5 * ratio,
          }}
        />
        <View>
          <CText fontSize={14} color={COLOR.DEACTIVE_GRAY}>
            {props.detailRecipe.name}
          </CText>
          <TouchableOpacity activeOpacity={0.8}>
            <CText fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
              Theo dõi
            </CText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCategory = () => {
    return (
      <View style={{marginVertical: 9 * ratio}}>
        <CText fontSize={16} bold color={COLOR.PRIMARY_ACTIVE}>
          Nguyên liệu
        </CText>
        {props.detailRecipe.category.length > 0 &&
          props.detailRecipe.category.map((item: any) => {
            return <CText fontSize={14}>{item}</CText>;
          })}
      </View>
    );
  };

  const renderStep = () => {
    return (
      <View style={{marginBottom: 16 * ratio}}>
        <CText fontSize={16} bold color={COLOR.PRIMARY_ACTIVE}>
          Các bước thực hiện
        </CText>
        {props.detailRecipe.steps.length > 0 &&
          props.detailRecipe.steps.map((item: any, index: number) => {
            return (
              <View style={{flex: 1, paddingVertical: 5 * ratio}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <View style={styles.index}>
                    <CText fontSize={14} color={'white'} bold>
                      {index + 1}
                    </CText>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      <CText
                        fontSize={14}
                        style={{flex: 1, textAlign: 'justify'}}>
                        {item.description}
                      </CText>
                    </View>
                    {item.img && (
                      <Image
                        source={{
                          uri: item.img,
                        }}
                        style={{
                          width: '100%',
                          height: 200 * ratio,
                          borderRadius: 9 * ratio,
                          marginTop: 5 * ratio,
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{marginBottom: 16 * ratio}}
        style={styles.listWrap}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{
              uri: props.detailRecipe.icon,
            }}
            style={{
              width: '100%',
              height: 200 * ratio,
              borderRadius: 9 * ratio,
            }}
          />

          <TouchableWithoutFeedback onPress={() => setFavorite(!isFavorite)}>
            <View style={styles.favoriteWrap}>
              <AntDesign
                name={isFavorite ? 'heart' : 'hearto'}
                color={COLOR.PRIMARY_ACTIVE}
                size={24 * ratio}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 * ratio}}>
          <CText fontSize={20} bold>
            {props.detailRecipe.title}
          </CText>
          <View style={{ flexDirection: 'row', alignItems: 'center',}}>
            <AntDesign
              name={'heart'}
              color={COLOR.PRIMARY_ACTIVE}
              size={14 * ratio}
              style={{marginRight: 8 * ratio}}
            />
            <CText fontSize={14} bold>
            {props.detailRecipe.favNum}
            </CText>
          </View>
        </View>
        {renderProfile()}
        <CText fontSize={14} color={COLOR.DEACTIVE_GRAY}>
          Thời gian chuẩn bị: {props.detailRecipe.time / 60} phút
        </CText>
        <CText fontSize={14} color={COLOR.DEACTIVE_GRAY}>
          Nấu cho: {props.detailRecipe.ration} người
        </CText>
        {renderCategory()}
        {renderStep()}

      </ScrollView>
    </View>
  );
};

DetailTab.defaultProps = defaultProps;
export default DetailTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 16 * ratio,
    marginVertical: 24 * ratio,
  },
  btnStyle: {
    width: 120 * ratio,
    borderRadius: 10 * ratio,
  },
  listWrap: {
    flex: 1,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    padding: 16 * ratio,
  },
  favoriteWrap: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -10 * ratio,
    right: -10 * ratio,
    width: 45 * ratio,
    height: 45 * ratio,
    borderRadius: 25 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  index: {
    height: 30 * ratio,
    width: 30 * ratio,
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 20 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5 * ratio,
    marginTop: 5 * ratio,
  },
});
