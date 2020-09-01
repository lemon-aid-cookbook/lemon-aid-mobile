import {COLOR, ratio} from 'config/themeUtils';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';

export interface Props {
  type: 'BIG' | 'SMALL';
  onChange: (data: any) => void;
}

const defaultProps = {};

const ImageUpload: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');

  const insertThubnail = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => {
        if (!result.didCancel) {
          props.onChange('data:image/jpeg;base64,' + result.data);
          setImage(result.data);
        }
      },
    );
  };

  const renderThumbnail = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLOR.LIGHT_GRAY,
            borderRadius: 9 * ratio,
            width: props.type === 'BIG' ? '100%' : 100 * ratio,
            height: props.type === 'BIG' ? 200 * ratio : 100 * ratio,
            marginVertical: 16 * ratio,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            insertThubnail();
          }}>
          {image.length > 0 ? (
            <Image
              resizeMode={'cover'}
              source={{
                uri: `data:image/png;base64,${image}`,
              }}
              style={{
                width: props.type === 'BIG' ? '100%' : 100 * ratio,
                height: props.type === 'BIG' ? 200 * ratio : 100 * ratio,
                borderRadius: 9 * ratio,
              }}
            />
          ) : (
            <Feather
              name={'image'}
              color={COLOR.DEACTIVE_GRAY}
              size={46 * ratio}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={styles.container}>{renderThumbnail()}</View>;
};

ImageUpload.defaultProps = defaultProps;
export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
