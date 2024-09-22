import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GettingStartedScreen = () => {
  const navigation = useNavigation();
  const [stage, setStage] = useState(1);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
 
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    const stageTimer = setTimeout(() => {
      setStage(2); 
      startNextStageAnimation();
    }, 3000);

    return () => clearTimeout(stageTimer);
  }, []);

  const startNextStageAnimation = () => {
   
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setStage(2);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });

    setTimeout(() => {
      navigation.replace('Login');
    }, 6000);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: opacityAnim }]}>
        {stage === 1 ? (
          <>
            <Text style={styles.text}>Getting Started...</Text>
            <ActivityIndicator size="large" color="#FFD700" style={styles.loadingIcon} />
          </>
        ) : (
          <>
            <Text style={styles.text}>Welcome!</Text>
            <ActivityIndicator size="large" color="#FFD700" style={styles.loadingIcon} />
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingIcon: {
    marginTop: 20,
  },
});

export default GettingStartedScreen;
