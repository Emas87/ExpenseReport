import React from 'react'
import PropTypes from 'prop-types'
import { Box, NativeBaseProvider, Spinner, Text } from 'native-base'
import { ScrollView } from 'react-native';
import { theme } from "../Style";
import { Stack } from 'expo-router';

function Report(props) {
    const expenseTypes = ['Fun', 'Professional', 'Academic', 'Food', 'Housewise']
    const isLoading = false;
    const error = true;
    return (
        <NativeBaseProvider  theme={theme}>    
            <Stack.Screen options={{headerTitle: "",}}/>        
            <ScrollView>
                { isLoading? 
                    <Spinner accessibilityLabel='Loading Report'/> : 
                    error? 
                    <Text fontSize="6xl" bold variant="error" >Error Fetching data.</Text>:
                    !isLoading && expenseTypes.map( (item,index) => {return (<Text key={index}>{item}</Text>)})
                };
            </ScrollView>
        </NativeBaseProvider>
    )
}

Report.propTypes = {}

export default Report
