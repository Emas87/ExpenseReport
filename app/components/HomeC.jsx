import { router } from 'expo-router'
import React from 'react'
//import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function HomeC() {
  return (
    <View>
        <Text>
            Welcome
        </Text>
        <Text onPress={() => {router.push('/report')}}> Report expenses</Text>
        <Text onPress={() => {router.push('/add')}}>Add new expense</Text>
    </View>
  )
}

//HomeC.propTypes = {}

export default HomeC
