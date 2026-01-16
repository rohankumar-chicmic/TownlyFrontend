import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import useStyles from '@hooks/useStyles'
import styles from './styles'
import { ICONS } from '@utils/icons'

export default function Header({ route, options, navigation }: BottomTabHeaderProps) {
    const { dynamicStyles, Colors } = useStyles(styles);
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            dynamicStyles.container, 
            { 
                paddingTop: insets.top,
                height: 60 + insets.top, // Standard height + notch
            }
        ]}>
            <View style={dynamicStyles.logoWrapper}>
                {/* Ensure color is passed if your SVG uses 'currentColor' */}
                <ICONS.Logo height={40} width={130} color={Colors.primary} />
                <Text style={dynamicStyles.primaryText}>Townly</Text>
            </View>
        </View>
    )
}   