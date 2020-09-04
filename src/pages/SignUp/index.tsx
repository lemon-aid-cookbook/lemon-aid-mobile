import {AnimatedInput, CButton, CText} from 'components';
import {COLOR, ratio} from 'config/themeUtils';
import {Formik} from 'formik';
import {SignupRequest} from 'pages/Login/redux/actions';
import React from 'react';
import {
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
    .max(48, 'Email không được quá 48 kí tự')
    .label('Email')
    .email('Email không hợp lệ')
    .required('* Vui lòng nhập email'),
  password: yup
    .string()
    .required('* Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
    .max(48, 'Mật khẩu không vượt quá 48 kí tự')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự',
    }),
  confirmPassword: yup
    .string()
    .required('* Vui lòng nhập lại mật khẩu')
    .oneOf(
      [yup.ref('password'), null],
      'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập',
    ),
  username: yup
    .string()
    .trim()
    .required('* Vui lòng nhập tên đăng nhập')
    .min(3, 'Tên đăng nhập từ 3 kí tự trở lên')
    .max(16, 'Tên đăng nhập không được quá 16 kí tự')
    .matches(
      /(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      'Tên đăng nhập không hợp lệ',
    ),
});

const SignUpPage: React.FC<Props> = (props) => {
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
          Đăng ký
        </CText>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
          }}
          isInitialValid={false}
          validationSchema={validationSchema}
          onSubmit={(values) => dispatch(SignupRequest.get(values))}>
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
                <AnimatedInput
                  placeholder="Tên đăng nhập"
                  style={styles.input}
                  onTouchStart={() => setFieldTouched('username')}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    focusTheField('email');
                  }}
                  getRef={(input) => {
                    inputs['username'] = input;
                  }}
                  textError={errors.username}
                  textSize={16}
                />
                <AnimatedInput
                  placeholder="Email"
                  style={styles.input}
                  onTouchStart={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    focusTheField('password');
                  }}
                  getRef={(input) => {
                    inputs['email'] = input;
                  }}
                  textError={errors.email}
                  textSize={16}
                  keyboardType="email-address"
                />
                <AnimatedInput
                  secureTextEntry={true}
                  placeholder="Mật khẩu"
                  style={styles.input}
                  onTouchStart={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    focusTheField('confirmPassword');
                  }}
                  getRef={(input) => {
                    inputs['password'] = input;
                  }}
                  textError={errors.password}
                  textSize={16}
                />
                <AnimatedInput
                  secureTextEntry={true}
                  placeholder="Nhập lại mật khẩu"
                  style={styles.input}
                  onTouchStart={() => setFieldTouched('confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  getRef={(input) => {
                    inputs['confirmPassword'] = input;
                  }}
                  textError={errors.confirmPassword}
                  textSize={16}
                />
                <View style={styles.bottomWrap}>
                  <View style={{flexDirection: 'row'}}>
                    <CText fontSize={14 * ratio}>Đã có tài khoản?</CText>
                    <TouchableOpacity onPress={() => navigate('Login')}>
                      <CText
                        color={COLOR.PRIMARY_ACTIVE}
                        fontSize={14 * ratio}
                        style={{marginLeft: 5}}>
                        Đăng nhập
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
                  title="Đăng ký"
                  onPress={handleSubmit}
                />
                {/* <View style={styles.addButton}>
                  <CText fontSize={18 * ratio}>Đăng ký với</CText>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      source={require('../../assets/img/Google.png')}
                      style={{width: 92, height: 64}}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default SignUpPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginTop: 16 * ratio,
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
    alignSelf: 'flex-end',
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
