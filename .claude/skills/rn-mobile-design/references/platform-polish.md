# Platform-Specific Polish

The details that separate a cross-platform app that feels native from one that feels like a web app wrapped in a phone case.

## Table of Contents
1. [iOS Polish](#ios)
2. [Android Polish](#android)
3. [Dark Mode](#dark-mode)
4. [Safe Areas & Device Adaptation](#safe-areas)
5. [Typography Per Platform](#typography)
6. [Accessibility Deep Dive](#accessibility)

---

## iOS Polish

### Safe Areas

Every iOS screen must handle safe areas. The notch, Dynamic Island, and home indicator all eat into your content area.

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ScreenWrapper({ children, edges = ['top'] }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.bgPrimary,
      paddingTop: edges.includes('top') ? insets.top : 0,
      paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    }}>
      {children}
    </View>
  );
}
```

Don't use `<SafeAreaView>` from React Native — it's iOS-only and doesn't work inside modals. Always use `react-native-safe-area-context`.

### Large Titles

iOS large titles (the big, bold title that collapses on scroll) are expected on top-level screens:

- Home/Feed → Large title
- Search → Large title
- Profile → Large title
- Detail screens (pushed via stack) → Standard (small) title

This is handled by `headerLargeTitle: true` in React Navigation's native stack.

### Haptics

iOS haptics are precise and expected. Add them to:

- Button presses → `ImpactFeedbackStyle.Light`
- Toggle switches → `ImpactFeedbackStyle.Medium`
- Pull-to-refresh trigger point → `ImpactFeedbackStyle.Light`
- Destructive confirmations → `ImpactFeedbackStyle.Heavy`
- Success/error → `NotificationFeedbackType.Success/Error`
- Picker/wheel scrolling → `selectionAsync()` per item

### Blur Effects

Blur is a core iOS design element. Use it for:

- Navigation bar backgrounds (translucent)
- Tab bar backgrounds
- Overlay/dim backgrounds behind modals
- Floating UI elements over content

```tsx
import { BlurView } from '@react-native-community/blur';

<BlurView
  style={StyleSheet.absoluteFill}
  blurType={colorScheme === 'dark' ? 'dark' : 'light'}
  blurAmount={20}
  reducedTransparencyFallbackColor={theme.colors.bgPrimary}
/>
```

### iOS-Specific Interactions

- **Swipe to go back:** Never interfere with the left-edge swipe gesture
- **Long press for context menus:** Use `contextMenuConfig` or a custom long-press menu
- **Rubber-band scrolling:** Comes free with ScrollView/FlatList — don't disable it
- **Status bar style:** Match your header background. Dark content for light backgrounds, light content for dark backgrounds:

```tsx
<StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
```

---

## Android Polish

### Material Design 3 Ripple

Android users expect ripple feedback on every touch target:

```tsx
import { Pressable, Platform } from 'react-native';

<Pressable
  android_ripple={{
    color: theme.colors.actionSecondary,
    borderless: false,
  }}
  style={({ pressed }) => [
    styles.button,
    // iOS fallback — opacity change
    Platform.OS === 'ios' && pressed && { opacity: 0.85 },
  ]}
/>
```

Every `Pressable`, every list item, every card — if it's tappable on Android, it gets a ripple.

### System Navigation Bar

The bottom navigation bar on Android (the one with back, home, recents) should match your app:

```tsx
import { StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

// Match navigation bar to your app's background
SystemNavigationBar.setNavigationColor(theme.colors.bgPrimary);
SystemNavigationBar.setBarMode(colorScheme === 'dark' ? 'light' : 'dark');
```

Or with Expo:

```tsx
import * as NavigationBar from 'expo-navigation-bar';

NavigationBar.setBackgroundColorAsync(theme.colors.bgPrimary);
NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark');
```

### Edge-to-Edge Display

Modern Android apps should draw behind the system bars:

```tsx
// In your root component or app config
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');
```

Then handle insets properly using `react-native-safe-area-context`, same as iOS.

### Android-Specific Typography

- Use Roboto family (default system font)
- Android text rendering is slightly different — test line heights that look good on both platforms
- `includeFontPadding: false` removes Android's extra top/bottom padding on text:

```tsx
const baseTextStyle = Platform.select({
  android: { includeFontPadding: false },
  ios: {},
});
```

### Android Back Behavior

React Navigation handles the Android back button automatically, but be mindful:

- Back from a tab should go to the previous tab (if the user didn't start on this tab), or exit the app
- Back from a modal should dismiss the modal
- Back from a bottom sheet should close the sheet before navigating
- Use `BackHandler` from React Native if you need custom back behavior

---

## Dark Mode

### Implementation Strategy

1. Detect system preference:
```tsx
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme(); // 'light' | 'dark'
```

2. Provide theme via context:
```tsx
const ThemeContext = React.createContext(lightTheme);

function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => React.useContext(ThemeContext);
```

3. Use semantic tokens everywhere — this is why the token system matters. If you used `bgPrimary` instead of `#FFFFFF`, dark mode is automatic.

### Dark Mode Design Rules

- **Don't just invert colors.** Dark backgrounds should be desaturated dark grays (`#171717`, `#1C1C1E`), not pure black (`#000000`). Pure black on OLED looks unnatural.
- **Reduce elevation contrast.** In light mode, cards are white on light gray. In dark mode, cards are slightly lighter gray on dark gray — the contrast should be subtler.
- **Reduce shadow opacity.** Shadows are less visible on dark backgrounds. Compensate with subtle border or slight background elevation.
- **Accent colors may need adjustment.** A vibrant blue that looks great on white might be too harsh on dark gray. Desaturate slightly or use a lighter tint.
- **Images and illustrations:** Consider whether they need dark variants. Photos are usually fine; illustrations with white backgrounds need attention.

---

## Safe Areas & Device Adaptation

### Device Categories to Handle

1. **Standard phones** (iPhone 13-15, Pixel 7): Notch or Dynamic Island + home indicator
2. **Small phones** (iPhone SE, budget Androids): No notch, home button, compact viewport
3. **Large phones** (iPhone Pro Max, Samsung Ultra): Same as standard but more horizontal space
4. **Foldables** (Galaxy Fold, Pixel Fold): Can unfold to near-tablet size — must handle width changes dynamically
5. **Tablets** (iPad, Android tablets): Multi-column layouts become important

### Thumb Zone Awareness

The natural thumb reach on a phone creates three zones:

- **Easy reach (bottom third):** Primary actions, navigation, frequently tapped elements
- **Moderate reach (middle third):** Content, secondary actions
- **Hard reach (top third):** Informational headers, infrequent actions

Place your most important interactive elements at the bottom of the screen. This is why bottom tabs, bottom sheets, and floating action buttons work so well — they're in the thumb's natural resting zone.

### Keyboard Handling

```tsx
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0} // adjust for header height
  style={{ flex: 1 }}
>
  {/* Your form content */}
</KeyboardAvoidingView>
```

For more control, use `react-native-keyboard-controller` which provides smooth, native-driven keyboard animations.

---

## Typography Per Platform

### Font Families

```typescript
const fontFamily = {
  regular: Platform.select({
    ios: 'System',  // SF Pro Text, respects Dynamic Type
    android: 'Roboto',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
  }),
};
```

Using `'System'` on iOS automatically picks SF Pro Text for body sizes and SF Pro Display for large sizes, and respects Dynamic Type accessibility settings.

### Font Weight Mapping

iOS and Android handle `fontWeight` differently:

```typescript
// iOS: fontWeight as a string works natively
// Android: requires specific font file names (Roboto-Medium, Roboto-Bold)

const fontWeight = Platform.select({
  ios: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  android: {
    regular: 'normal' as const,
    medium: 'normal' as const,  // use Roboto-Medium fontFamily instead
    semibold: 'bold' as const,  // Android doesn't have semibold, use bold
    bold: 'bold' as const,
  },
});
```

---

## Accessibility Deep Dive

### Screen Reader Testing Checklist

Test every screen with VoiceOver (iOS) and TalkBack (Android) enabled:

1. **Swipe through every element.** Is the order logical? Are decorative images skipped?
2. **Are interactive elements clearly labeled?** "Button: Submit form" not "Button: image_3"
3. **Are state changes announced?** "Loading..." → "Content loaded, 5 items"
4. **Can you complete every task?** Fill forms, navigate, trigger actions
5. **Are grouped elements read sensibly?** A card with title + subtitle + button should read as a unit

### Semantic Roles

```tsx
// Buttons
<Pressable accessibilityRole="button" accessibilityLabel="Add to cart">

// Links
<Text accessibilityRole="link" accessibilityLabel="Visit website">

// Headers (helps screen readers build a page outline)
<Text accessibilityRole="header">Section Title</Text>

// Images
<Image accessibilityRole="image" accessibilityLabel="Photo of sunset over mountains" />

// Decorative images (skip for screen readers)
<Image accessibilityElementsHidden={true} importantForAccessibility="no" />

// Switches
<Switch accessibilityRole="switch" accessibilityLabel="Dark mode" accessibilityState={{ checked: isDark }} />

// Adjustable (sliders, steppers)
<Slider accessibilityRole="adjustable" accessibilityLabel="Volume" accessibilityValue={{ min: 0, max: 100, now: volume }} />
```

### Dynamic Type / Font Scaling

Respect the user's preferred text size:

```tsx
// Allow scaling (default behavior, keep it)
<Text allowFontScaling={true}>This text respects user's font size setting</Text>

// Test at the largest Dynamic Type size — your layouts WILL break if you haven't planned for it
// Common fixes:
// - Use flexWrap for horizontal layouts that might overflow
// - Set numberOfLines with ellipsis for text that can't grow infinitely
// - Test with maxFontSizeMultiplier if you need to cap scaling for specific elements
<Text maxFontSizeMultiplier={1.5}>Caps scaling at 150% of base size</Text>
```

### Color Contrast

Use the WebAIM contrast checker (https://webaim.org/resources/contrastchecker/) to verify:

- **Normal text (< 18pt):** Minimum 4.5:1 contrast ratio
- **Large text (>= 18pt or 14pt bold):** Minimum 3:1
- **UI components (icons, borders):** Minimum 3:1

Common contrast failures to watch for:
- Light gray text on white background
- Placeholder text too low contrast
- Disabled state text invisible
- Status colors (green on white, red on dark backgrounds)

### Reduce Motion

Some users are sensitive to animation. Respect their system setting:

```tsx
import { AccessibilityInfo } from 'react-native';

const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  const subscription = AccessibilityInfo.addEventListener(
    'reduceMotionChanged',
    setReduceMotion,
  );
  return () => subscription.remove();
}, []);

// Use in animations
const duration = reduceMotion ? 0 : 300;
```

When reduce motion is on: replace slide/scale animations with simple fades or instant transitions. Never remove feedback entirely — just simplify it.
