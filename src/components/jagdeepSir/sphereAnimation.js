import * as Animatable from 'react-native-animatable';

export const sphereAnimationEffect = ({ width }) => {
  Animatable.initializeRegistryWithDefinitions({
    legendDiagonalTopLeft: {
      0: { translateX: 11, translateY: 11 },
      1: { translateX: 0, translateY: 0 },
    },
    legendDiagonalTopRight: {
      0: { translateX: -11, translateY: 11 },
      1: { translateX: 0, translateY: 0 },
    },
    legendDiagonalBottomRight: {
      0: { translateX: -11, translateY: -11 },
      1: { translateX: 0, translateY: 0 },
    },
    legendDiagonalBottomLeft: {
      0: { translateX: 11, translateY: -11 },
      1: { translateX: 0, translateY: 0 },
    },
    diagonalTopLeft: {
      0: { translateX: width * 0.2, translateY: width * 0.2, opacity: 0 },
      0.5: { translateX: width * 0.2, translateY: width * 0.2, opacity: 0 },
      0.6: { opacity: 1 },
      1: { translateX: 0, translateY: 0 },
    },
    diagonalTopRight: {
      0: { translateX: -width * 0.2, translateY: width * 0.2, opacity: 0 },
      0.5: { translateX: -width * 0.2, translateY: width * 0.2, opacity: 0 },
      0.6: { opacity: 1 },
      1: { translateX: 0, translateY: 0 },
    },
    diagonalBottomRight: {
      0: { translateX: -width * 0.2, translateY: -width * 0.2, opacity: 0 },
      0.5: { translateX: -width * 0.2, translateY: -width * 0.2, opacity: 0 },
      0.6: { opacity: 1 },
      1: { translateX: 0, translateY: 0 },
    },
    diagonalBottomLeft: {
      0: { translateX: width * 0.2, translateY: -width * 0.2, opacity: 0 },
      0.5: { translateX: width * 0.2, translateY: -width * 0.2, opacity: 0 },
      0.6: { opacity: 1 },
      1: { translateX: 0, translateY: 0 },
    },
    iconsTopLeft: {
      0: { opacity: 0, translateX: width * 0.2, translateY: width * 0.2 },
      1: { opacity: 1, translateX: 0, translateY: 0 },
    },
    iconsBottomLeft: {
      0: { opacity: 0, translateX: width * 0.2, translateY: -width * 0.2 },
      1: { opacity: 1, translateX: 0, translateY: 0 },
    },
    centerSphere: {
      0: { transform: [{ scale: 2.25 }] },
      0.5: { opacity: 1, transform: [{ scale: 1 }] },
      0.6: { opacity: 0, transform: [{ scale: 1 }] },
      1: { opacity: 0, transform: [{ scale: 1 }] },
    },
  });
};
