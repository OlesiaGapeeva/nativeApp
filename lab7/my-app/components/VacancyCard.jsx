import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  
  card: {
    width: '95%',
    height: 200,
    backgroundColor: 'rgb(250, 250, 250)',
    marginTop: 20,
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
});

export default function VacancyCard(props) {
    const navigation = useNavigation();

  const onImageClick = () => {
    navigation.navigate('Detail', { id: props.id });
    }
  

  return (
    <View style={styles.card}>
      <Image
  style={styles.image}
  source={{ uri: props.image? props.image : 'https://img.freepik.com/premium-vector/business-briefcase-icon-simple-illustration-of-business-briefcase-vector-icon-for-web_96318-22695.jpg?size=626&ext=jpg' }}
/>

      
      <View>
      <TouchableOpacity onPress={onImageClick}>
        <Text style={{ paddingLeft: 20,  fontWeight: 'bold',  fontSize: 18, color: '#0066ff' }}>{props.title}</Text>
    </TouchableOpacity>
        <Text style={{ paddingLeft: 20, fontSize: 16}}>{props.salary} руб.</Text>
      </View>

      <View>
        <Text style={{ paddingLeft: 20 }}>{props.company}</Text>
        <Text style={{ paddingLeft: 20 }}>{props.city}</Text>
      </View>

      <View style={{ paddingLeft: 20 }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor" viewBox="0 0 18 16" style={{ marginRight: '7px' }}>
        <Icon name="briefcase" size={17} color="#000" />
      </Svg> 
          <Text>{props.exp}</Text>
        </View>
      </View>
    
      

    </View>
  );
};
