import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ActivityIndicator,ScrollView,FlatList} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../styles/global';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const encuestas = ({navigation,route}) => {
    
    const [cargando, guardarCargando] = useState(false);
    const [listaencuestas,guardarListaencuestas] = useState([]);

    useEffect(() => {
        encuestas();
    },[]);

    const encuestas = async () =>{
        guardarCargando(true);
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/grupal/sesiones/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarListaencuestas(respuesta.data);
            console.log(respuesta.data);
            guardarCargando(false);
        } catch (error){
            console.log("error");
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion');
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/grupal/sesiones/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data); 
                        guardarListaencuestas(respuesta.data);
                        guardarCargando(false);       
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
    const irEncuesta = (item) =>{
        console.log(item);
        navigation.navigate('Encuesta',{id: item});
    }
    
    return (
        <ScrollView style={globalStyles.contenedor}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
                <Text style={[globalStyles.titulo,{marginBottom:0}]}>Encuestas pendientes</Text>
                {listaencuestas.length>0 ? <Text></Text> : <View style={{alignItems:'center'}}><Text style={{fontSize:19}}> No tienes encuestas pendientes </Text></View>}
                <FlatList
                    data={listaencuestas}
                    style={{marginBottom: 10}}
                    renderItem={({item,index}) => (
                        <TouchableHighlight underlayColor = {'transparent'} onPress={ () => irEncuesta(item.id)} style={styles.botonC}>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:1,flexDirection: 'row',marginTop:5}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC]}>Día:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC]}>a</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC]}>Hora:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC]}>b</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                }
                    keyExtractor={item => item.id.toString()}
                />
            </View> : null}
        </ScrollView >
    );
}

const styles=StyleSheet.create({
    botonC: {
        marginTop: 10,
        height: 75,
        marginBottom: 15,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#1e524c',
        borderRadius: 8
    },
    textoC: {
        marginTop:2,
        marginBottom: 10,
        marginHorizontal: 25,
        fontSize: 15,
        color: 'white',
        fontFamily: "Inter-Light"
    }
})

export default encuestas;
