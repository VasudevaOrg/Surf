import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Modal as RNModal,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import { SearchBox } from '../SearchBox/SearchBox';
import { Button, ButtonSize, ButtonState, ButtonVariant } from '../../MainComponents/Button';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';
import { styles } from './SelectCountryModal.styles';
import { Option, SelectCountryModalProps } from './SelectCountryModal.types';

export const COUNTRY_PHONE_CODES: Option[] = [
    { value: "+93", label: "🇦🇫 Afghanistan", isSelected: false },
    { value: "+355", label: "🇦🇱 Albania", isSelected: false },
    { value: "+213", label: "🇩🇿 Algeria", isSelected: false },
    { value: "+1", label: "🇺🇸 United States", isSelected: false, },
    { value: "+1-684", label: "🇦🇸 American Samoa", isSelected: false },
    { value: "+376", label: "🇦🇩 Andorra", isSelected: false },
    { value: "+244", label: "🇦🇴 Angola", isSelected: false },
    { value: "+1-264", label: "🇦🇮 Anguilla", isSelected: false },
    { value: "+1-268", label: "🇦🇬 Antigua & Barbuda", isSelected: false },
    { value: "+54", label: "🇦🇷 Argentina", isSelected: false },
    { value: "+374", label: "🇦🇲 Armenia", isSelected: false },
    { value: "+297", label: "🇦🇼 Aruba", isSelected: false },
    { value: "+61", label: "🇦🇺 Australia", isSelected: false },
    { value: "+43", label: "🇦🇹 Austria", isSelected: false },
    { value: "+994", label: "🇦🇿 Azerbaijan", isSelected: false },

    { value: "+1-242", label: "🇧🇸 Bahamas", isSelected: false },
    { value: "+973", label: "🇧🇭 Bahrain", isSelected: false },
    { value: "+880", label: "🇧🇩 Bangladesh", isSelected: false },
    { value: "+1-246", label: "🇧🇧 Barbados", isSelected: false },
    { value: "+375", label: "🇧🇾 Belarus", isSelected: false },
    { value: "+32", label: "🇧🇪 Belgium", isSelected: false },
    { value: "+501", label: "🇧🇿 Belize", isSelected: false },
    { value: "+229", label: "🇧🇯 Benin", isSelected: false },
    { value: "+1-441", label: "🇧🇲 Bermuda", isSelected: false },
    { value: "+975", label: "🇧🇹 Bhutan", isSelected: false },
    { value: "+591", label: "🇧🇴 Bolivia", isSelected: false },
    { value: "+387", label: "🇧🇦 Bosnia & Herzegovina", isSelected: false },
    { value: "+267", label: "🇧🇼 Botswana", isSelected: false },
    { value: "+55", label: "🇧🇷 Brazil", isSelected: false },
    { value: "+246", label: "🇮🇴 British Indian Ocean Territory", isSelected: false },
    { value: "+1-284", label: "🇻🇬 British Virgin Islands", isSelected: false },
    { value: "+673", label: "🇧🇳 Brunei", isSelected: false },
    { value: "+359", label: "🇧🇬 Bulgaria", isSelected: false },
    { value: "+226", label: "🇧🇫 Burkina Faso", isSelected: false },
    { value: "+257", label: "🇧🇮 Burundi", isSelected: false },

    { value: "+855", label: "🇰🇭 Cambodia", isSelected: false },
    { value: "+237", label: "🇨🇲 Cameroon", isSelected: false },
    { value: "+1", label: "🇨🇦 Canada", isSelected: false },
    { value: "+238", label: "🇨🇻 Cape Verde", isSelected: false },
    { value: "+1-345", label: "🇰🇾 Cayman Islands", isSelected: false },
    { value: "+236", label: "🇨🇫 Central African Republic", isSelected: false },
    { value: "+235", label: "🇹🇩 Chad", isSelected: false },
    { value: "+56", label: "🇨🇱 Chile", isSelected: false },
    { value: "+86", label: "🇨🇳 China", isSelected: false },
    { value: "+61", label: "🇨🇽 Christmas Island", isSelected: false },
    { value: "+61", label: "🇨🇨 Cocos Islands", isSelected: false },
    { value: "+57", label: "🇨🇴 Colombia", isSelected: false },
    { value: "+269", label: "🇰🇲 Comoros", isSelected: false },
    { value: "+682", label: "🇨🇰 Cook Islands", isSelected: false },
    { value: "+506", label: "🇨🇷 Costa Rica", isSelected: false },
    { value: "+385", label: "🇭🇷 Croatia", isSelected: false },
    { value: "+53", label: "🇨🇺 Cuba", isSelected: false },
    { value: "+599", label: "🇨🇼 Curaçao", isSelected: false },
    { value: "+357", label: "🇨🇾 Cyprus", isSelected: false },
    { value: "+420", label: "🇨🇿 Czech Republic", isSelected: false },

    { value: "+243", label: "🇨🇩 Democratic Republic of the Congo", isSelected: false },
    { value: "+45", label: "🇩🇰 Denmark", isSelected: false },
    { value: "+253", label: "🇩🇯 Djibouti", isSelected: false },
    { value: "+1-767", label: "🇩🇲 Dominica", isSelected: false },
    { value: "+1-809", label: "🇩🇴 Dominican Republic", isSelected: false },

    { value: "+593", label: "🇪🇨 Ecuador", isSelected: false },
    { value: "+20", label: "🇪🇬 Egypt", isSelected: false },
    { value: "+503", label: "🇸🇻 El Salvador", isSelected: false },
    { value: "+240", label: "🇬🇶 Equatorial Guinea", isSelected: false },
    { value: "+291", label: "🇪🇷 Eritrea", isSelected: false },
    { value: "+372", label: "🇪🇪 Estonia", isSelected: false },
    { value: "+251", label: "🇪🇹 Ethiopia", isSelected: false },

    { value: "+500", label: "🇫🇰 Falkland Islands", isSelected: false },
    { value: "+298", label: "🇫🇴 Faroe Islands", isSelected: false },
    { value: "+679", label: "🇫🇯 Fiji", isSelected: false },
    { value: "+358", label: "🇫🇮 Finland", isSelected: false },
    { value: "+33", label: "🇫🇷 France", isSelected: false },
    { value: "+596", label: "🇲🇶 French Martinique", isSelected: false },
    { value: "+594", label: "🇬🇫 French Guiana", isSelected: false },
    { value: "+689", label: "🇵🇫 French Polynesia", isSelected: false },

    { value: "+241", label: "🇬🇦 Gabon", isSelected: false },
    { value: "+220", label: "🇬🇲 Gambia", isSelected: false },
    { value: "+995", label: "🇬🇪 Georgia", isSelected: false },
    { value: "+49", label: "🇩🇪 Germany", isSelected: false },
    { value: "+233", label: "🇬🇭 Ghana", isSelected: false },
    { value: "+350", label: "🇬🇮 Gibraltar", isSelected: false },
    { value: "+30", label: "🇬🇷 Greece", isSelected: false },
    { value: "+299", label: "🇬🇱 Greenland", isSelected: false },
    { value: "+1473", label: "🇬🇩 Grenada", isSelected: false },
    { value: "+590", label: "🇬🇵 Guadeloupe", isSelected: false },
    { value: "+1671", label: "🇬🇺 Guam", isSelected: false },
    { value: "+502", label: "🇬🇹 Guatemala", isSelected: false },
    { value: "+44", label: "🇬🇬 Guernsey", isSelected: false },
    { value: "+224", label: "🇬🇳 Guinea", isSelected: false },
    { value: "+245", label: "🇬🇼 Guinea-Bissau", isSelected: false },
    { value: "+592", label: "🇬🇾 Guyana", isSelected: false },

    { value: "+509", label: "🇭🇹 Haiti", isSelected: false },
    { value: "+504", label: "🇭🇳 Honduras", isSelected: false },
    { value: "+852", label: "🇭🇰 Hong Kong", isSelected: false },
    { value: "+36", label: "🇭🇺 Hungary", isSelected: false },

    { value: "+354", label: "🇮🇸 Iceland", isSelected: false },
    { value: "+91", label: "🇮🇳 India", isSelected: false },
    { value: "+62", label: "🇮🇩 Indonesia", isSelected: false },
    { value: "+98", label: "🇮🇷 Iran", isSelected: false },
    { value: "+964", label: "🇮🇶 Iraq", isSelected: false },
    { value: "+353", label: "🇮🇪 Ireland", isSelected: false },
    { value: "+44", label: "🇮🇲 Isle of Man", isSelected: false },
    { value: "+972", label: "🇮🇱 Israel", isSelected: false },
    { value: "+39", label: "🇮🇹 Italy", isSelected: false },

    { value: "+1876", label: "🇯🇲 Jamaica", isSelected: false },
    { value: "+81", label: "🇯🇵 Japan", isSelected: false },
    { value: "+44", label: "🇯🇪 Jersey", isSelected: false },
    { value: "+962", label: "🇯🇴 Jordan", isSelected: false },

    { value: "+7", label: "🇰🇿 Kazakhstan", isSelected: false },
    { value: "+254", label: "🇰🇪 Kenya", isSelected: false },
    { value: "+686", label: "🇰🇮 Kiribati", isSelected: false },
    { value: "+383", label: "🇽🇰 Kosovo", isSelected: false },
    { value: "+965", label: "🇰🇼 Kuwait", isSelected: false },
    { value: "+996", label: "🇰🇬 Kyrgyzstan", isSelected: false },

    { value: "+856", label: "🇱🇦 Laos", isSelected: false },
    { value: "+371", label: "🇱🇻 Latvia", isSelected: false },
    { value: "+961", label: "🇱🇧 Lebanon", isSelected: false },
    { value: "+266", label: "🇱🇸 Lesotho", isSelected: false },
    { value: "+231", label: "🇱🇷 Liberia", isSelected: false },
    { value: "+218", label: "🇱🇾 Libya", isSelected: false },
    { value: "+423", label: "🇱🇮 Liechtenstein", isSelected: false },
    { value: "+370", label: "🇱🇹 Lithuania", isSelected: false },
    { value: "+352", label: "🇱🇺 Luxembourg", isSelected: false },
    { value: "+853", label: "🇲🇴 Macau", isSelected: false },
    { value: "+261", label: "🇲🇬 Madagascar", isSelected: false },
    { value: "+265", label: "🇲🇼 Malawi", isSelected: false },
    { value: "+60", label: "🇲🇾 Malaysia", isSelected: false },
    { value: "+960", label: "🇲🇻 Maldives", isSelected: false },
    { value: "+223", label: "🇲🇱 Mali", isSelected: false },
    { value: "+356", label: "🇲🇹 Malta", isSelected: false },
    { value: "+692", label: "🇲🇭 Marshall Islands", isSelected: false },
    { value: "+596", label: "🇲🇶 Martinique", isSelected: false },
    { value: "+222", label: "🇲🇷 Mauritania", isSelected: false },
    { value: "+230", label: "🇲🇺 Mauritius", isSelected: false },
    { value: "+262", label: "🇾🇹 Mayotte", isSelected: false },
    { value: "+52", label: "🇲🇽 Mexico", isSelected: false },
    { value: "+691", label: "🇫🇲 Micronesia", isSelected: false },
    { value: "+373", label: "🇲🇩 Moldova", isSelected: false },
    { value: "+377", label: "🇲🇨 Monaco", isSelected: false },
    { value: "+976", label: "🇲🇳 Mongolia", isSelected: false },
    { value: "+382", label: "🇲🇪 Montenegro", isSelected: false },
    { value: "+1664", label: "🇲🇸 Montserrat", isSelected: false },
    { value: "+212", label: "🇲🇦 Morocco", isSelected: false },
    { value: "+258", label: "🇲🇿 Mozambique", isSelected: false },
    { value: "+95", label: "🇲🇲 Myanmar", isSelected: false },

    { value: "+264", label: "🇳🇦 Namibia", isSelected: false },
    { value: "+674", label: "🇳🇷 Nauru", isSelected: false },
    { value: "+977", label: "🇳🇵 Nepal", isSelected: false },
    { value: "+31", label: "🇳🇱 Netherlands", isSelected: false },
    { value: "+687", label: "🇳🇨 New Caledonia", isSelected: false },
    { value: "+64", label: "🇳🇿 New Zealand", isSelected: false },
    { value: "+505", label: "🇳🇮 Nicaragua", isSelected: false },
    { value: "+227", label: "🇳🇪 Niger", isSelected: false },
    { value: "+234", label: "🇳🇬 Nigeria", isSelected: false },
    { value: "+683", label: "🇳🇺 Niue", isSelected: false },
    { value: "+850", label: "🇰🇵 North Korea", isSelected: false },
    { value: "+389", label: "🇲🇰 North Macedonia", isSelected: false },
    { value: "+47", label: "🇳🇴 Norway", isSelected: false },

    { value: "+968", label: "🇴🇲 Oman", isSelected: false },

    { value: "+92", label: "🇵🇰 Pakistan", isSelected: false },
    { value: "+680", label: "🇵🇼 Palau", isSelected: false },
    { value: "+970", label: "🇵🇸 Palestine", isSelected: false },
    { value: "+507", label: "🇵🇦 Panama", isSelected: false },
    { value: "+675", label: "🇵🇬 Papua New Guinea", isSelected: false },
    { value: "+595", label: "🇵🇾 Paraguay", isSelected: false },
    { value: "+51", label: "🇵🇪 Peru", isSelected: false },
    { value: "+63", label: "🇵🇭 Philippines", isSelected: false },
    { value: "+48", label: "🇵🇱 Poland", isSelected: false },
    { value: "+351", label: "🇵🇹 Portugal", isSelected: false },
    { value: "+1939", label: "🇵🇷 Puerto Rico", isSelected: false },

    { value: "+974", label: "🇶🇦 Qatar", isSelected: false },

    { value: "+262", label: "🇷🇪 Réunion", isSelected: false },
    { value: "+40", label: "🇷🇴 Romania", isSelected: false },
    { value: "+7", label: "🇷🇺 Russia", isSelected: false },
    { value: "+250", label: "🇷🇼 Rwanda", isSelected: false },

    { value: "+590", label: "🇧🇱 Saint Barthélemy", isSelected: false },
    { value: "+290", label: "🇸🇭 Saint Helena", isSelected: false },
    { value: "+1869", label: "🇰🇳 Saint Kitts & Nevis", isSelected: false },
    { value: "+1758", label: "🇱🇨 Saint Lucia", isSelected: false },
    { value: "+590", label: "🇲🇫 Saint Martin", isSelected: false },
    { value: "+508", label: "🇵🇲 Saint Pierre & Miquelon", isSelected: false },
    { value: "+1784", label: "🇻🇨 Saint Vincent & Grenadines", isSelected: false },
    { value: "+685", label: "🇼🇸 Samoa", isSelected: false },
    { value: "+378", label: "🇸🇲 San Marino", isSelected: false },
    { value: "+239", label: "🇸🇹 São Tomé & Príncipe", isSelected: false },
    { value: "+966", label: "🇸🇦 Saudi Arabia", isSelected: false },
    { value: "+221", label: "🇸🇳 Senegal", isSelected: false },
    { value: "+381", label: "🇷🇸 Serbia", isSelected: false },
    { value: "+248", label: "🇸🇨 Seychelles", isSelected: false },
    { value: "+232", label: "🇸🇱 Sierra Leone", isSelected: false },
    { value: "+65", label: "🇸🇬 Singapore", isSelected: false },
    { value: "+1721", label: "🇸🇽 Sint Maarten", isSelected: false },
    { value: "+421", label: "🇸🇰 Slovakia", isSelected: false },
    { value: "+386", label: "🇸🇮 Slovenia", isSelected: false },
    { value: "+677", label: "🇸🇧 Solomon Islands", isSelected: false },
    { value: "+252", label: "🇸🇴 Somalia", isSelected: false },
    { value: "+27", label: "🇿🇦 South Africa", isSelected: false },
    { value: "+82", label: "🇰🇷 South Korea", isSelected: false },
    { value: "+211", label: "🇸🇸 South Sudan", isSelected: false },
    { value: "+34", label: "🇪🇸 Spain", isSelected: false },
    { value: "+94", label: "🇱🇰 Sri Lanka", isSelected: false },
    { value: "+249", label: "🇸🇩 Sudan", isSelected: false },
    { value: "+597", label: "🇸🇷 Suriname", isSelected: false },
    { value: "+47", label: "🇸🇯 Svalbard & Jan Mayen", isSelected: false },
    { value: "+268", label: "🇸🇿 Eswatini (Swaziland)", isSelected: false },
    { value: "+46", label: "🇸🇪 Sweden", isSelected: false },
    { value: "+41", label: "🇨🇭 Switzerland", isSelected: false },
    { value: "+963", label: "🇸🇾 Syria", isSelected: false },

    { value: "+886", label: "🇹🇼 Taiwan", isSelected: false },
    { value: "+992", label: "🇹🇯 Tajikistan", isSelected: false },
    { value: "+255", label: "🇹🇿 Tanzania", isSelected: false },
    { value: "+66", label: "🇹🇭 Thailand", isSelected: false },
    { value: "+228", label: "🇹🇬 Togo", isSelected: false },
    { value: "+690", label: "🇹🇰 Tokelau", isSelected: false },
    { value: "+676", label: "🇹🇴 Tonga", isSelected: false },
    { value: "+1868", label: "🇹🇹 Trinidad & Tobago", isSelected: false },
    { value: "+216", label: "🇹🇳 Tunisia", isSelected: false },
    { value: "+90", label: "🇹🇷 Türkiye", isSelected: false },
    { value: "+993", label: "🇹🇲 Turkmenistan", isSelected: false },
    { value: "+1649", label: "🇹🇨 Turks & Caicos Islands", isSelected: false },
    { value: "+688", label: "🇹🇻 Tuvalu", isSelected: false },

    { value: "+256", label: "🇺🇬 Uganda", isSelected: false },
    { value: "+380", label: "🇺🇦 Ukraine", isSelected: false },
    { value: "+971", label: "🇦🇪 United Arab Emirates", isSelected: false },
    { value: "+44", label: "🇬🇧 United Kingdom", isSelected: false },
    { value: "+1", label: "🇺🇸 United States", isSelected: false },
    { value: "+598", label: "🇺🇾 Uruguay", isSelected: false },
    { value: "+998", label: "🇺🇿 Uzbekistan", isSelected: false },

    { value: "+678", label: "🇻🇺 Vanuatu", isSelected: false },
    { value: "+39", label: "🇻🇦 Vatican City", isSelected: false },
    { value: "+58", label: "🇻🇪 Venezuela", isSelected: false },
    { value: "+84", label: "🇻🇳 Vietnam", isSelected: false },
    { value: "+1284", label: "🇻🇬 Virgin Islands (British)", isSelected: false },
    { value: "+1340", label: "🇻🇮 Virgin Islands (US)", isSelected: false },

    { value: "+681", label: "🇼🇫 Wallis & Futuna", isSelected: false },
    { value: "+212", label: "🇪🇭 Western Sahara", isSelected: false },

    { value: "+967", label: "🇾🇪 Yemen", isSelected: false },

    { value: "+260", label: "🇿🇲 Zambia", isSelected: false },
    { value: "+263", label: "🇿🇼 Zimbabwe", isSelected: false }
];

export const SelectCountryModal: React.FC<SelectCountryModalProps> = ({
    isVisible,
    onClose,
    onSubmit,
    options = COUNTRY_PHONE_CODES,
    title = 'Select Country Code',
    showSearch = false,
    searchPlaceholder = 'Search your country',
}) => {
    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    // Filter options based on search text
    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(searchText.toLowerCase()),
            );
            setFilteredOptions(filtered);
        }
    }, [searchText, options]);

    const handleOptionPress = useCallback((value: string) => {
        setSelectedValue(value);
    }, []);

    const handleSubmit = () => {
        const opt = filteredOptions.find(o => o.value === selectedValue);
        if (!opt) return;

        const [flag] = opt.label.split(" ");
        const code = opt.value;

        onSubmit(code, flag);
        onClose();
    };

    const handleBackdropPress = useCallback(() => {
        onClose();
    }, [onClose]);

    const OptionItem = React.memo(({ item, onPress, selectedValue }) => {
        const isSelected = item.value === selectedValue;
        return (
            <TouchableOpacity
                style={[
                    styles.optionContainer,
                    isSelected && { backgroundColor: ColorPalette.WelcomeBack }
                ]}
                onPress={() => onPress(item.value)}
            >
                <Typography
                    text={item.label}
                    customTextStyles={[
                        styles.optionLabel,
                        isSelected ? styles.optionLabelSelected : styles.optionLabelUnselected,
                        {
                            paddingLeft: getScreenWidth(5)
                        }
                    ]}
                />

                <Typography
                    text={item.value}
                    customTextStyles={[
                        isSelected ? styles.optionLabelSelected : styles.optionLabelUnselected,
                        {
                            paddingRight: getScreenWidth(5)

                        }
                    ]}
                />
            </TouchableOpacity>
        );
    });

    return (
        <RNModal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: ColorPalette.OPACITY_24,
                    justifyContent: 'flex-end',
                }}
                activeOpacity={1}
                onPress={handleBackdropPress}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={e => e.stopPropagation()}>
                        <View style={styles.contentContainer}>
                            <View style={styles.header}>
                                <View style={styles.headerContent}>
                                    <Typography
                                        variant={TypographyVariant.H5_SEMIBOLD}
                                        text={title}
                                        customTextStyles={styles.heading}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    accessibilityLabel="Close modal">
                                    <CloseIcon style={undefined} />
                                </TouchableOpacity>
                            </View>

                            {showSearch && (
                                <View style={styles.searchContainer}>
                                    <SearchBox
                                        value={searchText}
                                        onChangeText={setSearchText}
                                        placeholder={searchPlaceholder}
                                    />
                                </View>
                            )}

                            {filteredOptions.length === 0 && (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                                    <Typography
                                        variant={TypographyVariant.PMEDIUM_BOLD}
                                        text="No results found"
                                        customTextStyles={{ color: ColorPalette.BLACK, marginTop: getScreenHeight(14) }}
                                    />
                                </View>
                            )}

                            <FlatList
                                data={filteredOptions}
                                keyExtractor={(_, idx) => idx.toString()}
                                renderItem={({ item }) => (
                                    <OptionItem
                                        item={item}
                                        onPress={handleOptionPress}
                                        selectedValue={selectedValue}
                                    />
                                )}
                            />



                            <View style={styles.footer}>
                                <Button
                                    text="Select"
                                    onPress={handleSubmit}
                                    variant={ButtonVariant.PRIMARY}
                                    state={ButtonState.DEFAULT}
                                    size={ButtonSize.MEDIUM}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};
