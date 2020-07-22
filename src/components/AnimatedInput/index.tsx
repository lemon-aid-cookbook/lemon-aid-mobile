import {COLOR, ratio} from 'config/themeUtils';
import React, {Component} from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {convertNumber, formatCurrency, reConvertMoney} from 'utils/function';

const fadeIn = {
  from: {
    opacity: 0,
    bottom: 0,
  },
  to: {
    opacity: 1,
    bottom: 36 * ratio,
  },
};

interface Props {
  textSize?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  keyboardType?: any;
  placeholderTextColor?: string;
  textColor?: string;
  backgroundColor?: string;
  multiline?: boolean;
  type?: string;
  editable?: boolean;
  autoFocus?: boolean;
  containerStyle?: any;
  onPress?: any;
  onFocus?: any;
  onBlur?: any;
  onChangeText: any;
  showIcon?: boolean;
  textError?: any;
  rightIcon?: any;
  style: any;
  onSubmitEditing?: any;
  onPressRightIcon?: any;
  textInputStyle?: StyleProp<TextStyle>;
  getRef?: any;
  onTouchStart?: any;
  returnKeyType?: string;
}

interface States {
  secureTextEntryState: boolean;
  textValue: any;
  autoFocus: boolean;
}

class AnimatedInput extends Component<Props, States> {
  static defaultProps = {
    containerStyle: {},
    style: {},
    showIcon: false,
    value: '',
    placeholder: '',
    textSize: 12,
    secureTextEntry: false,
    keyboardType: 'default',
    placeholderTextColor: 'gray',
    textColor: 'black',
    backgroundColor: 'white',
    textError: '',
    multiline: false,
    autoFocus: false,
    rightIcon: null,
    type: 'default',
    editable: true,
    onPress: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
    onPressRightIcon: () => {},
    textInputStyle: {},
    getRef: (input) => {},
    onTouchStart: () => {},
    returnKeyType: 'done',
  };

  textInput: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      secureTextEntryState: this.props.secureTextEntry,
      textValue: this.props.value || '',
      autoFocus: this.props.autoFocus,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.state.textValue !== nextProps.value) {
      this.setState({textValue: nextProps.value || ''});
    }
  }

  focus = () => {
    if (this.props.editable) {
      return this.textInput.focus();
    }

    this.props.onPress(this.state.textValue);
  };

  onChangeText = (text: string) => {
    if (this.props.type === 'default') {
      this.setState({textValue: text});
      this.props.onChangeText(text);
    } else {
      this.setState({textValue: formatCurrency(Number(text))});
      this.props.onChangeText(reConvertMoney(text));
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  onPressText = () => {
    this.textInput.clear();
    this.props.onChangeText('');
    this.setState({textValue: ''});
  };

  onPressPassword = () => {
    this.setState({secureTextEntryState: !this.state.secureTextEntryState});
  };

  onPressRightIcon = () => {
    this.props.onPressRightIcon();
  };
  render() {
    const {
      backgroundColor,
      editable,
      style,
      textError,
      type,
      placeholder,
      textSize,
      textColor,
      keyboardType,
      placeholderTextColor,
      multiline,
      onFocus,
      onBlur,
      showIcon,
      secureTextEntry,
      rightIcon,
      onSubmitEditing,
      textInputStyle,
      returnKeyType,
    } = this.props;
    return (
      <View style={this.props.containerStyle}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View
            style={[
              styles.container,
              style,
              {backgroundColor: editable ? backgroundColor : '#F5F5F5'},
              textError.length > 0 && {
                marginBottom: 10,
                borderColor: 'red',
                borderWidth: 1,
              },
              multiline && {alignItems: 'flex-start'},
              this.state.textValue.length > 0 && {alignItems: 'flex-end'},
            ]}>
            {this.state.textValue && this.state.textValue.length > 0 ? (
              <Animatable.Text
                animation={fadeIn}
                easing="ease-out"
                style={styles.placeholderText}>
                {placeholder}
              </Animatable.Text>
            ) : (
              <View />
            )}
            {type === 'money' && this.state.textValue.length > 0 && (
              <Text style={styles.price} />
            )}
            {!editable ? (
              <Text
                style={[
                  styles.textInput,
                  this.state.textValue.length === 0 && {color: 'gray'},
                ]}>
                {type === 'default'
                  ? this.state.textValue.length > 0
                    ? this.state.textValue
                    : placeholder
                  : formatCurrency(this.state.textValue)}
              </Text>
            ) : (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: textColor,
                    fontSize: textSize * ratio,
                    paddingVertical: 0,
                  },
                  textInputStyle,
                ]}
                keyboardType={keyboardType}
                onChangeText={this.onChangeText}
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                returnKeyType={returnKeyType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={
                  type === 'money'
                    ? formatCurrency(this.state.textValue)
                    : type === 'number'
                    ? convertNumber(this.state.textValue)
                    : this.state.textValue
                }
                secureTextEntry={this.state.secureTextEntryState}
                ref={(input) => {
                  this.textInput = input;
                  this.props.getRef(input);
                }}
                multiline={multiline}
                onSubmitEditing={onSubmitEditing}
                autoFocus={this.state.autoFocus}
                autoCorrect={false}
                editable={editable}
                onFocus={onFocus}
                onBlur={onBlur}
                onTouchStart={this.props.onTouchStart}
              />
            )}
            {showIcon &&
              secureTextEntry === false &&
              rightIcon === null &&
              this.state.textValue.length > 0 && (
                <TouchableWithoutFeedback
                  onPress={() => this.onChangeText('')}
                  style={styles.icon}>
                  <AntDesign
                    color={backgroundColor === 'white' ? 'gray' : 'gray'}
                    name="ios-close"
                    size={20 * ratio}
                  />
                </TouchableWithoutFeedback>
              )}
            {showIcon && secureTextEntry === true && rightIcon === null && (
              <TouchableWithoutFeedback
                onPress={this.onPressPassword}
                style={styles.icon}>
                <Feather
                  name={
                    this.state.secureTextEntryState
                      ? 'ic-password-hide'
                      : 'ic-password-show'
                  }
                  color={'#888888'}
                  size={20 * ratio}
                />
              </TouchableWithoutFeedback>
            )}
            {showIcon && rightIcon !== null && (
              <TouchableWithoutFeedback
                onPress={this.onPressRightIcon}
                style={styles.icon}>
                <Feather name={rightIcon} size={20 * ratio} color={'#70777E'} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
        {textError.length > 0 && <Text style={styles.error}>{textError}</Text>}
      </View>
    );
  }
}

export default AnimatedInput;

const styles = StyleSheet.create({
  container: {
    height: 64 * ratio,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6 * ratio,
    alignItems: 'center',
    paddingHorizontal: 10 * ratio,
    paddingVertical: 10 * ratio,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 9 * ratio,
    fontSize: 14 * ratio,
    color: 'black',
    fontFamily: 'Cabin-Regular',
  },
  icon: {
    width: 25 * ratio,
    height: 25 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 20 * ratio,
    height: 20 * ratio,
  },
  error: {
    color: 'red',
    fontSize: 12 * ratio,
    fontFamily: 'Cabin-Regular',
  },
  row: {
    maxHeight: 60 * ratio,
  },
  price: {
    fontSize: 14 * ratio,
  },
  placeholderText: {
    fontSize: 12 * ratio,
    fontFamily: 'Cabin-Regular',
    color: COLOR.DEACTIVE_GRAY,
    position: 'absolute',
    bottom: 0,
    left: 10 * ratio,
  },
});
