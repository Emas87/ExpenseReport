import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Button, Text, theme } from 'native-base';
import { SafeAreaView } from 'react-native';

function DatePicker({isDate, date, setDate}) {
  //const [date, setDate] = useState("");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);// on cancel set date value to previous date
    if (event?.type === 'dismissed') {
        //setDate(date);
        return;
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>    
      {isDate && <Button colorScheme="tertiary" onPress={showDatepicker}> Select date </Button>}
      {!isDate && <Button colorScheme="tertiary" onPress={showTimepicker}> Select time</Button>}
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date==""?new Date():date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          colorScheme="tertiary"
          positiveButton={{label: 'OK', textColor: theme.colors.tertiary[700]}}
          negativeButton={{label: 'Cancel', textColor: theme.colors.danger[500]}}
        />
      )}
    </SafeAreaView>
  );
}

DatePicker.propTypes = {}

export default DatePicker
