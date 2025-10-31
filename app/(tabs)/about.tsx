import React from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ExternalLink, Package, Wrench, Heart, Globe } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

export default function AboutScreen() {
  const openWebsite = () => {
    Linking.openURL('https://broadbrand.ai');
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-6 py-8`}>
        {/* Broadbrand Header */}
        <Card className="mb-6">
          <CardContent>
            <View style={tw`items-center py-4`}>
              <View style={tw`bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-20 h-20 items-center justify-center mb-4`}>
                <Text style={tw`text-3xl font-bold text-white`}>BB</Text>
              </View>
              <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
                Broadbrand
              </Text>
              <Text style={tw`text-gray-600 text-center mb-4`}>
                Building the future of mobile development
              </Text>
              <Button onPress={openWebsite} size="sm">
                <View style={tw`flex-row items-center`}>
                  <Globe color="#ffffff" size={16} style={tw`mr-2`} />
                  <Text style={tw`text-white font-semibold`}>
                    Visit broadbrand.ai
                  </Text>
                </View>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* The Challenge */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <View style={tw`flex-row items-center`}>
                <Wrench color="#3b82f6" size={24} style={tw`mr-2`} />
                <Text style={tw`text-xl font-bold text-gray-900`}>
                  The Challenge
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={tw`text-gray-600 leading-6 mb-3`}>
              Getting all these modern tools to work together perfectly the first time seems really hard for new developers.
            </Text>
            <Text style={tw`text-gray-600 leading-6 mb-3`}>
              Version conflicts, configuration issues, and compatibility problems can eat up hours or even days of development time.
            </Text>
            <Text style={tw`text-gray-600 leading-6`}>
              That's why we created this starter template - to save you the frustration and get you building beautiful apps immediately.
            </Text>
          </CardContent>
        </Card>

        {/* What's Installed */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <View style={tw`flex-row items-center`}>
                <Package color="#8b5cf6" size={24} style={tw`mr-2`} />
                <Text style={tw`text-xl font-bold text-gray-900`}>
                  What's Installed
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                Expo SDK 54.0.20
              </Text>
              <Text style={tw`text-sm text-gray-600 mb-3`}>
                Latest stable Expo SDK with React Native 0.81 and React 19. Includes Expo Router for file-based navigation and all the newest platform features.
              </Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                twrnc (Tailwind React Native Classnames)
              </Text>
              <Text style={tw`text-sm text-gray-600 mb-3`}>
                Tailwind CSS-style utility classes for React Native. Works perfectly with Expo SDK 54, no configuration conflicts. The most performant styling solution available.
              </Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                Lucide React Native
              </Text>
              <Text style={tw`text-sm text-gray-600 mb-3`}>
                Beautiful, consistent icon set with over 1,000 icons. Fully compatible with React Native and works seamlessly with Expo Go.
              </Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                Custom UI Components
              </Text>
              <Text style={tw`text-sm text-gray-600 mb-3`}>
                shadcn-style Button and Card components built with twrnc. Clean, reusable, and ready to customize. Located in /components/ui/.
              </Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                Expo Router Tabs
              </Text>
              <Text style={tw`text-sm text-gray-600 mb-3`}>
                File-based routing with tab navigation built-in. Simple, type-safe, and follows React Navigation best practices.
              </Text>
            </View>

            <View>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                TypeScript
              </Text>
              <Text style={tw`text-sm text-gray-600`}>
                Full TypeScript support for type safety and better developer experience. All components are properly typed.
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <View style={tw`flex-row items-center`}>
                <ExternalLink color="#ec4899" size={24} style={tw`mr-2`} />
                <Text style={tw`text-xl font-bold text-gray-900`}>
                  Getting Started
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={tw`bg-gray-100 rounded-lg p-4 mb-3`}>
              <Text style={tw`text-sm font-mono text-gray-800 mb-1`}>
                npm install
              </Text>
            </View>
            <View style={tw`bg-gray-100 rounded-lg p-4 mb-3`}>
              <Text style={tw`text-sm font-mono text-gray-800 mb-1`}>
                npm start
              </Text>
            </View>
            <Text style={tw`text-sm text-gray-600`}>
              Scan the QR code with Expo Go to run on your device, or press 'i' for iOS simulator or 'a' for Android emulator.
            </Text>
          </CardContent>
        </Card>

        {/* Footer */}
        <View style={tw`items-center py-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Text style={tw`text-gray-600 mr-1`}>Made with</Text>
            <Heart color="#ec4899" size={16} fill="#ec4899" />
            <Text style={tw`text-gray-600 ml-1`}>by Broadbrand</Text>
          </View>
          <TouchableOpacity onPress={openWebsite}>
            <Text style={tw`text-blue-600 font-semibold`}>
              broadbrand.ai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
