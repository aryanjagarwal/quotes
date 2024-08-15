import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [target, setTarget] = useState(2000); // Target in ml
  const [modalVisible, setModalVisible] = useState(false);
  const [frequency, setFrequency] = useState(60); // Frequency in minutes
  const [reminder, setReminder] = useState(null);
  const [lastAdded, setLastAdded] = useState(0); // Store last added amount
  const fillHeight = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fillHeight, {
      toValue: (waterIntake / target) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [waterIntake]);

  useEffect(() => {
    // Request permissions for notifications
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable notifications to use this feature!');
      }
    };
    requestPermissions();
  }, []);

  const addWater = (amount) => {
    setWaterIntake(waterIntake + amount);
    setLastAdded(amount); // Update last added amount
  };

  const removeLastWater = () => {
    setWaterIntake(waterIntake - lastAdded);
    setLastAdded(0); // Clear last added amount
  };

  const startReminder = () => {
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Water Reminder',
          body: 'Time to drink water!',
          sound: 'default',
        },
        trigger: {
          seconds: frequency * 60,
          repeats: true,
        },
      });
    };

    scheduleNotification();
  };

  const stopReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const saveSettings = () => {
    setTarget(parseInt(target, 10));
    startReminder();
    toggleModal();
  };

  return (
    <LinearGradient
      colors={['#151515', '#151515']}
      style={styles.container}
    >
      <Text style={styles.title}>Water Tracker</Text>
      <View style={styles.waterDropContainer}>
        <Animated.View style={[styles.waterFill, { height: fillHeight.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%']
        }) }]}/>
      </View>
      <Text style={styles.intakeText}>{waterIntake} ml / {target} ml</Text>
      <TouchableOpacity style={styles.button} onPress={() => addWater(250)}>
        <Text style={styles.buttonText}>+250 ml</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => addWater(500)}>
        <Text style={styles.buttonText}>+500 ml</Text>
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        width: '100%',
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#ff4c4c',
          padding: 15,
          borderRadius: 25,
          alignItems: 'center',
          marginBottom: 10,
          width: '45%',
        }} onPress={removeLastWater}>
          <Text style={styles.buttonText}>- Last</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: '#2e9dff',
          padding: 15,
          borderRadius: 25,
          alignItems: 'center',
          marginBottom: 10,
          width: '45%',
        }} onPress={toggleModal}>
          <Text style={styles.buttonText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Backdrop Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#525252', '#151515']}
            style={styles.modalView}>
            <Text style={styles.modalTitle}>Set Water Reminder</Text>
            <TextInput
              style={styles.input}
              placeholder="Target water intake (ml)"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={String(target)}
              onChangeText={(value) => setTarget(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Reminder frequency (minutes)"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={String(frequency)}
              onChangeText={(value) => setFrequency(value)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center',
  },
  waterDropContainer: {
    backgroundColor: '#FFFFFF22',
    width: 150,
    height: 300,
    borderRadius: 75,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFF',
    marginBottom: 20,
  },
  waterFill: {
    backgroundColor: '#00BFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  intakeText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#969696',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#ff4c4c',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  reminderButton: {
    backgroundColor: '#2e9dff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 18,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#2e9dff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ff4c4c',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
});

export default WaterTracker;
