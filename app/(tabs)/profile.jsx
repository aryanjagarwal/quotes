import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <LinearGradient
     //colors={['#1a1a2e', '#16213e']} 
     colors={['#151515', '#151515']}
     style={styles.container}
     >
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.cXGd4J8wRHHc6karzyZXIgHaLH?w=800&h=1200&rs=1&pid=ImgDetMain' }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.username}>Tzuyu</Text>
        <Text style={styles.email}>tzuyu@example.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Ionicons name="bookmarks" size={24} color="#2e9dff" />
          <Text style={styles.infoText}>Saved Quotes</Text>
        </View>
        <View style={styles.infoBox}>
          <Ionicons name="heart" size={24} color="#ff4d4d" />
          <Text style={styles.infoText}>Favorites</Text>
        </View>
        <View style={styles.infoBox}>
          <Ionicons name="settings" size={24} color="black" />
          <Text style={styles.infoText}>Settings</Text>
        </View>
      </View>

      {/*
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 40,
      }}>
      <TouchableOpacity style={{
        backgroundColor: '#2e9dff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
      }}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: '#2e9dff',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#2e9dff',
    marginBottom: 15,
  },
  username: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#dcdde1',
    marginTop: 5,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: '#a6a6a6',
  },
  infoText: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#b78fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
