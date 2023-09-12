import { StyleSheet } from 'react-native';
import { extendTheme } from 'native-base'

export const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: "#EFF2F9",
        },
    },
    components: {        
        Text: {
            variants: {
                error: {
                    color: 'error.400'
                }
            }
        }
    }
});

export const styles = StyleSheet.create({
    reportsHeaders :{
        textAlign: "center", /* Center the text horizontally */
        overflow: "hidden", /* Hide any overflowing text */
        fontSize: 10,
        color: theme.colors.primary[50],
    },
    reportsBody:{
        textAlign: "center", /* Center the text horizontally */
        overflow: "hidden", /* Hide any overflowing text */
        fontSize: 10,
        color: theme.colors.primary[700],
    },
    cellHeaders: {
        backgroundColor: theme.colors.primary[700],
        borderBlockColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        width: 100,
        height: 50,
    },
    cellBody: {
        backgroundColor: theme.colors.primary[50],
        borderBlockColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        width: 100,
        height: "100%"
    },
    table: {
        borderRadius: 10, /* Adjust the radius as desired */
        overflow: "hidden", 
        width: "100%",
        borderBlockColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "lightblue",
    },
    front_head: {
        color: theme.colors.primary[500],
        textAlign: 'center'
    },
    welcome_buttons: {
        width: 200,
        marginBottom: 10,
        borderRadius: 12,
    },
    container : {
        backgroundColor: theme.colors.primary[50],
        height: "100%"
    },
    
});
