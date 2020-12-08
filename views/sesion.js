import React,{useState,useEffect,useContext} from 'react';
import {StyleSheet,View,Text,TouchableHighlight,ActivityIndicator} from 'react-native';
import {Headline, Button,Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";
import NotificacionesContext from '../context/notificacionesContext'

const host = ipHost();

const sesion = ({navigation}) =>{

    const {colorb,colorTextoBoton,colorLetra,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);
    const {tienegrupo,guardarTienegrupo} = useContext(NotificacionesContext);

    const [nombresicologo,guardarNombreSicologo] = useState('Juan');
    const [sinsesiones,guardarSinsesiones] = useState(false);
    const [cargando,guardarCargando] = useState(false)

    useEffect( () => {
        guardarCargando(true);
        datospsicologo();
        consultar();
    },[]
    )




    const consultar = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if (respuesta.data.id_grupo==null){
                guardarTienegrupo(false);
            }
            else{
                guardarTienegrupo(true);
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
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if (respuesta.data.id_grupo==null){
                            guardarTienegrupo(false);
                        }
                        else{console.log("·dsaasd")}
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

    const datospsicologo = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            guardarNombreSicologo(respuesta.data.fullname);
            guardarCargando(false);
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
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        guardarNombreSicologo(respuesta.data.fullname);
                        console.log(respuesta);
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
    const extraerAnio = (fecha) =>{
        var separado = fecha.split('-');
        console.log(separado);
        return separado[0];
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
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host +'/grupal/sesiones/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            const respuesta2 = await axios.get(host +'/grupal/individuales/', 
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            console.log(respuesta2);
            if (respuesta.data.length < 1 && respuesta2.data.length > 0){
                var item= respuesta2.data[0]['id'];
                var fecha=respuesta2.data[0]['fecha_sesion'];
                var dia= extraerdia(fecha) ;
                var mes= mespalabra(fecha);
                var hora=traductorhora(respuesta2.data[0].bloque.id);
                navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora,url_pago:respuesta2.data.url_pago});
            }
            else if (respuesta.data.length > 0 && respuesta2.data.length < 1){
                var item= respuesta.data[0]['id'];
                var fecha=respuesta.data[0]['fecha_sesion'];
                var dia= extraerdia(fecha) ;
                var mes= mespalabra(fecha);
                var hora=traductorhora(respuesta.data[0].bloque.id);
                navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora,url_pago:respuesta.data.url_pago});
            }
            else if (respuesta.data.length > 0 && respuesta2.data.length > 0){
                var item1 = respuesta.data[0]['id'];
                var fecha1 = respuesta.data[0]['fecha_sesion'];
                var dia1 = extraerdia(fecha1);
                var mes1 = mespalabra(fecha1);
                var anio1= extraerAnio(fecha1);
                var hora1 = traductorhora(respuesta.data[0].bloque.id);

                var item2 = respuesta2.data[0]['id'];
                var fecha2 = respuesta2.data[0]['fecha_sesion'];
                var dia2 = extraerdia(fecha2) ;
                var mes2 = mespalabra(fecha2);
                var anio2= extraerAnio(fecha2);
                var hora2 = traductorhora(respuesta2.data[0].bloque.id);

                if (parseInt(anio1) < parseInt(anio2)){
                    console.log("sesion grupal");
                    navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1,url_pago:respuesta.data.url_pago});
                }
                else if (parseInt(anio2) < parseInt(anio1)){
                    console.log("sesion individual");
                    navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2,url_pago:respuesta2.data.url_pago});
                }
                else{
                    if (parseInt(mes1) < parseInt(mes2)){
                        console.log("sesion grupal");
                        navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1,url_pago:respuesta.data.url_pago});
                    }
                    else if (parseInt(mes2) < parseInt(mes1)){
                        console.log("sesion individual");
                        navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2,url_pago:respuesta2.data.url_pago});
                    }
                    else{
                        if (parseInt(dia1) < parseInt(dia2)){
                            console.log("sesion grupal");
                            navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1,url_pago:respuesta.data.url_pago});
    
                        }
                        else if (parseInt(dia2) < parseInt(dia1)){
                            console.log("sesion individual");
                            navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2,url_pago:respuesta2.data.url_pago});
                        }
                        else{
                            if (hora1 < hora2){
                                console.log("sesion grupal");
                                navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1,url_pago:respuesta.data.url_pago});
                            }
                            else{
                                console.log("sesion individual");
                                navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2,url_pago:respuesta2.data.url_pago});
                            }
                        }
                    }
                }
               // navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
            }
            else{
                guardarSinsesiones(true);
            }
        } catch (error) {
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
                            console.log("df");
                const nombre = await AsyncStorage.getItem('datosSesion');
                const respuesta = await axios.get(host +'/grupal/sesiones/',
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                console.log(respuesta);
                const respuesta2 = await axios.get(host +'/grupal/individuales/', 
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                console.log(respuesta);
                console.log(respuesta2);
                if (respuesta.data.length < 1 && respuesta2.data.length > 0){
                    var item= respuesta2.data[0]['id'];
                    var fecha=respuesta2.data[0]['fecha_sesion'];
                    var dia= extraerdia(fecha) ;
                    var mes= mespalabra(fecha);
                    var hora=traductorhora(respuesta2.data[0].bloque.id);
                    navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
                }
                else if (respuesta.data.length > 0 && respuesta2.data.length < 1){
                    var item= respuesta.data[0]['id'];
                    var fecha=respuesta.data[0]['fecha_sesion'];
                    var dia= extraerdia(fecha) ;
                    var mes= mespalabra(fecha);
                    var hora=traductorhora(respuesta2.data[0].bloque.id);
                    navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
                }
                else if (respuesta.data.length > 0 && respuesta2.data.length > 0){
                    var item1 = respuesta.data[0]['id'];
                    var fecha1 = respuesta.data[0]['fecha_sesion'];
                    var dia1 = extraerdia(fecha1);
                    var mes1 = mespalabra(fecha1);
                    var anio1= extraerAnio(fecha1);
                    var hora1 = traductorhora(respuesta.data[0].bloque.id);

                    var item2 = respuesta2.data[0]['id'];
                    var fecha2 = respuesta2.data[0]['fecha_sesion'];
                    var dia2 = extraerdia(fecha2) ;
                    var mes2 = mespalabra(fecha2);
                    var anio2= extraerAnio(fecha2);
                    var hora2 = traductorhora(respuesta2.data[0].bloque.id);

                    if (parseInt(anio1) < parseInt(anio2)){
                        navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1});
                        console.log("sesion grupal");
                    }
                    else if (parseInt(anio2) < parseInt(anio1)){
                        navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2});
                        console.log("sesion individual");
                    }
                    else{
                        if (parseInt(mes1) < parseInt(mes2)){
                            navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1});
                        }
                        else if (parseInt(mes2) < parseInt(mes1)){
                            navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2});
                        }
                        else{
                            if (parseInt(dia1) < parseInt(dia2)){
                                navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1});
                            }
                            else if (parseInt(dia2) < parseInt(dia1)){
                                navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2});
                            }
                            else{
                                if (hora1 < hora2){
                                    navigation.navigate('Cita',{id: item1,dia:dia1,mes:mes1,hora:hora1});
                                }
                                else{
                                    navigation.navigate('Cita',{id: item2,dia:dia2,mes:mes2,hora:hora2});
                                }
                            }
                        }
                    }
                    navigation.navigate('Cita',{id: item,dia:dia,mes:mes,hora:hora});
                }
                else{
                    guardarSinsesiones(true);
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
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]} >
            <Headline style={[globalStyles.titulo,{color: colorTitulo}]}></Headline>
            <View style={styles.container}>
                <TouchableHighlight underlayColor = {'transparent'} style={[styles.botonS,{backgroundColor: colorb}]} onPress={() => siguienteCita() }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="page-next-outline" color={colorIcono} size={25}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente cita</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.container}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Calendario') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="calendar-month" color={colorIcono} size={25}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Agenda</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <View style={styles.container}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Encuestas') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="file-question-outline" color={colorIcono} size={25}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Encuestas pendientes</Text>
                    </View>
                </TouchableHighlight >
            </View>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View style={{marginTop:20,flexDirection:'row'}}>
                <Text style={[styles.textoS,{fontFamily: 'Inter-Bold',color: colorLetra}]}>Mi Psicólogo: </Text>
                <Text style={[styles.textoS,{color: colorLetra}]}>{nombresicologo}</Text>
            </View>: null }
            <View>
            {tienegrupo===false ? <Text style={[styles.textoS,{fontFamily: 'Inter-Bold',color: colorLetra}]}> 
            No has sido asignado a un grupo</Text> : null}
            {tienegrupo===true ? <Text style={[styles.textoS,{fontFamily: 'Inter-Bold',color: colorLetra}]}> 
            Estás asignado a un grupo</Text> : null}
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={sinsesiones} onDismiss={() => guardarSinsesiones(false)} >
                    <Dialog.Title style={{color: colorLetra}}>Sin sesiones agendadas</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>No tienes ninguna sesión agendada.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>guardarSinsesiones(false)} color={colorLetra}>Ok</Button>
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
      },
    botonS:{
        height: RFPercentage(6),
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8,
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: RFPercentage(2.5),
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default sesion;
