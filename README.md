# React Native + Tailwind + shadcn Starter

<div align="center">
  <h3>The perfect starter template for building beautiful React Native apps</h3>
  <p>Built with ❤️ by <a href="https://broadbrand.ai">Broadbrand</a></p>
</div>

---

## Why This Starter?

Getting modern React Native tools to work together perfectly the first time seems really hard for new developers. Version conflicts, configuration issues, and compatibility problems can eat up hours or even days of development time.

**This starter template solves that problem.** Everything is pre-configured, tested, and ready to go. Just clone, install, and start building.

---

## What's Included

### 🚀 Expo SDK 54.0.20
- Latest stable Expo SDK (October 2025)
- React Native 0.81.5
- React 19.1.0
- Expo Router for file-based navigation
- Works perfectly with Expo Go
- New Architecture enabled by default

### 🎨 twrnc (Tailwind React Native Classnames)
- Tailwind CSS-style utility classes for React Native
- Zero configuration conflicts with Expo SDK 54
- Most performant styling solution available
- No build-time compilation needed
- Custom theme support
- Dark mode ready

### ✨ Beautiful UI Components
- shadcn-style Button component with variants
- Card component with sub-components (Header, Title, Content, Footer)
- Built with twrnc for consistent styling
- Fully TypeScript typed
- Easy to customize and extend

### 🎯 Lucide React Native Icons
- Over 1,000 beautiful, consistent icons
- Fully compatible with React Native
- Works seamlessly with Expo Go
- Tree-shakeable for optimal bundle size

### 🧭 Expo Router Tabs
- File-based routing
- Type-safe navigation
- Tab navigation pre-configured
- Beautiful tab bar with Lucide icons

### 📦 TypeScript
- Full TypeScript support
- Type-safe components and navigation
- Better developer experience with IntelliSense

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Expo Go app](https://expo.dev/client) on your mobile device
- iOS Simulator (Mac) or Android Emulator (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/broadbrand-ai/rn-tw-shadcn-starter.git

# Navigate to the project
cd rn-tw-shadcn-starter

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

After starting the development server:

1. **Expo Go (Recommended for development)**
   - Scan the QR code with your phone camera (iOS) or Expo Go app (Android)
   - The app will load on your device

2. **iOS Simulator**
   - Press `i` in the terminal
   - Requires Xcode installed on Mac

3. **Android Emulator**
   - Press `a` in the terminal
   - Requires Android Studio and emulator setup

---

## Project Structure

```
rn-tw-shadcn-starter/
├── app/                      # Expo Router directory
│   ├── (tabs)/              # Tab navigation group
│   │   ├── _layout.tsx     # Tab configuration
│   │   ├── index.tsx       # Home screen
│   │   └── about.tsx       # About screen
│   ├── _layout.tsx         # Root layout
│   ├── +html.tsx           # Custom HTML document
│   ├── +not-found.tsx      # 404 page
│   └── modal.tsx           # Example modal
├── components/              # Reusable components
│   └── ui/                 # UI components
│       ├── Button.tsx      # Button component
│       ├── Card.tsx        # Card component
│       └── index.ts        # Component exports
├── assets/                 # Images, fonts, etc.
├── constants/              # App constants
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── app.json               # Expo configuration
```

---

## Using the UI Components

### Button Component

```tsx
import { Button } from '@/components/ui';

// Default button
<Button onPress={() => console.log('Pressed')}>
  Click Me
</Button>

// Outline variant
<Button variant="outline" onPress={handlePress}>
  Outline Button
</Button>

// Ghost variant
<Button variant="ghost" size="sm">
  Small Ghost
</Button>

// Loading state
<Button loading={true}>
  Loading...
</Button>
```

**Button Props:**
- `variant`: `'default'` | `'outline'` | `'ghost'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `disabled`: boolean
- `loading`: boolean
- `className`: string (for additional twrnc styles)

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>
      <Text style={tw`text-xl font-bold`}>Card Title</Text>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Text>Card content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## Styling with twrnc

twrnc provides Tailwind CSS-style utilities for React Native. Here are some examples:

```tsx
import tw from 'twrnc';
import { View, Text } from 'react-native';

// Basic styling
<View style={tw`flex-1 items-center justify-center bg-blue-500`}>
  <Text style={tw`text-xl font-bold text-white`}>Hello World</Text>
</View>

// Responsive design
<View style={tw`p-4 md:p-8 lg:p-12`}>
  <Text style={tw`text-sm md:text-base lg:text-xl`}>Responsive Text</Text>
</View>

// Platform-specific styles
<View style={tw`ios:pt-4 android:pt-2`}>
  <Text>Platform Specific</Text>
</View>

// Dark mode
<View style={tw`bg-white dark:bg-gray-900`}>
  <Text style={tw`text-black dark:text-white`}>Dark Mode Ready</Text>
</View>
```

### Common Tailwind Utilities

- **Flexbox**: `flex`, `flex-row`, `flex-col`, `items-center`, `justify-between`
- **Spacing**: `p-4`, `px-6`, `py-2`, `m-4`, `mx-auto`, `gap-2`
- **Sizing**: `w-full`, `h-screen`, `w-1/2`, `h-20`
- **Colors**: `bg-blue-500`, `text-white`, `border-gray-300`
- **Typography**: `text-xl`, `font-bold`, `text-center`, `leading-6`
- **Borders**: `rounded-lg`, `border-2`, `shadow-lg`

---

## Using Lucide Icons

```tsx
import { Home, Settings, User, Mail, Heart } from 'lucide-react-native';

// Basic icon
<Home color="#3b82f6" size={24} />

// With custom stroke width
<Heart color="#ec4899" size={32} strokeWidth={2.5} fill="#ec4899" />

// In buttons or navigation
<TouchableOpacity>
  <Mail color="#6b7280" size={20} />
</TouchableOpacity>
```

Browse all icons at [lucide.dev](https://lucide.dev)

---

## Adding New Screens

Thanks to Expo Router, adding screens is simple:

1. Create a new file in `app/` directory
2. Export a React component
3. The file name becomes the route

```tsx
// app/profile.tsx
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function ProfileScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Profile</Text>
    </View>
  );
}

// Automatically available at /profile
```

---

## Configuration

### Customizing Colors

Edit the twrnc theme by creating a `tailwind.config.js` (optional):

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      },
    },
  },
};
```

Then use in your app:

```tsx
import tw from 'twrnc';

// Will use your custom colors
<View style={tw`bg-primary`}>
  <Text style={tw`text-secondary`}>Custom Colors</Text>
</View>
```

### App Configuration

Edit `app.json` to customize:
- App name and slug
- Icons and splash screen
- iOS and Android configuration
- Expo plugins

---

## Deployment

### Building for iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios
```

### Building for Android

```bash
# Build for Android
eas build --platform android
```

### Publishing Updates

```bash
# Publish over-the-air update
eas update --branch production
```

---

## Troubleshooting

### Metro bundler cache issues

```bash
# Clear cache and restart
npm start -- --clear
```

### Dependencies not installing correctly

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Expo Go not connecting

- Ensure your phone and computer are on the same network
- Try the tunnel connection: `npm start -- --tunnel`

---

## Why These Technologies?

### Why Expo SDK 54?
- Latest stable release with React Native 0.81 and React 19
- Best developer experience with Expo Go
- Over-the-air updates with EAS Update
- Simplified native module integration

### Why twrnc instead of NativeWind?
- **Zero compatibility issues** with Expo SDK 54
- NativeWind v4 requires Reanimated v3, but SDK 54 ships with v4
- NativeWind v5 is still in pre-release (not production-ready)
- twrnc is more performant (runtime vs build-time)
- Works out of the box with no configuration

### Why Custom Components instead of react-native-reusables?
- Full control over implementation
- No additional dependencies
- Easy to customize for your needs
- Learning opportunity to understand component patterns

---

## Package Versions

```json
{
  "expo": "~54.0.20",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.13",
  "twrnc": "^4.7.1",
  "lucide-react-native": "^0.468.0",
  "expo-linear-gradient": "~14.0.1",
  "react-native-svg": "^15.9.0"
}
```

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [twrnc Documentation](https://github.com/jaredh159/tailwind-react-native-classnames)
- [Lucide Icons](https://lucide.dev)
- [React Native Docs](https://reactnative.dev/)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT License - feel free to use this starter for your projects!

---

## Credits

Created by [Broadbrand](https://broadbrand.ai) - Building the future of mobile development.

If this starter saved you time, consider:
- ⭐ Starring this repository
- 🐛 Reporting issues
- 🚀 Sharing with other developers

---

## Support

Need help? Visit [broadbrand.ai](https://broadbrand.ai) or open an issue on GitHub.

Happy coding! 🎉
