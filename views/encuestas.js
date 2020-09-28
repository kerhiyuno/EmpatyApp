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
            const respuesta = await axios.get(host+'/feedback/disponibles/',
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
                        const respuesta = await axios.get(host+'/feedback/disponibles/',
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
    const irEncuesta = (item,fecha) =>{
        console.log(item);
        navigation.navigate('Encuesta',{id: item, fecha: fecha});
    }
    const mespalabra = (fecha)=>{
        var separado=fecha.split('-');
        console.log(separado);
        var mes;
        if(separado[1]=='01'){
            mes='Enero';
        }
        else if(separado[1]=='02'){
            mes='Febrero';
        }
        else if(separado[1]=='03'){
            mes='Marzo';
        }
        else if(separado[1]=='04'){
            mes='Abril';
        }
        else if(separado[1]=='05'){
            mes='Mayo';
        }
        else if(separado[1]=='06'){
            mes='Junio';
        }
        else if(separado[1]=='07'){
            mes='Julio';
        }
        else if(separado[1]=='08'){
            mes='Agosto';
        }
        else if(separado[1]=='09'){
            mes='Septiembre';
        }
        else if(separado[1]=='10'){
            mes='Octubre';
        }
        else if(separado[1]=='11'){
            mes='Noviembre';
        }
        else if(separado[1]=='12'){
            mes='Diciembre';
        }
        return mes;
    }
    const extraerdia = (fecha) =>{
        var separado = fecha.split('-');
        console.log(separado);
        return separado[2];
    }
    const traductorhora = (bloque) =>{
        var bloques = '';
        if(bloque==1){
            bloques='8:00'
        }
        else if(bloque==2){
            bloques='9:00'
        }
        else if(bloque==3){
            bloques='10:00'
        }
        else if(bloque==4){
            bloques='11:00'
        }
        else if(bloque==5){
            bloques='12:00'
        }
        else if(bloque==6){
            bloques='13:00'
        }
        else if(bloque==7){
            bloques='14:00'
        }
        else if(bloque==8){
            bloques='15:00'
        }
        else if(bloque==9){
            bloques='16:00'
        }
        else if(bloque==10){
            bloques='17:00'
        }
        else if(bloque==11){
            bloques='18:00'
        }
        else if(bloque==12){
            bloques='19:00'
        }
        else if(bloque==13){
            bloques='20:00'
        }
        console.log(bloques);
        return bloques;
    }
    return (
        <ScrollView style={globalStyles.contenedor}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
                <Text style={[globalStyles.titulo,{marginBottom:0}]}>Encuestas pendientes</Text>
                {listaencuestas.length>0 ? <Text></Text> : <View style={{alignItems:'center',marginTop:20}}><Text style={{fontSize:17,fontFamily: "Inter-Regular"}}> No tienes encuestas pendientes </Text></View>}
                <FlatList
                    data={listaencuestas}
                    style={{marginBottom: 10}}
                    renderItem={({item,index}) => (
                        <TouchableHighlight underlayColor = {'transparent'} onPress={ () => irEncuesta(item.id,item.fecha_sesion)} style={styles.botonC}>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:1,flexDirection: 'row',marginTop:5}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC]}>Día:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC]}>{extraerdia(item.fecha_sesion)} de {mespalabra(item.fecha_sesion)}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC]}>Hora:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC]}>{traductorhora(item.bloque)}</Text>
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
        backgroundColor: '#e35d17',
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
