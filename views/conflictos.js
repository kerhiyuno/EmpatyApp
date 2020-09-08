import React,{ useEffect,useState } from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import {Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';

import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

const Conflictos = ({navigation,route}) => {
    return (
        <ScrollView style={[globalStyles.contenedor,{marginTop:40}]} >
            <View style={styles.container}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("PreferenciasSicologo") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="close" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Desvincularse de Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
            </View>

            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("ElegirHorario") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-alert-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Disconformidad con el grupo</Text>
                        </View>
                    </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10      },
    botonS:{
        height: 60,
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
        marginHorizontal: 7,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Conflictos;