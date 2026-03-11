import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import SingleSphere from './singleSphere';

// Centralized Remote Assets
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

const NewSphereGroup = ({
  mindful,
  perform,
  fuel,
  restore,
  opacity,
  direction,
  onPressPerform = () => {},
  onPressFuel = () => {},
  onPressRestore = () => {},
  onPressMindful = () => {},
  ...props
}) => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [aggregateProgress, setAggregateProgress] = useState(0);
  const [performProgress, setPerformProgress] = useState(0);
  const [fuelProgress, setFuelProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [mindfulProgress, setMindfulProgress] = useState(0);

  const performSphere = useRef(null);
  const fuelSphere = useRef(null);
  const restoreSphere = useRef(null);
  const mindfulSphere = useRef(null);
  const aggregateSphere = useRef(null);
  const diagonalTopLeftRef = useRef(null);
  const diagonalTopRightRef = useRef(null);
  const diagonalBottomLeftRef = useRef(null);
  const diagonalBottomRightRef = useRef(null);
  const legendTopLeftRef = useRef(null);
  const legendBottomLeftRef = useRef(null);
  const legendTopRightRef = useRef(null);
  const legendBottomRightRef = useRef(null);
  const centerSphere = useRef(null);

  const glowOpacity = useSharedValue(0);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const firstTime = useRef(true);
  const prevDirection = useRef('');

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

  const aggregateAnimations = () => {
    const duration = direction === prevDirection.current ? 0 : 3000;
    const refs = [
      diagonalTopLeftRef,
      diagonalTopRightRef,
      diagonalBottomLeftRef,
      diagonalBottomRightRef,
      legendTopLeftRef,
      legendTopRightRef,
      legendBottomLeftRef,
      legendBottomRightRef,
      centerSphere,
    ];
    refs.forEach(ref => {
      if (ref.current) {
        const animationName =
          ref === centerSphere
            ? 'centerSphere'
            : ref.current.props.style.position === 'absolute'
              ? 'legendDiagonal'
              : 'diagonal';
        // Note: These animation names should be defined in your Animatable registry
        ref.current.animate(animationName, duration);
      }
    });
  };

  useLayoutEffect(() => {
    if (!firstTime.current) aggregateAnimations();
    firstTime.current = false;
    prevDirection.current = direction;
  }, [direction]);

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
        glowOpacity.value = withTiming(0.7, 1000, () => {
          glowOpacity.value = withTiming(0, 1000);
        });
      }, 1900);
    }
  }, [direction]);

  return (
    <>
      <Animatable.View
        ref={centerSphere}
        style={styles.centerContainer}
        direction={direction}
        useNativeDriver={true}
      >
        <SingleSphere
          {...props}
          rotationSpeed={rotationSpeed}
          ref={aggregateSphere}
          progress={aggregateProgress}
          color={'#F75A00'}
        />
      </Animatable.View>
      <Animated.Image
        source={SPHERE_ASSETS.glow}
        style={[
          styles.glowImage,
          { height: props.height, width: props.width, opacity: glowOpacity },
        ]}
      />
      <View
        style={styles.container}
        onLayout={e =>
          setParentSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          })
        }
      >
        {/* Perform */}
        <View style={styles.sphereWrapper(4)}>
          <Animatable.View
            ref={diagonalTopLeftRef}
            style={styles.performSphere}
            direction={direction}
            useNativeDriver={true}
          >
            <SingleSphere
              {...props}
              ref={performSphere}
              rotationSpeed={rotationSpeed}
              progress={performProgress}
              color={'#F75A00'}
            />
          </Animatable.View>
          <Animatable.View
            ref={legendTopLeftRef}
            useNativeDriver={true}
            direction={direction}
            style={styles.legendTopLeft}
          >
            <Legend
              type={'PERFORM'}
              direction={direction}
              progress={perform}
              icon={SPHERE_ASSETS.performDot}
              iconLeft={false}
              iconRight={true}
              onPress={onPressPerform}
            />
          </Animatable.View>
        </View>

        {/* Fuel */}
        <Animatable.View style={styles.sphereWrapper(3)}>
          <Animatable.View
            style={styles.fuleSphere}
            ref={diagonalTopRightRef}
            direction={direction}
            useNativeDriver={true}
          >
            <SingleSphere
              {...props}
              ref={fuelSphere}
              rotationSpeed={rotationSpeed}
              progress={fuelProgress}
              color={'#EFD457'}
            />
          </Animatable.View>
          <Animatable.View
            ref={legendTopRightRef}
            useNativeDriver={true}
            direction={direction}
            style={styles.legendTopRight}
          >
            <Legend
              type={'FUEL'}
              direction={direction}
              progress={fuel}
              icon={SPHERE_ASSETS.fuelDot}
              iconLeft={true}
              onPress={onPressFuel}
            />
          </Animatable.View>
        </Animatable.View>

        {/* Restore */}
        <Animatable.View style={styles.sphereWrapper(2)}>
          <Animatable.View
            style={styles.restoreSphere}
            direction={direction}
            useNativeDriver={true}
            ref={diagonalBottomLeftRef}
          >
            <SingleSphere
              {...props}
              ref={restoreSphere}
              rotationSpeed={rotationSpeed}
              progress={restoreProgress}
              color={'#5BA9C8'}
            />
          </Animatable.View>
          <Animatable.View
            ref={legendBottomLeftRef}
            useNativeDriver={true}
            direction={direction}
            style={styles.legendBottomLeft}
          >
            <Legend
              type={'RESTORE'}
              direction={direction}
              progress={restore}
              icon={SPHERE_ASSETS.restoreDot}
              iconRight={true}
              onPress={onPressRestore}
            />
          </Animatable.View>
        </Animatable.View>

        {/* Mindful */}
        <View style={styles.sphereWrapper(1)}>
          <Animatable.View
            style={styles.mindfulSphere}
            direction={direction}
            useNativeDriver={true}
            ref={diagonalBottomRightRef}
          >
            <SingleSphere
              {...props}
              ref={mindfulSphere}
              rotationSpeed={rotationSpeed}
              progress={mindfulProgress}
              color={'#C558C8'}
            />
          </Animatable.View>
          <Animatable.View
            ref={legendBottomRightRef}
            useNativeDriver={true}
            direction={direction}
            style={styles.legendBottomRight}
          >
            <Legend
              type={'MINDFUL'}
              direction={direction}
              progress={mindful}
              icon={SPHERE_ASSETS.mindfulDot}
              iconLeft={true}
              onPress={onPressMindful}
            />
          </Animatable.View>
        </View>
      </View>
    </>
  );
};

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
    columnGap: 8,
    rowGap: 8,
  },
  centerContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  glowImage: {
    tintColor: '#F75A00',
    position: 'absolute',
    transform: [{ scale: 1.3 }],
  },
  sphereWrapper: index => ({
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: index,
  }),
  performSphere: { zIndex: 4 },
  restoreSphere: { zIndex: 2 },
  legendTopLeft: { position: 'absolute', left: -30, top: 0 },
  legendTopRight: { position: 'absolute', right: -30, top: 0 },
  legendBottomLeft: { position: 'absolute', left: -31, bottom: -1 },
  legendBottomRight: { position: 'absolute', right: -31, bottom: -1 },
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

const _Legend = ({
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

const Legend = React.memo(_Legend);
export default NewSphereGroup;
