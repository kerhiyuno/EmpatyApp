import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight,ScrollView,ActivityIndicator} from 'react-native';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext'
import moment from 'moment';
import NotificacionesContext from '../context/notificacionesContext';
import { RFPercentage } from 'react-native-responsive-fontsize';

const host = ipHost();

const calendario = ({navigation}) =>{

    const {colorb,colorTextoBoton,colorTitulo,colorFondo} = useContext(EstilosContext);
    const {reuniones,guardarReuniones,actualizaragenda,guardarActualizaragenda} = useContext(NotificacionesContext);

    const [cargando, guardarCargando] = useState(false);

  useEffect( () => {
    agenda();
    console.log(navigation);
}
,[])
useEffect(() => {
    if (actualizaragenda===true){
        console.log("actualizaragenda")
        agenda();
        guardarActualizaragenda(false)
    }
}, [actualizaragenda])

const delay = ms => new Promise(res => setTimeout(res, ms));
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
    const extraerdia = (fecha) =>{
        var separado = fecha.split('-');
        console.log(separado);
        return separado[2];
    }

    const agenda = async () =>{
        guardarCargando(true);
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/grupal/sesiones/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            const respuesta2 = await axios.get(host+'/grupal/individuales/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            let sesiones = respuesta.data;
            sesiones = [...sesiones,...respuesta2.data]
            sesiones = sesiones.sort((a,b)=> (moment(a.fecha_sesion)-moment(b.fecha_sesion)));
            guardarReuniones(sesiones);
            console.log(sesiones);
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
                        guardarReuniones(respuesta.data);
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
    const irCita = (item,fecha_sesion,bloque,urlpago) =>{
        console.log(item);
        var dia= extraerdia(fecha_sesion) ;
        var mes= mespalabra(fecha_sesion);
        console.log(dia,mes);
        var hora=traductorhora(bloque);
        navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora, url_pago: urlpago});
    }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor:colorFondo}]}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
                <Text style={[globalStyles.titulo,{marginBottom:0,color:colorTitulo}]}> Agenda de sesiones</Text>
                {reuniones.length>0 ? <Text></Text> : <View style={{alignItems:'center',marginTop:20}}><Text style={{fontSize:17,fontFamily: "Inter-Regular"}}> No tienes sesiones agendadas </Text></View>}
                <FlatList
                    data={reuniones}
                    style={{marginBottom: RFPercentage(10)}}
                    renderItem={({item,index}) => (
                        <TouchableHighlight underlayColor = {'transparent'} onPress={ () => irCita(item.id,item.fecha_sesion,item.bloque.id,item.url_pago) } style={[styles.botonC,{backgroundColor: colorb}]}>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:0.3,flexDirection: 'row'}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Día:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>{extraerdia(item.fecha_sesion)} de {mespalabra(item.fecha_sesion)}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.3,flexDirection: 'row'}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Hora:  </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>{traductorhora(item.bloque.id)}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.3,flexDirection: 'row'}}>
                                    <View style={{flex:0.3}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Pago: </Text>
                                    </View>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>{item.estado_pago ==='done' ? 'Realizado' : 'Pendiente'}</Text>
                                    </View>
                                </View>
                        </View>
                        </TouchableHighlight>
                    )
                }
                    keyExtractor={item => item.id.toString()}
                />
            </View> : null}
        </View >
    );
}

const styles=StyleSheet.create({
    botonC: {
        marginTop: 10,
        height: 70,
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
        fontSize: 16,
        color: 'white',
        fontFamily: "Inter-Light"
    }
})

export default calendario;
