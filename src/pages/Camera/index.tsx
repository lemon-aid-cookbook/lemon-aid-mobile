import {CText, CHeader, GlobalLoadingSetup, GlobalModalSetup, CButton} from 'components';
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
import {HEADER_TYPE, ratio, COLOR} from 'config/themeUtils';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import translate from 'google-translate-open-api';
import RNFetchBlob from 'rn-fetch-blob';
// import request from 'request'

export interface Props {
  
}

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
          console.info(result)
          // const formData = new FormData();
          // formData.append('image', result);
          updateAva(result);
        }
      },
    );
  };

  const updateAva = async (formData: any) => {
    const api_user_token = 'cf032a75373319fbb7eabcda1cd5f3edd9348691';
    const axiosConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + api_user_token,
        'Access-Control-Allow-Origin': true
      },
    }
    // axios.post(`https://api.logmeal.es/v2/recognition/dish`, formData,axiosConfig)
    // .then((res) => console.info(res))
    // .catch((er) => console.info(er))
    RNFetchBlob.fetch('POST', 'https://api.logmeal.es/v2/recognition/dish', {
    Authorization : 'Bearer ' + api_user_token,
    'Content-Type' : 'multipart/form-data',
  }, RNFetchBlob.wrap(formData.path))
  .then((res) => {
    console.info(res)
  })
  .catch((err) => {
    console.info(err)
    // error handling ..
  })
  };

  const renderCamera = () => {
    return (
      <View
         style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <CButton
                  style={[
                    styles.btnStyle,
                  ]}
                  title="Chọn hình"
                  onPress={() => {uploadImage()}}
                />
      </View>
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
  btnStyle: {
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 25,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50 * ratio,
  },
});
