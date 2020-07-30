import {CText, CHeader, GlobalLoadingSetup, GlobalModalSetup} from 'components';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {HEADER_TYPE, ratio} from 'config/themeUtils';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import translate from 'google-translate-open-api';

export interface Props {}
const CameraPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [imgUrl, setImgUrl] = useState('');
  let camera = null;

  const result = translate(`Beefsteak`, {
    to: "vi",
  }).then((result) => {
    const val = result.data[0];
    console.info(val)
  })

  const uploadImage = () => {
    // const options = {quality: 0.5, base64: true};
    // const data = await camera.takePictureAsync(options);
    // setImgUrl(data.uri);
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => {
        if (!result.didCancel) {
          const file = {
            uri: result.uri,
            type: result.type,
            name: result.fileName || result.uri.split('/') && result.uri.split('/')[result.uri.split('/').length - 1] || Date.now().toString(),
          };
          const formData = new FormData();
          formData.append('image', file);
          updateAva(formData);
        }
      },
    );
  };

  const updateAva = async (formData: any) => {
    const api_user_token = 'cf032a75373319fbb7eabcda1cd5f3edd9348691';
    // const res = await axios.request({
    //   url: `https://api.logmeal.es/v2/recognition/dish/v0.8?language=eng`,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: 'Bearer ' + api_user_token,
    //   },
    //   data: formData,
    //   method: 'post',
    // });
    // if (res.status === 200) {
    //   GlobalLoadingSetup.getLoading().isHide();
    //   console.info(res.data);
    // } else {
    //   console.info(res.data)
    //   GlobalLoadingSetup.getLoading().isHide();
    //   GlobalModalSetup.getGlobalModalHolder().alertMessage(
    //     'Thông báo',
    //     'Có lỗi xảy ra. Vui lòng thử lại sau.',
    //   );
    // }
    const res = await fetch(
      'https://api.logmeal.es/v2/recognition/dish/v0.8?language=eng',
      {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + api_user_token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      },
      body: formData,
      })
    if (res.status === 200) {
      GlobalLoadingSetup.getLoading().isHide();
      console.info(res);
    } else {
      console.info(res)
      GlobalLoadingSetup.getLoading().isHide();
      GlobalModalSetup.getGlobalModalHolder().alertMessage(
        'Thông báo',
        'Có lỗi xảy ra. Vui lòng thử lại sau.',
      );
    }
  };

  const renderCamera = () => {
    return (
      <RNCamera
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        ref={(ref) => {
          camera = ref;
        }}>
        <TouchableOpacity
          style={styles.capture}
          onPress={() => {}}></TouchableOpacity>
      </RNCamera>
      // <View>
      //   <TouchableOpacity onPress={() => {uploadImage()}}>
      //     <CText>Thêm hình</CText>
      //   </TouchableOpacity>
      // </View>
    );
  };

  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.MAIN} />
      <View style={styles.listWrap}>
        {renderCamera()}
      </View>
    </View>
  );
};
export default CameraPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    paddingTop: 16 * ratio,
    // paddingHorizontal: 16 * ratio,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
});
