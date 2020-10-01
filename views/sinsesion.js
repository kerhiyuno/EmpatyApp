import React, {useState,useEffect,useContext} from 'react';
import {View,StyleSheet,Text,TouchableHighlight,ActivityIndicator,Image} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'

const host = ipHost();

const sinsesion = ({navigation,route}) =>{

    const {obtenerTokenFirebase} = useContext(NotificacionesContext);

    const [email,guardarEmail] = useState('');
    const [password,guardarPassword] = useState('');
    const [alerta,guardarAlerta] = useState(false);
    const [inicioFallido,guardarInicioFallido] = useState(false);
    const [alertavacio,guardarAlertaVacio] = useState(false);

    const [cargando,guardarCargando] = useState(false)

    /*const inicioautomatico = async () => {
        const token = await AsyncStorage.getItem('datosSesion');
        if (token !== null) {
          navigation.navigate('Inicio');
        } else {
            return
        }
      } */
    useEffect( () => {
        //inicioautomatico();
    })

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
                                    console.log(hola);
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
                                    //navigation.navigate('Home');
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
            if (respuesta.status==200){
                console.log("hola");
            }
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
        <View style={[globalStyles.contenedor,{justifyContent:'center',marginBottom:70}]}>
            <Image
                style={styles.tinyLogo}
                source={
                    require('../images/empaty.png')
                }
            />
            <TextInput
                label="Correo"
                onChangeText={(texto) => guardarEmail(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
            />
            <TextInput
                label="Contraseña"
                secureTextEntry={true}
                onChangeText={(texto) => guardarPassword(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                />
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>iniciosesion()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="login" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Iniciar Sesión</Text>
                    </View>
                </TouchableHighlight >
                {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {styles.cargando}/> : null}
            </View>
            <View style={[styles.container,{marginTop:70}]}>
                <TouchableHighlight  style={[styles.botonS,{marginHorizontal:100}]} underlayColor = {'transparent'} onPress={ () => navigation.navigate('Registro 1/7')}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textoC}>Regístrate</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)} >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios</Paragraph>
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
                        <Paragraph style={globalStyles.textoAlerta}>Los datos son incorrectos</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarInicioFallido(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertavacio} onDismiss={() => guardarAlertaVacio(false)} >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertaVacio(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles=StyleSheet.create({
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-Light',
    },
    botonS:{
        height: 40,
        marginBottom: 0,
        marginHorizontal: 8,
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
        width:120,
        height: 144,
        marginBottom: 40
    },
})

export default sinsesion;