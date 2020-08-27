import {CHeader, CText, CInput} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {useNavigation} from 'react-navigation-hooks';
export interface Props {
  listCmt: any[];
}

const defaultProps = {
  listCmt: [
    {
      id: 0,
      userId: 3,
      name: 'Trang nè',
      ava: 'https://source.unsplash.com/random',
      cmt: 'Khó quá à \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    },
    {
      id: 0,
      userId: 3,
      name: 'Trang nè',
      ava: 'https://source.unsplash.com/random',
      cmt: 'Khó quá à \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    },
  ],
};

const DiscussTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [cmt, setCmt] = useState('');

  const renderDiscussInput = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 9 * ratio,
            marginHorizontal: 16 * ratio,
          }}>
          <Image
            source={{
              uri: 'https://source.unsplash.com/random',
            }}
            style={styles.avaWrap}
          />
          <CInput
            containerStyle={{flex: 1, justifyContent: 'center'}}
            style={styles.inputWrap}
            // multiline
            textSize={14}
            placeholder={'Nhập thảo luận...'}
            value={cmt}
            onChangeText={(text: string) => {
              setCmt(text);
            }}
            showIcon={true}
            rightIcon={'send'}
            rightIconColor={
              cmt.replace(/\s/g, '').length > 0
                ? COLOR.PRIMARY_ACTIVE
                : COLOR.DEACTIVE_GRAY
            }
            onPressRightIcon={() => console.info(cmt)}
            onSubmitEditing={() => console.info('submit', cmt)}
          />
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginVertical: 9 * ratio,
        }}
        key={index}>
        <Image
          source={{
            uri: item.ava,
          }}
          style={styles.avaWrap}
        />
        <View style={{flex: 1}}>
          <CText fontSize={14} bold>
            {item.name}
          </CText>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <CText fontSize={14} style={{flex: 1, textAlign: 'justify'}}>
              {item.cmt}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  const renderComment = () => {
    return (
      <View style={{ marginHorizontal: 16 * ratio, }}>
        <FlatList
          data={props.listCmt}
          keyExtractor={(index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
              return (
                <View
                style={{
                  backgroundColor: COLOR.LIGHT_GRAY,
                  height: 1 * ratio,
                  width: '100%',
                  marginVertical: 9 * ratio,
                }}
              />
              )
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.listWrap}>
        {renderDiscussInput()}
        <View
          style={{
            backgroundColor: COLOR.LIGHT_GRAY,
            height: 8 * ratio,
            width: '100%',
            marginVertical: 9 * ratio,
          }}
        />
        {renderComment()}
      </View>
    </View>
  );
};

DiscussTab.defaultProps = defaultProps;
export default DiscussTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    flex: 1,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    paddingVertical: 16 * ratio,
  },
  avaWrap: {
    width: 40 * ratio,
    height: 40 * ratio,
    borderRadius: 20 * ratio,
    marginRight: 5 * ratio,
  },
  inputWrap: {
    width: '100%',
    height: 45 * ratio,
    borderWidth: 1 * ratio,
    borderColor: '#DADADA',
    borderRadius: 9 * ratio,
  },
});
