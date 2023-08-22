import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeButton from "./components/HomeButton";
import HomeC from "./components/HomeC";
import Add from "./components/Add";
import Report from "./components/Report";


const Home = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerLeft: () => {<HomeButton/>},
                headerTitle:""
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <HomeC></HomeC>
                    <Add></Add>
                    <Report></Report>
                </View>
            </ScrollView>            
        </SafeAreaView>
    );
};

export default Home;