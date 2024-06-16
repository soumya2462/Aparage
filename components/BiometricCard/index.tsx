/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {
  Avatar,
  Card,
  MD3Colors,
  ProgressBar,
  Text,
  useTheme,
} from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';

const Icon = ({icon, color}: {icon: string; color?: string}) => {
  const theme = useTheme();
  return (
    <Avatar.Icon
      icon={icon}
      size={24}
      color={color || theme.colors.primary}
      style={{backgroundColor: 'transparent'}}
    />
  );
};

type BiometricCardProps = {
  icon?: string;
  iconColor?: string;
  title: string;
  value: number;
  unit: string;
  onPress?: () => void;
};

const BiometricCard: React.FC<BiometricCardProps> = ({
  icon,
  iconColor,
  title,
  value,
  unit,
  onPress,
}) => {
  const theme = useTheme();
  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <Card
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {width: 0, height: 0},
      }}>
      <Card.Content style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{width: '75%', flexDirection: 'column'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
            }}>
            {!!icon && <Icon icon={icon} color={iconColor} />}
            <Text
              variant="titleMedium"
              style={{
                fontWeight: '700',
                color: iconColor || theme.colors.primary,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'baseline',
            }}>
            <Text style={{fontSize: 42}}>{value}</Text>
            <Text style={{fontSize: 18, fontWeight: '500', opacity: 0.8}}>
              {unit}
            </Text>
          </View>
        </View>

        <View style={{width: '25%'}}>
          <CircularProgress
            value={value}
            radius={30}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={15}
            inActiveStrokeWidth={20}
            progressValueStyle={{fontWeight: '100', color: 'white'}}
            activeStrokeSecondaryColor="yellow"
            inActiveStrokeColor="black"
            duration={5000}
            dashedStrokeConfig={{
              count: 50,
              width: 4,
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default BiometricCard;
