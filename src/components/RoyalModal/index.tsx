import { CText } from 'components';
import { ratioH, ratioW, COLOR } from 'config/themeUtils';
import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface Props {
  isShow: boolean;
  item: any;
  onCancel: (val: boolean) => void;
  onEdit: (val: any) => void;
  onDelete: (val: any) => void;
}

interface State {
  isShow: boolean;
}

class RoyalModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: this.props.isShow,
    };
  }

  onCancel = () => {
    this.props.onCancel(false);
  };

  onEdit = () => {
    const val = {
      isVisible: false,
      item: this.props.item,
    };
    this.props.onEdit(val);
  };

  onDelete = () => {
    const val = {
      isVisible: false,
      item: this.props.item,
    };
    this.props.onDelete(val);
  };

  render() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.isShow}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0.6)'} barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <View style={styles.main}>
            <View style={styles.boxContent}>
              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.onEdit}>
                <CText fontSize={16} style={styles.textButton} color={COLOR.PRIMARY_ACTIVE}>
                  Chỉnh sửa
                </CText>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, { borderBottomWidth: 0 }]}
                onPress={this.onDelete}>
                <CText fontSize={16} style={[styles.textButton, { color: '#FF3548' }]}>
                  Xoá
                </CText>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelWrap}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, { borderBottomWidth: 0 }]}
                onPress={this.onCancel}>
                <CText  fontSize={16} style={[styles.textButton, { color: COLOR.PRIMARY_ACTIVE}]} bold>
                  Huỷ
                </CText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default RoyalModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  boxContent: {
    marginHorizontal: 10 * ratioW,
    marginBottom: 10 * ratioW,
    width: '95%',
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    borderRadius: 14 * ratioW,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 45 * ratioH,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1 * ratioW,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  separate: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    width: 1 * ratioW,
  },
  cancelWrap: {
    marginHorizontal: 10 * ratioW,
    marginBottom: 10 * ratioW,
    width: '95%',
    height: 45 * ratioH,
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    borderRadius: 14 * ratioW,
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
  },
});

//How to use 

{/* <RotalModal
          item={this.state.item}
          isShow={this.state.isVisible}
          onCancel={(value: boolean) => this.setState({ isVisible: value })}
          onEdit={(value: any) => {
            this.setState({ isVisible: value.isVisible });
            this.onEditable(value.item);
          }}
          onDelete={(value: any) => {
            this.setState({ isVisible: value.isVisible, isShowConfirm: !value.isVisible });
          }}
        /> */}