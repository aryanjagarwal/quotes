import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-deck-swiper';
import { StatusBar } from 'expo-status-bar';


const { width, height } = Dimensions.get('window');

// Define a type for the quote
interface Quote {
  text: string;
  author: string | null;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quotes from the API
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        const data: Quote[] = await response.json();
        setQuotes(data.slice(0, 50)); // Limit to 50 quotes for now
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={['#000', '#333']}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#FF6F61" />
      </LinearGradient>
    );
  }

  return (
    <>      
      <LinearGradient
        //colors={['#1a1a2e', '#16213e']}
        colors={['#151515', '#151515']}
        //colors={['#1c1c1c', '#3a3a3a']}
        style={styles.container}
      >
        <Swiper
          cards={quotes}
          renderCard={(quote) => (
            <View style={styles.card}>
              <Text style={styles.text}>{quote.text}</Text>
              <Text style={styles.author}>- {quote.author || 'Unknown'}</Text>
            </View>
          )}
          onSwiped={(cardIndex) => console.log('Swiped!', cardIndex)}
          onSwipedAll={() => console.log('All cards swiped')}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          infinite
          overlayLabels={{
            left: {
              title: '💔',
              style: {
                label: {
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 90,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: '❤️',
              style: {
                label: {
                  backgroundColor: 'pink',
                  color: 'white',
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 90,
                  marginLeft: 30,
                },
              },
            },
          }}
        />   
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    padding: 20,
    //backgroundColor: 'rgba(183, 143, 255, 0.9)',
    //backgroundColor: 'rgba(255, 147, 138, 0.9)',
    backgroundColor: 'rgba(241, 239, 239, 0.9)', // #f1efef
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    marginTop: 60,// my
  },
  text: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    color: '#e8e8e8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
