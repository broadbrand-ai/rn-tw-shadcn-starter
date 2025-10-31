import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'flex-row items-center justify-center rounded-lg';

  const variantStyles = {
    default: 'bg-blue-600 active:bg-blue-700',
    outline: 'bg-transparent border-2 border-blue-600 active:bg-blue-50',
    ghost: 'bg-transparent active:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const textColorStyles = {
    default: 'text-white font-semibold',
    outline: 'text-blue-600 font-semibold',
    ghost: 'text-gray-900 font-semibold',
  };

  const disabledStyles = disabled || loading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={tw`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <View style={tw`flex-row items-center`}>
          <ActivityIndicator
            size="small"
            color={variant === 'default' ? '#ffffff' : '#2563eb'}
            style={tw`mr-2`}
          />
          <Text style={tw`${textColorStyles[variant]} ${textSizeStyles[size]}`}>
            Loading...
          </Text>
        </View>
      ) : (
        <Text style={tw`${textColorStyles[variant]} ${textSizeStyles[size]}`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
