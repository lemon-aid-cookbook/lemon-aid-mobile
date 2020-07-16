import {CText} from 'components';
import {COLOR, HEADER_TYPE, isIphoneX, ratio, ratioW} from 'config/themeUtils';
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
}

class Header extends React.Component<Props, {}> {
  static defaultProps = {
    type: HEADER_TYPE.MAIN,
    headerTitle: 'Lemon-aid',
    isShowLeft: false,
    isShowRight: false,
    onLeftPress: () => {},
    onRightPress: () => {},
    rightIcon: 'heart',
    smallTitle: false,
  };

  render() {
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
                ? {fontFamily: 'Pacifico-Regular'}
                : {}
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
    </View>;
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
    height: isIphoneX() ? 84 : 60,
    marginTop: isIphoneX() ? 24 : 0,
    paddingHorizontal: 16 * ratioW,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
