import { StyleSheet } from 'react-native';
import { extendTheme } from 'native-base'

export const theme = extendTheme({
    components: {
        Text: {
            variants: {
                error: {
                    color: 'red.500'
                }
            }
        }
    }
});


export const styles = StyleSheet.create({
  customText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
});
