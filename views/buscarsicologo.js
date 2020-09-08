import React,{ useEffect,useState } from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const buscarsicologo = ({navigation,route}) => {

    const [count, setCount] = useState(0);
    const [SicologoListo,guardarSicologoListo] = useState(false);

    var timer;

    useEffect(() => {
        timer = setInterval(async() => consultar(), 20000);
        console.log(timer);
        return () => clearInterval(timer);
      });

    const consultar = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta.data.id_psicologo);
            if(respuesta.data.id_psicologo !== null){
                guardarSicologoListo(true);
                clearInterval(timer);
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
                            clearInterval(timer);
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

    const funcion = () =>{
        navigation.navigate('Elegir Psicólogo');
    }
    const funcion2 = () =>{
        navigation.navigate('Solicitudes');
    }
    const funcion3 = () =>{
        navigation.navigate('CodigoSicologo');
    }
    return (
        <ScrollView style={globalStyles.contenedor} >
            <Text style={globalStyles.titulo}>Bienvenido</Text>       
            <View style={styles.container}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-search" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Buscar Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion2() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="note-multiple-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Ver solicitudes</Text>
                        </View>
                    </TouchableHighlight>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-details" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Mi perfil</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="book-outline" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Cuestionario de Sintomatología</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Preferencias')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-question-outline" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Preferencias</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion3() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="chevron-right" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Ingresar Código</Text>
                        </View>
                    </TouchableHighlight>
            </View>

            <Portal>
                <Dialog visible={SicologoListo} >
                    <Dialog.Title>Psicologo vinculado</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Una de sus solicitudas de psicólogo ha sido aceptada</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>{guardarSicologoListo(false); navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});}} color='#3c2c18'>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
      },
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
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default buscarsicologo;