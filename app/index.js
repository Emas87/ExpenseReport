import { LogBox } from "react-native"
import { styles, theme } from "./Style";
import { Box, Button, Center, Heading, NativeBaseProvider, useTheme } from "native-base";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import * as  SQLite from 'expo-sqlite'

LogBox.ignoreLogs([ 'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.', ])

function HomeBody() {
    const {colors} = useTheme();
    return (
      <Box style={styles.container}>
        <Stack.Screen options={{headerTitle: "", headerStyle:{backgroundColor:  colors.primary[50]}}}/>
        <Heading style={styles.front_head} size="2xl" >
            Welcome
        </Heading>
        <Center>
          <Button style={styles.welcome_buttons} colorScheme="tertiary" onPress={() => {router.push('/pages/Report')}}>Report expenses</Button>
          <Button style={styles.welcome_buttons} colorScheme="tertiary" onPress={() => {router.push('/pages/Add')}}>Add new expense</Button>
        </Center>
      </Box>
    )
  }

const Home = () => {
    
    const db = SQLite.openDatabase("expenses.db");

    useEffect(()=>{
        db.transaction((tx) => {
            tx.executeSql(`create table if not exists expenses ( 
                id integer primary key AUTOINCREMENT, 
                name text not null,
                description text,
                amount numeric not null,
                category text not null,
                date numeric DEFAULT (strftime('%s', 'now'))
                );`
            );
        })
    }, [])
    return (
        <NativeBaseProvider theme={theme}>
            <HomeBody/>
        </NativeBaseProvider>
    );
};

export default Home;