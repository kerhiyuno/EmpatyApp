import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,TouchableHighlight} from 'react-native';
import {Headline, Button,Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const sesion = ({navigation,route}) =>{
 
    const [nombresicologo,guardarNombreSicologo] = useState('Juan');
    const [descripcion,guardarDescripcion] = useState('');
    const [email,guardarEmail] = useState('')

    const [sinsesiones,guardarSinsesiones] = useState(false);
   /* const pedirDatos = async() => {
        const datosSesion = AsyncStorage.getItem(datosSesion);
        try {
            const datos = await axios.get('link.com', JSON.parse(datosSesion).token );
            guardarDescripcion(JSON.stringify(datos.descripcion));
            guardarTitulo(JSON.stringify(datos.titulo));
        } catch (error) {
            console.log(error)
        }
    }
*/
    useEffect( () => {
         datospsicologo();
    },[]
    )

    const datospsicologo = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarNombreSicologo(respuesta.data.fullname);
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
                        const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        guardarNombreSicologo(respuesta.data.fullname);
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
    const siguienteCita = async () => {
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get('http://10.0.2.2:8000/grupal/sesiones/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.length<1){
                console.log("gola");
                guardarSinsesiones(true);
            }
            else{
                console.log(respuesta.data[0]);
                console.log(respuesta.data[0]['id']);
                var item= respuesta.data[0]['id'];
                var fecha=respuesta.data[0]['fecha_sesion'];
                var dia= extraerdia(fecha) ;
                var mes= mespalabra(fecha);
                var hora=traductorhora(respuesta.data[0].bloque.id);
                console.log(hora,dia,mes);
                navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
            }
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
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get('http://10.0.2.2:8000/grupal/sesiones/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data[0]); 
                        if (respuesta.data.length<1){
                            guardarSinsesiones(true);
                        }
                        else{
                            console.log(respuesta.data[0]);
                            console.log(respuesta.data[0]['id']);
                            var id= respuesta.data[0]['id'];
                            navigation.navigate('Cita',{id});
                        }  
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                        navigation.navigate('');
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
    }   
    return (
        <View style={globalStyles.contenedor} >
            <Headline style={globalStyles.titulo}></Headline>
            <View style={styles.container}>
                <TouchableHighlight underlayColor = {'transparent'} style={styles.botonS} onPress={() => siguienteCita() }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="page-next-outline" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Siguiente cita</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.container}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Calendario') }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="calendar-month" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Agenda</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <View style={{marginTop:20,flexDirection:'row'}}>
                <Text style={[styles.textoS,{fontFamily: 'Inter-Bold'}]}>Mi Psicólogo: </Text>
                <Text style={styles.textoS}>{nombresicologo}</Text>
            </View>
            <Portal>
                <Dialog visible={sinsesiones} onDismiss={() => guardarSinsesiones(false)} >
                    <Dialog.Title>Sin sesiones agendadas</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph styles={globalStyles.textoAlerta}>No tienes ninguna sesión agendada</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>guardarSinsesiones(false)} color='#3c2c18'>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10
      },
    botonS:{
        height: 60,
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8,
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 18,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default sesion;
