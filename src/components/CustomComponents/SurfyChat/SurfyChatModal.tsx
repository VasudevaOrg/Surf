import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParamList} from '../../../../types/navigation';
import {RootState, AppDispatch} from '../../../store';
import {
  toggleSurfy,
  sendMessageToAi,
  clearChat,
} from '../../../store/slices/surfySlice';
import CloseIcon from '../../../assets/icons/CloseIcon';
import ColorPalette from '../../../config/ColorPalette';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';

const {width} = Dimensions.get('window');

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};

const ChatProductCard: React.FC<{product: any}> = ({product}) => {
  const navigation =
    useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const handlePress = () => {
    navigation.navigate('ProductDetail', {productId: product.product_id});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: toHttps(
              product.main_pair?.detailed?.image_path ||
                'https://via.placeholder.com/150',
            ),
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {product.discount_prc && (
          <View style={styles.discountBadge}>
            <Typography
              text={`${Math.round(product.discount_prc)}% OFF`}
              variant={TypographyVariant.LXXSMALL_BOLD}
              customTextStyles={styles.discountText}
            />
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Typography
          text={product.product}
          variant={TypographyVariant.PXSMALL_BOLD}
          numberOfLines={2}
          customTextStyles={styles.productTitle}
        />
        <View style={styles.priceRow}>
          <Typography
            text={product.format_price}
            variant={TypographyVariant.PSMALL_BOLD}
            customTextStyles={styles.productPrice}
          />
          {product.format_list_price && (
            <Typography
              text={`${product.format_list_price}`}
              variant={TypographyVariant.LXXSMALL_REGULAR}
              customTextStyles={styles.listPrice}
            />
          )}
        </View>
        <TouchableOpacity style={styles.viewMoreButton} onPress={handlePress}>
          <Typography
            text="View Details"
            variant={TypographyVariant.LXXSMALL_BOLD}
            customTextStyles={styles.viewMoreText}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const SurfyChatModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const {isVisible, messages, isLoading} = useSelector(
    (state: RootState) => state.surfy,
  );
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => scrollRef.current?.scrollToEnd({animated: true}), 100);
    }
  }, [messages, isLoading, isVisible]);

  const handleClose = () => {
    dispatch(toggleSurfy(false));
  };

  const handleClear = () => {
    dispatch(clearChat());
  };

  const handleSend = () => {
    if (inputText.trim() === '' || isLoading) return;
    const text = inputText;
    setInputText('');
    dispatch(sendMessageToAi(text));
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.rootKeyboardView}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.backdrop}
            onPress={handleClose}
          />
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View>
                <Typography
                  text="Lucy!"
                  variant={TypographyVariant.H4_BOLD}
                  customTextStyles={styles.title}
                />
                <Typography
                  text="AI Shopping Assistant"
                  variant={TypographyVariant.PXSMALL_REGULAR}
                  customTextStyles={styles.subtitle}
                />
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}>
                  <Typography
                    text="Clear"
                    variant={TypographyVariant.PXSMALL_BOLD}
                    customTextStyles={styles.clearText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              ref={scrollRef}
              style={styles.chatContainer}
              contentContainerStyle={styles.chatContent}
              showsVerticalScrollIndicator={false}>
              {messages.map(msg => (
                <View key={msg.id} style={styles.messageRow}>
                  <View
                    style={[
                      styles.messageBubble,
                      msg.sender === 'user'
                        ? styles.userBubble
                        : styles.aiBubble,
                    ]}>
                    <Typography
                      text={msg.text}
                      variant={TypographyVariant.PMEDIUM_MEDIUM}
                      customTextStyles={[
                        styles.messageText,
                        msg.sender === 'user' ? styles.userText : styles.aiText,
                      ]}
                    />
                  </View>
                  {msg.products && msg.products.length > 0 && (
                    <View style={styles.productCarouselContainer}>
                      <FlatList
                        horizontal
                        data={msg.products}
                        keyExtractor={item => item.product_id.toString()}
                        renderItem={({item}) => (
                          <ChatProductCard product={item} />
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productList}
                      />
                    </View>
                  )}
                </View>
              ))}
              {isLoading && (
                <View style={[styles.messageBubble, styles.aiBubble]}>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator
                      size="small"
                      color={ColorPalette.PURPLE_200 as string}
                    />
                    <Typography
                      text="Lucy is thinking..."
                      variant={TypographyVariant.PMEDIUM_MEDIUM}
                      customTextStyles={[styles.messageText, styles.aiText]}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            <View
              style={[
                styles.inputContainer,
                {paddingBottom: Math.max(insets.bottom, 15)},
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Ask Lucy anything..."
                placeholderTextColor={ColorPalette.TEXT_GREY_100 as string}
                value={inputText}
                onChangeText={setInputText}
                multiline
                editable={!isLoading}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={!inputText.trim() || isLoading}>
                <Typography
                  text="Send"
                  variant={TypographyVariant.PMEDIUM_BOLD}
                  customTextStyles={styles.sendText}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rootKeyboardView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    height: 80, // Space from top
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: ColorPalette.PURPLE_200 as string,
  },
  subtitle: {
    color: ColorPalette.TEXT_GREY_200 as string,
  },
  closeButton: {
    padding: 5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  clearText: {
    color: ColorPalette.TEXT_GREY_500 as string,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  chatContent: {
    paddingVertical: 20,
    gap: 15,
  },
  messageRow: {
    width: '100%',
    gap: 10,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 15,
    borderRadius: 20,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: ColorPalette.PURPLE_200 as string,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: ColorPalette.TEXT_GREY_500 as string,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productCarouselContainer: {
    marginTop: 5,
    marginLeft: -20,
    marginRight: -20,
  },
  productList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  productCard: {
    width: width * 0.45,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 5,
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F9F9F9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4D4F',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
  },
  productInfo: {
    padding: 10,
    gap: 4,
  },
  productTitle: {
    fontSize: 13,
    color: '#1A1A1A',
    height: 36,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productPrice: {
    color: ColorPalette.PURPLE_200 as string,
    fontSize: 14,
  },
  listPrice: {
    color: '#999',
    textDecorationLine: 'line-through',
    fontSize: 11,
  },
  viewMoreButton: {
    marginTop: 6,
    backgroundColor: '#F0EFFF',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    color: ColorPalette.PURPLE_200 as string,
    fontSize: 10,
  },
  inputContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    color: '#000000',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: ColorPalette.PURPLE_200 as string,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: ColorPalette.TEXT_GREY_100 as string,
  },
  sendText: {
    color: '#FFFFFF',
  },
});

export default SurfyChatModal;
