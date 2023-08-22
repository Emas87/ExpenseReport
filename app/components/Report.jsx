import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, View } from 'react-native'

function Report(props) {
    const expenseTypes = ['Fun', 'Professional', 'Academic', 'Food', 'Housewise']
    return (
        <View>
            <FlatList data={expenseTypes} renderItem={({item}) => {
                return (<Text>{item}</Text>)
            }}>
            </FlatList>
        </View>
    )
}

Report.propTypes = {}

export default Report
