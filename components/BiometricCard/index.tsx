/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Avatar, Card, Text, useTheme} from 'react-native-paper';

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
      <Card.Content style={{display: 'flex', flexDirection: 'column'}}>
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
      </Card.Content>
    </Card>
  );
};

export default BiometricCard;
