import {CInput, CText, GlobalModalSetup} from 'components';
import {COLOR, MODAL_TYPE, ratio} from 'config/themeUtils';
import {CommentPost, DeleteComment} from 'pages/Profile/redux/actions';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
export interface Props {
  listCmt: any[];
}

const defaultProps = {
  listCmt: [
    {
      id: 0,
      userId: 3,
      name: 'Trang nè',
      ava: 'https://source.unsplash.com/random',
      cmt:
        'Khó quá à \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    },
    {
      id: 0,
      userId: 3,
      name: 'Trang nè',
      ava: 'https://source.unsplash.com/random',
      cmt:
        'Khó quá à \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    },
  ],
};

const DiscussTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [cmt, setCmt] = useState('');
  const [replyCmt, setReplyCmt] = useState('');
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const {profileInfo, detailPost} = profile;
  const dispatch = useDispatch();
  const [reply, setReply] = useState(-1);

  const renderDiscussInput = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 9 * ratio,
            marginHorizontal: 16 * ratio,
          }}>
          <Image
            source={{
              uri: profileInfo?.avatar || 'https://source.unsplash.com/random',
            }}
            style={styles.avaWrap}
          />
          <CInput
            containerStyle={{flex: 1, justifyContent: 'center'}}
            style={styles.inputWrap}
            // multiline
            textSize={14}
            placeholder={'Nhập thảo luận...'}
            value={cmt}
            onChangeText={(text: string) => {
              setCmt(text);
            }}
            showIcon={true}
            rightIcon={'send'}
            rightIconColor={
              cmt.replace(/\s/g, '').length > 0
                ? COLOR.PRIMARY_ACTIVE
                : COLOR.DEACTIVE_GRAY
            }
            onPressRightIcon={() => {
              dispatch(
                CommentPost.get({
                  postId: detailPost.id,
                  userId: user.id,
                  parentCommentId: null,
                  message: cmt,
                }),
              );
              setCmt('');
            }}
            onSubmitEditing={() => {
              dispatch(
                CommentPost.get({
                  postId: detailPost.id,
                  userId: user.id,
                  parentCommentId: null,
                  message: cmt,
                }),
              );
              setCmt('');
            }}
          />
        </View>
      </View>
    );
  };

  const renderSubItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginVertical: 4 * ratio,
            paddingHorizontal: 16 * ratio,
          }}
          key={index}>
          <Image
            source={{
              uri: item.User?.avatar,
            }}
            style={styles.avaWrap}
          />
          <View style={{flex: 1}}>
            <CText fontSize={14} bold>
              {item.User?.username}
            </CText>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              <CText fontSize={14} style={{flex: 1, textAlign: 'justify'}}>
                {item.message}
              </CText>
            </View>
            {user?.id === item.userId && (
              <TouchableOpacity
                onPress={() =>
                  GlobalModalSetup.getGlobalModalHolder().alertMessage(
                    'Xác nhận',
                    'Bạn chắc chắn muốn xóa thảo luận này?',
                    MODAL_TYPE.CHOICE,
                    () =>
                      dispatch(
                        DeleteComment.get({
                          data: {commentId: item.id},
                          postId: detailPost.id,
                        }),
                      ),
                  )
                }>
                <CText fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                  Xóa
                </CText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginVertical: 4 * ratio,
            paddingHorizontal: 16 * ratio,
          }}
          key={index}>
          <Image
            source={{
              uri: item.User?.avatar,
            }}
            style={styles.avaWrap}
          />
          <View style={{flex: 1}}>
            <CText fontSize={14} bold>
              {item.User?.username}
            </CText>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              <CText fontSize={14} style={{flex: 1, textAlign: 'justify'}}>
                {item.message}
              </CText>
            </View>
            <View style={{flexDirection: 'row'}}>
              {user?.id === item.userId && <TouchableOpacity
                onPress={() => setReply(reply === index ? -1 : index)}>
                <CText fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                  Trả lời
                </CText>
              </TouchableOpacity>}
              {user && (
                <TouchableOpacity
                  style={{marginLeft: 20 * ratio}}
                  onPress={() =>
                    GlobalModalSetup.getGlobalModalHolder().alertMessage(
                      'Xác nhận',
                      'Bạn chắc chắn muốn xóa thảo luận này?',
                      MODAL_TYPE.CHOICE,
                      () =>
                        dispatch(
                          DeleteComment.get({
                            data: {commentId: item.id},
                            postId: detailPost.id,
                          }),
                        ),
                    )
                  }>
                  <CText fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                    Xóa
                  </CText>
                </TouchableOpacity>
              )}
            </View>
            {reply === index && renderReplyInput(item)}
          </View>
        </View>
        <View style={{paddingLeft: 36 * ratio}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={item.SubComment}
            keyExtractor={(index) => index.toString()}
            renderItem={renderSubItem}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    backgroundColor: COLOR.LIGHT_GRAY,
                    height: 1 * ratio,
                    width: '100%',
                    marginVertical: 9 * ratio,
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    );
  };

  const renderReplyInput = (item: any) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 9 * ratio,
            marginHorizontal: 0 * ratio,
          }}>
          <Image
            source={{
              uri: user?.avatar || 'https://source.unsplash.com/random',
            }}
            style={styles.avaWrap}
          />
          <CInput
            containerStyle={{flex: 1, justifyContent: 'center'}}
            style={[styles.inputWrap, {width: '100%'}]}
            // multiline
            textSize={14}
            placeholder={'Nhập thảo luận...'}
            value={replyCmt}
            onChangeText={(text: string) => {
              setReplyCmt(text);
            }}
            showIcon={true}
            rightIcon={'send'}
            rightIconColor={
              cmt.replace(/\s/g, '').length > 0
                ? COLOR.PRIMARY_ACTIVE
                : COLOR.DEACTIVE_GRAY
            }
            onPressRightIcon={() => {
              dispatch(
                CommentPost.get({
                  postId: detailPost.id,
                  userId: user.id,
                  parentCommentId: item.id,
                  message: replyCmt,
                }),
              );
              setReplyCmt('');
            }}
            onSubmitEditing={() => {
              dispatch(
                CommentPost.get({
                  postId: detailPost.id,
                  userId: user.id,
                  parentCommentId: item.id,
                  message: replyCmt,
                }),
              );
              setReplyCmt('');
            }}
          />
        </View>
      </View>
    );
  };

  const renderComment = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={detailPost.Comments}
          keyExtractor={(index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: COLOR.LIGHT_GRAY,
                  height: 1 * ratio,
                  width: '100%',
                  marginVertical: 9 * ratio,
                }}
              />
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {user && renderDiscussInput()}
      {user && (
        <View
          style={{
            backgroundColor: COLOR.LIGHT_GRAY,
            height: 8 * ratio,
            width: '100%',
            marginVertical: 9 * ratio,
          }}
        />
      )}
      {renderComment()}
    </View>
  );
};

DiscussTab.defaultProps = defaultProps;
export default DiscussTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16 * ratio,
  },
  avaWrap: {
    width: 40 * ratio,
    height: 40 * ratio,
    borderRadius: 20 * ratio,
    marginRight: 5 * ratio,
  },
  inputWrap: {
    width: '100%',
    height: 45 * ratio,
    borderWidth: 1 * ratio,
    borderColor: '#DADADA',
    borderRadius: 9 * ratio,
  },
});
