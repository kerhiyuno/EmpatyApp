import React,{useState,useEffect} from 'react';
import {View,Text,TouchableHighlight,StyleSheet,ActivityIndicator,ScrollView} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const home = ({navigation,route}) =>{

    const navigationOptions={
        title:'sda',
        headerleft:null
    }
    const [SicologoListo,guardarSicologoListo] = useState(false);
    const [cargando2,guardarCargando2] = useState(true);

    const [tienesicologo,guardarTienesicologo] = useState(false);

    const [alertacuestionario,guardarAlertacuestionario] = useState(false);
    const [alertaopcionales,guardarAlertaopcionales] = useState(false);

    var timer;

    useEffect(() => {
        timer = setInterval(async() => consultar(), 20000);
        console.log(timer);
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
      const revision = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if(respuesta.data.id_psicologo !== null){
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
        <View style={globalStyles.contenedor}>
            {cargando2 === true ? <ActivityIndicator  size = "large" animating = {cargando2} style = {globalStyles.cargando}/> : null}
            {cargando2===false ?
            <View>
            {tienesicologo===true ?
            <View>
            <Text style={globalStyles.titulo}>Empaty</Text>
            <View style={styles.container}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Sesion') }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-group" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Mi grupo</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-details" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Mi perfil</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="book-outline" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Cuestionario de Sintomatología</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Chat')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="chat" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Chat</Text>
                    </View>
                </TouchableHighlight >
                <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("Disconformidad") }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="account-alert-outline" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Disconformidad con el grupo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate("Desvinculacion") }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="close" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Desvincularse de Psicólogo</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View> : null}
        {tienesicologo===false ?
            <ScrollView>
                <Text style={globalStyles.titulo}>Bienvenido</Text>       
                <View style={styles.container}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-search" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Buscar Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion2() }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="note-multiple-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Ver solicitudes</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Perfil')}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-details" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Mi perfil</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Cuestionario')}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="book-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Cuestionario de Sintomatología</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={() => navigation.navigate('Preferencias')}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-question-outline" color="white" size={25}></Icon>
                            <Text style={styles.textoC}>Preferencias</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5}]}>
                        <TouchableHighlight style={styles.botonS} underlayColor = {'transparent'} onPress={() => funcion3() }>
                            <View style={{flexDirection:'row'}}>
                                <Icon name="chevron-right" color="white" size={25}></Icon>
                                <Text style={styles.textoC}>Ingresar Código</Text>
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
        height: 60,
        marginBottom: 15,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 19,
        color: 'black',
    },
    textoC: {
        marginHorizontal: 7,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default home;
