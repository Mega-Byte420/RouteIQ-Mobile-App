import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import AppInput from './AppInput';
import GlobalIcon from './GlobalIcon';

const VendorChat = () => {
  const [messages, setMessages] = useState<any>([
    {
      _id: -1,
      text: '?',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 0,
      text: 'I am almost finished. Please give me your email, I will ZIP them and send you as son as im finish.',
      createdAt: new Date(),
      position: 'right',
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
      text: 'Next month?',
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
      _id: 3,
      text: 'I am in a process of designing some. When do you need them?',
      createdAt: new Date(),
      position: 'right',
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
      text: 'I commented on chat, I want to add some fancy icons. Do you have any icon set?',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 6,
      text: '2 FEB 6:00',
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
      _id: 7,
      text: 'I am good.',
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
      text: 'Hi Ron. How are you?',
      createdAt: new Date(),
      position: 'right',
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 9,
      text: 'Hey Reed!',
      createdAt: new Date(),
      position: 'left',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      type: 'messages',
    },
    {
      _id: 10,
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
            maxWidth: '80%',
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
            
            maxWidth: '80%',
            backgroundColor:
              currentMessage.type == 'date'
                ? AppColors.transparent
                : currentMessage.position === 'left'
                ? '#EDEDED'
                : AppColors.darkRed,
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
                color={AppColors.red}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <GiftedChat
        renderMessage={renderMessage}
        renderInputToolbar={renderInputToolbar}
        messagesContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: AppColors.profileBg,
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
    </ScrollView>
  );
};

export default React.memo(VendorChat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.screenColor
  },
  giftedContainer: {
    backgroundColor: AppColors.screenColor,
    height: 50,
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
