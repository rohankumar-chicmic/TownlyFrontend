import { StyleSheet } from "react-native";

import { ThemeColors } from "@theme/constants";

const styles = (Colors: ThemeColors) => StyleSheet.create({
    container:{
        padding: 2,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: Colors.surface,
        borderColor: Colors.border
    }
})

export default styles