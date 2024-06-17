/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Avatar, Card, Text, useTheme} from 'react-native-paper';
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
  holdvalue?: number;
  onPress?: () => void;
};

const BiometricCard: React.FC<BiometricCardProps> = ({
  icon,
  iconColor,
  title,
  value,
  unit,
  holdvalue,
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
            <Text style={{fontSize: 42}}>
              {value}
              {holdvalue !== undefined ? (
                <Text style={{fontSize: 22, color: 'red'}}>/{holdvalue}</Text>
              ) : null}
            </Text>
            <Text style={{fontSize: 18, fontWeight: '500', opacity: 0.8}}>
              {unit}
            </Text>
          </View>
        </View>
        {holdvalue !== undefined ? (
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress
              value={(value / holdvalue) * 100 || 0}
              inActiveStrokeColor={'#2ecc71'}
              inActiveStrokeOpacity={0.2}
              progressValueColor={'red'}
              valueSuffix={'%'}
              radius={40}
            />
          </View>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default BiometricCard;
