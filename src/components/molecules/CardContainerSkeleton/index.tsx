import { View } from 'react-native';
import useTheme from '@hooks/useTheme';
import SkeletonBox from '@components/atoms/SkeletonBox';

export default function CardContainerSkeleton() {
  const { Colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 7,
        overflow: 'hidden',
        height: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* Image — matches 40% width */}
      <SkeletonBox width="40%" height={160} borderRadius={0} />

      {/* Details — matches detailsContainer */}
      <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
        {/* Title */}
        <SkeletonBox width="80%" height={14} borderRadius={6} />

        {/* Location */}
        <SkeletonBox width="60%" height={12} borderRadius={6} />

        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SkeletonBox width="45%" height={11} borderRadius={5} />
            <SkeletonBox width="30%" height={11} borderRadius={5} />
          </View>
        ))}
      </View>
    </View>
  );
}
