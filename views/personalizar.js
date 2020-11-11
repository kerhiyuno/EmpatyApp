import React,{useEffect,useState,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';

const host = ipHost();

const Personalizar = ({navigation,route}) => {

    const {colorb,colorLetra,colorTextoBoton,colorTitulo,colorIcono,
        cambiarColorBoton,cambiarColorHeader,cambiarColorLetra,cambiarColorFondo,cambiarColorSalir,
        cambiarColorBordeInput,cambiarColorTextoBoton,cambiarColorPlaceholderinput,cambiarColorPrimaryinput,
        cambiarColorIcono,cambiarColorError,cambiarColorTextoHeader,cambiarColorTitulo,
        cambiarColorBotonDesactivado,cambiarColorNotificacionesBorder,colorFondo} = useContext(EstilosContext);

    const original = () => {
        cambiarColorBoton("#e35d17");
        cambiarColorHeader('#f58b2f');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#d15311');
        cambiarColorBordeInput('#357870');
        cambiarColorTextoBoton('white');
        cambiarColorPlaceholderinput('#3c2c18');
        cambiarColorPrimaryinput('#3c2c18');
        cambiarColorNotificacionesBorder('#828282');
        cambiarColorBotonDesactivado('#5e5e5e');
        cambiarColorTitulo('#141414');
        cambiarColorTextoHeader('white');
        cambiarColorError('#a12b2b');
        cambiarColorIcono('white');
    }

    const estilo1 = () => {
        cambiarColorBoton("#e35d17");
        cambiarColorHeader('yellow');
        cambiarColorLetra('black');
        cambiarColorFondo('red');
        cambiarColorSalir('blue');
        cambiarColorBordeInput('#357870');
        cambiarColorTextoBoton('green');
        cambiarColorPlaceholderinput('#3c2c18');
        cambiarColorPrimaryinput('#3c2c18');
        cambiarColorNotificacionesBorder('#828282');
        cambiarColorBotonDesactivado('#5e5e5e');
        cambiarColorTitulo('#141414');
        cambiarColorTextoHeader('black');
        cambiarColorError('#a12b2b');
        cambiarColorIcono('white');
    }
    const estilo2 = () => {
        cambiarColorBoton("black"),
        cambiarColorHeader('red'),
        cambiarColorLetra('black'),
        cambiarColorFondo('yellow'),
        cambiarColorSalir('#d15311'),
        cambiarColorBordeInput('#357870'),
        cambiarColorTextoBoton('purple'),
        cambiarColorPlaceholderinput('#3c2c18'),
        cambiarColorPrimaryinput('#3c2c18'),
        cambiarColorNotificacionesBorder('#828282'),
        cambiarColorBotonDesactivado('#5e5e5e'),
        cambiarColorTitulo('white'),
        cambiarColorTextoHeader('white'),
        cambiarColorError('#a12b2b'),
        cambiarColorIcono('black')
    }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[globalStyles.titulo,{marginBottom:10,color: colorTitulo}]}>Cambiar Colores</Text>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => original() }>
                            <View style={{flexDirection:'row'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={25}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Original</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo1() }>
                            <View style={{flexDirection:'row'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={25}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Estilo1</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo2() }>
                            <View style={{flexDirection:'row'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={25}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Estilo2</Text>
                            </View>
                        </TouchableHighlight>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    botonS:{
        height: 50,
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Personalizar;
