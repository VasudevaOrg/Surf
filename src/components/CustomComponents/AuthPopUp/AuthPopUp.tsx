import React, { useCallback } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

import { styles } from "./AuthPopUp.styles";
import { AuthPopupProps } from "./AuthPopUp.types";

import { navigate } from "../../../utils/navigationref";
import { TypographyVariant } from "../../MainComponents/Typography/Typography.types";
import { Typography } from "../../MainComponents/Typography/Typography";
import { Button, ButtonSize, ButtonState, ButtonType, ButtonVariant } from "../../MainComponents/Button";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ColorPalette from "../../../config/ColorPalette";
import CloseIcon from "../../../assets/icons/CloseIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";

export const AuthPopup: React.FC<AuthPopupProps> = ({
    visible,
    onClose,
}) => {
    const tabBarHeight = useBottomTabBarHeight();

    const handleLogin = () => {
        onClose();
        navigate('Authentication', {
            screen: 'WhatsAppAndEmailLogInScreen',
        });
    };

    const handleRegistration = () => {
        onClose();
        navigate('Authentication', {
            screen: 'CreateNewAccountScreen',
        });
    };


    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable
                style={styles.overlay}
                onPress={onClose}
            >
                <Pressable onPress={() => { }}>

                    <View style={[styles.popup,
                    { marginBottom: tabBarHeight + 10, }
                    ]}>
                        <View style={styles.headerRow}>
                            <View

                                style={styles.imageContainer}
                            >
                                <UserIcon width={26} height={26} style={undefined} />
                            </View>
                            <View style={{ gap: getScreenHeight(0.5) }}>
                                <Typography
                                    text="Login/Register to continue faster"
                                    // variant={TypographyVariant.PXSMALL_SEMIBOLD}
                                    customTextStyles={styles.title}
                                />
                                <Typography
                                    text="Save favourites, track orders, and checkout in 1 tap."
                                    variant={TypographyVariant.PXSMALL_REGULAR}
                                    customTextStyles={styles.subtitle}
                                />
                            </View>

                            <TouchableOpacity onPress={onClose}>
                                <CloseIcon
                                    size={20}
                                    style={styles.closeIcon}
                                    color={ColorPalette.TEXT_GREY_100}
                                />
                            </TouchableOpacity>
                        </View>



                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <Button
                                text="Login"
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.SMALL}
                                state={ButtonState.DEFAULT}
                                type={ButtonType.PRIMARY}
                                onPress={handleLogin}
                                customStyles={styles.loginButton}
                                customTextStyles={{ fontSize: 12 }}
                            />

                            <Button
                                text="Create account"
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.LARGE}
                                state={ButtonState.DEFAULT}
                                type={ButtonType.OUTLINED}
                                onPress={handleRegistration}
                                customStyles={styles.createNewAccountButton}
                                customTextStyles={{ fontSize: 12 }}
                            />
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </Modal >
    );
};
