import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SingleSphere from './singleSphere';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Layout constants ─────────────────────────────────────────────────────────
const SCROLL_DISTANCE = 280;

const COLUMN_GAP = 8;
const ROW_GAP = 8;
const OUTER_H_PAD = 30;
const ORIG_BOX = (SCREEN_WIDTH - OUTER_H_PAD * 2 - COLUMN_GAP) / 2.5;

const V_PAD_TOP = 14;

const FINAL_H_PAD = 20;
const FINAL_GAP = 4;
const FINAL_BOX = (SCREEN_WIDTH - FINAL_H_PAD * 2 - FINAL_GAP * 3) / 4;
const FINAL_V_PAD = 10;

const SCALE = FINAL_BOX / ORIG_BOX;
const LEGEND_FINAL_SCALE = 0.78;

// ── Instant swap threshold ────────────────────────────────────────────────────
// Original visible below this, final visible at or above — same frame, no gap.
const SWAP_THRESHOLD = SCROLL_DISTANCE * 0.6;

// ─── Position math ────────────────────────────────────────────────────────────
const GRID_W = ORIG_BOX * 2 + COLUMN_GAP;
const GRID_LEFT = (SCREEN_WIDTH - GRID_W) / 2;

const origCX = col => GRID_LEFT + col * (ORIG_BOX + COLUMN_GAP) + ORIG_BOX / 2;
const origCY = row => V_PAD_TOP + row * (ORIG_BOX + ROW_GAP) + ORIG_BOX / 2;
const finalCX = slot =>
  FINAL_H_PAD + slot * (FINAL_BOX + FINAL_GAP) + FINAL_BOX / 2;
const FINAL_CY = FINAL_V_PAD + FINAL_BOX / 2;

// ─── Assets ───────────────────────────────────────────────────────────────────
const SPHERE_ASSETS = {
  glow: {
    uri: 'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main/common/glow.png',
  },
  performDot: {
    uri: 'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main/common/perform_dot.png',
  },
  fuelDot: {
    uri: 'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main/common/fuel_dot.png',
  },
  restoreDot: {
    uri: 'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main/common/restore_dot.png',
  },
  mindfulDot: {
    uri: 'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main/common/mindful_dot.png',
  },
};

// ─── Sphere config ────────────────────────────────────────────────────────────
const SPHERE_CONFIG = [
  {
    row: 0,
    col: 0,
    finalSlot: 0,
    key: 'perform',
    xEnd: SCROLL_DISTANCE * 0.6,
    yEnd: SCROLL_DISTANCE * 0.6,
    scaleEnd: SCROLL_DISTANCE * 0.6,
  },
  {
    row: 0,
    col: 1,
    finalSlot: 1,
    key: 'fuel',
    xEnd: SCROLL_DISTANCE * 0.6,
    yEnd: SCROLL_DISTANCE * 0.6,
    scaleEnd: SCROLL_DISTANCE * 0.6,
  },
  {
    row: 1,
    col: 0,
    finalSlot: 2,
    key: 'restore',
    xEnd: SCROLL_DISTANCE * 0.6,
    yEnd: SCROLL_DISTANCE * 0.6,
    scaleEnd: SCROLL_DISTANCE * 0.5,
  },
  {
    row: 1,
    col: 1,
    finalSlot: 3,
    key: 'mindful',
    xEnd: SCROLL_DISTANCE * 0.6,
    yEnd: SCROLL_DISTANCE * 0.6,
    scaleEnd: SCROLL_DISTANCE * 0.5,
  },
];

// ─── Legend original ──────────────────────────────────────────────────────────
const _LegendOriginal = ({
  type,
  progress,
  iconRight = false,
  icon,
  iconLeft = false,
  onPress,
}) => {
  const isBottomLegend = type === 'RESTORE' || type === 'MINDFUL';
  const isFuel = type === 'FUEL';
  return (
    <TouchableOpacity activeOpacity={0.7} hitSlop={5} onPress={onPress}>
      <View style={{ width: 'auto' }}>
        {isBottomLegend ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              {iconLeft && (
                <Image
                  source={icon}
                  style={[
                    styles.legendIcon(0),
                    {
                      transform: [
                        { translateX: String(progress).length > 2 ? 6 : 0 },
                      ],
                    },
                  ]}
                  resizeMode="stretch"
                />
              )}
              <Text
                style={styles.legendPercentage(false)}
              >{`${progress}%`}</Text>
              {iconRight && (
                <Image
                  source={icon}
                  style={[
                    styles.legendIcon(0),
                    {
                      transform: [
                        { translateX: String(progress).length > 2 ? -6 : 0 },
                      ],
                    },
                  ]}
                  resizeMode="stretch"
                />
              )}
            </View>
            <Text style={styles.legendText(iconLeft, true)}>{type}</Text>
          </>
        ) : (
          <>
            <Text style={styles.legendText(isFuel, false)}>{type}</Text>
            <View style={{ flexDirection: 'row' }}>
              {iconLeft && (
                <Image
                  source={icon}
                  style={[
                    styles.legendIcon(true),
                    {
                      transform: [
                        { translateX: String(progress).length > 2 ? 6 : 0 },
                      ],
                    },
                  ]}
                  resizeMode="stretch"
                />
              )}
              <Text
                style={styles.legendPercentage(true)}
              >{`${progress}%`}</Text>
              {iconRight && (
                <Image
                  source={icon}
                  style={[
                    styles.legendIcon(true),
                    {
                      transform: [
                        { translateX: String(progress).length > 2 ? -6 : 0 },
                      ],
                    },
                  ]}
                  resizeMode="stretch"
                />
              )}
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ─── Legend final — label on top, percentage below, centered ─────────────────
const _LegendFinal = ({ type, progress, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} hitSlop={5} onPress={onPress}>
    <View style={styles.legendFinalContainer}>
      <Text style={styles.legendFinalLabel}>{type}</Text>
      <Text style={styles.legendFinalPercentage}>{`${progress}%`}</Text>
    </View>
  </TouchableOpacity>
);

const LegendOriginal = React.memo(_LegendOriginal);
const LegendFinal = React.memo(_LegendFinal);

// ─── Animated wrapper ─────────────────────────────────────────────────────────
function AnimatedSphereWrapper({
  row,
  col,
  finalSlot,
  legendOffset,
  children,
  scrollY,
  xEnd,
  yEnd,
  scaleEnd,
}) {
  const tx = finalCX(finalSlot) - origCX(col);
  const ty = FINAL_CY - origCY(row);
  const animEnd = Math.max(xEnd, yEnd);

  // ── Sphere ──
  const animStyle = useAnimatedStyle(() => {
    const progressX = interpolate(
      scrollY.value,
      [0, xEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const progressY = interpolate(
      scrollY.value,
      [0, yEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const progressS = interpolate(
      scrollY.value,
      [0, scaleEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: interpolate(progressX, [0, 1], [0, tx]) },
        { translateY: interpolate(progressY, [0, 1], [0, ty]) },
        { scale: interpolate(progressS, [0, 1], [1, SCALE]) },
      ],
    };
  });

  // ── Legend wrapper: slides to centre + counter-scales ──
  const legendWrapperStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      scrollY.value,
      [0, animEnd],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: interpolate(progress, [0, 1], [legendOffset.x, 0]) },
        { translateY: interpolate(progress, [0, 1], [legendOffset.y, 0]) },
        {
          scale: interpolate(
            progress,
            [0, 1],
            [1, (1 / SCALE) * LEGEND_FINAL_SCALE],
          ),
        },
      ],
    };
  });

  // ── Instant swap on UI thread — zero gap between labels ──
  const originalOpacityStyle = useAnimatedStyle(() => ({
    opacity: scrollY.value < SWAP_THRESHOLD ? 1 : 0,
  }));

  const finalOpacityStyle = useAnimatedStyle(() => ({
    opacity: scrollY.value >= SWAP_THRESHOLD ? 1 : 0,
  }));

  const [sphereChild, originalLegend, finalLegend] =
    React.Children.toArray(children);

  return (
    <Animated.View
      style={[
        styles.sphereWrapper,
        { width: ORIG_BOX, height: ORIG_BOX },
        animStyle,
      ]}
    >
      {sphereChild}
      <Animated.View style={[styles.legendWrapper, legendWrapperStyle]}>
        {/* Original — visible until SWAP_THRESHOLD */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.legendLayerCenter,
            originalOpacityStyle,
          ]}
        >
          {originalLegend}
        </Animated.View>

        {/* Final — visible from SWAP_THRESHOLD onward */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.legendLayerCenter,
            finalOpacityStyle,
          ]}
        >
          {finalLegend}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const NewSphereGroup = ({
  mindful,
  perform,
  fuel,
  restore,
  direction,
  onPressPerform = () => {},
  onPressFuel = () => {},
  onPressRestore = () => {},
  onPressMindful = () => {},
  scrollY: scrollYProp,
  ...props
}) => {
  const ownScrollY = useSharedValue(0);
  const scrollY = scrollYProp ?? ownScrollY;

  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [aggregateProgress, setAggregateProgress] = useState(0);
  const [performProgress, setPerformProgress] = useState(perform);
  const [fuelProgress, setFuelProgress] = useState(fuel);
  const [restoreProgress, setRestoreProgress] = useState(restore);
  const [mindfulProgress, setMindfulProgress] = useState(mindful);

  const glowOpacity = useSharedValue(0);

  const performSphere = useRef(null);
  const fuelSphere = useRef(null);
  const restoreSphere = useRef(null);
  const mindfulSphere = useRef(null);

  useEffect(() => {
    setPerformProgress(perform);
  }, [perform]);
  useEffect(() => {
    setFuelProgress(fuel);
  }, [fuel]);
  useEffect(() => {
    setRestoreProgress(restore);
  }, [restore]);
  useEffect(() => {
    setMindfulProgress(mindful);
  }, [mindful]);

  useEffect(() => {
    if (direction === 'normal') {
      setRotationSpeed(1);
      setAggregateProgress(0);
      setTimeout(() => {
        setPerformProgress(perform);
        setFuelProgress(fuel);
        setRestoreProgress(restore);
        setMindfulProgress(mindful);
      }, 1500);
    } else {
      setRotationSpeed(2);
      setPerformProgress(0);
      setFuelProgress(0);
      setRestoreProgress(0);
      setMindfulProgress(0);
      setTimeout(() => {
        setRotationSpeed(1);
        setAggregateProgress((perform + fuel + restore + mindful) / 4);
      }, 1500);
      setTimeout(() => {
        glowOpacity.value = withTiming(0.7, { duration: 1000 }, () => {
          glowOpacity.value = withTiming(0, { duration: 1000 });
        });
      }, 1900);
    }
  }, [direction]);

  const LEGEND_OFFSET = ORIG_BOX / 2 + 30;

  const sphereData = {
    perform: {
      progress: performProgress,
      rawProgress: perform,
      color: '#F75A00',
      icon: SPHERE_ASSETS.performDot,
      ref: performSphere,
      onPress: onPressPerform,
      legendOffset: { x: -LEGEND_OFFSET, y: -ORIG_BOX / 2 },
      iconLeft: false,
      iconRight: true,
      type: 'PERFORM',
    },
    fuel: {
      progress: fuelProgress,
      rawProgress: fuel,
      color: '#EFD457',
      icon: SPHERE_ASSETS.fuelDot,
      ref: fuelSphere,
      onPress: onPressFuel,
      legendOffset: { x: LEGEND_OFFSET, y: -ORIG_BOX / 2 },
      iconLeft: true,
      iconRight: false,
      type: 'FUEL',
    },
    restore: {
      progress: restoreProgress,
      rawProgress: restore,
      color: '#5BA9C8',
      icon: SPHERE_ASSETS.restoreDot,
      ref: restoreSphere,
      onPress: onPressRestore,
      legendOffset: { x: -LEGEND_OFFSET, y: ORIG_BOX / 2 },
      iconLeft: false,
      iconRight: true,
      type: 'RESTORE',
    },
    mindful: {
      progress: mindfulProgress,
      rawProgress: mindful,
      color: '#C558C8',
      icon: SPHERE_ASSETS.mindfulDot,
      ref: mindfulSphere,
      onPress: onPressMindful,
      legendOffset: { x: LEGEND_OFFSET, y: ORIG_BOX / 2 },
      iconLeft: true,
      iconRight: false,
      type: 'MINDFUL',
    },
  };

  return (
    <>
      <Animated.Image
        source={SPHERE_ASSETS.glow}
        style={[
          styles.glowImage,
          { height: props.height, width: props.width, opacity: glowOpacity },
        ]}
      />
      <View style={styles.container}>
        {SPHERE_CONFIG.map(sphere => {
          const data = sphereData[sphere.key];
          return (
            <AnimatedSphereWrapper
              key={sphere.key}
              row={sphere.row}
              col={sphere.col}
              finalSlot={sphere.finalSlot}
              xEnd={sphere.xEnd}
              yEnd={sphere.yEnd}
              scaleEnd={sphere.scaleEnd}
              scrollY={scrollY}
              legendOffset={data.legendOffset}
            >
              <SingleSphere
                {...props}
                ref={data.ref}
                rotationSpeed={rotationSpeed}
                progress={data.progress}
                color={data.color}
              />
              <LegendOriginal
                type={data.type}
                direction={direction}
                progress={data.rawProgress}
                icon={data.icon}
                iconLeft={data.iconLeft}
                iconRight={data.iconRight}
                onPress={data.onPress}
              />
              <LegendFinal
                type={data.type}
                progress={data.rawProgress}
                onPress={data.onPress}
              />
            </AnimatedSphereWrapper>
          );
        })}
      </View>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    columnGap: COLUMN_GAP,
    rowGap: ROW_GAP,
  },
  glowImage: {
    tintColor: '#F75A00',
    position: 'absolute',
    transform: [{ scale: 1.3 }],
  },
  sphereWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendWrapper: {
    position: 'absolute',
    width: ORIG_BOX * 1.6,
    height: ORIG_BOX * 1.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendLayerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendFinalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendFinalLabel: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  legendFinalPercentage: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legendIcon: top => ({ width: 25, height: 25, top: top ? -8 : -1 }),
  legendText: (right, hasMargin) => ({
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: right ? 'right' : 'left',
    marginTop: hasMargin ? -6 : 0,
  }),
  legendPercentage: hasMargin => ({
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: hasMargin ? -6 : 0,
  }),
});

export default NewSphereGroup;
