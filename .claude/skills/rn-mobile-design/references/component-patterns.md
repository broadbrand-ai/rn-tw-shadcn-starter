# Component Design Patterns

Production-ready component patterns that embody professional mobile design. Each pattern includes the "why" behind design decisions.

## Table of Contents
1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Input Fields](#input-fields)
4. [List Items](#list-items)
5. [Headers & Navigation Bars](#headers)
6. [Bottom Sheets](#bottom-sheets)
7. [Tab Bars](#tab-bars)
8. [Empty States](#empty-states)
9. [Loading & Skeleton Screens](#loading)
10. [Badges & Tags](#badges)

---

## Buttons

Buttons are the most common interactive element. Getting them right sets the tone for the entire app.

### Design Rules

- **One primary button per screen.** If everything is emphasized, nothing is. Use secondary and ghost variants for less important actions.
- **Full-width for major actions,** standard-width for inline or secondary actions.
- **Minimum height: 48px** (iOS and Android touch target). For primary CTAs, 52-56px feels more premium.
- **Horizontal padding: 24px minimum** — buttons need breathing room inside.
- **Border radius: `md` (10px)** for standard, `full` (pill) for floating or call-to-action buttons.
- **Always include pressed state.** Opacity reduction (0.85) + subtle scale (0.98) gives satisfying feedback.
- **Loading state:** Replace text with an ActivityIndicator, keep the button the same size (prevents layout shift).
- **Disabled state:** Reduce opacity to 0.4 and set `accessibilityState={{ disabled: true }}`.

### Implementation Pattern

```tsx
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heights = { sm: 40, md: 48, lg: 56 };
  const paddingH = { sm: 16, md: 24, lg: 32 };
  const fontSize = { sm: 14, md: 16, lg: 17 };

  return (
    <AnimatedPressable
      style={[
        styles.base,
        styles[variant],
        {
          height: heights[size],
          paddingHorizontal: paddingH[size],
          alignSelf: fullWidth ? 'stretch' : 'center',
          opacity: disabled ? 0.4 : 1,
        },
        animatedStyle,
      ]}
      disabled={disabled || loading}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : theme.colors.actionPrimary}
          size="small"
        />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`], { fontSize: fontSize[size] }]}>
          {label}
        </Text>
      )}
    </AnimatedPressable>
  );
}
```

---

## Cards

Cards group related content. They're the building block of most list and detail screens.

### Design Rules

- **Padding: 16px** (matches `spacing[4]`). For dense lists, 12px works.
- **Border radius: `lg` (14px)** — slightly rounded corners feel modern without being bubbly.
- **Elevation strategy:** Choose ONE approach per app:
  - **Subtle shadow** (`shadows.sm`) on white background — classic, clean
  - **Background differentiation** — card is `bgSecondary`, screen is `bgPrimary` — flat and modern
  - **Border** — 1px `borderDefault` — minimal, works great in dark mode
- **Don't mix elevation strategies** in the same app. Pick one and commit.
- **Content spacing:** Use 12px between content blocks inside a card, 8px between closely related items (like icon + label).
- **Interactivity:** If the whole card is tappable, add a subtle press state (opacity 0.7 or slight background color shift). Include the entire card in a Pressable, not just part of it.

### Implementation Pattern

```tsx
export function Card({ children, onPress, style }) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && { opacity: 0.85 },
          style,
        ]}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

// Card styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: radii.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
});
```

---

## Input Fields

Text inputs are where users interact most — they must feel effortless.

### Design Rules

- **Height: 48-52px.** Taller inputs feel more spacious and premium.
- **Padding: 16px horizontal,** vertically centered text.
- **Border approach:** Use a 1.5px border that changes color on focus. The focus color should be your primary accent. Error gets `borderError`. This is the clearest, most accessible approach.
- **Label placement:** Floating labels (that animate from placeholder position to above the field on focus) are the gold standard for space efficiency. If not floating, place labels above the field with 6px gap.
- **Placeholder text:** Use `textTertiary` color. Keep placeholders short and helpful (example values, not instructions).
- **Error messages:** Appear below the field with 4px gap, in `textDanger` color and `caption1` style. Animate in with a height transition so they don't cause layout jumps.
- **Character counts:** Right-aligned below the field, `textTertiary`.
- **Clear button:** Show an X icon inside the field when it has content and is focused.
- **Don't forget:** Set appropriate `keyboardType`, `autoCapitalize`, `autoComplete`, `returnKeyType`, and `textContentType` (iOS autofill hints).

---

## List Items

Most apps are fundamentally lists. Professional list items have a specific anatomy.

### Design Rules

- **Standard height: 56-72px** depending on content density.
- **Left zone (optional):** Avatar, icon, or checkbox — aligned center-vertically.
- **Content zone:** Title (body weight) + optional subtitle (caption style, `textSecondary`).
- **Right zone (optional):** Accessory — chevron, switch, badge, or metadata.
- **Separator lines:** Use them between items, but inset from the left to align with the content zone (not edge-to-edge). Use `borderDefault` at 0.5-1px. Better yet: use spacing instead of separators for a cleaner look.
- **Swipe actions:** Destructive action (delete) on the right swipe, constructive actions (archive, pin) on left. Use `react-native-gesture-handler` and `Reanimated` for 60fps swipe animations.
- **Press state:** Background color shift to `bgSecondary`. Don't use opacity changes on list items — it looks cheap at scale.

### Anatomy Pattern

```tsx
<Pressable style={({ pressed }) => [
  styles.listItem,
  pressed && { backgroundColor: theme.colors.bgSecondary },
]}>
  {/* Left zone */}
  <Avatar source={item.avatar} size={40} />

  {/* Content zone — flex: 1 so it takes remaining space */}
  <View style={{ flex: 1, marginLeft: 12 }}>
    <Text style={textStyles.body}>{item.title}</Text>
    <Text style={textStyles.caption1} numberOfLines={1}>{item.subtitle}</Text>
  </View>

  {/* Right zone */}
  <ChevronRight size={20} color={theme.colors.textTertiary} />
</Pressable>
```

---

## Headers

### Design Rules

- **iOS:** Use large titles (`navigationBar.prefersLargeTitles`) for top-level screens. Standard (small) titles for pushed screens. React Navigation supports this natively.
- **Android:** Standard toolbar height (56dp). Title left-aligned (Material 3 default).
- **Custom headers:** If you need custom headers, still respect safe areas and maintain the platform's expected height.
- **Search integration:** On iOS, embed search bars in the navigation bar that collapse on scroll. On Android, use a search icon that expands into a search field.
- **Transparency/blur:** For headers over scrolling content, use blur + semi-transparency for a premium feel (especially on iOS).

---

## Bottom Sheets

The modern replacement for many modals and action sheets.

### Design Rules

- **Use `@gorhom/bottom-sheet`** — it's the most polished and performant option.
- **Snap points:** Provide 2-3 snap points. Common pattern: 30% (peek), 60% (half), 90% (full).
- **Handle indicator:** A small pill-shaped handle at the top (40x4px, `borderDefault` color, centered).
- **Background dimming:** `surfaceOverlay` behind the sheet that fades in/out.
- **Border radius:** Only on top corners. Use `xl` (20px) for a generous, modern feel.
- **Content padding:** Use screen-level horizontal insets inside the sheet.
- **Keyboard handling:** The sheet should expand when the keyboard appears to keep inputs visible.

---

## Tab Bars

### Design Rules

- **Max 5 tabs.** More than 5 creates tiny, hard-to-tap targets and decision fatigue.
- **Icon + label on all tabs.** Icons alone are ambiguous. Labels alone waste vertical space. Both together is clearest.
- **Active state:** Filled icon + accent color. Inactive: outlined icon + `textTertiary`.
- **iOS:** Translucent blur background, centered icons+labels, no top border (or very subtle).
- **Android:** Opaque background with subtle top elevation or border. Material 3 uses an active indicator pill around the icon.
- **Height:** 49pt on iOS (standard), 80dp on Android (Material 3 with label).
- **Badge handling:** Dot badge (no number) for simple notifications, number badge for counts.

---

## Empty States

Often overlooked, empty states are a chance to delight and guide.

### Design Rules

- **Always have one.** A blank screen with no guidance is hostile.
- **Structure:** Illustration (optional) + headline + body text + action button.
- **Center vertically** in the available space (not at the top).
- **Illustration:** Keep it simple — a single-color or dual-tone illustration. Not a photo. Not a complex scene.
- **Copy:** Be helpful, not cute. "No messages yet" is better than "It's quiet in here... too quiet!" for most apps.
- **Action button:** If the user can fix the empty state (e.g., "Create your first project"), include a CTA.

---

## Loading & Skeleton Screens

### Design Rules

- **Skeleton screens over spinners.** Skeletons preview the layout that's coming, reducing perceived wait time. Spinners give zero information about what's loading.
- **Shimmer animation:** A subtle left-to-right gradient sweep at ~1.5s cycle. Use Reanimated + LinearGradient.
- **Match the real layout:** Skeleton shapes should closely match the content they replace — text lines, avatars, images, buttons.
- **Colors:** Use `bgSecondary` for skeleton base, `bgTertiary` for the shimmer highlight. Very subtle.
- **Don't skeleton everything.** Navigation bars, tab bars, and static UI should remain visible. Only skeleton the dynamic content area.
- **Transition:** Fade in the real content over 200ms when it arrives. Don't just swap it in.

---

## Badges & Tags

### Design Rules

- **Dot badge:** 8x8px circle, `actionPrimary` or `textDanger`. No text. For simple "new" indicators.
- **Number badge:** Min 18px diameter, pill shape, `textDanger` background with `textInverse` text. Cap at "99+".
- **Tags/chips:** Height 28-32px, `bgAccent` or `bgSecondary` background, `sm` border radius. For filters, categories, statuses.
- **Status colors:** Be consistent — green for success/active, yellow/amber for warning/pending, red for error/destructive, blue for info/primary. Define these in your token system and reuse everywhere.
