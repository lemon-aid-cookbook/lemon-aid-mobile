import {AnimatedInput, CButton, CText} from 'components';
import {COLOR, ratio} from 'config/themeUtils';
import {Formik} from 'formik';
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
import {LoginRequest} from './redux/actions';

export interface Props {}

const validationSchema = yup.object().shape({
  username: yup.string().trim().required('* Vui lòng nhập tên đăng nhập'),
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
    inputs[id].focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ScrollView>
        <CText
          bold
          fontSize={28 * ratio}
          style={{marginTop: 80 * ratio, marginHorizontal: 16 * ratio}}>
          Đăng nhập
        </CText>
        <Formik
          initialValues={{username: '', password: ''}}
          isInitialValid={false}
          validationSchema={validationSchema}
          onSubmit={(values) => dispatch(LoginRequest.get(values))}>
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
              <View
                style={{marginTop: 28 * ratio, marginHorizontal: 16 * ratio}}>
                <View>
                  <AnimatedInput
                    placeholder="Tên đăng nhập"
                    onTouchStart={() => setFieldTouched('username')}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      focusTheField('password');
                    }}
                    textError={errors.username}
                    textSize={16}
                  />
                  <AnimatedInput
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    style={{marginTop: 16 * ratio}}
                    onTouchStart={() => setFieldTouched('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    getRef={(input) => {
                      inputs['password'] = input;
                    }}
                    textError={errors.password}
                    textSize={16}
                  />
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
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16 * ratio,
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
