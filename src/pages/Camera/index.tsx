import {CButton, CHeader, GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import translate from 'google-translate-open-api';
import React, {useState} from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useNavigation} from 'react-navigation-hooks';
import RNFetchBlob from 'rn-fetch-blob';

export interface Props {}

const CameraPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [imgUrl, setImgUrl] = useState('');
  let camera = null;

  

  const uploadImage = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => {
        if (!result.didCancel) {
          setImgUrl(result.uri);
          updateImage(result);
        }
      },
    );
  };

  const updateImage = (result: any) => {
    const api_user_token = 'cf032a75373319fbb7eabcda1cd5f3edd9348691';
    GlobalLoadingSetup.getLoading().isVisible();
    RNFetchBlob.fetch(
      'POST',
      'https://api.logmeal.es/v2/recognition/dish',
      {
        Authorization: `Bearer ${api_user_token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      [
        {
          name: 'image',
          filename: result.fileName,
          data: result.data,
        },
      ],
    )
      .then((res) => {
        GlobalLoadingSetup.getLoading().isHide();
        const data = JSON.parse(res.data)
        var key = data?.recognition_results?.length > 0 && data.recognition_results[0];
        const result = translate(key?.name, {
          to: 'vi',
        }).then((result) => {
          const val = result.data[0];
          const value = val[0].toUpperCase() + val.substring(1)
          navigate('SearchDetail', { keyword: value})
        });
      })
      .catch((er) => {
        GlobalLoadingSetup.getLoading().isHide();
        GlobalModalSetup.getGlobalModalHolder().alertMessage(
          'Thông báo',
          'Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại.',
        );
      });
  };

  const renderCamera = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <CButton
          style={[styles.btnStyle]}
          title="Chọn hình"
          onPress={() => {
            uploadImage();
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.MAIN} />
      {imgUrl ? (
        <ImageBackground
          blurRadius={1}
          source={{uri: imgUrl}}
          style={styles.listWrap}>
          {renderCamera()}
        </ImageBackground>
      ) : (
        <ImageBackground
          blurRadius={3}
          source={{
            uri:
              'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          }}
          style={styles.listWrap}>
          {renderCamera()}
        </ImageBackground>
      )}
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
    backgroundColor: 'white',
    paddingHorizontal: 16 * ratio,
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
    marginVertical: 50 * ratio,
  },
});
