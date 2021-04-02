/* 
Basada en la interfaz grafica de Lucia Scott Dribble. 
https://dribbble.com/shots/14709020-Calculator/attachments/6408579?mode=media
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Keyboard, Dimensions, StatusBar, ImageBackground, Vibration, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export default function App() {
  Keyboard.dismiss()
  useEffect(() => {
    return () => {
    }
  }, [])

  const c1 = '#26fbd4'
  const c2 = '#d76061'
  const c3 = '#f6f6f7'

  const Button = ({ char, onPress, value, icon, color }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View value={value} style={{ width: 70, height: 70, borderRadius: 10, justifyContent: 'center', alignItems: 'center', margin: 15, backgroundColor: '#22252d' }}>
          {
            icon ?
              <Icon color={color} name={icon} size={35} />
              :
              <Text style={{ color: color, fontSize: 30 }}>{char}</Text>
          }
        </View>
      </TouchableOpacity>
    )
  }

  const [state, setState] = useState({
    currentValue: 0,
    operator: null,
    previousValue: null
  })


  const handleNumber = (value) => {
    setState({
      currentValue: value
    })
    if (state.currentValue === null) {
      setState({
        ...state,
        currentValue: value
      })
    }
    return (
      setState({
        ...state,
        currentValue: String(state.currentValue + value)
      })
    )
  };

  const calculator = () => {
    if (state.operator === '+') {
      setState({
        ...state,
        currentValue: parseFloat(state.previousValue) + parseFloat(state.currentValue)
      })
    }

    if (state.operator === '-') {
      setState({
        ...state,
        currentValue: parseFloat(state.previousValue) - parseFloat(state.currentValue)
      })
    }
    if (state.operator === '*') {
      setState({
        ...state,
        currentValue: parseFloat(state.previousValue) * parseFloat(state.currentValue)
      })
    }
    if (state.operator === '/') {
      setState({
        ...state,
        currentValue: parseFloat(state.previousValue) / parseFloat(state.currentValue)
      })
    }
  }

  const handleTouch = (type, value) => {
    Vibration.vibrate(120, 2)
    switch (type) {
      case "number":
        return handleNumber(value)
      case "operator":
        return setState({
          ...state,
          operator: value,
          previousValue: parseFloat(state.currentValue),
          currentValue: 0
        })
      case "equal":
        return calculator()
      case "clear":
        return setState({
          currentValue: 0,
          operator: null,
          previousValue: null
        })
      case "posneg":
        return setState({
          ...state,
          currentValue: `${parseFloat(state.currentValue) * -1}`
        })
      case "percentage":
        return setState({
          currentValue: `${parseFloat(state.currentValue) * 0.01}`
        })
      default:
        return state;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#22252d' />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{ fontSize: 70, textAlign: 'right', fontWeight: 'bold', color: '#fff', marginRight: 8 }}>{state.currentValue}</Text>
        </View>
        <View style={styles.bottomContainer}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button char='AC' color={c1} onPress={() => handleTouch('clear')} />
            <Button icon='plus-minus-variant' color={c1} onPress={() => handleTouch('posneg')} />
            <Button char='%' color={c1} onPress={() => handleTouch('percentage')} />
            <Button icon='division' color={c2} onPress={() => handleTouch('operator', '/')} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button char='7' color={c3} onPress={() => handleTouch('number', 7)} />
            <Button char='8' color={c3} onPress={() => handleTouch('number', 8)} />
            <Button char='9' color={c3} onPress={() => handleTouch('number', 9)} />
            <Button icon='close' color={c2} onPress={() => handleTouch('operator', '*')} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button char='4' color={c3} onPress={() => handleTouch('number', 4)} />
            <Button char='5' color={c3} onPress={() => handleTouch('number', 5)} />
            <Button char='6' color={c3} onPress={() => handleTouch('number', 6)} />
            <Button icon='minus' color={c2} onPress={() => handleTouch('operator', '-')} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button char='1' color={c3} onPress={() => handleTouch('number', 1)} />
            <Button char='2' color={c3} onPress={() => handleTouch('number', 2)} />
            <Button char='3' color={c3} onPress={() => handleTouch('number', 3)} />
            <Button icon='plus' color={c2} onPress={() => handleTouch('operator', '+')} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button icon='restore' color={c3} onPress={() => handleTouch('clear')} />
            <Button char='0' color={c3} onPress={() => handleTouch('number', 0)} />
            <Button icon='circle-small' color={c3} onPress={() => handleTouch('number', '.')} />
            <Button icon='equal' color={c2} onPress={() => handleTouch('equal')} />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22252d'
  },
  topContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    backgroundColor: '#22252d',
    marginBottom: 20
  },
  bottomContainer: {
    flex: 1.5,
    backgroundColor: '#292d36',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 20
  }
});
