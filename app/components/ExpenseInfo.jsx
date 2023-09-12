import { Box, Button, FormControl, Popover, ScrollView, Text, VStack, View } from 'native-base';
import React from 'react'
import { useState } from 'react';

function ExpenseInfo(props) {
  const [isOpen, setIsOpen] = useState(false)
    return <Box w="100%" alignItems="center">
        <VStack space={6} alignSelf="flex-start" w="100%">
          <Popover placement={"top"} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} 
            trigger={triggerProps => {
              return <Text {...triggerProps} onPress={() => setIsOpen(true)} numberOfLines={1} style={props.style}>
                {props.data[props.index]}
                </Text>
            }}>
            <Popover.Content>
              <ScrollView>
                <Popover.Arrow />
                <Popover.CloseButton onPress={() => {setIsOpen(false)}} />
                <Popover.Header>{props.data[0]}</Popover.Header>
                <Popover.Body>                  
                      {props.data[1]}                  
                </Popover.Body>
                <Popover.Footer justifyContent="flex-end">
                  <FormControl>
                    <FormControl.Label>Amount: {props.data[2]}</FormControl.Label>
                    <FormControl.Label>Category: {props.data[3]}</FormControl.Label>
                    <FormControl.Label>Date: {props.data[4]}</FormControl.Label>
                  </FormControl>
                  <Button.Group>
                    <Button onPress={() => {setIsOpen(false);props.updateRow()}} colorScheme="tertiary">Update</Button>
                    <Button onPress={() => {setIsOpen(false);props.deleteRow()}} colorScheme="danger">Delete</Button>
                  </Button.Group>
                </Popover.Footer>
              </ScrollView>
            </Popover.Content>
          </Popover>
        </VStack>
      </Box>;
  }

export default ExpenseInfo