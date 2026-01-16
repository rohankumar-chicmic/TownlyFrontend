import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import useStyles from '@hooks/useStyles'
import styles from './styles'
import { ICONS } from '@utils/icons'
import useTheme from '@hooks/useTheme'
import Button from '@components/atoms/Button'

export default function Header({ route, options, navigation }: BottomTabHeaderProps) {
    const { dynamicStyles } = useStyles(styles);
    const { Colors } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            dynamicStyles.container,
            {
                paddingTop: insets.top,
                height: 60 + insets.top, // Standard height + notch
                width: '100%'
            }

        ]}>
            <View style={{ flexDirection: 'row' }}>
                <ICONS.Logo height={30} width={60} color={Colors.primary} borderColor={Colors.background}/>
                <Text style={dynamicStyles.primaryText}>Townly</Text>
            </View>   
        </View>
    )
}   