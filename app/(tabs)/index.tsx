import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Sparkles, Smartphone, Zap } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`} contentContainerStyle={{ paddingBottom: 100 }}>
      <LinearGradient
        colors={['#3b82f6', '#8b5cf6', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[tw`pb-16 px-6`, { paddingTop: insets.top + 60 }]}
      >
        <View style={tw`items-center`}>
          <View style={tw`bg-white/20 rounded-full p-4 mb-6`}>
            <Sparkles color="#ffffff" size={48} strokeWidth={2} />
          </View>
          <Text style={tw`text-4xl font-bold text-white text-center mb-4`}>
            Build the most{'\n'}beautiful app today
          </Text>
          <Text style={tw`text-lg text-white/90 text-center max-w-md`}>
            The perfect starter template with everything configured and ready to go
          </Text>
        </View>
      </LinearGradient>

      <View style={tw`px-6 py-8`}>
        <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
          What's Included
        </Text>

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
      </View>
    </ScrollView>
  );
}
