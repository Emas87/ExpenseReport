import React, { useEffect, useState } from 'react'
import { Box, Center, NativeBaseProvider, Spinner, Text, useTheme } from 'native-base'
import { Platform, ScrollView } from 'react-native';
import { theme, styles } from "../Style";
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Table from '../components/Table';
import * as  SQLite from 'expo-sqlite'

function ReportBody() {

    const params = useLocalSearchParams();
    const refresh = params.refresh;

    

    const [tableData, setTableData] = useState({
        headers: [ "Name", "Description", "Amount", "Category", "Date",],
        rows: [ ]
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const error = false;
    
    const db = SQLite.openDatabase("expenses.db");

    const loadTable = () => {
        console.log("loading")
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
            const tempData = [
                {id:1,name:"name10", description:"descr1", amount:"amount1", category:"cat1", date:"today"},
                {id:2,name:"name3", description:"descr2", amount:"amount2", category:"cat2", date:"tomorrow"},
                {id:3,name:"name2", description:"descr3", amount:"amount3", category:"cat3", date:"yesterday"}
            ]
            setData(tempData);

            const prosData = tempData?.map((row, _) => {
                return [row.name, row.description, row.amount, row.category, row.date]

            })

            setTableData({
                headers: [ "Name", "Description", "Amount", "Category", "Date",],
                rows: prosData
            });

            return;
          } 
        db.transaction((tx) => {
            tx.executeSql("select * from expenses",[],(_, {rows: {_array}}) => {
                setData(_array);
                const prosData = _array?.map((row, index) => {
                    const date = new Date(row.date)
                    const dateFormat = (new Date(row.date)).toLocaleString().split(',')[0]
                    return [row.name, row.description, row.amount, row.category, dateFormat]

                })

                setTableData({
                    headers: [ "Name", "Description", "Amount", "Category", "Date",],
                    rows: prosData
                });
            },
            (txObj, error) => {
                console.log(error)
            })
        })
    }
    if(refresh != undefined && refresh){
        router.setParams({
            "refresh": false
        })
        loadTable();
    }
    useEffect(() => {
        loadTable();
        setIsLoading(false);
    },[])

    const deleteRow = (index) => {
        db.transaction((tx) => {
            tx.executeSql("delete from expenses where id = ?",[data[index-1].id], undefined,
            (_, error) => {
                console.log(error)
            })
        });
        loadTable();
    }

    const updateRow = (index) => {
        router.push({pathname:'/pages/Add',params:{
            "id": data[index].id,
            "data": [data[index].name,data[index].description,data[index].amount,data[index].category,data[index].date,data[index].id]
        }})
    }
    const { colors } = useTheme();

    return (
        <Box style={styles.container}>    
            <Stack.Screen options={{headerTitle: "", headerStyle:{backgroundColor:  colors.primary[50]}}}/>
            <ScrollView>
                { isLoading? 
                    <Spinner accessibilityLabel='Loading Report'/> : 
                    error? 
                    <Text fontSize="6xl" bold variant="error" >Error Fetching data.</Text>:
                    <Center><Table deleteRow={deleteRow} updateRow={updateRow} data={tableData} styleOptions={styles}/></Center>
                }
            </ScrollView>
        </Box>
    )
}

function Report() {
    return (
        <NativeBaseProvider theme={theme}>    
            <ReportBody/>
        </NativeBaseProvider>
    )
}

Report.propTypes = {}

export default Report
