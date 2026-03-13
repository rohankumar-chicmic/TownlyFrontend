import { DARK_IMAGES } from '@utils/images';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const BASE_ASSETS_URL =
  'https://raw.githubusercontent.com/gemini-assets/sphere-animations/main';

const SPHERE_ASSETS = {
  waveImages: Array.from({ length: 150 }, (_, i) => ({
    uri: `${BASE_ASSETS_URL}/waves/frame_${i}.png`,
  })),
  newOuterCircle: Array.from({ length: 150 }, (_, i) => ({
    uri: `${BASE_ASSETS_URL}/outer/frame_${i}.png`,
  })),
  fillCircle: Array.from({ length: 150 }, (_, i) => ({
    uri: `${BASE_ASSETS_URL}/fill/frame_${i}.png`,
  })),
  outerEffect: Array.from({ length: 60 }, (_, i) => ({
    uri: `${BASE_ASSETS_URL}/effect/frame_${i}.png`,
  })),
  glow: { uri: `${BASE_ASSETS_URL}/common/glow_pulse.png` },
};

const SingleSphere = ({
  progress = 0,
  height = 200,
  width = 200,
  minDuration = 1000,
  maxDuration = 4000,
  onComplete = () => {},
  minThreshold = 0,
  maxThreshold = 100,
  color,
  styleContainer,
  rotationSpeed = 1,
}) => {
  const fillHeight = useSharedValue(0);
  const waveOffset = useSharedValue(height / 1.8);
  const previousProgressRef = useRef(progress);

  const [waveVisible, setWaveVisible] = useState(
    progress > minThreshold && progress < maxThreshold,
  );
  const [outerEffectVisible, setOuterEffectVisible] = useState(
    progress === maxThreshold,
  );

  const getFillHeightFromProgress = p => (p / 100) * height;

  useEffect(() => {
    const clamped = Math.min(Math.max(progress, minThreshold), maxThreshold);
    fillHeight.value = getFillHeightFromProgress(clamped);
    waveOffset.value = getWaveOffset(height, clamped);
    previousProgressRef.current = clamped;
  }, []);

  function getWaveOffset(h, p) {
    const start = h / 1.8;
    const end = -h / 1.8;
    const baseOffset = start + (end - start) * (p / 100);
    return p > 50 ? baseOffset + ((p - 50) / 50) * (h * 0.05) : baseOffset;
  }

  const animateToProgress = newProgress => {
    if (previousProgressRef.current === newProgress) return;

    if (
      previousProgressRef.current === minThreshold &&
      newProgress > minThreshold
    ) {
      setWaveVisible(true);
    }
    if (
      previousProgressRef.current === maxThreshold &&
      newProgress < maxThreshold
    ) {
      setWaveVisible(true);
      setOuterEffectVisible(false);
    }

    const clamped = Math.min(Math.max(newProgress, minThreshold), maxThreshold);
    const to = clamped;
    const toFill = getFillHeightFromProgress(to);
    const toWave = getWaveOffset(height, to);
    const delta = Math.abs(to - previousProgressRef.current);

    const duration =
      to === minThreshold && previousProgressRef.current !== minThreshold
        ? Math.min(
            1500,
            minDuration + (delta / 100) * (maxDuration - minDuration),
          )
        : minDuration + (delta / 100) * (maxDuration - minDuration);

    fillHeight.value = withTiming(toFill, { duration });
    waveOffset.value = withTiming(toWave, { duration }, () => {
      'worklet';
      runOnJS(handleAnimationEnd)(to);
    });

    previousProgressRef.current = to;
  };

  const handleAnimationEnd = to => {
    if (to === maxThreshold) {
      setWaveVisible(false);
      setOuterEffectVisible(true);
    } else if (to === minThreshold) {
      setWaveVisible(false);
      setOuterEffectVisible(false);
    } else {
      setWaveVisible(true);
      setOuterEffectVisible(false);
    }
    onComplete(to);
  };

  useEffect(() => {
    animateToProgress(Math.min(Math.max(progress, 0), 100));
  }, [progress]);

  const clipStyle = useAnimatedStyle(() => ({ height: fillHeight.value }));
  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: waveOffset.value }],
  }));

  const [frame, setFrame] = useState(0);
  const currentSpeedRef = useRef(1);
  const targetSpeedRef = useRef(1);
  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    let rafId;
    const loop = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * 0.08;
      accumulatorRef.current += delta * currentSpeedRef.current;

      while (accumulatorRef.current >= (__DEV__ ? 1000 : 50)) {
        accumulatorRef.current -= __DEV__ ? 1000 : 50;
        setFrame(prev => (prev + 1) % 150);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const [outerFrame, setOuterFrame] = useState(0);
  const outerGlowOpacity = useSharedValue(0);
  const glowStyle = useAnimatedStyle(() => ({
    opacity: outerGlowOpacity.value,
  }));

  useEffect(() => {
    let frameIntervalId = null;
    let repeatTimerId = null;

    if (outerEffectVisible) {
      const runFullLoop = () => {
        let frameIndex = 0;
        outerGlowOpacity.value = withTiming(0.7, { duration: 500 }, () => {
          outerGlowOpacity.value = withTiming(0.3, { duration: 500 });
        });

        frameIntervalId = setInterval(
          () => {
            setOuterFrame(frameIndex);
            frameIndex++;
            if (frameIndex >= SPHERE_ASSETS.outerEffect.length) {
              clearInterval(frameIntervalId);
              repeatTimerId = setTimeout(runFullLoop, 5000);
            }
          },
          1000 / (__DEV__ ? 1 : 60),
        );
      };
      runFullLoop();
    }
    return () => {
      if (frameIntervalId) clearInterval(frameIntervalId);
      if (repeatTimerId) clearTimeout(repeatTimerId);
    };
  }, [outerEffectVisible]);

  useEffect(() => {
    targetSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  return (
    <View style={[styles.container, { height, width }]}>
      {waveVisible && (
        <View
          style={[
            styles.waveWrapper,
            styleContainer,
            { height, width, borderRadius: width / 2 },
          ]}
        >
          <Animated.View
            style={[
              { height, width, position: 'absolute', justifyContent: 'center' },
              waveStyle,
            ]}
          >
            <LoopImage
              images={[DARK_IMAGES.IMAGE]}
              style={{ width, transform: [{ scale: 1.2 }] }}
              frame={0}
              color={color}
            />
          </Animated.View>
        </View>
      )}
      <View
        style={[
          {
            position: 'absolute',
            overflow: 'hidden',
            height,
            width,
            borderRadius: width / 2,
          },
          styleContainer,
        ]}
      >
        <LoopImage
          images={SPHERE_ASSETS.newOuterCircle}
          style={{ height, width }}
          color={color}
          frame={frame}
        />
      </View>
      <Animated.View
        style={[styleContainer, styles.fillClipper, { width }, clipStyle]}
      >
        <LoopImage
          images={SPHERE_ASSETS.fillCircle}
          style={{ height, width }}
          color={color}
          frame={frame}
        />
      </Animated.View>
      {outerEffectVisible && (
        <>
          <LoopImage
            images={SPHERE_ASSETS.outerEffect}
            style={[
              styleContainer,
              { height, width, transform: [{ scale: 1.3 }] },
            ]}
            color={color}
            frame={outerFrame}
          />
          <Animated.Image
            source={SPHERE_ASSETS.glow}
            style={[
              styleContainer,
              {
                tintColor: color,
                position: 'absolute',
                height,
                width,
                transform: [{ scale: 1.3 }],
              },
              glowStyle,
            ]}
          />
        </>
      )}
    </View>
  );
};

function LoopImage({ images = [], style, color, frame = 0 }) {
  if (!images[frame]) return null;
  return (
    <Image
      source={images[frame]}
      style={[style, { tintColor: color }]}
      resizeMode="contain"
    />
  );
}

export default React.memo(SingleSphere);

const styles = StyleSheet.create({
  container: { position: 'relative' },
  waveWrapper: {
    overflow: 'hidden',
    position: 'absolute',
    transform: [{ scale: 0.98 }],
  },
  fillClipper: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    transform: [{ scaleY: -1 }],
  },
});
