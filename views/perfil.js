import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Headline, Avatar} from 'react-native-paper';
import globalStyles from '../styles/global';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const perfil = ({navigation,route}) => {
    const [nombre,guardarNombre] = useState('');
    const [email,guardarEmail] = useState('');
    const [telefono,guardarTelefono] = useState('');
    const [genero,guardarGenero] = useState('');
    const [imagenperfil,guardarImagenperfil] = useState('https://homepages.cae.wisc.edu/~ece533/images/airplane.png');

    useEffect(() => {
        consultar();
    },[]);
    
    const consultar = async () => {
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post('http://10.0.2.2:8000/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarNombre(respuesta.data.fullname);
            guardarEmail(respuesta.data.email);
            guardarTelefono(respuesta.data.telefono);
            guardarGenero(respuesta.data.genero);
            console.log(respuesta);
        } catch (error) {
            console.log("error");
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post('http://10.0.2.2:8000/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
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

    const editarperfil = () => {
        console.log("hola");
        const datos={nombre,telefono,genero};
        navigation.navigate('EditarPerfil', {datos});
    }

    const avatar = () => {
        return (<View style={{alignItems: 'center'}}>
                    <UserAvatar size={100} name= {nombre} />
                    <Text style={styles.textoS}>{nombre}</Text>
                </View>)
    }

    const avatarimagen = () => {
        return (<View style={{alignItems: 'center'}}>
                    <Avatar.Image size={100} source={{uri: imagenperfil}} />
                    <Text style={[styles.textoS,{marginTop:5,fontSize:19}]}>{nombre}</Text>
                </View>)
    }

    return (
        <View style={[globalStyles.contenedor]}>
            <Text style={globalStyles.titulo}>Mi perfil</Text>
            {imagenperfil !== '' ? avatarimagen(): nombre !== '' ? avatar() : console.log('')}
            <View style={{marginTop: 25,marginHorizontal:7}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="email" color="#777777" size={20}></Icon>
                    <Text style={styles.textoS}>Correo: {email}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="phone" color="#777777" size={20}></Icon>
                    <Text style={styles.textoS}>Teléfono: {telefono}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="rhombus-outline" color="#777777" size={20}></Icon>
                    <Text style={styles.textoS}>Género: {genero}</Text>
                </View>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} onPress={() => editarperfil() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="pencil-outline" color="white" size={30}></Icon>
                            <Text style={[styles.textoC,{marginLeft:10}]}> Editar Perfil </Text>
                        </View>
                    </TouchableHighlight>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    botonC:{
        marginTop: 5,
        height: 40,
        marginBottom: 5,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#1e524c',
        alignItems: 'center',
        borderRadius: 8,
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    container:{
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    botonS:{
        height: 50,
        marginBottom: 20,
        marginHorizontal: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    },
    textoC:{
        marginBottom: 2,
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Regular'
    }
})

export default perfil;
