import React,{useEffect,useState} from 'react';
import {Text,FlatList,View,ScrollView,StyleSheet,TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import globalStyles from '../styles/global';
import {Headline,Avatar} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';

const elegirsicologo = ({navigation,route}) =>{

    const [sicologos, guardarSicologos] = useState([]);
    const [cerosicologos, guardarCerosicologos] = useState(false);
    const [imagenperfil,guardarImagenperfil] = useState('https://homepages.cae.wisc.edu/~ece533/images/airplane.png');

    useEffect( () => {
          afinidad();
      },[]
    )

    const afinidad = async ()=>{
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get('http://10.0.2.2:8000/usuarios/afinidad/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if(respuesta.data.length == 0){
                guardarCerosicologos(true);
            }else{
                guardarSicologos(respuesta.data);
            }
        } catch (error) {
            console.log("error");
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion');
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get('http://10.0.2.2:8000/usuarios/afinidad/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarSicologos(respuesta.data);          
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
        <ScrollView style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}>Elige un psicólogo</Text>
            <Text style={{fontSize:19,marginHorizontal:15}}>{cerosicologos==true ? 'No se han encontrado psicólogos que coincidan con tu horario':''}</Text>
            <FlatList
                data={sicologos}
                style={{marginBottom: 10}}
                renderItem={({item,index}) => (
                    <TouchableHighlight underlayColor = {'transparent'} onPress={  () => irHorarios(item.email)} style={styles.botonC} >
                        <View style={{flex:1,flexDirection: 'row'}}>
                            <View style={{flex:1,flexDirection: 'column'}}>
                                {imagenperfil !== '' ? avatarimagen(imagenperfil) : item.fullname !== '' ? avatar(item.fullname) : console.log('')}
                            </View>
                            <View style={{flex:1,flexDirection: 'column',marginVertical:10,marginLeft:0}}>
                                <View style={{flex:0.5}}>
                                    <Text style={[styles.textoC]}>Nombre:</Text>
                                </View>
                                <View style={{flex:0.5}}>
                                    <Text style={[styles.textoC]}>Género:</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection: 'column',marginVertical:10,marginRight:10}}>
                                <View style={{flex:0.5}}>
                                    <Text style={[styles.textoC]}>{item.fullname}</Text>
                                </View>
                                <View style={{flex:0.5}}>
                                    <Text style={[styles.textoC]}>{item.genero}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )
                }
                keyExtractor={sicologos => sicologos.email}
            />
        </ScrollView >

    );
}

const styles=StyleSheet.create({
    botonC:{
        marginTop: 10,
        height: 90,
        marginBottom: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#1e524c',
        borderRadius: 8
    },
    textoC:{
        marginTop:5,
        marginHorizontal: 0,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default elegirsicologo;