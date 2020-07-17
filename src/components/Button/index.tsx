import {CText} from 'components';
import {COLOR, ratio} from 'config/themeUtils';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  fontSize?: number;
  title: string;
  color?: string;
  style?: any;
  onPress: any;
  textColor?: string;
  disabled?: boolean;
}
interface States {}

class ButtonComponent extends PureComponent<Props, States> {
  static propTypes = {
    style: PropTypes.object,
    fontSize: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    fontSize: 18 * ratio,
    title: '',
    color: COLOR.PRIMARY_ACTIVE,
    onPress: () => {},
    disabled: false,
    textColor: 'white',
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      fontSize,
      title,
      color,
      style,
      onPress,
      disabled,
      textColor,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, {backgroundColor: color}, style ? style : {}]}>
        <CText fontSize={fontSize} color={textColor}>
          {title}
        </CText>
      </TouchableOpacity>
    );
  }
}

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    height: 48 * ratio,
    backgroundColor: COLOR.PRIMARY_ACTIVE,
  },
});
