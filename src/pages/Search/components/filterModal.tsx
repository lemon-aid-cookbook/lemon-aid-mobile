import { CText, CButton } from 'components';
import { COLOR, ratio, CATEGORIES } from 'config/themeUtils';
import React from 'react';
import {
    Modal,
    StatusBar,
    StyleSheet,
    TouchableOpacity,

    View,
    FlatList
} from 'react-native';
import { RNChipView } from 'react-native-chip-view';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
export interface Props {
  isShow: boolean;
  onCancel: (val: boolean) => void;
  onSubmit: (val: any) => void;
  
}

const sortVal = [
  {
    label: 'Mới nhất',
    value: 'lastest',
  },
  {
    label: 'Yêu thích nhất',
    value: 'favorite',
  },
];

const difficultLevel = [
  {
    value: 1,
    label: 'Dễ',
  },
  {
    value: 2,
    label: 'Trung bình',
  },
  {
    value: 3,
    label: 'Khó',
  },
];
interface State {
  isShow: boolean;
  sortCode: any;
  levelList: any[];
  categoryList: any[];
}

class FilterModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: this.props.isShow,
      sortCode: {
        label: 'Mới nhất',
        value: 'lastest',
      },
      levelList: [],
      categoryList: [],
    };
  }

  onCancel = () => {
    this.props.onCancel(false);
  };

  onSubmit = () => {
    let params = {
        sort: this.state.sortCode.value,
        level: this.state.levelList,
        category: this.state.categoryList,
    }
    this.props.onSubmit(params)
  };

  renderCategory = ({item, index}) => {
    const catIndex = this.state.categoryList.indexOf(
        item.code,
      );
      return (
        <View style={{ width: '30%', marginVertical: 10 * ratio, marginRight: 10 * ratio}}>
        <RNChipView
          key={`chip${index}`}
          title={item.title}
          avatar={false}
          titleStyle={{
            fontSize: 14 * ratio,
            color: 'white',
            fontFamily: 'Cabin-Regular',
            fontWeight: 'normal',
          }}
          backgroundColor={
            catIndex > -1
              ? COLOR.PRIMARY_ACTIVE
              : COLOR.DEACTIVE_GRAY
          }
          onPress={() =>
            {
                let catList = this.state.categoryList;
                if (catIndex > -1) {
                    catList.splice(catIndex, 1);
                } else {
                    catList.push(item.code);
                }
                this.setState({categoryList: catList});
            }
          }
        />
      </View>
      )
  }

  render() {
    return (
      <Modal animationType="fade" visible={this.props.isShow}>
        <StatusBar translucent barStyle="dark-content" />
        <View style={styles.main}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CText
              bold
              color={COLOR.PRIMARY_ACTIVE}
              fontSize={20}
              style={{alignSelf: 'center', marginVertical: 16 * ratio}}>
              Bộ lọc
            </CText>
            <TouchableOpacity
              onPress={this.onCancel}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Feather
                name={'x'}
                size={24 * ratio}
                color={COLOR.PRIMARY_ACTIVE}
                style={{padding: 16 * ratio}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 16 * ratio}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CText color={COLOR.PRIMARY_ACTIVE} bold fontSize={16}>
                Sắp xếp theo
              </CText>
              <DropDownPicker
                items={sortVal}
                containerStyle={styles.dropdownWrap}
                onChangeItem={(item: any) => this.setState({sortCode: item})}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <CText color={COLOR.PRIMARY_ACTIVE} bold fontSize={16}>
                Mức độ
              </CText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {difficultLevel?.length > 0 &&
                  difficultLevel.map((level, index) => {
                    const levelIndex = this.state.levelList.indexOf(
                      level.label,
                    );
                    return (
                      <View
                        style={{
                          width: '30%',
                          marginVertical: 10 * ratio,
                          marginRight: 10 * ratio,
                        }}>
                        <RNChipView
                          key={`chip${index}`}
                          title={level.label}
                          avatar={false}
                          titleStyle={{
                            fontSize: 14 * ratio,
                            color: 'white',
                            fontFamily: 'Cabin-Regular',
                            fontWeight: 'normal',
                          }}
                          backgroundColor={
                            levelIndex > -1
                              ? COLOR.PRIMARY_ACTIVE
                              : COLOR.DEACTIVE_GRAY
                          }
                          onPress={() => {
                            let levList = this.state.levelList;
                            if (levelIndex > -1) {
                              levList.splice(levelIndex, 1);
                            } else {
                              levList.push(level.label);
                            }
                            this.setState({levelList: levList});
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <CText color={COLOR.PRIMARY_ACTIVE} bold fontSize={16}>
                Nhóm thức ăn
              </CText>
              <FlatList
            data={CATEGORIES}
            numColumns={3}
            keyExtractor={(index) => index.toString()}
            renderItem={this.renderCategory}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{  marginHorizontal: 10 * ratio,}}
          />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CButton style={styles.btnStyle} title={'Lọc'} fontSize={16} onPress={() => this.onSubmit()} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default FilterModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropdownWrap: {
    width: 200 * ratio,
    height: 45 * ratio,
    marginVertical: 8 * ratio,
    borderRadius: 9 * ratio,
  },
  btnStyle: {
    width: '100%',
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 25,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20 * ratio,
  },
});
