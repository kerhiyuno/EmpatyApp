import React, {useState,useContext,useEffect} from 'react';
import {View,StyleSheet,Text,TouchableHighlight,ActivityIndicator,Image,useWindowDimensions } from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext'
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const sinsesion = ({navigation}) =>{

    const {obtenerTokenFirebase,guardarPrimeracarga} = useContext(NotificacionesContext);
    const {colorb,colorFondo,colorLetra,
        colorBordeInput,colorTextoBoton,colorPlaceholderinput,colorPrimaryinput,
        colorIcono,colorFondoInput} = useContext(EstilosContext);

    useEffect(() => {
        guardarPrimeracarga(true);
    }, [])

    const {width, height} = useWindowDimensions();
    const textinputsize = height*0.07;


    const [email,guardarEmail] = useState('');
    const [password,guardarPassword] = useState('');
    const [alerta,guardarAlerta] = useState(false);
    const [inicioFallido,guardarInicioFallido] = useState(false);
    const [alertavacio,guardarAlertaVacio] = useState(false);

    const [cargando,guardarCargando] = useState(false)

    const resultadoinicio = async (respuesta) => {
        if (respuesta.status==200){
            var tokenfirebase= obtenerTokenFirebase()
            console.log(tokenfirebase);
            try {
                await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,
                    refresh: respuesta.data.refresh
                    }));
                await AsyncStorage.setItem('email',email);
                try {
                    const nombre = await AsyncStorage.getItem('datosSesion');
                    const respuesta = await axios.post(host+'/push/fcm/',{fcm: tokenfirebase},
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
                                const respuesta = await axios.post(host+'/push/fcm/',{fcm: tokenfirebase},
                                {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
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
                    console.log(nombre);
                    console.log(JSON.parse(nombre).access);
                    const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                    {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                    console.log(respuesta);
                    if(respuesta.data.id_psicologo== null){
                        await AsyncStorage.setItem('tienesicologo',JSON.stringify({ tiene: 'no'}));
                        guardarCargando(false);
                        navigation.navigate('Tabs');
                    }else{
                        await AsyncStorage.setItem('tienesicologo',JSON.stringify({ tiene: 'si'}));
                        guardarCargando(false);
                        navigation.navigate('Tabs');
                    }
                    } catch (error) {
                        console.log("error");
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
                                    if(respuesta.data.id_psicologo== null){
                                        await AsyncStorage.setItem('tienesicologo',JSON.stringify({ tiene: 'no'}));
                                        guardarCargando(false);
                                        navigation.navigate('Tabs');
                                    }else{
                                        await AsyncStorage.setItem('tienesicologo',JSON.stringify({ tiene: 'si'}));
                                        guardarCargando(false);
                                        navigation.navigate('Tabs');
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
                } catch (error) {
                    console.log(error);
                    guardarInicioFallido(true);
                    return
                }
        }
        else{
            console.log('error')
            guardarInicioFallido(true);
        }
    }

    const iniciosesion = async () => {
        guardarCargando(true);
        if( email === '' || password === ''){
            guardarAlertaVacio(true);
            guardarCargando(false);
            return;
        }
        try {
            const credenciales = {email,password};
            var respuesta = await axios.post(host+'/account/login/', credenciales);
            console.log(credenciales);
            console.log(respuesta.status);
            console.log(respuesta.data.access);
            resultadoinicio(respuesta);
        } catch (error) {
            console.log(error);
            if (error.response.data.detail==='No active account found with the given credentials'){
                guardarInicioFallido(true);
            }
            console.log(error.response);
            guardarCargando(false);
            return;
        }
   }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor:colorFondo}]}>
            <KeyboardAwareScrollView>
            <View style={{justifyContent:'space-around',marginTop: height/20,marginBottom: height/40}}>
                <Image
                    style={[styles.tinyLogo,{width: width*0.35,height: 1.2*width*0.35}]}
                    source={
                        require('../images/empaty.png')
                    }
                />
            </View>
            <View style={{justifyContent: 'flex-start'}}>
                <TextInput
                    label="Correo"
                    onChangeText={(texto) => guardarEmail(texto)}
                    style={[globalStyles.input,{borderColor:colorBordeInput,height: textinputsize,backgroundColor:colorFondoInput}]}
                    theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                />
                <TextInput
                    label="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(texto) => guardarPassword(texto)}
                    style={[globalStyles.input,{borderColor:colorBordeInput,height: textinputsize,backgroundColor:colorFondoInput}]}
                    theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                    />
                <TouchableHighlight  style={[styles.botonS,{backgroundColor:colorb,height: height/20}]} underlayColor = {'transparent'} onPress={()=>iniciosesion()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="login" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Iniciar Sesión</Text>
                    </View>
                </TouchableHighlight >
                {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {styles.cargando}/> : null}
                <TouchableHighlight  style={[styles.botonS,{marginHorizontal:width/5,backgroundColor:colorb,height: height/20,marginTop: height/10}]} underlayColor = {'transparent'} onPress={ () => navigation.navigate('Registro 1/7')}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Regístrate</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)} >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={inicioFallido} onDismiss={() => guardarInicioFallido(false)} >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Los datos son incorrectos.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarInicioFallido(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertavacio} onDismiss={() => guardarAlertaVacio(false)} >
                    <Dialog.Title style={{color: colorLetra}}>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Todos los campos son obligatorios.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertaVacio(false)} color={colorLetra}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles=StyleSheet.create({
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: RFPercentage(2.5),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-Light',
    },
    botonS:{
        height: RFPercentage(5),
        marginBottom: 0,
        marginHorizontal: 13,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    cargando: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        height: 0,
        alignContent: 'center',
        alignSelf:'center',
        marginVertical: 0
    },
    tinyLogo: {
        alignSelf:'center',
        width:110,
        height: 132,
        marginBottom: 35
    },
})

export default sinsesion;