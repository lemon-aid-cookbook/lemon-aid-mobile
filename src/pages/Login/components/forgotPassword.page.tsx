import {AnimatedInput, CButton, CText} from 'components';
import {COLOR, ratio} from 'config/themeUtils';
import {Formik} from 'formik';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
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
});

const ForgotPasswordPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ScrollView>
        <TouchableOpacity
          style={{marginTop: 52 * ratio, marginLeft: 16 * ratio}}
          onPress={() => goBack()}>
          <Feather name={'chevron-left'} color="#222222" size={24 * ratio} />
        </TouchableOpacity>
        <CText
          fontSize={28 * ratio}
          style={{alignSelf: 'center', marginTop: 32 * ratio}}>
          Quên mật khẩu
        </CText>
        <Formik
          initialValues={{email: ''}}
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
              <View
                style={{marginTop: 28 * ratio, marginHorizontal: 16 * ratio}}>
                <CText fontSize={16 * ratio}>
                  Vui lòng nhập email. Bạn sẽ nhận được được dẫn tạo mật khẩu
                  mới qua email.
                </CText>
                <AnimatedInput
                  placeholder="Email"
                  style={styles.input}
                  onTouchStart={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  textError={errors.email}
                  textSize={16}
                  keyboardType="email-address"
                />
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
                  title="Gửi"
                  onPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default ForgotPasswordPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginTop: 24 * ratio,
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
