import React, {useState,useEffect,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const host = ipHost();

const Disconformidad = ({navigation}) => {

    const {colorb,colorLetra,colorTextoBoton,colorBordeInput,colorPlaceholderinput,
    colorPrimaryinput,colorTitulo,colorIcono,colorFondo,colorFondoInput,colorTextoInput} = useContext(EstilosContext);

    const [alertamensaje,guardarAlertaMensaje] = useState(false);
    const [mensaje,guardarMensaje] = useState('');
    const [correopsicologo,guardarCorreopsicologo] = useState('');

    const [alertaexito,guardarAlertaexito] = useState(false);

    useEffect( () => {
        obtenercorreo();
    },[]
  )
    const obtenercorreo = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarCorreopsicologo(respuesta.data.email);
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
                        const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        guardarCorreopsicologo(respuesta.data.email);
                        console.log(respuesta);
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
    }

    const volver = () =>{
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
    }
    const enviar = async () => {
        console.log(mensaje);
        guardarAlertaMensaje(false);
        var envio = {psicologo:correopsicologo, motivo: "Problema Grupo", mensaje: mensaje}

        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/solicitudes/manage/',envio,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            if (respuesta.status===201){
                guardarAlertaexito(true);
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
                        const respuesta = await axios.post(host+'/solicitudes/manage/',envio,
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if (respuesta.status===201){
                            guardarAlertaexito(true);
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

    return(
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <KeyboardAwareScrollView>
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Notificar disconformidad</Text>
            <View style={{marginTop:10}}>
                <Text style={[styles.texto,{color: colorLetra}]}>Describe el problema:</Text>
                <TextInput
                    label="Mensaje"
                    onChangeText={(texto) => guardarMensaje(texto)}
                    style={[globalStyles.entradaTexto,{borderColor:colorBordeInput,backgroundColor:colorFondoInput}]}
                    theme={{colors: {text: colorTextoInput, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                    multiline={true}
                />
                <View style={{marginTop:5}}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarAlertaMensaje(true)}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name="send" color={colorIcono} size={RFPercentage(3)}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                        </View>
                    </TouchableHighlight >
                </View>
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertamensaje} onDismiss={() => guardarAlertaMensaje(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Disconformidad</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>¿Estas seguro de enviar este mensaje?</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> enviar()} color={colorLetra}>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> guardarAlertaMensaje(false)} color={colorLetra}>No</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaexito} onDismiss={() => guardarAlertaexito(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>El mensaje se ha enviado correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> volver()} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    texto: {
        fontSize: RFPercentage(2.3),
        marginLeft:7,
        marginRight:7,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    botonS:{
        height: RFPercentage(6),
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Disconformidad;