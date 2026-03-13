# Animation & Motion Guide

How to add motion that makes your app feel alive, responsive, and professional — without overdoing it.

## Table of Contents
1. [Core Principles](#core-principles)
2. [Reanimated 3 Essentials](#reanimated-3)
3. [Moti Quick Patterns](#moti)
4. [Screen Transitions](#screen-transitions)
5. [List Animations](#list-animations)
6. [Skeleton Shimmer](#skeleton-shimmer)
7. [Micro-interactions](#micro-interactions)
8. [Haptic Feedback Pairing](#haptics)
9. [Performance](#performance)

---

## Core Principles

### Duration Guidelines

Motion should feel quick and responsive. Mobile users have zero patience for slow animations.

| Category | Duration | Examples |
|----------|----------|----------|
| Micro-feedback | 80-150ms | Button press scale, toggle flip, ripple |
| Transitions | 200-350ms | Screen push/pop, bottom sheet open, expand/collapse |
| Emphasis | 300-500ms | Success checkmark, onboarding reveal |
| Complex choreography | 400-800ms | Multi-step celebrations, staggered list entrance |

If your animation takes longer than 400ms for a standard transition, it's too slow. Users will feel like the app is laggy.

### Easing Curves

Different curves for different purposes:

```typescript
import { Easing } from 'react-native-reanimated';

// Element entering the screen — fast start, gentle landing
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

// Element leaving the screen — gentle start, fast exit
const EASE_IN = Easing.bezier(0.55, 0, 1, 0.45);

// Element moving within the screen — smooth in both directions
const EASE_IN_OUT = Easing.bezier(0.4, 0, 0.2, 1);

// For direct manipulation (user dragging something)
// Use springs instead of timing curves — they feel physical
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

// Bouncy spring for playful interactions
const SPRING_BOUNCY = {
  damping: 10,
  stiffness: 200,
  mass: 0.8,
};

// Stiff spring for snappy interactions (toggle, checkbox)
const SPRING_SNAPPY = {
  damping: 20,
  stiffness: 300,
  mass: 0.6,
};
```

### The Motion Hierarchy

Not all animations are equal. Prioritize in this order:

1. **Response animations** (button presses, toggles) — MUST have. Without these, the app feels dead.
2. **Transition animations** (screen changes, modals appearing) — SHOULD have. These orient the user.
3. **State change animations** (loading to loaded, empty to populated) — SHOULD have. These smooth jarring layout shifts.
4. **Decorative animations** (background particles, floating elements) — COULD have. Only if they serve the brand.

---

## Reanimated 3 Essentials

### Animated Press Feedback

The most fundamental animation — every pressable element needs this:

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

function PressableCard({ children, onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97, SPRING_SNAPPY);
        }}
        onPressOut={() => {
          scale.value = withSpring(1, SPRING_SNAPPY);
        }}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
```

Why 0.97 and not 0.95 or 0.9? Subtlety. A 3% scale change is perceptible but not distracting. Larger values (0.9, 0.85) feel cartoonish in production — save those for game UIs.

### Fade + Slide Entrance

For content appearing on screen:

```tsx
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';

// Content sliding up from below (most natural for bottom-anchored content)
<Animated.View entering={FadeInDown.duration(300).easing(EASE_OUT)}>
  <ContentCard />
</Animated.View>

// Content sliding down from above (for top-anchored content like headers)
<Animated.View entering={FadeInUp.duration(250).easing(EASE_OUT)}>
  <HeaderContent />
</Animated.View>
```

### Layout Animations

For when content changes size or position (items being added/removed from a list, sections expanding):

```tsx
import Animated, { LinearTransition } from 'react-native-reanimated';

// Wrap elements that change position
<Animated.View layout={LinearTransition.springify().damping(15).stiffness(150)}>
  {items.map(item => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.springify()}
      exiting={FadeOutDown.duration(200)}
    >
      <ListItem item={item} />
    </Animated.View>
  ))}
</Animated.View>
```

---

## Moti Quick Patterns

Moti provides a simpler, more declarative API on top of Reanimated. Great for common patterns:

```tsx
import { MotiView, AnimatePresence } from 'moti';

// Fade in on mount
<MotiView
  from={{ opacity: 0, translateY: 10 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ type: 'timing', duration: 300 }}
>
  <Content />
</MotiView>

// Animate presence (mount/unmount)
<AnimatePresence>
  {isVisible && (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <Toast message="Saved!" />
    </MotiView>
  )}
</AnimatePresence>

// Staggered children (for lists)
import { MotiView } from 'moti';

{items.map((item, index) => (
  <MotiView
    key={item.id}
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{
      type: 'timing',
      duration: 350,
      delay: index * 50, // 50ms stagger between items
    }}
  >
    <ListItem item={item} />
  </MotiView>
))}
```

---

## Screen Transitions

### Shared Element Transitions

The most impressive screen transition — an element morphs from its position on one screen to its position on the next:

```tsx
import Animated from 'react-native-reanimated';
import { SharedTransition } from 'react-native-reanimated';

// On the list screen
<Animated.Image
  source={{ uri: item.image }}
  sharedTransitionTag={`image-${item.id}`}
  style={styles.thumbnail}
/>

// On the detail screen
<Animated.Image
  source={{ uri: item.image }}
  sharedTransitionTag={`image-${item.id}`}
  style={styles.heroImage}
/>
```

This creates a seamless morph between the thumbnail and the hero image, maintaining spatial context for the user.

### Custom Screen Transitions (React Navigation)

```tsx
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// iOS-style push (default, usually best)
<Stack.Navigator
  screenOptions={{
    ...TransitionPresets.SlideFromRightIOS,
    gestureEnabled: true,
  }}
/>

// Modal presentation (for compose/creation flows)
<Stack.Screen
  name="Compose"
  options={{
    presentation: 'modal',
    ...TransitionPresets.ModalPresentationIOS,
  }}
/>
```

---

## List Animations

### Staggered Entrance

When a screen first loads, animate list items in with a stagger:

```tsx
function AnimatedList({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown
            .delay(index * 60)  // 60ms stagger
            .duration(400)
            .easing(EASE_OUT)
          }
        >
          <ListItem item={item} />
        </Animated.View>
      )}
    />
  );
}
```

**Cap the stagger** — only animate the first 8-10 visible items. Items below the fold shouldn't delay; they should appear instantly when scrolled into view.

### Pull-to-Refresh

Use the built-in `refreshControl` but customize the colors to match your theme:

```tsx
<FlatList
  refreshControl={
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      tintColor={theme.colors.textSecondary}       // iOS spinner color
      colors={[theme.colors.actionPrimary]}         // Android spinner color
      progressBackgroundColor={theme.colors.bgPrimary} // Android spinner background
    />
  }
/>
```

---

## Skeleton Shimmer

Professional loading state using Reanimated + LinearGradient:

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

function SkeletonBox({ width, height, borderRadius = 8 }) {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1, // infinite
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{
      width, height, borderRadius,
      backgroundColor: theme.colors.bgSecondary,
      overflow: 'hidden',
    }}>
      <Animated.View style={[{ width, height }, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', theme.colors.bgTertiary, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

// Usage: match the real content layout
function PostSkeleton() {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <SkeletonBox width={40} height={40} borderRadius={20} /> {/* Avatar */}
        <View style={{ gap: 6 }}>
          <SkeletonBox width={120} height={14} />  {/* Name */}
          <SkeletonBox width={80} height={12} />   {/* Time */}
        </View>
      </View>
      <SkeletonBox width="100%" height={16} style={{ marginTop: 16 }} /> {/* Text line 1 */}
      <SkeletonBox width="80%" height={16} style={{ marginTop: 8 }} />  {/* Text line 2 */}
      <SkeletonBox width="60%" height={16} style={{ marginTop: 8 }} />  {/* Text line 3 */}
    </View>
  );
}
```

---

## Micro-interactions

### Toggle Switch

```tsx
function CustomToggle({ value, onToggle }) {
  const translateX = useSharedValue(value ? 22 : 0);
  const bgColor = useSharedValue(value ? theme.colors.actionPrimary : theme.colors.bgTertiary);

  React.useEffect(() => {
    translateX.value = withSpring(value ? 22 : 0, SPRING_SNAPPY);
    bgColor.value = withTiming(
      value ? theme.colors.actionPrimary : theme.colors.bgTertiary,
      { duration: 200 },
    );
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  return (
    <Pressable onPress={onToggle} accessibilityRole="switch" accessibilityState={{ checked: value }}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}
```

### Success Checkmark

After a successful action, a brief checkmark animation provides satisfying confirmation:

```tsx
import LottieView from 'lottie-react-native';

function SuccessAnimation({ onComplete }) {
  return (
    <LottieView
      source={require('./assets/checkmark.json')}
      autoPlay
      loop={false}
      duration={1200}
      onAnimationFinish={onComplete}
      style={{ width: 80, height: 80 }}
    />
  );
}
```

For even simpler cases, use an animated scale + opacity on a checkmark icon.

---

## Haptic Feedback Pairing

Haptics make animations feel physical and real. Pair them with key interactions:

```typescript
import * as Haptics from 'expo-haptics';

// Button press — light tap
const onPressIn = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

// Toggle switch — medium tap
const onToggle = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

// Destructive action confirmation — heavy tap
const onDelete = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

// Success — success notification
const onSuccess = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

// Error — error notification
const onError = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

// Selection change (picker, segment control) — selection tap
const onSelect = () => {
  Haptics.selectionAsync();
};
```

**Haptic rules:**
- Only on iOS (Android haptics are inconsistent across devices; use them sparingly on Android)
- Pair with visual feedback, never alone
- Don't overdo it — haptics on every scroll event or minor interaction becomes annoying
- Use the lightest appropriate style — most interactions should be `Light` impact

---

## Performance

### Rules for Smooth 60fps

1. **Run animations on the UI thread.** All Reanimated `useAnimatedStyle` and `withSpring`/`withTiming` calls run on the UI thread by default — this is why Reanimated exists. Don't use `Animated` from React Native core for complex animations.

2. **Avoid `useNativeDriver: false`.** If you're using the old `Animated` API, always set `useNativeDriver: true`. Better yet, migrate to Reanimated.

3. **Don't animate layout properties.** Animating `width`, `height`, `margin`, or `padding` triggers layout recalculations every frame. Instead, animate `transform` (translateX/Y, scale) and `opacity`.

4. **Use `shouldRasterizeIOS` and `renderToHardwareTextureAndroid` for complex static views** that are being animated as a group (like a card with shadows).

5. **Profile with Flipper/Performance Monitor.** Watch for JS frame drops. If animations stutter only on JS-heavy screens, you likely have a JS-thread bottleneck — move logic to the UI thread with Reanimated worklets.

6. **Cap staggered animations.** Don't stagger 100 list items. Cap at 8-10 visible items, then show the rest instantly.
