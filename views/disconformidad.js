import React, {useState,useEffect} from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const Disconformidad = ({navigation}) => {

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
        <View style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}>Notificar disconformidad</Text>
            <Text style={styles.texto}>Describe tu problema (opcional):</Text>
            <TextInput
                label="Mensaje"
                onChangeText={(texto) => guardarMensaje(texto)}
                style={[globalStyles.entradaTexto,]}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                multiline={true}
            />
            <View style={{marginTop:5}}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>guardarAlertaMensaje(true)}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="send" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alertamensaje} onDismiss={() => guardarAlertaMensaje(false)}>
                    <Dialog.Title>Disconformidad</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>¿Estas seguro de enviar este mensaje?</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> enviar()} color='#3c2c18'>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> guardarAlertaMensaje(false)} color='#3c2c18'>No</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertaexito} onDismiss={() => guardarAlertaexito(false)}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El mensaje se ha enviado correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> volver()} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles=StyleSheet.create({
    texto: {
        fontSize: 17,
        marginLeft:7,
        marginRight:7,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    botonS:{
        height: 40,
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: 18,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Disconformidad;