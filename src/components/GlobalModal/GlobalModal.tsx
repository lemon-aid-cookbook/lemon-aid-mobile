import {CText} from 'components';
import {COLOR, MODAL_TYPE, ratio} from 'config/themeUtils';
import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface Props {}

interface State {
  isShow: boolean;
  title: string;
  content: string;
  type: string;
  onPress: () => void;
}

class ModalScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: false,
      title: '',
      content: '',
      type: MODAL_TYPE.NORMAL,
      onPress: () => {},
    };
  }

  alertMessage = (
    iTitle: string,
    iContent: string,
    iType?: string,
    onPress?: () => void,
  ) => {
    this.setState({
      isShow: true,
      title: iTitle,
      content: iContent,
      type: iType ? iType : MODAL_TYPE.NORMAL,
      onPress: onPress ? onPress : () => {},
    });
  };

  closeModal = () => {
    this.setState({isShow: false});
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => {
          this.closeModal();
        }}>
        <StatusBar
          translucent
          backgroundColor={'rgba(0,0,0,0.6)'}
          barStyle="dark-content"
        />
        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
          <View style={styles.main}>
            <View style={styles.boxContent}>
              <View style={styles.content}>
                <CText fontSize={16 * ratio} bold>
                  {this.state.title}
                </CText>
                <CText
                  numberOfLines={3}
                  fontSize={14 * ratio}
                  style={{marginTop: 32 * ratio}}>
                  {this.state.content}
                </CText>
              </View>
              <View style={styles.lineSeperate} />
              {this.state.type === MODAL_TYPE.NORMAL ? (
                <View style={styles.buttonContainer}>
                  <CText
                    touch
                    onPress={() => this.closeModal()}
                    fontSize={16 * ratio}
                    color={COLOR.PRIMARY_ACTIVE}>
                    OK
                  </CText>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <CText
                    touch
                    onPress={() => this.closeModal()}
                    fontSize={16 * ratio}
                    color={COLOR.PRIMARY_ACTIVE}>
                    Hủy
                  </CText>
                  <View style={styles.heightSeperate} />
                  <CText
                    touch
                    onPress={() => {
                      this.state.onPress();
                      this.closeModal();
                    }}
                    bold
                    fontSize={16 * ratio}
                    color={COLOR.PRIMARY_ACTIVE}>
                    OK
                  </CText>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default ModalScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineSeperate: {
    width: '100%',
    borderColor: COLOR.LIGHT_GRAY,
    borderWidth: 1,
  },
  heightSeperate: {
    height: '100%',
    borderColor: COLOR.LIGHT_GRAY,
    borderWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 48 * ratio,
  },
  boxContent: {
    width: 300,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    padding: 16 * ratio,
    justifyContent: 'center',
  },
});
