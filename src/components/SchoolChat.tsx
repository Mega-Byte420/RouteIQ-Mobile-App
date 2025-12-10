import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import AppInput from './AppInput';
import GlobalIcon from './GlobalIcon';

const SchoolChat = () => {
  const [messages, setMessages] = useState<any>([
    {
      _id: 1111,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 1,
      text: '08:43',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'date',
    },
    {
      _id: 2,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 3,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 4,
      text: '08:12',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'date',
    },
    {
      _id: 5,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 6,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 7,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 8,
      text: '1 FEB 12:00',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'date',
    },
    {
      _id: 9,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 10,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 11,
      text: 'Hello developer',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
  ]);

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderMessage = (props: any) => {
    const {currentMessage} = props;
    const messageTextStyle = {
      left: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: 12,
        color: AppColors.black,
      },
      right: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: 12,
        color:
          currentMessage.type == 'date' ? AppColors.black : AppColors.white,
      },
    };

    return (
      <Bubble
        key={currentMessage.id}
        {...props}
        renderTime={() => <Text style={{position: 'absolute'}}></Text>}
        position={currentMessage.position}
        wrapperStyle={{
          left: {
            backgroundColor:
              currentMessage.type == 'date'
                ? AppColors.transparent
                : currentMessage.position === 'left'
                ? AppColors.inputColor
                : AppColors.red,
              marginBottom: 20,
            fontFamily: AppFonts.NunitoSansMedium,
            alignSelf:
              currentMessage.type == 'date'
                ? 'center'
                : currentMessage.position === 'left'
                ? 'left'
                : 'right',
            marginRight: currentMessage.type == 'date' ? hp(0) : 0,
            paddingVertical: hp(1),
          },
          right: {
            backgroundColor:
              currentMessage.type == 'date'
                ? AppColors.transparent
                : currentMessage.position === 'left'
                ? '#EDEDED'
                : AppColors.lightBlack,
            fontFamily: AppFonts.NunitoSansMedium,
            marginBottom: 20,
            alignSelf:
              currentMessage.type == 'date'
                ? 'center'
                : currentMessage.position === 'left'
                ? 'left'
                : 'right',
            marginLeft: currentMessage.type == 'date' ? hp(0) : 0,
            paddingVertical: hp(1),
          },
        }}
        textStyle={messageTextStyle}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <View style={styles.inputToolbarContainer}>
        <View style={styles.inputToolbar}>
          <View style={[AppStyles.rowCenter, styles.giftedContainer]}>
            <AppInput
              placeholder="Type your message here...."
              style={styles.input}
              container={styles.inputContainer}
              containerStyle={styles.containerStyle}
            />
            <TouchableOpacity style={styles.sendButton}>
              <GlobalIcon
                library="Ionicons"
                name="send"
                color={AppColors.lightBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        renderMessage={renderMessage}
        renderInputToolbar={renderInputToolbar}
        messagesContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: AppColors.screenColor,
          paddingTop: hp(1),
          paddingBottom: hp(5),
        }}
        renderAvatar={null}
        inverted={true}
        messages={messages}
        onSend={(newMessages: any) => onSend(newMessages)}
        user={{_id: 1}}
        isKeyboardInternallyHandled={false}
        listViewProps={{showsVerticalScrollIndicator: false}}
      />
    </View>
  );
};

export default SchoolChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.screenColor
  },
  giftedContainer: {
    backgroundColor: AppColors.screenColor,
    height: 40,
    borderRadius: hp(10),
  },
  inputToolbarContainer: {
    backgroundColor: AppColors.white,
    width: '100%',
    paddingHorizontal: hp(2),
    bottom: hp(4),
  },
  inputToolbar: {
    height: hp(10),
    backgroundColor: AppColors.white,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: AppColors.screenColor,
  },
  inputContainer: {
    borderColor: 'transparent',
    borderRadius: hp(10),
    height: '100%',
    backgroundColor: AppColors.screenColor,
  },
  containerStyle: {
    width: '90%',
    padding: 0,
    backgroundColor: AppColors.screenColor,
    marginBottom: 0,
    borderRadius: hp(10),
  },
  sendButton: {
    transform: [{rotate: '-45deg'}],
    marginRight: hp(1),
    bottom: 1,
  },
});
