import React,{useState,useEffect,useContext} from 'react';
import {View,Text,TouchableHighlight,StyleSheet,ActivityIndicator,ScrollView,useWindowDimensions} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const home = ({navigation}) =>{

    const {colorb,colorTextoBoton,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);

    const { guardarChatroom } = useContext(NotificacionesContext);

    const [SicologoListo,guardarSicologoListo] = useState(false);
    const [cargando2,guardarCargando2] = useState(true);

    const [tienesicologo,guardarTienesicologo] = useState(false);

    const [alertacuestionario,guardarAlertacuestionario] = useState(false);
    const [alertaopcionales,guardarAlertaopcionales] = useState(false);
    const {width, height} = useWindowDimensions();

    var timer;

    useEffect(() => {
        timer = setInterval(async() => consultar(), 5000);
        return () => clearInterval(timer);
      });

    useEffect(() => {
        revision();
      },[]);

    const funcion = async () =>{
        var tienehorario='';
        var tienepreferencias='';
        var tienecuestionario='';
        var correo='';
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.terapia_grupal===null){
                tienepreferencias='no';
                console.log("no ha puesto sus preferencias");
            }
            console.log(respuesta);
            correo=respuesta.data.email;
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
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
                        if (respuesta.data.terapia_grupal===null){
                            tienepreferencias='no';
                            console.log("no ha puesto sus preferencias");
                        }
                        console.log(respuesta);
                        correo=respuesta.data.email;
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/horarios/mihorario/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.length === 0){
                console.log("no ha elegido horario");
                tienehorario='no';
            }
            console.log(respuesta);
        } catch (error) {
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/horarios/mihorario/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        if (respuesta.data.length === 0){
                            console.log("no ha elegido horario");
                            tienehorario='no';
                        }
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/evaluacion/listar/',{paciente:correo,entre_fechas:false},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.data.length===0){
                tienecuestionario='no';
                console.log("no ha hecho el cuestionario");
            }
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{paciente:correo,entre_fechas:false},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        if (respuesta.data.length===0){
                            tienecuestionario='no';
                            console.log("no ha hecho el cuestionario");
                        }
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        if(tienecuestionario==='no'){
            guardarAlertacuestionario(true);
        }else if(tienehorario==='no' || tienepreferencias==='no'){
            guardarAlertaopcionales(true);
        }else{
            navigation.navigate('Elegir Psicólogo');
        }
    }



    const funcion2 = () =>{
        navigation.navigate('Solicitudes');
    }
    const funcion3 = () =>{
        navigation.navigate('CodigoSicologo');
    }
    const pedirChatroom = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/chat/rooms/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta.data);
            guardarChatroom(respuesta.data[0].id);
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
                        const respuesta = await axios.get(host+'/chat/rooms/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data); 
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
    const revision = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_psicologo !== null){
                pedirChatroom();
                guardarTienesicologo(true);
                clearInterval(timer);
            }
            guardarCargando2(false);
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
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if(respuesta.data.id_psicologo !== null){
                            guardarTienesicologo(true);
                            clearInterval(timer);
                        }
                        guardarCargando2(false);
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

    const consultar = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_psicologo !== null){
                guardarSicologoListo(true);
                clearInterval(timer);
            }
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
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if(respuesta.data.id_psicologo !== null){
                            guardarSicologoListo(true);
                            clearInterval(timer);
                        }
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
        <View style={[globalStyles.contenedor,{backgroundColor:colorFondo}]}>
            {cargando2 === true ? <ActivityIndicator  size = "large" animating = {cargando2} style = {globalStyles.cargando}/> : null}
            {cargando2===false ?
            <View>
            {tienesicologo===true ?
            <View>
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Inicio</Text>
            <View style={styles.container}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-details" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mi perfil</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sesion') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-multiple-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mis sesiones</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Chat')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="chat" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Chat</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sentimiento')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="emoticon-happy-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>¿Cómo te sientes?</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="book-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Cuestionario de Sintomatología</Text>
                    </View>
                </TouchableHighlight >
                
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("Disconformidad") }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="account-alert-outline" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Disconformidad con el grupo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("Desvinculacion") }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="close" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Desvincularse de Psicólogo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("Panico") }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="close" color={colorIcono}  size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Botón de pánico</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Personalizar') }>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Personalizar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View> : null}
        {tienesicologo===false ?
            <ScrollView>
                <Text style={globalStyles.titulo}>Bienvenido</Text>       
                <View style={styles.container}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion() }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-search" color={colorIcono}  size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Buscar Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion2() }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="note-multiple-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Ver solicitudes</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-details" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Mi perfil</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="book-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Cuestionario de Sintomatología</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Preferencias')}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Icon name="account-question-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Preferencias</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => funcion3() }>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Icon name="chevron-right" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Ingresar Código</Text>
                            </View>
                        </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate('Personalizar') }>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Icon name="fountain-pen" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Personalizar</Text>
                            </View>
                        </TouchableHighlight>
                </View>
                <Portal>
                    <Dialog visible={SicologoListo} >
                        <Dialog.Title>Psicologo vinculado</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={globalStyles.textoAlerta}>Una de sus solicitudas de psicólogo ha sido aceptada</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarSicologoListo(false);guardarTienesicologo(true);}} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog visible={alertacuestionario} onDismiss={() => {guardarAlertacuestionario(false);}}>
                        <Dialog.Title>Aviso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={globalStyles.textoAlerta}>Para continuar, debe haber respondido el 
                            cuestionario de sintomatología
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertacuestionario(false);}} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Portal>
                    <Dialog visible={alertaopcionales} onDismiss={() => {guardarAlertaopcionales(false);}}>
                        <Dialog.Title>Aviso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={globalStyles.textoAlerta}>Para obtener mejores resultados, seleccione un horario 
                            y sus preferencias de psicólogo (Opcional)</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertaopcionales(false);navigation.navigate('Elegir Psicólogo');}} color='#3c2c18'>Continuar</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertaopcionales(false);}} color='#3c2c18'>Volver</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        : null}
            </View> : null }
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
      },
    botonS:{
        height: RFPercentage(5),
        marginBottom: RFPercentage(2.5),
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: RFPercentage(3),
        color: 'black',
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default home;
