import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from '@react-native-voice/voice';

const {height , width} = Dimensions.get('window') ;


export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [duration, setDuration] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');
  const [triggered, setTriggered] = useState(false);
  const [recording, setRecording] = useState(false);


  const startRecording = async () => {
    setIsRecording(true);
    setSpokenText('');
    Voice.onSpeechResults = (event) => {
      const result = event.value[0].toLowerCase();
      setRecognizedText(result);
      setDuration((duration) => duration + result.length);


       if (result.includes('hello')) {
    // Do something
    console.log('Hello was detected!',result);
  }
    }
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recognizedText.includes('hello') && duration >= 5) {
      setTriggered(true);
    }
  }, [recognizedText, duration]);


  useEffect(() => {
    const timer = setTimeout(() => {
      Voice.stop();
      setRecording(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  // Voice.onSpeechResults = (event) => {
  //   setSpokenText(event.value[0]);
  // };


  // const VoiceRecognizer = () => {
  //   useEffect(() => {
  //     const startListening = async () => {
  //       try {
  //         await Voice.requestPermissions();
  //         Voice.onSpeechResults = onSpeechResults;
  //         await Voice.start('en-US');
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     };
  //     startListening();
  //     return () => {
  //       Voice.destroy().then(Voice.removeAllListeners);
  //     };
  //   }, []);
  
  //   const onSpeechResults = (event) => {
  //     const speech = event.value[0];
  //     if (speech.toLowerCase() === 'ok alex') {
  //       console.log('Voice says "ok Alex"');
  //     }
  //   };
  
  //   return null;
  // };


  return (
    <View style={styles.container}>


<Text>Recording: {recording ? 'Yes' : 'No'}</Text>
      <Text>Recognized Text: {recognizedText}</Text>
      {triggered && <Text>Hello was detected for at least 5 seconds!</Text>}

      <Button  onPress={startRecording} title='Start'/>

</View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex : 1 ,
    backgroundColor:'#000' ,
    alignItems:'center' , 
    justifyContent:'center'
  }
})