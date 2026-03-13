# Navigation Patterns

How to structure navigation so your app feels intuitive on both iOS and Android.

## Table of Contents
1. [Choosing Your Navigation Structure](#structure)
2. [Tab Navigation](#tabs)
3. [Stack Navigation](#stacks)
4. [Modals & Bottom Sheets](#modals)
5. [Deep Linking](#deep-linking)
6. [Platform Differences](#platform-differences)

---

## Choosing Your Navigation Structure

### The Decision Tree

**How many top-level destinations does your app have?**

- **2-5 destinations** → Tab bar (bottom tabs)
- **6+ destinations** → Tab bar for the top 4-5 + "More" tab, or Drawer navigation
- **1 primary flow** (onboarding, checkout) → Simple stack, no tabs

**Does your app have a clear primary action?** (e.g., "create post", "capture photo")

- Yes → Consider a floating action button or prominent tab center button
- No → Standard equal-weight tabs

**Do users need to switch contexts frequently?**

- Yes → Tabs (persists state between tabs)
- No → Stack-based navigation is fine

### Common App Architectures

**Social/Feed App:**
```
TabNavigator
├── HomeStack (Feed → Post Detail → Profile)
├── SearchStack (Search → Results → Detail)
├── CreateStack (modal presentation)
├── NotificationsStack (List → Detail)
└── ProfileStack (Profile → Settings → Edit)
```

**E-Commerce App:**
```
TabNavigator
├── HomeStack (Home → Category → Product → Cart)
├── SearchStack (Search → Results → Product)
├── CartStack (Cart → Checkout flow)
├── OrdersStack (Orders → Order Detail → Tracking)
└── AccountStack (Account → Settings, Addresses, Payment)
```

**Productivity App:**
```
TabNavigator
├── DashboardStack (Dashboard → Detail views)
├── ProjectsStack (List → Project → Task)
├── InboxStack (Messages → Thread)
└── SettingsStack (Settings → Sub-settings)
```

---

## Tab Navigation

### Setup with React Navigation

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.actionPrimary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.medium,
          fontSize: 10,
          marginTop: -2,
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // allows content to scroll behind
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
          android: {
            backgroundColor: theme.colors.bgPrimary,
            borderTopColor: theme.colors.borderDefault,
            borderTopWidth: StyleSheet.hairlineWidth,
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }),
        // iOS: blur background for tab bar
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="regular"
              blurAmount={20}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          tabBarLabel: 'Home',
        }}
      />
      {/* ... more tabs */}
    </Tab.Navigator>
  );
}
```

### Tab Icon Design

- **Active state:** Filled icon variant + accent color
- **Inactive state:** Outline icon variant + `textTertiary` color
- **Icon size:** 24x24 is standard. Don't go larger than 28.
- **Badge positioning:** Top-right of the icon, offset by (-6, -3)

---

## Stack Navigation

### Standard Stack Configuration

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // iOS: hide back button text for cleaner look
        headerTintColor: theme.colors.textPrimary,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.bgPrimary,
        },
        headerTitleStyle: {
          fontFamily: typography.fontFamily.semibold,
          fontSize: 17,
        },
        // Enable native animations
        animation: 'default',
        // iOS: enable large titles for top-level screen
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          fontFamily: typography.fontFamily.bold,
          fontSize: 34,
        },
        contentStyle: {
          backgroundColor: theme.colors.bgPrimary,
        },
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          headerLargeTitle: false, // only large title on root screen
        }}
      />
    </Stack.Navigator>
  );
}
```

### Back Navigation

- **iOS:** Swipe from left edge to go back. Never place interactive elements (horizontal scrollers, swipe actions) at the very left edge that would conflict.
- **Android:** System back button/gesture handles this. React Navigation integrates automatically.
- **Custom back buttons:** If you customize the back button, keep the arrow on iOS (chevron.left) and the arrow on Android (arrow_back). Don't use an X for back navigation — X means "dismiss" (close a modal), not "go back."

---

## Modals & Bottom Sheets

### When to Use What

**Full-screen modal:** Self-contained task with multiple steps (compose email, onboarding). Has its own navigation stack.

**Card modal (iOS):** Quick task with 1-2 steps (confirm action, edit name). Presented as a card that covers ~90% of the screen.

**Bottom sheet:** Supplementary content, filters, pickers, quick actions. Partially covers the screen with drag-to-dismiss.

**Alert/Dialog:** Binary decisions (confirm delete, permission request). Native `Alert.alert()` for simple cases; custom dialog for branded ones.

### Modal Presentation

```tsx
// Card-style modal (iOS)
<Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={{
    presentation: 'modal',
    headerLeft: () => (
      <Pressable onPress={navigation.goBack}>
        <Text style={{ color: theme.colors.actionPrimary }}>Cancel</Text>
      </Pressable>
    ),
    headerRight: () => (
      <Pressable onPress={handleSave}>
        <Text style={{ color: theme.colors.actionPrimary, fontWeight: '600' }}>Save</Text>
      </Pressable>
    ),
  }}
/>
```

### Bottom Sheet Patterns

```tsx
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

function FilterSheet({ isOpen, onClose }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '85%'], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.textTertiary,
        width: 40,
        height: 4,
        borderRadius: 2,
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.bgPrimary,
        borderRadius: 20,
      }}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: spacing[4] }}>
        {/* Filter content */}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
```

---

## Deep Linking

Configure deep linking from the start — it's much harder to retrofit.

```tsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: {
            screens: {
              Feed: 'feed',
              PostDetail: 'post/:id',
            },
          },
          Profile: 'profile/:userId',
        },
      },
      Settings: 'settings',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* navigators */}
</NavigationContainer>
```

---

## Platform Differences

### Navigation Bar (Header)

| Aspect | iOS | Android |
|--------|-----|---------|
| Title alignment | Center | Left (Material 3) |
| Large titles | Yes, collapsible on scroll | No native equivalent |
| Back button | Chevron + optional text | Arrow icon |
| Header actions | Text buttons ("Edit", "Done") | Icon buttons |
| Search | Embedded in header, collapsible | Icon that expands to search bar |

### Transitions

| Aspect | iOS | Android |
|--------|-----|---------|
| Push | Slide from right | Fade + slight slide up (Material 3) |
| Modal | Slide from bottom (card style) | Slide from bottom (full screen) |
| Back | Slide to right (gesture-driven) | Fade + slide down or system back |

### Tab Bar

| Aspect | iOS | Android |
|--------|-----|---------|
| Position | Bottom (always) | Bottom (Material 3) |
| Background | Translucent blur | Opaque with elevation |
| Active indicator | Tint color on icon+label | Pill behind icon (Material 3) |
| Labels | Always visible | Always visible (Material 3) |
| Height | 49pt + safe area | 80dp |

### Adapt without duplicating:
You don't need two completely separate navigation setups. Use `Platform.select()` for the specific differences (header style, transition presets) while keeping the navigation structure identical.
