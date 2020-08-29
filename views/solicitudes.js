import React,{useEffect,useState} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight} from 'react-native';
import {Headline,Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const solicitudes = ({navigation,route}) =>{
    const [solicitudes, guardarSolicitudes] = useState([]);

    useEffect( () => {
        buscar();
        //console.log(sicologos);
    },[]
  )

    const buscar = async() =>{
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get('http://10.0.2.2:8000/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarSolicitudes(respuesta.data);
            console.log(respuesta.data);
    
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
                        const respuesta = await axios.get('http://10.0.2.2:8000/solicitudes/manage/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarSolicitudes(respuesta.data);          
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


    const eliminarCita = async (id) =>{
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.delete('http://10.0.2.2:8000/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),},data:{id:id}});
            console.log(respuesta);
            buscar();
        } catch (error) {
            console.log("error");
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('yes');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        var id = {id}
                        const respuesta = await axios.delete('http://10.0.2.2:8000/solicitudes/manage/',id,
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
            <Headline style={globalStyles.titulo}>Solicitudes pendientes</Headline>
            {solicitudes.length>0 ? <Text></Text> : <View style={{alignItems:'center'}}><Text style={{fontSize:19}}>No tienes solicitudes pendientes</Text></View>}
            <FlatList
                data={solicitudes}
                style={{marginBottom: 20}}
                renderItem={({item,index}) => (
                    <View>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:1,flexDirection: 'row',marginTop:5}}>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>Psicólogo</Text>
                                    </View>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>{item.psicologo_sol}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>Hora: </Text>
                                    </View>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>{item.horario_inicio}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>Fecha: </Text>
                                    </View>
                                    <View style={{flex:0.5}}>
                                        <Text style={[styles.textoC]}>{item.fecha_reunion}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableHighlight onPress={ () => eliminarCita(item.id) } style={styles.botonC}>
                        <View style={{alignSelf: 'center'}}>
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
    botonC:{
        marginTop: 10,
        height: 30,
        marginBottom: 26,
        marginHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: '#942c2c',
        borderRadius: 8
    },
    textoC:{
        marginTop:2,
        marginBottom: 0,
        marginHorizontal: 25,
        fontSize: 18,
        color: 'black'
    },
    textoB:{
        marginTop:0,
        marginBottom: 2,
        marginHorizontal: 25,
        fontSize: 18,
        color: 'white'
    }
})




export default solicitudes;