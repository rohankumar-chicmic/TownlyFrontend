import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/constants";

const styles = (Colors : ThemeColors) => StyleSheet.create({
    box:{
        backgroundColor: Colors.surface,
        position: 'absolute',
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
        zIndex: 100, 
        margin: 10, 
        shadowColor: Colors.background, 
    }, 
    symbol:{
        fontSize: 12, 
        margin: 5,
        color: Colors.primaryDark, 
    }
})

export default styles