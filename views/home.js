import React from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const home = ({navigation,route}) =>{

    const navigationOptions={
        title:'sda',
        headerleft:null
    }

    const verificarSicologo = async() => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get('http://10.0.2.2:8000/usuarios/paciente/35/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_sicologo== null){
                navigation.navigate('Buscar Psicólogo');
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
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh = SON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get('http://10.0.2.2:8000/usuarios/paciente/35/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                            console.log(hola);          
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

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Empaty</Headline>
            <View style={styles.container}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sesion') }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-group" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Mi grupo</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-details" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Mi perfil</Text>
                    </View>
                </TouchableHighlight >
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    textoC: {
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 19,
        color: 'white'
    },
    botonS:{
        height: 70,
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    }
})

export default home;
