import { StyleSheet } from 'react-native';

const styles = (Colors: any) => StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0D0D0D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center', // Centers icon and text vertically
        gap: 8, // Adds space between icon and "Townly"
    },
    primaryText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
    walletButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(199, 254, 30, 0.08)', // Faint lime background
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(199, 254, 30, 0.3)', // Subtle lime border
    },
    walletIconCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    walletIconText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    walletAmount: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '600',
    }
});

export default styles;