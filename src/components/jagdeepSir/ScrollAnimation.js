import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Layout constants (mirrors NewSphereGroup container style) ────────────────
const SCROLL_DISTANCE = 280;

const COLUMN_GAP = 10;
const ROW_GAP = 8;

const OUTER_H_PAD = 30;
const ORIG_BOX = (SCREEN_WIDTH - OUTER_H_PAD * 2 - COLUMN_GAP) / 2.5;

const V_PAD_TOP = 14;
const V_PAD_BOTTOM = 36;

const HEADER_ORIG_HEIGHT = V_PAD_TOP + ORIG_BOX * 2 + ROW_GAP + V_PAD_BOTTOM;

const FINAL_H_PAD = 20;
const FINAL_GAP = 8;
const FINAL_BOX = (SCREEN_WIDTH - FINAL_H_PAD * 2 - FINAL_GAP * 3) / 4;
const FINAL_V_PAD = 10;
const HEADER_FINAL_HEIGHT = FINAL_V_PAD * 2 + FINAL_BOX;

const SCALE = FINAL_BOX / ORIG_BOX;

// ─── Position math ────────────────────────────────────────────────────────────
const GRID_W = ORIG_BOX * 2 + COLUMN_GAP;
const GRID_LEFT = (SCREEN_WIDTH - GRID_W) / 2;

const origCX = col => GRID_LEFT + col * (ORIG_BOX + COLUMN_GAP) + ORIG_BOX / 2;
const origCY = row => V_PAD_TOP + row * (ORIG_BOX + ROW_GAP) + ORIG_BOX / 2;

const finalCX = slot =>
  FINAL_H_PAD + slot * (FINAL_BOX + FINAL_GAP) + FINAL_BOX / 2;
const FINAL_CY = FINAL_V_PAD + FINAL_BOX / 2;

// ─── Speed config per row ─────────────────────────────────────────────────────
//  Upper row (row 0): moves fast — X and Y both complete early in scroll
//  Lower row (row 1): moves slow — X and Y complete later in scroll
//  Scale: tied to lower row's pace so both rows finish scaling together

const UPPER_X_END = SCROLL_DISTANCE * 0.15; // X motion done by 15% scroll
const UPPER_Y_END = SCROLL_DISTANCE * 0.4; // Y motion done by 40% scroll

const LOWER_X_END = SCROLL_DISTANCE * 0.2; // X motion done by 50% scroll
const LOWER_Y_END = SCROLL_DISTANCE * 0.5; // Y motion done by 50% scroll

// Scale is synced to the lower row's X pace
const SCALE_END = LOWER_X_END;

// ─── Box definitions ──────────────────────────────────────────────────────────
const BOXES = [
  { row: 0, col: 0, finalSlot: 0, color: '#5B6EF5' }, // top-left  — fast
  { row: 0, col: 1, finalSlot: 1, color: '#F55B8A' }, // top-right — fast
  { row: 1, col: 0, finalSlot: 2, color: '#F5A55B' }, // bot-left  — slow
  { row: 1, col: 1, finalSlot: 3, color: '#5BF5C2' }, // bot-right — slow
];

// ─── Single sphere ────────────────────────────────────────────────────────────
function SphereBox({ box, scrollY }) {
  const { row, col, finalSlot, color } = box;

  const tx = finalCX(finalSlot) - origCX(col);
  const ty = FINAL_CY - origCY(row);

  const isUpperRow = row === 0;

  const xEnd = isUpperRow ? UPPER_X_END : LOWER_X_END;
  const yEnd = isUpperRow ? UPPER_Y_END : LOWER_Y_END;

  const animStyle = useAnimatedStyle(() => {
    // X translation — row-specific speed
    const progressX = interpolate(
      scrollY.value,
      [0, xEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );

    // Y translation — row-specific speed
    const progressY = interpolate(
      scrollY.value,
      [0, yEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );

    // Scale — synced to lower row pace (both rows scale at the same rate)
    const progressScale = interpolate(
      scrollY.value,
      [0, SCALE_END],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: interpolate(progressX, [0, 1], [0, tx]) },
        { translateY: interpolate(progressY, [0, 1], [0, ty]) },
        { scale: interpolate(progressX, [0, 1], [1, SCALE]) },
      ],
    };
  });

  return (
    <View style={styles.sphereWrapper}>
      <Animated.View
        style={[
          styles.sphere,
          {
            width: ORIG_BOX,
            height: ORIG_BOX,
            borderRadius: ORIG_BOX / 2,
            backgroundColor: color,
          },
          animStyle,
        ]}
      />
    </View>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ScrollBoxAnimation() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [HEADER_ORIG_HEIGHT, HEADER_FINAL_HEIGHT],
      Extrapolation.CLAMP,
    ),
  }));

  const contentPaddingStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [HEADER_ORIG_HEIGHT + 20, HEADER_FINAL_HEIGHT + 20],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <Animated.View style={[styles.header, headerStyle]}>
        <View style={styles.container}>
          {BOXES.map((box, i) => (
            <SphereBox key={i} box={box} scrollY={scrollY} />
          ))}
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={contentPaddingStyle}>
          <View style={styles.bigCard} />
          <View style={{ height: SCREEN_HEIGHT * 0.6 }} />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'center',
    marginTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    minHeight: HEADER_FINAL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    columnGap: COLUMN_GAP,
    rowGap: ROW_GAP,
  },
  sphereWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sphere: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  bigCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    minHeight: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#FFFFFF',
  },
});
