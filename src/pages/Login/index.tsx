import {CText, CButton} from 'components';
import {COLOR, ratio} from 'config/themeUtils';
import {Formik} from 'formik';
import {Form, Input, Item, Label} from 'native-base';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

export interface Props {}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .label('Email')
    .email('Email không hợp lệ')
    .required('* Vui lòng nhập email'),
  password: yup
    .string()
    .required('* Vui lòng nhập mật khẩu')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự',
    }),
});

const LoginPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();

  let inputs = {};
  const focusTheField = (id) => {
    inputs[id]._root.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ScrollView>
        <CText
          fontSize={28 * ratio}
          style={{alignSelf: 'center', marginTop: 80 * ratio}}>
          Đăng nhập
        </CText>
        <Formik
          initialValues={{email: '', password: ''}}
          isInitialValid={false}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            touched,
            setFieldTouched,
          }) => {
            return (
              <View style={{marginTop: 28 * ratio}}>
                <View>
                  <Form style={{marginRight: 16 * ratio}}>
                    <Item floatingLabel>
                      <Label style={styles.input}>Email</Label>
                      <Input
                        placeholder="Email"
                        style={styles.input}
                        onTouchStart={() => setFieldTouched('email')}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        onSubmitEditing={() => {
                          focusTheField('password');
                        }}
                      />
                    </Item>
                    {touched.email && errors.email && (
                      <CText
                        color="red"
                        fontSize={12 * ratio}
                        style={styles.errorText}>
                        {errors.email}
                      </CText>
                    )}
                    <Item floatingLabel>
                      <Label style={styles.input}>Mật khẩu</Label>
                      <Input
                        secureTextEntry={true}
                        placeholder="Mật khẩu"
                        style={styles.input}
                        onTouchStart={() => setFieldTouched('password')}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        getRef={(input) => {
                          inputs['password'] = input;
                        }}
                      />
                    </Item>
                    {touched.password && errors.password && (
                      <CText
                        color="red"
                        fontSize={12 * ratio}
                        style={styles.errorText}>
                        {errors.password}
                      </CText>
                    )}
                  </Form>
                </View>
                <View style={styles.bottomWrap}>
                  <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                    <CText fontSize={14 * ratio}>Quên mật khẩu?</CText>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <CText fontSize={14 * ratio}>Chưa có tài khoản?</CText>
                    <TouchableOpacity onPress={() => navigate('SignUp')}>
                      <CText
                        color={COLOR.PRIMARY_ACTIVE}
                        fontSize={14 * ratio}
                        style={{marginLeft: 5 * ratio}}>
                        Đăng ký
                      </CText>
                    </TouchableOpacity>
                  </View>
                </View>
                <CButton
                  style={[
                    styles.btnStyle,
                    {
                      backgroundColor: isValid
                        ? COLOR.PRIMARY_ACTIVE
                        : COLOR.DEACTIVE_GRAY,
                    },
                  ]}
                  disabled={!isValid}
                  title="Đăng nhập"
                  onPress={handleSubmit}
                />

                <View style={styles.addButton}>
                  <CText fontSize={18 * ratio}>Đăng nhập bằng</CText>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      source={require('../../assets/img/Google.png')}
                      style={{width: 92, height: 64}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16 * ratio,
    color: 'black',
    height: 64 * ratio,
    borderRadius: 4 * ratio,
  },
  errorText: {
    marginLeft: 16,
    marginTop: 8 * ratio,
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
    marginHorizontal: 16 * ratio,
  },
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16 * ratio,
    marginHorizontal: 16 * ratio,
  },
  bottomTxt: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    color: 'black',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
