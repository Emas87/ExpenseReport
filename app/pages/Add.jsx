import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, FormControl, Input, NativeBaseProvider, ScrollView, Select, TextArea, VStack, WarningOutlineIcon } from 'native-base';
import DatePicker from '../components/DatePicker';
import { theme } from "../Style";
import { Stack } from 'expo-router';

function Add(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [nameI, setNameI] = useState(false);
    const [amountI, setAmountI] = useState(false);
    const [categoryI, setCategoryI] = useState(false);
    const [dateI, setDateI] = useState(false);

    const expenseTypes = ['Fun', 'Professional', 'Academic', 'Food', 'House']

    const nameValidation = (nameV) => {
        if(nameV == null || nameV == "" || nameV.length < 3){
            setNameI(true);
        } else {
            setNameI(false);            
        }
    }

    const amountValidation = (amountV) => {
        function isNumber(str) {
            return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
        }

        if(!isNumber(amountV) || amountV == "" || parseFloat(amountV) == 0){
            setAmountI(true);
        } else {
            setAmountI(false);            
        }
    }

    const categoryValidation = (categoryV) => {
        if(categoryV == null || categoryV == ""){
            setCategoryI(true);
        } else {
            setCategoryI(false);            
        }
    }

    const dateValidation = (dateV) => {
        if(dateV == null || dateV == ""){
            setDateI(true);
        } else {
            setDateI(false);            
        }
    }
    const Submit = () => {
        nameValidation(name);
        categoryValidation(category);
        amountValidation(amount);
        dateValidation(date);
    };

    return (
        <NativeBaseProvider theme={theme}>
            <Stack.Screen options={{headerTitle: "",}}/> 
            <ScrollView>

            <VStack space={2.5} alignSelf="center" px="4" safeArea mt="4" w={{
                base: "75%",
                md: "75%"
            }}>
                <FormControl isInvalid={nameI} mb="5">
                    <FormControl.Label>Expense Name</FormControl.Label>
                    <Input variant="underlined" value={name} onChangeText={(value) => {
                        setName(value); 
                        nameValidation(value);
                    }}></Input>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Must be at least 3 characters long.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl mb="5">
                    <FormControl.Label >Expense Description</FormControl.Label>
                    <TextArea value={description} onChangeText={(value) => {setDescription(value)}}></TextArea>
                </FormControl>
                <FormControl isInvalid={amountI} mb="5">
                    <FormControl.Label bold fontSize="xl">Amount</FormControl.Label>
                    <Input variant="underlined" placeholder={"0"} value={amount} onChangeText={(value) => {setAmount(value); amountValidation(value);}}></Input>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Must be a number greater than 0.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={categoryI} mb="5">
                    <FormControl.Label bold fontSize="xl">Category</FormControl.Label>
                    <Select variant="underlined" selectedValue={category} placeholder="Choose a category" onValueChange={(value) => {setCategory(value); categoryValidation(value);}}>
                        {expenseTypes.map((item, index) => {
                            return <Select.Item key={index} label={item} value={item}/>
                            
                        })}
                    </Select>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        You must select a category.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={dateI} mb="5">
                    <FormControl.Label bold fontSize="xl">Expense date</FormControl.Label>
                    <DatePicker date={date} setDate={setDate} isDate={true}></DatePicker>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        You need to pick a date.
                    </FormControl.ErrorMessage>
                </FormControl>
                <Button mt="5" onPress={Submit}> Add </Button>
            </VStack>
            </ScrollView>


        </NativeBaseProvider>
    )
}

Add.propTypes = {}

export default Add
