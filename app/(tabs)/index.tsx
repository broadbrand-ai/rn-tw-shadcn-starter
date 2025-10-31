import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import tw from 'twrnc';
import { PartyPopper, Smartphone, Zap, Sparkles } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(0);

  useEffect(() => {
    iconScale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
    });

    iconRotation.value = withSequence(
      withDelay(300, withSpring(10, { damping: 5 })),
      withSpring(-10, { damping: 5 }),
      withSpring(5, { damping: 5 }),
      withSpring(0, { damping: 10 })
    );
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: iconScale.value },
        { rotate: `${iconRotation.value}deg` }
      ],
    };
  });

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`} contentContainerStyle={{ paddingBottom: 100 }}>
      <LinearGradient
        colors={['#3b82f6', '#8b5cf6', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[tw`pb-16 px-6`, { paddingTop: insets.top + 60 }]}
      >
        <View style={tw`items-center`}>
          <Animated.View
            style={[
              tw`bg-white/20 rounded-full p-4 mb-6`,
              iconAnimatedStyle
            ]}
          >
            <PartyPopper color="#ffffff" size={48} strokeWidth={2} />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(200).springify()}
            style={tw`text-4xl font-bold text-white text-center mb-4`}
          >
            Build the most{'\n'}beautiful app today
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={tw`text-lg text-white/90 text-center max-w-md`}
          >
            The perfect starter template with everything configured and ready to go
          </Animated.Text>
        </View>
      </LinearGradient>

      <View style={tw`px-6 py-8`}>
        <Animated.Text
          entering={FadeInDown.delay(600).springify()}
          style={tw`text-2xl font-bold text-gray-900 mb-6`}
        >
          What's Included
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(700).springify()}>
          <Card className="mb-4">
            <CardContent>
              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-blue-100 rounded-full p-3 mr-4`}>
                  <Smartphone color="#3b82f6" size={24} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>
                    Expo SDK 54
                  </Text>
                  <Text style={tw`text-gray-600 leading-6`}>
                    Latest Expo SDK with React Native 0.81, React 19, and all the newest features. Works perfectly with Expo Go.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(850).springify()}>
          <Card className="mb-4">
            <CardContent>
              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-purple-100 rounded-full p-3 mr-4`}>
                  <Zap color="#8b5cf6" size={24} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>
                    Tailwind-Style Utilities
                  </Text>
                  <Text style={tw`text-gray-600 leading-6`}>
                    twrnc provides beautiful Tailwind CSS utilities for React Native. No configuration conflicts, works out of the box.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000).springify()}>
          <Card className="mb-4">
            <CardContent>
              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-pink-100 rounded-full p-3 mr-4`}>
                  <Sparkles color="#ec4899" size={24} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>
                    Beautiful Components
                  </Text>
                  <Text style={tw`text-gray-600 leading-6`}>
                    Custom shadcn-style components built with twrnc. Clean, reusable, and ready to customize for your needs.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1150).springify()}>
          <Card className="mb-4">
            <CardContent>
              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-blue-100 rounded-full p-3 mr-4`}>
                  <Sparkles color="#3b82f6" size={24} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>
                    Lucide Icons
                  </Text>
                  <Text style={tw`text-gray-600 leading-6`}>
                    Over 1,000 beautiful, consistent icons from Lucide React Native. Perfect for modern app design.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
