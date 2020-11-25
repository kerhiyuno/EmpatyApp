import React,{useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ScrollView} from 'react-native';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";


const Personalizar = () => {

    const {colorb,colorTextoBoton,colorTitulo,colorIcono,
        cambiarColorBoton,cambiarColorHeader,cambiarColorLetra,cambiarColorFondo,cambiarColorSalir,
        cambiarColorBordeInput,cambiarColorTextoBoton,cambiarColorPlaceholderinput,cambiarColorPrimaryinput,
        cambiarColorIcono,cambiarColorError,cambiarColorTextoHeader,cambiarColorTitulo,
        cambiarColorBotonDesactivado,cambiarColorNotificacionesBorder,colorFondo,cambiarColorRadio,
        cambiarColorIconoLibre,cambiarFondoInput,cambiarTextoInput} = useContext(EstilosContext);

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
        cambiarColorRadio('black');
        cambiarColorIconoLibre('black');
        cambiarFondoInput('white');
        cambiarTextoInput('black');
    }

    const estilo2 = () => {
        cambiarColorBoton("#d53c3c");
        cambiarColorHeader('#8d2d56');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#a3445d');
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
        cambiarColorRadio('black');
    }
    const estilo3 = () => {
        cambiarColorBoton("#728ca3");
        cambiarColorHeader('#73c0f4');
        cambiarColorLetra('black');
        cambiarColorFondo('#f3e4c6');
        cambiarColorSalir('#728ca3');
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
        cambiarColorRadio('black');
    }
    const estilo4 = () => {
        cambiarColorBoton("#778f59");
        cambiarColorHeader('#d17b54');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#799351');
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
        cambiarColorRadio('black');
    }
    const estilo5 = () => {
        cambiarColorBoton("#52733b");
        cambiarColorHeader('#84a45a');
        cambiarColorLetra('black');
        cambiarColorFondo('#edebf2');
        cambiarColorSalir('#715e4e');
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
        cambiarColorRadio('black');
    }
    const estilo6 = () => {
        cambiarColorBoton("#a3586d");
        cambiarColorHeader('#f4874b');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#f46a4e');
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
        cambiarColorRadio('black');
    }
    const estilo7 = () => {
        cambiarColorBoton("#1e56a0");
        cambiarColorHeader('#163172');
        cambiarColorLetra('black');
        cambiarColorFondo('#d6e9f0');
        cambiarColorSalir('#1e56a0');
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
        cambiarColorRadio('black');
    }
    const estilo8 = () => {
        cambiarColorBoton("#40464f");
        cambiarColorHeader('#1979a9');
        cambiarColorLetra('black');
        cambiarColorFondo('#cce7e8');
        cambiarColorSalir('#393e46');
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
        cambiarColorRadio('black');
    }


    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[globalStyles.titulo,{marginBottom:10,color: colorTitulo}]}>Cambiar Colores</Text>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => original() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Original Empaty</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo2() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Romántico e Inspirador</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo3() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Verano</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo4() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Otoño</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo5() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Natural</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo6() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Naranja/Burdeo</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo7() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Azul</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo8() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Azul claro</Text>
                            </View>
                        </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    botonS:{
        height: RFPercentage(8),
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Personalizar;
