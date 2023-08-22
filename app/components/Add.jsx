import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Touchable } from 'react-native-web';

function Add(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setamount] = useState("");
    const [category, setcategory] = useState("");
    const [date, setDate] = useState("");
    return (
        <View>
            <Text>Expense name</Text>
            <TextInput value={name} onChange={(e) => {setName(e.target.value)}}></TextInput>
            <Text>Expense Description</Text>
            <TextInput value={description} onChange={(e) => {setDescription(e.target.value)}}></TextInput>
            <Text>Amount</Text>
            <TextInput value={amount} onChange={(e) => {setamount(e.target.value)}}></TextInput>
            <Text>Category</Text>
            <TextInput value={category} onChange={(e) => {setcategory(e.target.value)}}></TextInput>
            <Text>Expense date</Text>
            <TextInput value={date} onChange={(e) => {setDate(e.target.value)}}></TextInput>
            <TouchableOpacity>
                <Text>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    )
}

Add.propTypes = {}

export default Add
