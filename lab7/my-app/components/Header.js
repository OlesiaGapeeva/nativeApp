import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Svg } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header__wrapper}>
          <View style={styles.header__img}>
        <Icon name="briefcase" size={17} color="#ffffff" />
            <Text style={styles.header__logo}>mm</Text>
          </View>
          <Text style={styles.header__logo}>Сервис по поиску вакансий</Text>
          <Text style={styles.header__logo}>Вход</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0066ff',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header__wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 20,
    marginBottom:-5,
    // backgroundColor: "#fff"
  },
  header__img: {
    marginLeft: 30,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row'
  },
  header__logo: {
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 5,
  },
  header__profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__profile: {
    color: '#ffffff',
  },
  header__spacer: {
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 16,
  },
});

export default Header;