import {CButton, CHeader, CInput} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {ChangePassword} from '../redux/actions';

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('* Vui lòng nhập mật khẩu cũ')
    .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
    .max(48, 'Mật khẩu không vượt quá 48 kí tự')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự',
    }),
  newPassword: yup
    .string()
    .required('* Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
    .max(48, 'Mật khẩu không vượt quá 48 kí tự')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự',
    })
    .notOneOf(
      [yup.ref('oldPassword'), null],
      'Mật khẩu mới phải khác mật khẩu cũ',
    ),
  confirmPassword: yup
    .string()
    .required('* Vui lòng nhập lại mật khẩu mới')
    .oneOf(
      [yup.ref('newPassword'), null],
      'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập',
    ),
});

const ChangePasswordPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const onChangePassword = (values: any) => {
    dispatch(ChangePassword.get({...values, userId: user.id}));
  };

  let inputs = {};
  const focusTheField = (id) => {
    inputs[id].focus();
  };

  return (
    <View style={styles.container}>
      <CHeader
        headerTitle="Đổi mật khẩu"
        type={HEADER_TYPE.NORMAL}
        isShowLeft
        onLeftPress={() => goBack()}
      />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={onChangePassword}>
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
            <View style={styles.listWrap}>
              <CInput
                placeholder={'Mật khẩu cũ'}
                textSize={14}
                value={values.oldPassword}
                onBlur={handleBlur('oldPassword')}
                onChangeText={handleChange('oldPassword')}
                textError={errors.oldPassword}
                style={styles.inputWrap}
                secureTextEntry
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  focusTheField('newPassword');
                }}
              />
              <CInput
                placeholder={'Mật khẩu mới'}
                textSize={14}
                value={values.newPassword}
                onBlur={handleBlur('newPassword')}
                onChangeText={handleChange('newPassword')}
                textError={errors.newPassword}
                style={styles.inputWrap}
                secureTextEntry
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  focusTheField('confirmPassword');
                }}
                ref={(input) => {
                  inputs['newPassword'] = input;
                }}
              />
              <CInput
                placeholder={'Nhập lại mật khẩu mới'}
                textSize={14}
                value={values.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
                textError={errors.confirmPassword}
                style={styles.inputWrap}
                secureTextEntry
                ref={(input) => {
                  inputs['confirmPassword'] = input;
                }}
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
                title="Cập nhật"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default ChangePasswordPage;

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
    alignItems: 'center',
  },
  btnStyle: {
    width: '90%',
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 25,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 28 * ratio,
  },
  inputWrap: {
    width: '90%',
    height: 45 * ratio,
    borderWidth: 1 * ratio,
    borderColor: '#DADADA',
    borderRadius: 9 * ratio,
    marginTop: 16 * ratio,
  },
});
