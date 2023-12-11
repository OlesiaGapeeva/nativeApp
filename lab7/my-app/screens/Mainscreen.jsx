import React, { useState, useEffect } from 'react';
import VacancyCard from '../components/VacancyCard';
import { ScrollView, View, Text, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

export default function MainScreen({ navigation }) {
  const [vacancies, setVacancies] = useState([]);
  const [titleValue, setTitleValue] = useState('');

    const getAllVacancies = async () => {
    let url = 'http://192.168.124.132:8000/vacancies/';
    if (titleValue) {
      url += `?keyword=${titleValue}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVacancies(data.vacancies || []);
    } catch (error) {
      console.log('Ошибка при получении вакансий:', error);
    }
  };

  useEffect(() => {
    getAllVacancies();
  }, []);

  const handleTitleValueChange = (text) => {
    setTitleValue(text);
  };

  const handleSearchButtonClick = () => {
    getAllVacancies();
  };


  return (
      <View>
      <FlatList
        ListHeaderComponent={<Header />}
        stickyHeaderIndices={[0]}
      />

        <View style={{marginTop: 0}}></View>
        <ScrollView>
        <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white'
      }}
    >
      <TextInput
        onChangeText={handleTitleValueChange}
        placeholder="Введите название вакансии"
        style={{
          backgroundColor: 'rgb(231, 230, 230)',
          height: 30,
          width: 300,
          fontSize: 18,
          borderRadius: 10,
          marginRight: 5,
          textAlign: 'center',
        }}
      />
      <TouchableOpacity
        onPress={handleSearchButtonClick}
        style={{
          backgroundColor: '#0066ff',
          height: 30,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
        }}
      >
        <Text style={{ color: 'white', fontSize: 15 }}>Поиск</Text>
      </TouchableOpacity>
    </View>
        {!!vacancies && vacancies.map((vacancy) => <VacancyCard key={vacancy.id} {...vacancy} />)}
        </ScrollView>
      </View>
  );
}
