import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';

type AppInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    maxLength?: number;
};

export default function AppInput({
    label,
    value,
    onChangeText,
    placeholder,
    required,
    multiline,
    maxLength,
}: AppInputProps) {
    const { Colors } = useTheme();

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={[styles.label, { color: Colors.textPrimary }]}>
                {label}
                {required && <Text style={{ color: Colors.primary }}> *</Text>}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
                multiline={multiline}
                maxLength={maxLength}
                style={[
                    styles.input,
                ]}
            />

            {maxLength && (
                <Text style={styles.counter}>
                    {value.length}/{maxLength}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontSize: 14,
    },
    input: {
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
    },
    counter: {
        alignSelf: 'flex-end',
        fontSize: 11,
        opacity: 0.6,
        marginTop: 4,
    },
});
