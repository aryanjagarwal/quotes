import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                //backgroundColor: '#1a1a2e',
                backgroundColor: '#151515',
                //borderTopColor: '#16213e',
                borderTopColor: '#151515',
            },
            tabBarItemStyle:{
                backgroundColor: '#262626',
                borderRadius: 100,
                marginHorizontal: 12,
                marginBottom: 7,
            },
            //tabBarActiveTintColor: 'blue',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#969696', // #969696
        }}>
            <Tabs.Screen name="quote"
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Quotes',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen name="water"
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Water',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "water" : "water-outline"} color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen name="todo"
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Todo',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "list" : "list-outline"} color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    )
}