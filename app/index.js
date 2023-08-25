import { ScrollView } from "react-native";
import HomeC from "./components/HomeC";
import { LogBox } from "react-native"
import { theme } from "./Style";
import { NativeBaseProvider } from "native-base";
import { Stack } from "expo-router";

LogBox.ignoreLogs([ 'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.', ])


const Home = () => {    
    return (
        <NativeBaseProvider theme={theme}>
            <Stack.Screen options={{headerTitle: "",}}/>
            <HomeC></HomeC>
        </NativeBaseProvider>
    );
};

export default Home;