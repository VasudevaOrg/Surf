import React, { useCallback, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import CloseCircleIcon from '../../../../assets/icons/CloseCircleIcon';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../utils/navigationref';
import { Header } from '../../../CustomComponents/Header/Header';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../MainComponents/Button';
import AnimatedTextInput from '../../../MainComponents/TextInput/TextInput';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import { styles } from './EditFieldScreen.styles';
import { mapApiError, mapFieldLabel } from '../../../../utils/ErrorUtils';
import {
  EditFieldParams,
  ErrorValues,
  FieldValues,
} from './EditFieldScreen.types';
import axios from 'axios';
import { API_ENDPOINTS, AUTH_HEADER } from '../../../../config/ApiConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Platform, ToastAndroid, Alert } from 'react-native';
import ScreenWrapper from '../../ScreenWrapper/ScreenWrapper';

type ValidationFunction = (value: string) => string | true;

interface UpdatedEditFieldScreenProps {
  route: {
    params: EditFieldParams;
  };
  navigation: any;
}

const submitFormAction = (actionType: string, values: any) => {
  switch (actionType) {
    case 'updateName':
    case 'updateBusinessName':
    case 'updateVATNumber':
    case 'updateStreetName':
    case 'updateCityName':
    case 'updatePostalCode':
    case 'updateCountry':
    case 'updateEmail':
    case 'updatePhone':
    case 'updateAccountName':
    case 'updateAccountNumber':
    case 'updateBicCode':
      break;
    default:
      console.warn(`Unhandled action type: ${actionType}`);
  }
  return true;
};

const EditFieldScreen: React.FC<UpdatedEditFieldScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    fieldType,
    initialValue = '',
    initialValues = {},
    headerTitle,
    label,
    description,
    keyboardType = 'default',
    validationType,
    onSubmitActionType,
    multipleFields = false,
    fields = [],
    showCountrySection = false,
    countryCode = '',
    countryFlag = '',
    captionText = '',
    iconComponent = null,
    iconImage = '',
    size = 16,
    originScreen = 'PersonalInfo',
    existingProfile = {},
  } = route.params;

  const userId = useSelector((state: RootState) => state.auth.userId);

  const [fieldValue, setFieldValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  const [fieldValues, setFieldValues] = useState<FieldValues>(initialValues);
  const [errors, setErrors] = useState<ErrorValues>({});
  const [loading, setLoading] = useState(false);

  const renderIconOrImage = () => {
    if (iconComponent) {
      return iconComponent;
    }
    if (iconImage) {
      const imageSource =
        typeof iconImage === 'string' && iconImage.startsWith('http')
          ? { uri: iconImage }
          : iconImage;
      return (
        <Image
          source={imageSource as any}
          style={{ width: size, height: size, resizeMode: 'contain' }}
        />
      );
    }
    return null;
  };

  const getValidationForType = useCallback(
    (type: string): ValidationFunction => {
      switch (type) {
        case 'firstName':
          return value => {
            if (!value.trim()) return 'First name cannot be empty';
            if (value.length < 2) return 'First name is too short';
            return true;
          };
        case 'lastName':
          return value => {
            if (!value.trim()) return 'Last name cannot be empty';
            return true;
          };
        case 'email':
          return value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) return 'Email cannot be empty';
            if (!emailRegex.test(value))
              return 'Please enter a valid email address';
            return true;
          };
        case 'phone':
          return value => {
            const phoneRegex = /^\d[\d\s]{7,14}$/;
            if (!value.trim()) return 'Phone number cannot be empty';
            if (!phoneRegex.test(value))
              return 'Please enter a valid phone number';
            return true;
          };
        case 'businessName':
          return value => {
            if (!value.trim()) return 'Business name cannot be empty';
            return true;
          };
        case 'vatNumber':
          return value => {
            if (!value.trim()) return 'VAT number cannot be empty';
            return true;
          };
        case 'streetName':
          return value => {
            if (!value.trim()) return 'Street address cannot be empty';
            return true;
          };
        case 'cityName':
          return value => {
            if (!value.trim()) return 'City cannot be empty';
            return true;
          };
        case 'postalCode':
          return value => {
            if (!value.trim()) return 'Postal code cannot be empty';
            return true;
          };
        case 'country':
          return value => {
            if (!value.trim()) return 'Country cannot be empty';
            return true;
          };
        default:
          return () => true;
      }
    },
    [],
  );

  const handleSingleFieldChange = (text: string): void => {
    setFieldValue(text);
    setError('');
  };

  const handleMultiFieldChange = (field: string, text: string): void => {
    setFieldValues(prev => ({ ...prev, [field]: text }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const navigateBack = (updatedData: any) => {
    navigation.goBack();

    // Determine where to navigate based on originScreen
    if (originScreen === 'CompanyProfile') {
      navigation.navigate('CompanyProfile', updatedData);
    } else if (originScreen === 'BankDetails') {
      // Add this condition
      navigation.navigate('BankDetails', updatedData);
    } else if (fieldType === 'email') {
      navigation.navigate('MainScreens', {
        screen: 'Account',
        params: {
          screen: 'PersonalInfo',
          params: updatedData,
        },
      });
    } else {
      navigation.navigate('PersonalInfo', updatedData);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (multipleFields) {
      let hasErrors = false;
      const newErrors: ErrorValues = {};

      fields.forEach(field => {
        const validationFn = getValidationForType(field.validationType);
        const validationResult = validationFn(fieldValues[field.key]);

        if (validationResult !== true) {
          newErrors[field.key] = validationResult;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        return;
      }

      // API Call for multiple fields
      try {
        setLoading(true);
        if (!userId) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('User ID not found', ToastAndroid.SHORT);
          } else {
            Alert.alert('Error', 'User ID not found');
          }
          return;
        }

        const updatePayload: any = {
          user_id: userId,
          user_data: {
            ...existingProfile,
            ...fieldValues,
          },
        };

        // Map field keys to API expected keys if necessary
        if (fieldValues.firstName)
          updatePayload.user_data.firstname = fieldValues.firstName;
        if (fieldValues.lastName)
          updatePayload.user_data.lastname = fieldValues.lastName;

        const response = await axios.put(
          API_ENDPOINTS.NT_USERS_ACCOUNT_API(userId),
          updatePayload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: AUTH_HEADER,
            },
          },
        );

        if (response.data && response.data.result) {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Profile updated successfully',
              ToastAndroid.SHORT,
            );
          } else {
            Alert.alert('Success', 'Profile updated successfully');
          }
          submitFormAction(onSubmitActionType, fieldValues);

          if (originScreen === 'CompanyProfile') {
            // For CompanyProfile, we may still need name combinations in some cases
            if (fieldValues.firstName && fieldValues.lastName) {
              const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
              navigateBack({ updatedName: fullName });
            } else {
              navigateBack(fieldValues);
            }
          } else {
            // Default PersonalInfo handling
            const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
            navigateBack({
              updatedName: fullName,
              updatedFirstName: fieldValues.firstName,
              updatedLastName: fieldValues.lastName,
            });
          }
        } else {
          throw new Error(response.data?.message || 'Update failed');
        }
      } catch (error: any) {
        console.error(
          'Error updating profile:',
          error?.message || 'Unknown error',
        );
        const errorMessage =
          error.response?.status === 504
            ? 'Server timeout (504). Please try again later.'
            : mapApiError(
              error.response?.data?.message ||
              error.message ||
              'Failed to update profile',
            );
        if (Platform.OS === 'android') {
          ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', errorMessage);
        }
      } finally {
        setLoading(false);
      }
    } else {
      const validationFn = getValidationForType(validationType || fieldType);
      const validationResult = validationFn(fieldValue);

      if (validationResult !== true) {
        setError(validationResult);
        return;
      }

      // API Call for single field
      try {
        setLoading(true);
        if (!userId) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('User ID not found', ToastAndroid.SHORT);
          } else {
            Alert.alert('Error', 'User ID not found');
          }
          return;
        }

        const updatePayload: any = {
          user_id: userId,
          user_data: {
            ...existingProfile,
          },
        };

        switch (fieldType) {
          case 'email':
            updatePayload.user_data.email = fieldValue;
            break;
          case 'phone':
            updatePayload.user_data.phone = fieldValue;
            break;
          case 's_address':
            updatePayload.user_data.s_address = fieldValue;
            break;
          case 's_address_2':
            updatePayload.user_data.s_address_2 = fieldValue;
            break;
          case 's_city':
            updatePayload.user_data.s_city = fieldValue;
            break;
          case 's_zipcode':
            updatePayload.user_data.s_zipcode = fieldValue;
            break;
          case 's_country':
            updatePayload.user_data.s_country = fieldValue;
            break;
          case 'b_address':
            updatePayload.user_data.b_address = fieldValue;
            break;
          case 'b_address_2':
            updatePayload.user_data.b_address_2 = fieldValue;
            break;
          case 'b_city':
            updatePayload.user_data.b_city = fieldValue;
            break;
          case 'b_zipcode':
            updatePayload.user_data.b_zipcode = fieldValue;
            break;
          case 'b_country':
            updatePayload.user_data.b_country = fieldValue;
            break;
          case 'b_state':
            updatePayload.user_data.b_state = fieldValue;
            break;
          case 's_state':
            updatePayload.user_data.s_state = fieldValue;
            break;
          default:
            break;
        }

        // If it's phone, we might skip API call here if it goes to OTP
        if (fieldType === 'phone') {
          submitFormAction(onSubmitActionType, fieldValue);
          navigate('Authentication', {
            screen: 'OTPScreen',
            params: {
              phoneNumber: `${countryCode} ${fieldValue}`,
              flow: 'update',
              returnData: { updatedPhone: fieldValue },
              returnScreen: originScreen,
              returnStack: 'Account',
            },
          });
          return;
        }

        const response = await axios.put(
          API_ENDPOINTS.NT_USERS_ACCOUNT_API(userId),
          updatePayload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: AUTH_HEADER,
            },
          },
        );

        if (response.data && response.data.result) {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Profile updated successfully',
              ToastAndroid.SHORT,
            );
          } else {
            Alert.alert('Success', 'Profile updated successfully');
          }
          submitFormAction(onSubmitActionType, fieldValue);

          let updatedData = {};
          switch (fieldType) {
            case 'businessName':
              updatedData = { updatedName: fieldValue };
              break;
            case 'vatNumber':
              updatedData = { updatedVat: fieldValue };
              break;
            case 's_address':
              updatedData = { updatedStreet: fieldValue };
              break;
            case 's_address_2':
              updatedData = { updatedStreet2: fieldValue };
              break;
            case 's_city':
              updatedData = { updatedCity: fieldValue };
              break;
            case 's_state':
              updatedData = { updatedState: fieldValue };
              break;
            case 's_zipcode':
              updatedData = { updatedPostal: fieldValue };
              break;
            case 's_country':
              updatedData = { updatedCountry: fieldValue };
              break;
            case 'b_address':
              updatedData = { updatedBStreet: fieldValue };
              break;
            case 'b_address_2':
              updatedData = { updatedBStreet2: fieldValue };
              break;
            case 'b_city':
              updatedData = { updatedBCity: fieldValue };
              break;
            case 'b_state':
              updatedData = { updatedBState: fieldValue };
              break;
            case 'b_zipcode':
              updatedData = { updatedBPostal: fieldValue };
              break;
            case 'b_country':
              updatedData = { updatedBCountry: fieldValue };
              break;
            default:
              updatedData = { updatedName: fieldValue };
          }
          navigateBack(updatedData);
        } else {
          throw new Error(response.data?.message || 'Update failed');
        }
      } catch (error: any) {
        console.error(
          'Error updating profile:',
          error?.message || 'Unknown error',
        );
        const errorMessage =
          error.response?.status === 504
            ? 'Server timeout (504). Please try again later.'
            : mapApiError(
              error.response?.data?.message ||
              error.message ||
              'Failed to update profile',
            );
        if (Platform.OS === 'android') {
          ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', errorMessage);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const isSubmitDisabled = (): boolean => {
    if (multipleFields) {
      return fields.some(
        field =>
          field.required &&
          (!fieldValues[field.key] || fieldValues[field.key].trim() === ''),
      );
    }
    return fieldValue.trim() === '';
  };

  return (
    // <SafeAreaView style={styles.container} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}
    >
      <Header
        name={headerTitle || `Update your ${mapFieldLabel(fieldType)}`}
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.AgreeTerms as string}
        leftIcons={[
          {
            icon: ArrowLeft as any,
            size: 16,
            onPress: goBack,
            color: ColorPalette.AgreeTerms as string,
          },
        ]}
        rightIcons={[]}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: getScreenHeight(2) },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainerTwo}>
            {description && (
              <View style={{ paddingHorizontal: getScreenWidth(4) }}>
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  text={description}
                />
              </View>
            )}
            <View style={{ flexDirection: 'column', gap: getScreenHeight(1) }}>
              {multipleFields ? (
                <View style={{ gap: getScreenHeight(2) }}>
                  {fields.map(field => (
                    <AnimatedTextInput
                      key={field.key}
                      label={field.label}
                      value={fieldValues[field.key] || ''}
                      onChangeText={text =>
                        handleMultiFieldChange(field.key, text)
                      }
                      keyboardType={(field.keyboardType as any) || 'default'}
                      customLabelColorFocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      customLabelColorUnfocused={
                        ColorPalette.TEXT_GREY_400 as string
                      }
                      customBorderColor={
                        errors[field.key]
                          ? (ColorPalette.RED as string)
                          : (ColorPalette.TEXT_GREY_400 as string)
                      }
                      customBorderWidth={1}
                      customContainerStyles={{
                        paddingHorizontal: getScreenWidth(4),
                      }}
                      customFocusedBorderWidth={2}
                      customErrorBorderWidth={2}
                      error={errors[field.key]}
                      rightIcons={[
                        {
                          icon: <CloseCircleIcon style={undefined} />,
                          onPress: () => handleMultiFieldChange(field.key, ''),
                        },
                      ]}
                    />
                  ))}
                </View>
              ) : (
                <AnimatedTextInput
                  label={label || mapFieldLabel(fieldType)}
                  value={fieldValue}
                  onChangeText={handleSingleFieldChange}
                  keyboardType={keyboardType as any}
                  customLabelColorFocused={ColorPalette.TEXT_GREY_400 as string}
                  customLabelColorUnfocused={
                    ColorPalette.TEXT_GREY_400 as string
                  }
                  customBorderColor={
                    error
                      ? (ColorPalette.RED_200 as string)
                      : (ColorPalette.TEXT_GREY_400 as string)
                  }
                  customContainerStyles={{
                    paddingHorizontal: getScreenWidth(4),
                  }}
                  customBorderWidth={1}
                  customFocusedBorderWidth={2}
                  customErrorBorderWidth={2}
                  error={error}
                  showCountrySection={showCountrySection}
                  countryCode={countryCode}
                  countryFlag={countryFlag}
                  onCountryPress={() => { }}
                  rightIcons={[
                    {
                      icon: <CloseCircleIcon style={undefined} />,
                      onPress: () => handleSingleFieldChange(''),
                    },
                  ]}
                />
              )}
              {captionText && (
                <View
                  style={{
                    paddingHorizontal: getScreenWidth(4),
                    flexDirection: 'row',
                    gap: getScreenHeight(0.75),
                    alignItems: 'center',
                  }}>
                  {renderIconOrImage()}
                  <Typography
                    variant={TypographyVariant.PSMALL_REGULAR}
                    text={captionText}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text="SUBMIT"
            variant={ButtonVariant.PRIMARY}
            state={
              isSubmitDisabled() ? ButtonState.DISABLED : ButtonState.DEFAULT
            }
            size={ButtonSize.MEDIUM}
            onPress={handleSubmit}
            bgColor={ColorPalette.ROSE_PURPLE_300 as string}
            loading={loading}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default EditFieldScreen;
