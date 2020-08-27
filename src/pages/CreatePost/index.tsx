import {CHeader, CText, CInput, CButton} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {SignoutRequest} from 'pages/Login/redux/actions';
import RecipeItem from 'pages/Search/components/recipeItem';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

export interface Props {
  avatar: string;
}

const defaultProps = {};

const CreatePostPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [descript, setDescript] = useState('');
  const [cookingTime, setTime] = useState(0);
  const [ration, setRation] = useState(0);
  const [steps, setSteps] = useState([{stt: 1, making: '', image: ''}]);
  const [ingredient, setIngredient] = useState(['']);
  const [checkValid, setValid] = useState(false);

  const insertThubnail = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => !result.didCancel && setThumbnail(result.data),
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
            width: '100%',
            height: 200 * ratio,
            marginVertical: 16 * ratio,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            insertThubnail();
          }}>
          {thumbnail.length > 0 ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${thumbnail}`,
              }}
              style={{
                width: '100%',
                height: 200 * ratio,
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

  const renderTitle = () => {
    return (
      <View>
        <CText bold fontSize={18}>
          Tiêu đề
        </CText>
        <CInput
          placeholder={'Gỏi...'}
          textSize={14}
          value={title}
          onChangeText={(text: string) => setTitle(text)}
          style={styles.inputWrap}
          textError={
            checkValid &&
            title.replace(/\s/g, '').length < 1 &&
            'Không được bỏ trống!'
          }
        />
        <CText bold fontSize={18}>
          Mô tả
        </CText>
        <CInput
          placeholder={'Món ăn dành cho mùa hè...'}
          textSize={14}
          value={descript}
          onChangeText={(text: string) => setDescript(text)}
          style={styles.inputWrap}
        />
        <CText bold fontSize={18}>
          Khẩu phần
        </CText>
        <CInput
          placeholder={'4'}
          textSize={14}
          value={ration.toString()}
          onChangeText={(text: string) => setRation(Number(text))}
          style={styles.inputWrap}
          keyboardType={'number-pad'}
          textError={
            checkValid &&
            ration.toString().replace(/\s/g, '').length < 1 &&
            'Không được bỏ trống!'
          }
        />
        <CText bold fontSize={18}>
          Thời gian nấu
        </CText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CInput
            containerStyle={{flex: 1, justifyContent: 'center'}}
            placeholder={'20'}
            textSize={14}
            value={cookingTime.toString()}
            onChangeText={(text: string) => setTime(Number(text))}
            style={[styles.inputWrap, {width: '90%'}]}
            keyboardType={'number-pad'}
            textError={
              checkValid &&
              cookingTime.toString().replace(/\s/g, '').length < 1 &&
              'Không được bỏ trống!'
            }
          />
          <CText bold fontSize={14}>
            phút
          </CText>
        </View>
      </View>
    );
  };

  const renderIngreItem = ({item, index}: {item: string; index: number}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        key={index}>
        <CInput
          containerStyle={{flex: 1, justifyContent: 'center'}}
          placeholder={'100g thịt ba chỉ...'}
          textSize={14}
          value={item}
          onChangeText={(text: string) => {
            const ingre = ingredient;
            ingre[index] = text;
            setIngredient(ingre);
          }}
          style={[styles.inputWrap, {width: '90%'}]}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setIngredient([
              ...ingredient.slice(0, index),
              ...ingredient.slice(index + 1),
            ]);
          }}>
          <Feather name={'x'} size={24 * ratio} color={'#9B9B9B'} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderIngre = () => {
    return (
      <View style={{marginBottom: 16 * ratio}}>
        <CText bold fontSize={18}>
          Nguyên liệu
        </CText>
        <FlatList
          data={ingredient}
          keyExtractor={(index) => index.toString()}
          renderItem={renderIngreItem}
        />
        <TouchableOpacity
          onPress={() => {
            setIngredient([...ingredient, '']);
            console.info(ingredient);
          }}>
          <CText bold fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
            {' '}
            + Thêm nguyên liệu
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStep = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginVertical: 10 * ratio,
        }}
        key={Math.random()}>
        <View style={styles.index}>
          <CText fontSize={14} color={'white'} bold>
            {index + 1}
          </CText>
        </View>
        <View style={{width: '80%'}}>
          <CInput
            containerStyle={{flex: 1, justifyContent: 'center'}}
            placeholder={'Sơ chế thịt...'}
            textSize={14}
            value={item.making}
            onChangeText={(text: string) => {
              const step = steps;
              step[index].making = text;
              step[index].stt = index + 1;
              setSteps(step);
            }}
            style={[styles.inputWrap, {width: '90 %'}]}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#DADADA',
              width: 100 * ratio,
              height: 100 * ratio,
              borderRadius: 9 * ratio,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => pickStepImage(index)}>
            {item.image !== '' ? (
              <View>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.image}`,
                  }}
                  style={{
                    width: 100 * ratio,
                    height: 100 * ratio,
                    borderRadius: 9 * ratio,
                  }}
                />
              </View>
            ) : (
              <Feather
                name={'image'}
                color={COLOR.DEACTIVE_GRAY}
                size={24 * ratio}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginTop: 16 * ratio}}
          onPress={() => {
            setSteps([...steps.slice(0, index), ...steps.slice(index + 1)]);
          }}>
          <Feather name={'x'} size={24 * ratio} color={'#9B9B9B'} />
        </TouchableOpacity>
      </View>
    );
  };

  const pickStepImage = (index: number) => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => {
        if (!result.didCancel) {
          const step = steps;
          step[index].image = result.data;
          setSteps(step);
          console.info(steps)
        }
      },
    );
  };

  const renderSteps = () => {
    return (
      <View style={{marginBottom: 16 * ratio}}>
        <CText bold fontSize={18}>
          Các bước thực hiện
        </CText>
        <FlatList
          data={steps}
          keyExtractor={(index) => index.toString()}
          renderItem={renderStep}
        />
        <TouchableOpacity
          onPress={() => {
            setSteps([...steps, {stt: steps.length, making: '', image: ''}]);
          }}>
          <CText bold fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
            {' '}
            + Thêm bước
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  const checkSubmit = () => {
    if (
      thumbnail.length > 0 &&
      title.toString().replace(/\s/g, '').length > 0 &&
      ration.toString().replace(/\s/g, '').length > 0 &&
      cookingTime.toString().replace(/\s/g, '').length > 0 &&
      ingredient[0].toString().replace(/\s/g, '').length > 0 &&
      steps[0].making.toString().replace(/\s/g, '').length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const val = {
      title: title,
      description: descript,
      ration: ration.toString() + ' người ăn',
      cookingTime: cookingTime,
      difficultLevel: 1,
      url: '',
      avatar: thumbnail,
      steps: steps,
      ingredients: ingredient.join("|"),
      categories: '',
      hashtags: '',
      userId: user.id,
    };
    return JSON.stringify(val);
  };

  return (
    <View style={styles.container}>
      <CHeader
        headerTitle="Đăng công thức"
        type={HEADER_TYPE.NORMAL}
        isShowLeft
        onLeftPress={() => goBack()}
      />
      <ScrollView style={styles.listWrap} showsVerticalScrollIndicator={false}>
        {renderThumbnail()}
        {renderTitle()}
        {renderIngre()}
        {renderSteps()}
        <CButton
          style={[styles.btnStyle]}
          title="Đăng"
          onPress={() => {
            setValid(true);
            checkSubmit() && console.info(handleSubmit());
          }}
        />
      </ScrollView>
    </View>
  );
};

CreatePostPage.defaultProps = defaultProps;
export default CreatePostPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    flex: 1,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    paddingHorizontal: 16 * ratio,
  },
  inputWrap: {
    width: '100%',
    height: 45 * ratio,
    borderWidth: 1 * ratio,
    borderColor: '#DADADA',
    borderRadius: 9 * ratio,
    marginVertical: 8 * ratio,
  },
  index: {
    height: 30 * ratio,
    width: 30 * ratio,
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 20 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5 * ratio,
    marginTop: 16 * ratio,
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
    marginVertical: 20 * ratio,
  },
});
