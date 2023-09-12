import { Box, Center, Divider, HStack, ScrollView, Text, VStack, View } from 'native-base';
import PropTypes from 'prop-types'
import ExpenseInfo from './ExpenseInfo';


function Table(props){
  // Todo center text in table
  return(
    <ScrollView>
      <ScrollView horizontal={true}>
        <VStack  style={props.styleOptions.table}>
          <Center key={-1}><HStack>
            {
              props.data.headers.map((item, index) => {
                return (
                  <View key={index} style={props.styleOptions.cellHeaders}>
                    <Text numberOfLines={1} style={props.styleOptions.reportsHeaders} >
                      {item}
                    </Text>
                  </View>
                )
              })                          
            }
          </HStack></Center>
          {props.data.rows.map((row, indexRow) => {
            return (
              <Center key={indexRow}><HStack>
                {
                  row.map((item, index) => {
                    return (
                      <View key={index} style={props.styleOptions.cellBody}>
                        <ExpenseInfo deleteRow={() => props.deleteRow(indexRow)} updateRow={() => props.updateRow(indexRow)} index={index} data={props.data.rows[indexRow]} style={props.styleOptions.reportsBody}/>

                        {/*<Text onPress={() => props.onRowPress(indexRow)} numberOfLines={1} style={props.styleOptions.reportsBody}>
                          {item}
                            </Text>*/}
                      </View>
                    )
                  })
                }
              </HStack></Center>
              )
            })
          }
        </VStack>

      </ScrollView>
    </ScrollView>    
  )
}

Table.propTypes = {}

export default Table
