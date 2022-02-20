import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Focus } from './src/features/Focus/Focus';
import { Timer } from './src/features/Timer/Timer';
import { TimerSetup } from './src/components/TimerSetup/TimerSetup';
import { SubjectHistory } from './src/components/SubjectHistory/SubjectHistory';
import { palette, spacing, fontSize } from './src/utils/baseStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState();
  const [focusTime, setFocusTime] = React.useState(1);
  const [subjectHistory, setSubjectHistory] = React.useState([]);

  const updateHistory = (subject) => setSubjectHistory([...subjectHistory, subject]);
  
  const saveSubjectHistory = async () => {
    try {
      await AsyncStorage.setItem("subjectHistory", JSON.stringify(subjectHistory));
    } catch (e) {
      console.log(e)
    }
  }

  const loadSubjectHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("subjectHistory");
      if(history && JSON.parse(history.length)){
        setSubjectHistory(JSON.parse(history));
      }
    } catch (e){
      console.log(e);
    }
  }

  React.useEffect(() => {
    loadSubjectHistory();
  }, []);

  React.useEffect(() => {
    saveSubjectHistory();
  }, [subjectHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer 
          focusSubject={focusSubject} 
          minutes={focusTime}
          updateHistory={updateHistory}
          clear={() => setFocusSubject(null)}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <SubjectHistory subjectHistory={subjectHistory} clearHistory={() => setSubjectHistory([])} />
          <TimerSetup setFocusTime={setFocusTime} focusTime={focusTime} /> 
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.prussian,
    flex: 1,
  },  
});
