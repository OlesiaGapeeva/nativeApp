import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';

export default function DetailedScreen({ route, navigation }) {
  const [vacancy, setVacancy] = useState(null);
  const { id } = route.params;

  const fetchVacancy = async () => {
    try {
      const response = await fetch(`http://192.168.124.132:8000/vacancies/${id}`);
      const jsonData = await response.json();
      setVacancy(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log('Ошибка при получении вакансий:', error);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, []);

  if (!vacancy) {
    return null; // Render null or loading indicator while fetching vacancy data
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={<Header />}
        stickyHeaderIndices={[0]}
      />
          <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
                    <View style={styles.backButtonContainer}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </View>
        </TouchableOpacity>
    <View style={styles.card}>
      <View style={[styles.cardBody, {height:100}]} >
      <Text style={{ paddingLeft: 20,  fontWeight: 'bold',  fontSize: 18 }}>{vacancy?.title}</Text>
        <Text style={{ paddingLeft: 20,  fontSize: 18 }}>{vacancy?.salary} руб.</Text>
        <Text> </Text>
        <Text style={ {paddingLeft: 20}}>Требуемый опыт: {vacancy?.exp}</Text>
      </View>
    </View>
    <View style={styles.card}>
      <View style={[styles.cardBody, {height:90}]}>
        <Text style={{ paddingLeft: 20,  fontWeight: 'bold',  fontSize: 18 }}>{vacancy?.company}</Text>
        {vacancy?.city && (
          <View style={{paddingLeft: 20}}>
            <Text>{`${vacancy.city}${vacancy.adress ? `, ${vacancy.adress}` : ''}`}</Text>
          </View>
        )}
        <Text></Text>
        {vacancy?.image && vacancy.image !== null && vacancy.image !== '' && (
          <Image style={styles.image} source={{ uri: vacancy.image }} />
        )}
      </View>
    </View>

         <Text style={styles.cardText}>{vacancy?.info}</Text></View>
    
  );
}
const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 7.3,
        right: 0,
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    
    card: {
      width: '95%',
      backgroundColor: 'rgb(250, 250, 250)',
      marginTop: 10,
      marginLeft: 'auto',
      position: 'relative',
      marginRight: 'auto',
      borderWidth: 1, // Ширина обводки
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      display: 'flex',
  
  
      justifyContent: 'space-around',
    },
    cardBody: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
      },

    btn_apply: {
      backgroundColor: '#32c86c',
      color: '#fff',
      borderWidth: 0,
      padding: 10,
      cursor: 'pointer',
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
    },
    
    btn_apply_text: {
      color: '#fff',
    },

    cardText: {
        fontSize: 16, // equivalent to 1.2em assuming the base font size is 14px
        color: 'black',
        textAlign: 'justify',
        width: '93%',
        marginLeft: 'auto',
        position: 'relative',
        marginRight: 'auto',
        marginTop: 10
      },
      backButtonContainer: {
        marginLeft:20,
        marginTop: 5
      }
  });
