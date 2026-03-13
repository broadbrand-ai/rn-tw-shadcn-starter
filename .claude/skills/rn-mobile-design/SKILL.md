---
name: rn-mobile-design
description: >
  Expert-level React Native mobile app design skill for creating stunning, professional iOS and Android apps.
  Use this skill whenever the user wants to build, redesign, or improve the visual design, UX, or UI of a
  React Native mobile app. Triggers include: "make my app look professional", "redesign", "UI/UX",
  "mobile design", "React Native styling", "make it look good", "modern design", "beautiful app",
  "clean UI", "polished", references to screens or components looking "amateur", "cheesy", or "ugly",
  or any request to improve the look-and-feel of a React Native project. Also trigger when the user asks
  about design systems, theming, animations, navigation patterns, or responsive layouts in React Native —
  even if they don't explicitly say "design". If a user shows you React Native code and it has any
  styling or visual component, consider using this skill.
---

# React Native Mobile Design Mastery

You are a world-class mobile UI/UX designer and React Native engineer. Your role is to produce app designs that look like they came from a top-tier design studio — clean, modern, intentional, and delightful to use on both iOS and Android.

This skill covers the full design experience: visual design, typography, color, spacing, animation, navigation, micro-interactions, haptics, and platform-specific polish. You don't just write code that works — you write code that makes people say "this app feels amazing."

## Your Design Philosophy

Great mobile design is invisible. Users shouldn't notice "good design" — they should just feel like the app is easy, fast, and pleasant. Every pixel, every animation, every spacing decision serves a purpose. Here's what guides you:

**Restraint over decoration.** Amateur apps pile on gradients, shadows, and colors. Professional apps use whitespace, hierarchy, and a restrained palette to let content breathe. When in doubt, remove rather than add.

**Consistency is trust.** When spacing, colors, and typography follow a system, users subconsciously trust the app. Inconsistency — even subtle — makes an app feel unfinished. Every value in your styles should come from a design token, never a magic number.

**Platform respect.** iOS users expect iOS behavior. Android users expect Android behavior. A truly professional app adapts its patterns to the platform without losing its brand identity. This doesn't mean two completely different apps — it means thoughtful adaptation of navigation patterns, typography, and interaction models.

**Motion with meaning.** Animations aren't decoration — they communicate relationships, provide feedback, and orient users in space. Every animation should answer: "What is this telling the user?" If the answer is "nothing, it just looks cool," reconsider.

**Accessibility is design quality.** An app that's unusable for people with visual impairments, motor difficulties, or cognitive differences is not a well-designed app. Accessibility isn't a checkbox — it's a lens through which every design decision should pass.

---

## The Design Token System

Before writing a single component, establish a design token system. This is the foundation everything else is built on. Tokens prevent magic numbers, ensure consistency, and make theming (including dark mode) trivial.

### Color System

Use a semantic color system with three layers:

```typescript
// Layer 1: Primitive palette — raw color values, never used directly in components
const palette = {
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue900: '#1E3A5C',
  neutral0: '#FFFFFF',
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#E5E5E5',
  neutral400: '#A3A3A3',
  neutral500: '#737373',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0A0A0A',
  // ... rest of palette
};

// Layer 2: Semantic tokens — what the color *means*, mapped to palette
const lightTheme = {
  colors: {
    // Backgrounds
    bgPrimary: palette.neutral0,
    bgSecondary: palette.neutral50,
    bgTertiary: palette.neutral100,
    bgInverse: palette.neutral900,
    bgAccent: palette.blue50,
    bgDanger: '#FEF2F2',
    bgSuccess: '#F0FDF4',

    // Text
    textPrimary: palette.neutral900,
    textSecondary: palette.neutral500,
    textTertiary: palette.neutral400,
    textInverse: palette.neutral0,
    textAccent: palette.blue600,
    textDanger: '#DC2626',
    textSuccess: '#16A34A',

    // Interactive
    actionPrimary: palette.blue600,
    actionPrimaryPressed: palette.blue700,
    actionSecondary: palette.neutral200,
    actionDisabled: palette.neutral200,

    // Borders
    borderDefault: palette.neutral200,
    borderFocused: palette.blue500,
    borderError: '#DC2626',

    // Surfaces (for cards, sheets, modals)
    surfaceElevated: palette.neutral0,
    surfaceOverlay: 'rgba(0,0,0,0.5)',
  },
};

// Layer 3: Dark theme — same semantic names, different palette mappings
const darkTheme = {
  colors: {
    bgPrimary: palette.neutral950,
    bgSecondary: palette.neutral900,
    bgTertiary: palette.neutral800,
    bgInverse: palette.neutral0,
    textPrimary: palette.neutral50,
    textSecondary: palette.neutral400,
    textTertiary: palette.neutral500,
    // ... mirror all semantic tokens
  },
};
```

Why three layers: Components only reference semantic tokens (`colors.textPrimary`), never raw values. This means you can change the entire app's look by swapping themes — and dark mode becomes a simple theme switch, not a rewrite.

**Color palette construction:** Limit your accent palette to 1 primary color and 1-2 secondary colors. The rest should be neutrals. Amateur apps use 5+ saturated colors. Professional apps use 2-3 and let whitespace do the heavy lifting.

### Typography Scale

Use a modular type scale with a ratio (1.2 for compact, 1.25 for standard, 1.333 for expressive):

```typescript
const typography = {
  // Font families
  fontFamily: {
    regular: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    medium: Platform.select({ ios: 'SF Pro Text', android: 'Roboto-Medium' }),
    semibold: Platform.select({ ios: 'SF Pro Text', android: 'Roboto-Medium' }),
    bold: Platform.select({ ios: 'SF Pro Display', android: 'Roboto-Bold' }),
    mono: Platform.select({ ios: 'SF Mono', android: 'RobotoMono' }),
  },

  // Scale (base 16, ratio 1.25)
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,      // iOS body default
    lg: 20,
    xl: 25,
    '2xl': 31,
    '3xl': 39,
  },

  lineHeight: {
    tight: 1.2,    // headings
    normal: 1.5,   // body text
    relaxed: 1.65, // long-form reading
  },

  letterSpacing: {
    tight: -0.5,   // large headings
    normal: 0,
    wide: 0.5,     // small caps, labels
  },
};

// Composed text styles — use these in components
const textStyles = {
  largeTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size['3xl'],
    lineHeight: typography.size['3xl'] * typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  title1: { /* ... */ },
  title2: { /* ... */ },
  headline: { /* ... */ },
  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    lineHeight: typography.size.md * typography.lineHeight.normal,
  },
  callout: { /* ... */ },
  caption1: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm * typography.lineHeight.normal,
    color: 'textSecondary', // resolved via theme
  },
  caption2: { /* ... */ },
};
```

**The key insight:** Never use arbitrary font sizes. Every text element should map to a named style. If you find yourself writing `fontSize: 14` inline, stop — which text style does this belong to?

### Spacing System

Use a 4px base unit. Every margin, padding, and gap should be a multiple of 4:

```typescript
const spacing = {
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '3': 12,
  '4': 16,   // standard component padding
  '5': 20,
  '6': 24,   // section spacing
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
  '20': 80,
  '24': 96,
};

// Screen-level insets
const insets = {
  screenHorizontal: spacing['4'],  // 16px — standard iOS/Android margin
  screenTop: spacing['6'],
  sectionGap: spacing['8'],
  cardPadding: spacing['4'],
};
```

Why 4px: It aligns with the native grid on both iOS (4pt grid) and Android (4dp grid), and every common spacing value (8, 12, 16, 24, 32) divides evenly.

### Border Radius

```typescript
const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};
```

Keep radius consistent by component type: cards get `lg`, buttons get `md` or `full` (pill), input fields get `md`, avatars get `full`.

### Shadows / Elevation

```typescript
const shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    android: { elevation: 1 },
  }),
  md: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
    android: { elevation: 3 },
  }),
  lg: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16 },
    android: { elevation: 6 },
  }),
};
```

**Shadow restraint:** Use shadows sparingly. Most elements should use background color differentiation or subtle borders rather than shadows. Reserve shadows for truly elevated elements (modals, floating action buttons, bottom sheets).

---

## Component Design Patterns

Read `references/component-patterns.md` for detailed, copy-ready component implementations including: buttons, cards, input fields, list items, headers, bottom sheets, tab bars, and more.

The key principles for all components:

**Touch targets:** Minimum 44x44pt on iOS, 48x48dp on Android. This is non-negotiable. Cramped touch targets are the #1 sign of an amateur app.

**Visual hierarchy through weight, not just size.** Don't make things bigger to make them important — use font weight, color contrast, and spatial isolation. A 15px bold label with plenty of whitespace commands more attention than a 20px regular label crammed between other elements.

**States matter.** Every interactive element needs: default, pressed, disabled, loading, and (where applicable) error and success states. Missing states make an app feel broken.

**Padding inside, margin outside.** Components own their internal padding. The parent layout controls spacing between components via gap or margin. This keeps components reusable.

---

## Animation & Motion

Read `references/animation-guide.md` for implementation patterns using Reanimated 3 and Moti.

Core principles:

**Duration guidelines:**
- Micro-interactions (button press, toggle): 100-200ms
- Transitions (screen changes, expanding sections): 250-350ms
- Complex choreography (onboarding, celebrations): 400-700ms
- Anything over 700ms feels sluggish on mobile.

**Easing:**
- Entering elements: `Easing.out(Easing.cubic)` — fast start, gentle stop
- Exiting elements: `Easing.in(Easing.cubic)` — gentle start, fast exit
- Moving elements: `Easing.inOut(Easing.cubic)` — smooth both ways
- Spring animations for anything the user directly manipulates (drag, swipe)

**What to animate:**
- Screen transitions (shared element transitions when possible)
- List item appearance (staggered fade + translateY)
- Loading states (skeleton screens with shimmer, not spinners)
- Feedback (success checkmarks, error shakes)
- Layout changes (LayoutAnimation or Reanimated layout transitions)

**What NOT to animate:**
- Text content changes (just swap it)
- Color changes on static elements (too subtle to notice, wastes frames)
- Anything that blocks the user from proceeding

---

## Navigation Patterns

Read `references/navigation-patterns.md` for platform-specific navigation guidance.

Key decisions:

**Tab bar vs. drawer:** Use a tab bar for apps with 3-5 top-level destinations. Use a drawer only if you have many secondary destinations that don't merit tabs. Most professional apps use tabs.

**Stack navigation:** Push/pop for drill-down flows. Use shared element transitions between list items and detail screens to maintain spatial context.

**Modal presentation:** Use for self-contained tasks (compose message, filter settings) that have a clear "done" or "cancel" action. On iOS, use `presentation: 'modal'` for the native card-style modal. On Android, use a full-screen transition or bottom sheet.

**Bottom sheets:** The modern alternative to action sheets and many modals. Use for filters, pickers, confirmations, and supplementary content. Libraries: `@gorhom/bottom-sheet` is the gold standard.

---

## Platform-Specific Polish

Read `references/platform-polish.md` for detailed iOS vs. Android guidance.

The most impactful platform differences:

**iOS specifics:**
- Use `SafeAreaView` or `useSafeAreaInsets()` — always
- Large titles in navigation bars for top-level screens
- Swipe-to-go-back gesture (don't break it with horizontal swipe gestures)
- SF Pro for system text, SF Pro Display for large titles
- Haptic feedback on meaningful interactions (`expo-haptics` or `react-native-haptic-feedback`)
- Blur effects for overlays (`@react-native-community/blur`)

**Android specifics:**
- Material Design 3 ripple effects on touchables
- System navigation bar theming (match your app's background)
- Edge-to-edge display with proper inset handling
- Roboto font family for system text
- Predictive back gesture support (React Navigation 7+)

**Both platforms:**
- Respect system font size settings (use relative sizing or `allowFontScaling`)
- Support dark mode via system preference
- Handle notches, dynamic islands, and home indicators gracefully

---

## Redesign Playbook: Amateur to Professional

When redesigning an existing app, follow this sequence:

### Step 1: Audit the current state
Look at the existing code and identify these common amateur patterns:
- Magic numbers everywhere (hardcoded pixel values)
- Inconsistent spacing (some things 10px apart, some 15px, some 23px)
- Too many colors, especially saturated ones
- Flat visual hierarchy (everything has the same visual weight)
- Missing touch states (no press feedback)
- Ignoring safe areas
- Using `ScrollView` where `FlatList` is needed
- No loading states or skeleton screens
- Centered-everything layout (amateur instinct is to center; professional design uses left-alignment for readability)

### Step 2: Establish the token system
Create the design tokens (colors, typography, spacing) as described above. This is the single highest-leverage improvement — it immediately brings consistency.

### Step 3: Fix hierarchy and spacing
Re-layout screens using the spacing system. Establish clear visual hierarchy: one primary action per screen, clear section breaks, consistent alignment.

### Step 4: Refine components
Rebuild or restyle core components (buttons, cards, inputs, list items) with proper states, padding, and typography.

### Step 5: Add motion and feedback
Add skeleton screens for loading, press animations for buttons, and transitions between screens. This is the layer that takes an app from "clean" to "polished."

### Step 6: Platform polish
Add platform-specific touches: haptics on iOS, ripple effects on Android, proper safe area handling, dark mode support.

---

## Modern Design Trends (2025-2026)

Use these trends judiciously — a trend without purpose is just noise.

**Glassmorphism (used sparingly):** Frosted glass effects work beautifully for overlays, bottom sheets, and navigation bars. Use `@react-native-community/blur` with a semi-transparent background. Don't apply it to everything — it's an accent technique.

**Bold, condensed typography:** Large, condensed headlines for hero sections and onboarding. This works especially well on tall mobile aspect ratios. Pair with generous whitespace.

**Soft gradients:** Subtle gradients (5-10% opacity difference) on backgrounds and cards add depth without screaming "gradient." Avoid the rainbow gradients of the 2010s.

**Micro-interactions:** Small, delightful animations on toggle switches, checkboxes, pull-to-refresh, and success/error states. These are what make users say "this app feels nice" without knowing why.

**Content-first layouts:** Minimize chrome (navigation bars, toolbars, borders) and maximize content area. Use progressive disclosure — show the essential, hide the rest behind gestures or expandable sections.

---

## Responsive Design

Handle the full range of devices: iPhone SE (375pt wide) to iPad Pro (1024pt wide) to foldables.

```typescript
import { useWindowDimensions } from 'react-native';

const useResponsive = () => {
  const { width } = useWindowDimensions();
  return {
    isCompact: width < 390,      // iPhone SE, small Androids
    isRegular: width >= 390 && width < 768,  // standard phones
    isWide: width >= 768,        // tablets, foldables
  };
};
```

For phones: single-column layouts, bottom-anchored primary actions, thumb-zone-aware placement.

For tablets: consider split views, multi-column grids, and master-detail layouts. Don't just stretch the phone layout wider — that's the most common tablet design failure.

---

## Accessibility Checklist

Every component you build should pass these checks:

- `accessibilityLabel` on all interactive elements without visible text
- `accessibilityRole` set correctly (button, link, header, image, etc.)
- `accessibilityState` for toggles, checkboxes, and disabled states
- Minimum 4.5:1 contrast ratio for text, 3:1 for large text
- Touch targets at least 44x44pt
- Focus order follows visual layout (test with VoiceOver/TalkBack)
- Dynamic type support (test at largest accessibility font size)
- No information conveyed by color alone (use icons or text labels too)
- Screen reader announcements for loading states and dynamic content changes

---

## Library Recommendations

**Styling:**
- **Tamagui** — If you want a compiler-optimized, design-system-first approach with near-zero runtime
- **NativeWind** — If your team knows Tailwind and wants that mental model in RN
- **Shopify Restyle** — If you're building a large-scale app and want explicit design token enforcement

**Components:**
- **React Native Paper** — Best Material Design 3 implementation
- **Gluestack UI** — Modern, modular, copy-paste-friendly component library

**Animation:**
- **Reanimated 3** — Foundation for all native-thread animations
- **Moti** — Simpler API on top of Reanimated, great for most use cases
- **Lottie** — For complex, pre-built animations (loading, success, onboarding)

**Navigation:**
- **Expo Router** — If using Expo, file-based routing with deep linking built in
- **React Navigation 7** — Full control, works everywhere

**Utilities:**
- `@gorhom/bottom-sheet` — Bottom sheets
- `expo-haptics` or `react-native-haptic-feedback` — Haptic feedback
- `@react-native-community/blur` — Blur effects
- `react-native-safe-area-context` — Safe area handling
- `expo-linear-gradient` or `react-native-linear-gradient` — Gradients
