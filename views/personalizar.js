import React,{useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ScrollView} from 'react-native';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';
import AsyncStorage from '@react-native-community/async-storage';
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from 'axios';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const Personalizar = () => {

    const {colorb,colorTextoBoton,colorTitulo,colorIcono,
        cambiarColorBoton,cambiarColorHeader,cambiarColorLetra,cambiarColorFondo,cambiarColorSalir,
        cambiarColorBordeInput,cambiarColorTextoBoton,cambiarColorPlaceholderinput,cambiarColorPrimaryinput,
        cambiarColorIcono,cambiarColorError,cambiarColorTextoHeader,cambiarColorTitulo,
        cambiarColorBotonDesactivado,cambiarColorNotificacionesBorder,colorFondo,cambiarColorRadio,
        cambiarColorIconoLibre,cambiarFondoInput,cambiarTextoInput} = useContext(EstilosContext);

    const original = async () => {
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }

    const estilo2 = async () => {
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 2},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo3 = async () => {
        cambiarColorBoton("#5e758a");
        cambiarColorHeader('#73c0f4');
        cambiarColorLetra('black');
        cambiarColorFondo('#f3e4c6');
        cambiarColorSalir('#5e758a');
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 3},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo4 = async () => {
        cambiarColorBoton("#688045");
        cambiarColorHeader('#d17b54');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#688045');
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 4},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo5 = async () => {
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 5},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo6 = async () => {
        cambiarColorBoton("#a3586d");
        cambiarColorHeader('#f4874b');
        cambiarColorLetra('black');
        cambiarColorFondo('white');
        cambiarColorSalir('#a3586d');
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 6},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo7 = async () => {
        cambiarColorBoton("#1e56a0");
        cambiarColorHeader('#284ca1');
        cambiarColorLetra('black');
        cambiarColorFondo('#d6e9f0');
        cambiarColorSalir('#113461');
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 7},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const estilo8 = async () => {
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
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 8},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{estiloapp: 1},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }


    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[globalStyles.titulo,{marginBottom:10,color: colorTitulo}]}>Cambiar Colores</Text>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => original() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Empaty (Predeterminado)</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo2() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Inspirador</Text>
                            </View>
                        </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => estilo3() }>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Playa</Text>
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
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Dulce</Text>
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
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Invierno</Text>
                            </View>
                        </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    botonS:{
        height: RFPercentage(6),
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
