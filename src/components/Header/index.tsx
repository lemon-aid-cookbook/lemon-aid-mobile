import {CText, CInput} from 'components';
import {
  COLOR,
  HEADER_TYPE,
  isIphoneX,
  ratio,
  ratioW,
  DEVICE_WIDTH,
} from 'config/themeUtils';
import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  type: string;
  headerTitle?: string;
  isShowLeft?: boolean;
  isShowRight?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: string;
  smallTitle: boolean;
  onSearch?: (text: string) => void;
  onInputPress?:() => void;
}

interface State {
  searchValue: string;
}

class Header extends React.Component<Props, State, {}> {
  static defaultProps = {
    type: HEADER_TYPE.MAIN,
    headerTitle: 'Lemon-aid',
    isShowLeft: false,
    isShowRight: false,
    onLeftPress: () => {},
    onRightPress: () => {},
    rightIcon: 'heart',
    smallTitle: false,
    onSearch: (text: string) => {},
    onInputPress: () => {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  render() {
    if (this.props.type === HEADER_TYPE.HEADER_SEARCH) {
      return (
        <View style={styles.background}>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <View style={styles.searchHeaderWrap}>
            <CInput
              style={{width: DEVICE_WIDTH* 0.8, height: 45 * ratio, fontSize: 16 * ratio}}
              textSize={16}
              placeholder={'Tên món ăn...'}
              value={this.state.searchValue}
              onChangeText={(text: string) => { this.setState({ searchValue: text})}}
              onSubmitEditing={() => {
                this.props.onSearch(this.state.searchValue);
              }}
              returnKeyType={'search'}>
            </CInput>
            <TouchableOpacity activeOpacity={1}
                onPress={this.props.onRightPress}>
              <Feather name={'filter'} size={24} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.props.type === HEADER_TYPE.SEARCH)  {
        return (
          <View style={styles.background}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <TouchableOpacity activeOpacity={1} style={styles.searchHeaderWrap} onPress={() => this.props.onInputPress()}>
              <View style={styles.textInput}>
                <CText color={'#9B9B9B'} fontSize={16}>
                  Tên món ăn...
                </CText>
              </View>
              <View>
                <Feather name={'search'} size={24} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
      return (
        <View style={styles.background}>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <View style={styles.headerWrap}>
            {this.props.isShowLeft ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={this.props.onLeftPress}>
                <Feather
                  name={'chevron-left'}
                  color={COLOR.WHITE}
                  size={24 * ratio}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconContainer} />
            )}
            <View style={styles.titleContainer}>
              <CText
                bold
                style={
                  this.props.type === HEADER_TYPE.MAIN
                    ? {
                        fontFamily: 'Pacifico-Regular',
                        width: '100%',
                        textAlign: 'center',
                      }
                    : {paddingBottom: 5 * ratio}
                }
                color="white"
                fontSize={this.props.smallTitle ? 20 * ratio : 28 * ratio}>
                {this.props.headerTitle}
              </CText>
            </View>
            {this.props.isShowRight ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={this.props.onRightPress}>
                <Feather
                  name={this.props.rightIcon}
                  color={COLOR.WHITE}
                  size={24 * ratio}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconContainer} />
            )}
          </View>
        </View>
      );
    }
  }
}

export default Header;

const styles = StyleSheet.create({
  background: {
    width: '100%',
  },
  headerWrap: {
    width: '100%',
    flexDirection: 'row',
    height: isIphoneX() ? 168 * ratio : 118 * ratio,
    paddingTop: isIphoneX() ? 60 : 0,
    paddingHorizontal: 16 * ratioW,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.PRIMARY_ACTIVE,
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHeaderWrap: {
    width: '100%',
    flexDirection: 'row',
    height: isIphoneX() ? 208 * ratio : 148 * ratio,
    paddingTop: isIphoneX() ? 110 : 50,
    paddingBottom: 38 * ratio,
    paddingHorizontal: 16 * ratioW,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.PRIMARY_ACTIVE,
  },
  textInput: {
    width: DEVICE_WIDTH * 0.8,
    height: 45 * ratio,
    fontSize: 16 * ratio,
    backgroundColor: 'white',
    borderRadius: 9 * ratio,
    padding: 10 * ratio,
    justifyContent: 'center'
  },
});
