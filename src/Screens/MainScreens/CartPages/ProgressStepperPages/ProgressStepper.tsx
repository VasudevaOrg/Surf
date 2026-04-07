import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

interface Step {
  id: number;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepPress?: (stepId: number) => void;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  onStepPress,
}) => {
  const handleStepPress = (stepId: number) => {
    if (onStepPress) {
      onStepPress(stepId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.connectorContainer}>
        {steps.map((step, index) => {
          if (index < steps.length - 1) {
            const isActive = step.id < currentStep;
            return (
              <View
                key={`connector-${index}`}
                style={[
                  styles.connector,
                  isActive ? styles.activeConnector : styles.inactiveConnector,
                ]}
              />
            );
          }
          return null;
        })}
      </View>

      {steps.map(step => {
        const isPassed = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isActive = isPassed || isCurrent;

        return (
          <TouchableOpacity
            key={step.id}
            style={styles.stepContainer}
            onPress={() => handleStepPress(step.id)}
            activeOpacity={0.7}>
            <View style={styles.circleWrapper}>
              {isCurrent && <View style={styles.haloEffect} />}
              <View
                style={[
                  styles.circle,
                  isPassed
                    ? styles.passedCircle
                    : isActive
                    ? styles.activeCircle
                    : styles.inactiveCircle,
                ]}>
                <Typography
                  variant={TypographyVariant.LSMALL_REGULAR}
                  text={String(step.id).padStart(2, '0')}
                  customTextStyles={[
                    styles.stepNumber,
                    isPassed
                      ? styles.passedStepNumber
                      : isActive
                      ? styles.activeStepNumber
                      : styles.inactiveStepNumber,
                  ]}
                />
              </View>
            </View>

            <Typography
              variant={TypographyVariant.LSMALL_SEMIBOLD}
              text={step.label}
              customTextStyles={[
                styles.stepLabel,
                isActive ? styles.activeStepLabel : styles.inactiveStepLabel,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    position: 'relative',
  },
  connectorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: getScreenHeight(4.5),
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(12.5),
  },
  connector: {
    height: getScreenHeight(0.25),
    flex: 1,
    marginHorizontal: getScreenWidth(1),
  },
  activeConnector: {
    backgroundColor: ColorPalette.BLUE_400,
    borderColor: ColorPalette.BLUE_400,
  },
  inactiveConnector: {
    backgroundColor: ColorPalette.ConnectLine,
  },
  stepContainer: {
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
    display: 'flex',
    // gap: getScreenWidth(),
  },
  circleWrapper: {
    position: 'relative',
    width: getScreenWidth(13),
    height: getScreenWidth(13),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getScreenHeight(0.5),
  },
  haloEffect: {
    position: 'absolute',
    width: getScreenWidth(10),
    height: getScreenWidth(10),
    borderRadius: getScreenWidth(6.5),
    backgroundColor: ColorPalette.BLUE_12,
  },
  circle: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
    borderRadius: getScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  activeCircle: {
    backgroundColor: ColorPalette.WHITE,
    borderWidth: 3,
    borderColor: ColorPalette.BLUE_300,
  },
  passedCircle: {
    backgroundColor: ColorPalette.BLUE_200,
    borderWidth: 1.5,
    borderColor: ColorPalette.BLUE_200,
  },
  inactiveCircle: {
    backgroundColor: ColorPalette.WelcomeBack,
    borderWidth: 3,
    borderColor: ColorPalette.ConnectLine,
  },
  activeStepNumber: {
    color: ColorPalette.BLUE_200,
  },
  passedStepNumber: {
    color: ColorPalette.WHITE,
  },
  inactiveStepNumber: {
    color: ColorPalette.TEXT_GREY_200,
  },
  stepLabel: {
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: getScreenWidth(20),
  },
  activeStepLabel: {
    color: ColorPalette.TEXT_GREY_400,
  },
  inactiveStepLabel: {
    color: ColorPalette.TEXT_GREY_400,
  },
  stepNumber: {
    textAlign: 'center',
  },
});

export default React.memo(ProgressStepper);
