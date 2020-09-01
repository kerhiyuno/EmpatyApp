import React,{ useEffect,useState } from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import {Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';

import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

const Preferencias = ({navigation,route}) => {
    return (
        <ScrollView style={globalStyles.contenedor} >
            <Text style={globalStyles.titulo}>Preferencias de Búsqueda</Text>
            <Text style={[styles.textoS,{marginBottom:20}]}>Para iniciar la búsqueda de psicólogo, selecciona tus preferencias.</Text>     
            <View style={styles.container}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("PreferenciasSicologo") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-question-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Preferencias de Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
            </View>

            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("ElegirHorario") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar-question" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Horario</Text>
                        </View>
                    </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
      },
    botonS:{
        height: 70,
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 19,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoC: {
        marginBottom: 10,
        marginHorizontal: 7,
        fontSize: 18,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Preferencias;