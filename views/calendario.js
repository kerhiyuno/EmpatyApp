import React,{useEffect,useState} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight} from 'react-native';
import {Headline} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const calendario = ({navigation,route}) =>{

    const prueba = [{id: '1',grupo: '1',bloque:'1', fecha_sesion: '2002-07-11',linkmeet:'google.com',ha_terminado:true},{id: '2',grupo: '1',bloque:'3', fecha_sesion: '2002-07-15',linkmeet:'google.com',ha_terminado:true}]
    const [sesiones,guardarSesiones] = useState([]);

  useEffect( () => {
    agenda();
}
,[])

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
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get('http://10.0.2.2:8000/grupal/sesiones/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarSesiones(respuesta.data);
            console.log(respuesta.data);
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
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get('http://10.0.2.2:8000/grupal/sesiones/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data); 
                        guardarSesiones(respuesta.data);         
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
    const irCita = (item,fecha_sesion,bloque) =>{
        console.log(item);
        var dia= extraerdia(fecha_sesion) ;
        var mes= mespalabra(fecha_sesion);
        console.log(dia,mes);
        var hora=traductorhora(bloque);
        navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
    }
    return (
        <View style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}> Agenda de sesiones</Text>
            {sesiones.length>0 ? <Text></Text> : <View style={{alignItems:'center'}}><Text style={{fontSize:19}}> No tienes sesiones agendadas </Text></View>}
            <FlatList
                data={sesiones}
                style={{marginBottom: 10}}
                renderItem={({item,index}) => (
                    <TouchableHighlight underlayColor = {'transparent'} onPress={ () => irCita(item.id,item.fecha_sesion,item.bloque.id) } style={styles.botonC}>
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
                                    <Text style={[styles.textoC]}>{traductorhora(item.bloque.id)}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )
            }
                keyExtractor={prueba => prueba.id.toString()}
            />
        </View >
    );
}

const styles=StyleSheet.create({
    botonC: {
        marginTop: 10,
        height: 80,
        marginBottom: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#1e524c',
        borderRadius: 8
    },
    textoC: {
        marginTop:2,
        marginBottom: 10,
        marginHorizontal: 25,
        fontSize: 17,
        color: 'white',
        fontFamily: "Inter-Light"
    }
})

export default calendario;
