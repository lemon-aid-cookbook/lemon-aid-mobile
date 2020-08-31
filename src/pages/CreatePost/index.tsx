import { CButton, CHeader, CInput, CText } from 'components';
import {
  CATEGORIES,
  COLOR,
  HEADER_TYPE,
  ratio,
  validationRecipeSchema
} from 'config/themeUtils';
import { Formik } from 'formik';
import React from 'react';
import {
  FlatList,

  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { RNChipView } from 'react-native-chip-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './imagePicker';

export interface Props {
  avatar: string;
}

const defaultProps = {};

const difficultLevel = [
  {
    value: 1,
    label: 'Dễ',
  },
  {
    value: 2,
    label: 'Trung bình',
  },
  {
    value: 3,
    label: 'Khó',
  },
];

const CreatePostPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();


  const submitRecipe = (values: any) => {
    console.info('value', values);
    // dispatch(
    //   CreateRecipe.get({
    //     ...values,
    //     ingredients: values.ingredients.join('|'),
    //     categories: values.categories.join('|'),
    //     userId: user?.id,
    //     ration: values.ration.toString()
    //   })
    // )
  };

  const onChangeCategories = (item, isIn, ingres, setFieldValue) => {
    if (isIn > -1) {
      ingres.splice(isIn, 1);
    } else {
      ingres.push(item.title);
    }
    setFieldValue('categories', ingres);
  };

  const addPictureStep = (steps, index, picture, setFieldValue) => {
    steps[index].image = picture;
    setFieldValue('steps', steps);
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
        <Formik
          initialValues={{
            title: '',
            description: '',
            avatar: null,
            ration: '1',
            cookingTime: 20,
            difficultLevel: 'Dễ',
            ingredients: [''],
            categories: [],
            hashtags: '',
            steps: [{stt: 1, making: '', image: null}],
          }}
          isInitialValid={false}
          validationSchema={validationRecipeSchema}
          onSubmit={(values) => {
            console.info('balu', values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <View
                style={{marginTop: 28 * ratio, marginHorizontal: 16 * ratio}}>
                <View>
                  <ImageUpload
                    type={'BIG'}
                    onChange={() => handleChange('avatar')}
                  />
                </View>
                <View>
                  <CText bold fontSize={18}>
                    Tiêu đề
                  </CText>
                  <CInput
                    placeholder={'Gỏi...'}
                    textSize={14}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    style={styles.inputWrap}
                    textError={errors.title}
                  />
                  <CText bold fontSize={18}>
                    Mô tả
                  </CText>
                  <CInput
                    placeholder={'Món ăn dành cho mùa hè...'}
                    textSize={14}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    style={styles.inputWrap}
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
                      value={Number(values.cookingTime)}
                      onChangeText={handleChange('cookingTime')}
                      style={[styles.inputWrap, {width: '90%'}]}
                      keyboardType={'number-pad'}
                      textError={errors.cookingTime}
                    />
                    <CText bold fontSize={14}>
                      phút
                    </CText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <CText bold fontSize={18}>
                        Khẩu phần
                      </CText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CInput
                          placeholder={'4'}
                          textSize={14}
                          value={Number(values.ration) ? values.ration : ''}
                          onChangeText={handleChange('ration')}
                          style={[
                            styles.inputWrap,
                            {
                              width: 90 * ratio,
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                          ]}
                          keyboardType={'number-pad'}
                          textError={errors.ration}
                        />
                      </View>
                    </View>
                    <View>
                      <CText bold fontSize={18}>
                        Độ khó
                      </CText>
                      <DropDownPicker
                        items={difficultLevel}
                        containerStyle={styles.dropdownWrap}
                        onChangeItem={(item) =>
                          handleChange('difficultLevel')(item.label)
                        }
                      />
                    </View>
                  </View>

                  <CText bold fontSize={18}>
                    Nhóm thức ăn
                  </CText>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <FlatList
                      horizontal
                      data={CATEGORIES}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const isIn = values.categories.indexOf(item.title);
                        return (
                          <View style={{marginRight: 5 * ratio}}>
                            <RNChipView
                              key={`chip${index}`}
                              title={item.title}
                              avatar={false}
                              titleStyle={{
                                fontSize: 14 * ratio,
                                color: 'white',
                                fontFamily: 'Cabin-Regular',
                                fontWeight: 'normal',
                              }}
                              backgroundColor={
                                isIn > -1
                                  ? COLOR.PRIMARY_ACTIVE
                                  : COLOR.DEACTIVE_GRAY
                              }
                              onPress={() =>
                                onChangeCategories(
                                  item,
                                  isIn,
                                  values.categories,
                                  setFieldValue,
                                )
                              }
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={{marginBottom: 16 * ratio}}>
                    <CText bold fontSize={18}>
                      Nguyên liệu
                    </CText>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((material, index) => (
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
                            value={material}
                            onChangeText={(text: string) => {
                              let ingres = values.ingredients;
                              ingres[index] = text;
                              setFieldValue('ingredients', ingres);
                            }}
                            style={[styles.inputWrap, {width: '90%'}]}
                           
                          />
                          <TouchableWithoutFeedback
                            onPress={() => {
                              let ingres = values.ingredients;
                              ingres.splice(index, 1);
                              setFieldValue('ingredients', ingres);
                            }}>
                            <Feather
                              name={'x'}
                              size={24 * ratio}
                              color={'#9B9B9B'}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      ))}
                    <TouchableOpacity
                      onPress={() => {
                        let ingres = values.ingredients;
                        ingres.push('');
                        setFieldValue('ingredients', ingres);
                      }}>
                      <CText bold fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                        {' '}
                        + Thêm nguyên liệu
                      </CText>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginBottom: 16 * ratio}}>
                    <CText bold fontSize={18}>
                      Các bước thực hiện
                    </CText>
                    {values.steps.length > 0 &&
                      values.steps.map((step, i) => (
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
                              {i + 1}
                            </CText>
                          </View>
                          <View style={{width: '80%'}}>
                            <CInput
                              containerStyle={{
                                flex: 1,
                                justifyContent: 'center',
                              }}
                              placeholder={'Sơ chế thịt...'}
                              textSize={14}
                              value={step.making}
                              onChangeText={(text: string) => {
                                let steps = values.steps;
                                steps[i].making = text;
                                handleChange('steps')(steps)
                                // setFieldValue('steps', steps);
                              }}
                              style={[styles.inputWrap, {width: '90 %'}]}
                              // textError={errors.steps[i]?.making || ''}
                            />
                            <ImageUpload
                              type={'SMALL'}
                              onChange={(data) =>
                                addPictureStep(
                                  values.steps,
                                  i,
                                  data,
                                  setFieldValue,
                                )
                              }
                            />
                          </View>
                          <TouchableOpacity
                            style={{marginTop: 16 * ratio}}
                            onPress={() => {
                              let steps = values.steps;
                              steps.splice(i, 1);
                              setFieldValue('steps', steps);
                            }}>
                            <Feather
                              name={'x'}
                              size={24 * ratio}
                              color={'#9B9B9B'}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    <TouchableOpacity
                      onPress={() => {
                        // let steps = values.steps;
                        // steps.push({
                        //   stt: values.steps.length + 1,
                        //   making: '',
                        // });
                        // setFieldValue('steps', steps);
                      }}>
                      <CText bold fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                        {' '}
                        + Thêm bước
                      </CText>
                    </TouchableOpacity>
                  </View>
                </View>
                <CButton
                  style={[styles.btnStyle]}
                  title="Đăng"
                  onPress={() => {
                    console.info(values);
                  }}
                />
              </View>
            );
          }}
        </Formik>
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
  pressWrap: {
    borderRadius: 9 * ratio,
    borderWidth: 1 * ratio,
    borderColor: '#DADADA',
    width: 45 * ratio,
    height: 45 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownWrap: {
    width: 200 * ratio,
    height: 45 * ratio,
    marginVertical: 8 * ratio,
    borderRadius: 9 * ratio,
  },
});
