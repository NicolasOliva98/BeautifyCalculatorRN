import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Keyboard, Dimensions, StatusBar, ImageBackground, Vibration, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { BlurView } from 'expo-blur';

export default function App() {

  Keyboard.dismiss()
  useEffect(() => {
   
    return () => {
    }
  }, [])


  const Button = ({ char, onPress, value}) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}  >
      <BlurView value tint='dark' intensity={100} style={{ width: 94, height: 94,borderRadius:10, justifyContent: 'center', alignItems: 'center', margin:2 }} >
        <Text style={{ color: '#f1f1f1', fontSize: 48 }}>{char}</Text>
      </BlurView>
      </TouchableOpacity>
    )
  }

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );

  const [data, setData] = useState('')


  const handleClick = e => {
    Vibration.vibrate(35)
    const value = e
    switch (value) {
      case 'clear':
        setData(data.slice(0,-1))
        break;
      case 'equal':
        calculate();
        break;
      default:
        setData(data+value)
    }

    }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground blurRadius={0} style={styles.container} source={{ uri: 'https://i.imgur.com/QdWIRxX.jpg' }}>
        <View style={{ flex: 1, padding: 10 }}>
          <BlurView intensity={100} style={{ width: '100%', height: '20%', padding: 15, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginBottom:10 }}>
         
            <Text style={{ fontSize: 75, textAlign: 'right' }}>{data}</Text>
           
          </BlurView>
          <View style={{flexDirection:'row'}}>
            <Button char='C' />
            <Button char='+/-' />
            <Button char='%' />
            <Button char='X' onPress={() => handleClick('clear')} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button char='7' value='7' />
            <Button char='8' value='8' />
            <Button char='9' value='9' />
            <Button char='/' value='/' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button char='4' value='4' />
            <Button char='5' value='5' />
            <Button char='6' value='6' />
            <Button char='x' value='*' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button char='1' value='1'/>
            <Button char='2'  value='2'/>
            <Button char='3' value='3' />
            <Button char='-' value='-' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button char='0' value='0' onPress={() => handleClick('0')}/>
            <Button char='.' value='.' onPress={() => handleClick('+')}/>
            <Button char='=' value='=' onPress={() => handleClick('+')}/>
            <Button char='+' value='+' onPress={() => handleClick('+')} />
          </View>
     
        </View>




      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
