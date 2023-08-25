import { router } from 'expo-router'
import { Box, Button, Text } from 'native-base'

function HomeC() {
  return (
    <Box >
        <Text>
            Welcome
        </Text>
        <Button variant="ghost" onPress={() => {router.push('/pages/Report')}}>Report expenses</Button>
        <Button variant="ghost" onPress={() => {router.push('/pages/Add')}}>Add new expense</Button>
    </Box>
  )
}

export default HomeC
