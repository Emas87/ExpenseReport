import React, { useState } from 'react'
import { Box, Button, FormControl, Input, NativeBaseProvider, ScrollView, Select, TextArea, VStack, WarningOutlineIcon, useTheme } from 'native-base';
import DatePicker from '../components/DatePicker';
import { styles, theme } from "../Style";
import { Stack, router, useLocalSearchParams } from 'expo-router';
import * as  SQLite from 'expo-sqlite'

function AddBody(props) {

    const params = useLocalSearchParams();
    const id = params?.id;
    const data = params.data?.split(',');

    const [name, setName] = useState(id == undefined ? "":data[0]);
    const [description, setDescription] = useState(id == undefined ? "":data[1]);
    const [amount, setAmount] = useState(id == undefined ? "":data[2]);
    const [category, setCategory] = useState(id == undefined ? "":data[3]);
    const [date, setDate] = useState(id == undefined ? "":new Date(parseInt(data[4])));

    const [nameI, setNameI] = useState(false);
    const [amountI, setAmountI] = useState(false);
    const [categoryI, setCategoryI] = useState(false);
    const [dateI, setDateI] = useState(false);

    const expenseTypes = ['Fun', 'Professional', 'Academic', 'Food', 'House'];

    const db = SQLite.openDatabase("expenses.db");

    const nameValidation = (nameV) => {
        if(nameV == null || nameV == "" || nameV.length < 3){
            setNameI(true);
            return true;
        } else {
            setNameI(false);    
            return false;        
        }
    }

    const amountValidation = (amountV) => {
        function isNumber(str) {
            return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
        }

        if(!isNumber(amountV) || amountV == "" || parseFloat(amountV) == 0){
            setAmountI(true);
            return true;
        } else {
            setAmountI(false);      
            return false;      
        }
    }

    const categoryValidation = (categoryV) => {
        if(categoryV == null || categoryV == ""){
            setCategoryI(true);
            return true;
        } else {
            setCategoryI(false);  
            return false;          
        }
    }

    const dateValidation = (dateV) => {
        if(dateV == null || dateV == ""){
            setDateI(true);
            return true;
        } else {
            setDateI(false);
            return false;
        }
    }
    const submit = () => {
        if(nameValidation(name) || categoryValidation(category) || amountValidation(amount) || dateValidation(date)){
            return;
        }
        if(id != undefined){
            update()
            return;
        }
        db.transaction((tx) => {
            tx.executeSql('insert into expenses (name, description, amount, category, date) values (?, ?, ?, ?, ?)', [name, description, amount, category, date.getTime()], 
            undefined,
            (_, error) => {
                console.log(error)
            });
        })
        setAmount("");
        setCategory("");
        setName("");
        setDescription("");
        setDate("");
    };

    const update = () => {
        db.transaction((tx) => {
            tx.executeSql('update expenses \
            set name = ?, description = ?, amount = ?, category = ?, date = ? where id = ?', [name, description, amount, category, date.getTime(), id], 
            undefined,
            (_, error) => {
                console.log(error)
            });
        })
        router.push({pathname:'/pages/Report',params:{
            "refresh": true
        }})
    };

    const { colors } = useTheme();

    return (
        <Box style={styles.container}>
            <Stack.Screen options={{headerTitle: "", headerStyle:{backgroundColor:  colors.primary[50]}}}/>
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
                        <Select variant="underlined" selectedValue={category} readonly placeholder="Choose a category" onValueChange={(value) => {setCategory(value); categoryValidation(value);}}>
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
                    <Button colorScheme="tertiary" mt="5" onPress={submit}> {id == undefined ? "Add" : "Update"} </Button>
                </VStack>
            </ScrollView>
        </Box>
    )
}

function Add(props) {
    return (
        <NativeBaseProvider theme={theme}>
            <AddBody/>
        </NativeBaseProvider>
    )
}

Add.propTypes = {}

export default Add
