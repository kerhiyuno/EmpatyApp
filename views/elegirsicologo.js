import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import globalStyles from '../styles/global';
import {Avatar} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const elegirsicologo = ({navigation}) =>{

    const {colorb,colorLetra,colorTextoBoton,colorTitulo,colorFondo} = useContext(EstilosContext);

    const [sicologos, guardarSicologos] = useState([]);
    const [cerosicologos, guardarCerosicologos] = useState(false);
    const [imagenperfil,guardarImagenperfil] = useState('https://homepages.cae.wisc.edu/~ece533/images/airplane.png');

    const [cargando, guardarCargando] = useState(false);

    useEffect( () => {
          afinidad();
      },[]
    )
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const afinidad = async ()=>{
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/usuarios/afinidad/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.length == 0){
                guardarCerosicologos(true);
            }else{
                guardarSicologos(respuesta.data);
            }
            guardarCargando(false);
        } catch (error) {
            console.log("error");
            console.log(error.response);
            if(error.response.data.code === 'token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion');
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/usuarios/afinidad/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarSicologos(respuesta.data);
                        guardarCargando(false);
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

    const irHorarios = (email) =>{
        console.log(email);
        navigation.navigate('horario sicologo',{email: email})
    }

    const avatar = (nombre) =>{
        return (<View style={{alignItems: 'center',flex:1,justifyContent:'center'}}>
                    <UserAvatar size={70} name= {nombre} />
                </View>)
    }

    const avatarimagen = (imagenperfil) =>{
        return (<View style={{alignItems: 'center',flex:1,justifyContent:'center'}}>
                    <Avatar.Image size={70} source={{uri: imagenperfil}} />
                </View>)
    }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
                <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Elige un psicólogo</Text>
                <Text style={{fontSize:18,marginHorizontal:15,color: colorLetra}}>{cerosicologos==true ? 'No se han encontrado psicólogos que coincidan con tu horario':''}</Text>
                <FlatList
                    data={sicologos}
                    style={{marginBottom: 10}}
                    renderItem={({item,index}) => (
                        <TouchableHighlight underlayColor = {'transparent'} onPress={  () => irHorarios(item.email)} style={[styles.botonC,{backgroundColor: colorb}]}>
                            <View style={{flex:1,flexDirection: 'row'}}>
                                <View style={{flex:0.3,flexDirection: 'column'}}>
                                    {imagenperfil !== '' ? avatarimagen(imagenperfil) : item.fullname !== '' ? avatar(item.fullname) : console.log('')}
                                </View>
                                <View style={{flex:0.25,flexDirection: 'column',marginVertical:10,marginLeft:0}}>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Nombre:</Text>
                                    </View>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Género:</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.45,flexDirection: 'column',marginVertical:10,marginRight:10}}>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>{item.fullname}</Text>
                                    </View>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>{item.genero}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                    }
                    keyExtractor={sicologos => sicologos.email}
                />
            </View> : null}
        </View >

    );
}

const styles=StyleSheet.create({
    botonC:{
        marginTop: 0,
        height: RFPercentage(13),
        marginBottom: RFPercentage(2),
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#e35d17',
        borderRadius: 8
    },
    textoC:{
        marginTop:0,
        marginHorizontal: 0,
        fontSize: RFPercentage(2.3),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default elegirsicologo;