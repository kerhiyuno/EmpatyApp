import React,{useEffect,useState,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Avatar} from 'react-native-paper';
import globalStyles from '../styles/global';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';

const host = ipHost();

const perfil = ({navigation,route}) => {

    const {colorb,colorLetra,colorTextoBoton,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);

    const [nombre,guardarNombre] = useState('');
    const [email,guardarEmail] = useState('');
    const [telefono,guardarTelefono] = useState('');
    const [genero,guardarGenero] = useState('');
    const [generodescripcion,guardarGenerodescripcion] = useState('');
    const [imagenperfil,guardarImagenperfil] = useState('');
    
    const [cargando, guardarCargando] = useState(false);

    useEffect(() => {
        consultar();
    },[]);
    
    const consultar = async () => {
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarNombre(respuesta.data.fullname);
            guardarEmail(respuesta.data.email);
            guardarTelefono(respuesta.data.telefono);
            guardarGenero(respuesta.data.genero);
            guardarGenerodescripcion(respuesta.data.gender_description);
            console.log(respuesta);
            guardarCargando(false);
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
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarNombre(respuesta.data.fullname);
                        guardarEmail(respuesta.data.email);
                        guardarTelefono(respuesta.data.telefono);
                        guardarGenero(respuesta.data.genero);
                        guardarGenerodescripcion(respuesta.data.gender_description);
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

    const editarperfil = () => {
        console.log("hola");
        const datos={nombre,telefono,generodescripcion,genero};
        navigation.navigate('EditarPerfil', {datos});
    }

    const avatar = () => {
        return (<View style={{alignItems: 'center'}}>
                    <UserAvatar size={100} name= {nombre} />
                    <View style={{borderRadius:40,marginTop:10,alignSelf:"center",borderWidth:2, borderColor:"#828282"}}>
                        <Text style={[styles.textoS,{fontSize:16,color:colorLetra,marginTop:5,marginBottom:5,marginHorizontal:10,marginLeft:5}]}>{nombre}</Text>
                    </View>
                </View>)
    }

    const avatarimagen = () => {
        return (<View style={{alignItems: 'center'}}>
                    <Avatar.Image size={100} source={{uri: imagenperfil}}/>
                    <View style={{borderRadius:40,marginTop:10,alignSelf:"center",borderWidth:2, borderColor:"#828282"}}>
                        <Text style={[styles.textoS,{fontSize:16,color:colorLetra,marginTop:5,marginBottom:5,marginHorizontal:10,marginLeft:5}]}>{nombre}</Text>
                    </View>
                </View>)
    }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Mi perfil</Text>
            {imagenperfil !== '' && cargando===false ? avatarimagen(): nombre !== '' ? avatar() : console.log('')}
            <View style={styles.perfil}>
                    <View style={{marginVertical:5,marginTop:10}}>
                        <View style={{flexDirection: 'row',marginHorizontal: 10}}>
                            <Icon name="email" color="#515254" size={20}></Icon>
                            <Text style={[styles.textoS,{color: colorLetra}]}>Correo: {email}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginHorizontal: 10}}>
                            <Icon name="phone" color="#515254" size={20}></Icon>
                            <Text style={[styles.textoS,{color: colorLetra}]}>Teléfono: {telefono}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginHorizontal: 10}}>
                            <Icon name="rhombus-outline" color="#515254" size={20}></Icon>
                            <Text style={[styles.textoS,{color: colorLetra}]}>Género: {generodescripcion}</Text>
                        </View>
                    </View>
                </View>
                    <View style={[styles.container,{marginTop:40}]}>
                            <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} onPress={() => editarperfil() }>
                                <View style={{flexDirection:'row'}}>
                                    <Icon name="pencil-outline" color={colorIcono} size={22}></Icon>
                                    <Text style={[styles.textoC,{marginLeft:10,color:colorTextoBoton}]}> Editar Perfil </Text>
                                </View>
                            </TouchableHighlight>
                    </View>
                    </View>
                    : null}
        </View>
    );
}

const styles=StyleSheet.create({
    perfil:{
        borderWidth:2,
        borderColor:"#828282",
        marginTop: 25,
        marginHorizontal:10,
        borderRadius: 10
    },
    botonC:{
        marginTop: 5,
        height: 40,
        marginBottom: 5,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#e35d17',
        alignItems: 'center',
        borderRadius: 8,
    },
    textoS:{
        marginBottom: 8,
        marginHorizontal: 0,
        marginLeft: 1,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    botonS:{
        height: 45,
        marginBottom: 20,
        marginHorizontal: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoC:{
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Light'
    },
    textoNombre:{
        marginLeft:5
    }
})

export default perfil;
