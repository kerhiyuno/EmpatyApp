import React,{useEffect,useState} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const solicitudes = ({navigation,route}) =>{
    const [solicitudes, guardarSolicitudes] = useState([]);
    const [cargando, guardarCargando] = useState(false);

    useEffect( () => {
        buscar();
    },[])

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const buscar = async() =>{
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarSolicitudes(respuesta.data);
            console.log(respuesta.data);
            guardarCargando(false);
    
        } catch (error) {
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
                        const respuesta = await axios.get(host+'/solicitudes/manage/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarSolicitudes(respuesta.data);
                        guardarCargando(false);      
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
    }

    const fechaformateo=(fecha)=>{
        if(fecha==='-'){
            return '-';
        }
        var f=fecha.split('-');
        fecha = f[2]+"-"+f[1]+"-"+f[0];
        return fecha;
    }

    const eliminarCita = async (id) =>{
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.delete(host+'/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),},data:{id:id}});
            console.log(respuesta);
            buscar();
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
                        var id = {id}
                        const respuesta = await axios.delete(host+'/solicitudes/manage/',id,
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        buscar();
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
        <View style={globalStyles.contenedor}>
            {cargando===true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ? <Text style={globalStyles.titulo}>Solicitudes pendientes</Text> : null}
            {solicitudes.length>0 ? null :  cargando===false ? <View style={{alignItems:'center'}}><Text style={{fontSize:17}}>No tienes solicitudes pendientes</Text></View>: null}
            <FlatList
                data={solicitudes}
                style={{marginBottom: 20}}
                renderItem={({item,index}) => (
                    <View style={styles.solicitud}>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:1,flexDirection: 'row',marginTop:5}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC]}>Psicólogo</Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC]}>{item.psicologo_sol}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC]}>Hora: </Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC]}>{item.horario_inicio}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC]}>Fecha: </Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC]}>{fechaformateo(item.fecha_reunion)}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableHighlight onPress={ () => eliminarCita(item.id) } style={styles.botonC}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Icon name="delete-outline" color="white" size={20}></Icon>
                                <Text style={styles.textoB}>Eliminar</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )
                }
                keyExtractor={solicitudes => solicitudes.id.toString()}
            />
        </View >
    );
}

const styles=StyleSheet.create({
    solicitud:{
        borderWidth:2,
        borderColor:"#828282",
        marginBottom: 10,
        borderRadius: 10
    },
    botonC:{
        marginTop: 10,
        height: 30,
        marginBottom: 5,
        marginHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: '#942c2c',
        borderRadius: 8
    },
    textoC:{
        marginTop:2,
        marginBottom: 0,
        marginHorizontal: 25,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoB:{
        marginTop:0,
        marginBottom: 0,
        marginHorizontal: 0,
        fontSize: 16,
        color: 'white',
        fontFamily:'Inter-Light'
    },
})




export default solicitudes;