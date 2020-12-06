import React,{useState,useEffect,useContext} from 'react';
import {View,Text,TouchableHighlight,StyleSheet,ActivityIndicator,ScrollView} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";
import call from 'react-native-phone-call'

const host = ipHost();



const home = ({navigation}) =>{


    const {colorb,colorTextoBoton,colorTitulo,colorIcono,colorFondo,colorLetra,
        cambiarColorBoton,cambiarColorHeader,cambiarColorLetra,cambiarColorFondo,cambiarColorSalir,
        cambiarColorBordeInput,cambiarColorTextoBoton,cambiarColorPlaceholderinput,cambiarColorPrimaryinput,
        cambiarColorIcono,cambiarColorError,cambiarColorTextoHeader,cambiarColorTitulo,
        cambiarColorBotonDesactivado,cambiarColorNotificacionesBorder,cambiarColorRadio,
        cambiarColorIconoLibre,cambiarFondoInput,cambiarTextoInput,
        } = useContext(EstilosContext);

    const { guardarChatroom,tienesicologo,tienegrupo,guardarTienesicologo,
        nuevosicologo,desvinculado,guardarDesvinculado,guardarNuevosicologo,
        primeracarga,guardarPrimeracarga} = useContext(NotificacionesContext);

    const [SicologoListo,guardarSicologoListo] = useState(false);
    const [alertadesvinculado,guardarAlertadesvinculado] = useState(false);

    const [cargando2,guardarCargando2] = useState(true);

    const [alertacuestionario,guardarAlertacuestionario] = useState(false);
    const [alertaopcionales,guardarAlertaopcionales] = useState(false);
    const [alertaenviar,guardarAlertaenviar] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);
    const [alertanonumero,guardarAlertanonumero] = useState(false);

    useEffect(() => {
        if (primeracarga===true){
            revision();
            estilos();
            guardarPrimeracarga(false);
        }
        else {
            guardarCargando2(false);
        }
      },[]);

    useEffect(() => {
        console.log(tienesicologo);
        if (nuevosicologo===true){
            console.log("ahora se conecto el sicologo")
            guardarNuevosicologo(false);
            guardarSicologoListo(true);
        }
        if (desvinculado===true){
            guardarAlertadesvinculado(true);
            guardarDesvinculado(false)
        }
      },[tienesicologo]);

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
    }
    const estilo4 = () => {
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
    }
    const estilo7 = () => {
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
    const funcion = async () =>{
        var tienehorario='';
        var tienepreferencias='';
        var tienecuestionario='';
        var correo='';
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.terapia_grupal===null){
                tienepreferencias='no';
                console.log("no ha puesto sus preferencias");
            }
            console.log(respuesta);
            correo=respuesta.data.email;
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        if (respuesta.data.terapia_grupal===null){
                            tienepreferencias='no';
                            console.log("no ha puesto sus preferencias");
                        }
                        console.log(respuesta);
                        correo=respuesta.data.email;
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/horarios/mihorario/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.length === 0){
                console.log("no ha elegido horario");
                tienehorario='no';
            }
            console.log(respuesta);
        } catch (error) {
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/horarios/mihorario/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        if (respuesta.data.length === 0){
                            console.log("no ha elegido horario");
                            tienehorario='no';
                        }
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/evaluacion/listar/',{paciente:correo,entre_fechas:false},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.length===0){
                tienecuestionario='no';
                console.log("no ha hecho el cuestionario");
            }
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{paciente:correo,entre_fechas:false},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        if (respuesta.data.length===0){
                            tienecuestionario='no';
                            console.log("no ha hecho el cuestionario");
                        }
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        if(tienecuestionario==='no'){
            guardarAlertacuestionario(true);
        }else if(tienehorario==='no' || tienepreferencias==='no'){
            guardarAlertaopcionales(true);
        }else{
            navigation.navigate('Elegir Psicólogo');
        }
    }



    const funcion2 = () =>{
        navigation.navigate('Solicitudes');
    }
    const funcion3 = () =>{
        navigation.navigate('CodigoSicologo');
    }
    const pedirChatroom = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/chat/rooms/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta.data);
            guardarChatroom(respuesta.data[0].id);
        } catch (error){
            console.log("error");
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion');
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/chat/rooms/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data); 
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                        //navigation.navigate('Home');
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }
    const revision = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_psicologo !== null){
                pedirChatroom();
                guardarTienesicologo(true);
            }
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
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if(respuesta.data.id_psicologo !== null){
                            guardarTienesicologo(true);
                        }
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
    const estilos = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.estiloapp==1){
                original();
            }
            else if (respuesta.data.estiloapp==2){
                estilo2();
            }
            else if (respuesta.data.estiloapp==3){
                estilo3();
            }
            else if (respuesta.data.estiloapp==4){
                estilo4();
            }
            else if (respuesta.data.estiloapp==5){
                estilo5();
            }
            else if (respuesta.data.estiloapp==6){
                estilo6();
            }
            else if (respuesta.data.estiloapp==7){
                estilo7();
            }
            else if (respuesta.data.estiloapp==8){
                estilo8();
            }
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                       
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        guardarCargando2(false);
    }
    const AlertarSicologo = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/panico/',{},
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
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/panico/',{},
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
    const enviar = async () => {
        AlertarSicologo();
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if (respuesta.data.numemergencia===''){
                guardarAlertanonumero(true);
                return
            }
            const args = {
                number: respuesta.data.numemergencia,
                prompt: false
            }
            call(args).catch(console.error)
            guardarAlertaexito(true);
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
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if (respuesta.data.numemergencia===''){
                            guardarAlertanonumero(true);
                            return
                        }
                        const args = {
                            numer: respuesta.data.numemergencia,
                            prompt: false
                        }
                        call(args).catch(console.error)
                        guardarAlertaexito(true);
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

    const consultar = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_psicologo !== null){
                console.log("se hizo en a")
                guardarSicologoListo(true);
            }
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
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if(respuesta.data.id_psicologo !== null){
                            guardarSicologoListo(true);
                        }
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
    const resolverAlertavinculacion = () => {
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
        guardarSicologoListo(false);
    }
    const ManejarDesvinculacion = () => {
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
        guardarAlertadesvinculado(false);
    }
    return (
        <View style={[globalStyles.contenedor,{backgroundColor:colorFondo}]}>
            {cargando2 === true ? <ActivityIndicator  size = "large" animating = {cargando2} style = {globalStyles.cargando}/> : null}
            {cargando2===false ?
            <View>
            {tienesicologo===true ?
            <View>
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Inicio</Text>
            <View style={styles.container}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-details" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mi perfil</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sesion') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-multiple-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mis sesiones</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Chat')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="chat" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Chat</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sentimiento')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="emoticon-happy-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>¿Cómo te sientes?</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="book-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Encuesta personal</Text>
                    </View>
                </TouchableHighlight >
                
                {tienegrupo===true ? <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("Disconformidad") }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-alert-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Disconformidad con el grupo</Text>
                    </View>
                </TouchableHighlight> : null}
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("Desvinculacion") }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="exit-run" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Desvincularse de Psicólogo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => guardarAlertaenviar(true) }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="exclamation" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Botón de pánico</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Personalizar') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Personalizar</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaenviar} onDismiss={() => guardarAlertaenviar(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Botón de pánico</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>¿Estás seguro de realizar una llamada a tu telefono de emergencia?</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarAlertaenviar(false);enviar()}} color={colorLetra}>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> guardarAlertaenviar(false)} color={colorLetra}>No</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaexito} onDismiss={() => {guardarAlertaexito(false)}}>
                    <Dialog.Title style={{color: colorLetra}}>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>La alerta ha sido enviada correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarAlertaexito(false)}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertanonumero} onDismiss={() => {guardarAlertanonumero(false)}}>
                    <Dialog.Title style={{color: colorLetra}}>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>No has ingresado un número de emergencia. Agrégalo en Editar Perfil</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarAlertanonumero(false)}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </View> : null}
        {tienesicologo===false ?
            <ScrollView>
                <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Bienvenido</Text>       
                <View style={styles.container}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion() }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-search" color={colorIcono}  size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Buscar Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion2() }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="note-multiple-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Ver solicitudes</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-details" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mi perfil</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="book-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Encuesta personal</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Preferencias')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-question-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Preferencias</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion3() }>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Icon name="chevron-right" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Ingresar Código</Text>
                            </View>
                        </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Personalizar') }>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Personalizar</Text>
                            </View>
                        </TouchableHighlight>
                </View>
                <Portal>
                    <Dialog style={{backgroundColor: colorFondo}} visible={alertacuestionario} onDismiss={() => {guardarAlertacuestionario(false);}}>
                        <Dialog.Title style={{color: colorLetra}}>Aviso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Para continuar, debe haber respondido la Encuesta
                            Personal
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertacuestionario(false);}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog style={{backgroundColor: colorFondo}} visible={alertaopcionales} onDismiss={() => {guardarAlertaopcionales(false);}}>
                        <Dialog.Title style={{color: colorLetra}}>Aviso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Para obtener mejores resultados, seleccione un horario 
                            y sus preferencias de psicólogo (Opcional)</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertaopcionales(false);navigation.navigate('Elegir Psicólogo');}} color={colorLetra}>Continuar</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertaopcionales(false);}} color={colorLetra}>Volver</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        : null}
            </View> : null }
            <Portal>
                    <Dialog style={{backgroundColor: colorFondo}} visible={SicologoListo} >
                        <Dialog.Title style={{color: colorLetra}}>Psicologo vinculado</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Una de sus solicitudas de psicólogo ha sido aceptada</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{resolverAlertavinculacion()}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog style={{backgroundColor: colorFondo}} visible={alertadesvinculado} onDismiss={() => {ManejarDesvinculacion()}}>
                        <Dialog.Title style={{color: colorLetra}}>Aviso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Tu psicólogo ha aceptado tu solicitud de desvinculación
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{ManejarDesvinculacion()}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
      },
    botonS:{
        height: RFPercentage(5),
        marginBottom: RFPercentage(2.5),
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: RFPercentage(3),
        color: 'black',
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default home;
