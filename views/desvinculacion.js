import React, {useState, useEffect,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NotificacionesContext from '../context/notificacionesContext';

const host = ipHost();

const Desvinculacion = ({navigation}) => {

    const {colorb,colorLetra,colorTextoBoton,colorBordeInput,colorPlaceholderinput,
        colorPrimaryinput,colorTitulo,colorIcono,colorFondo,colorFondoInput,colorTextoInput,colorRadio
        } = useContext(EstilosContext);

    const {guardarTienesicologo} = useContext(NotificacionesContext)
    const [mensaje,guardarMensaje] = useState('');
    const [desvinculacion,guardarDesvinculacion] = useState('no');
    const [desvinculacionautoenviada,guardarDesvinculacionautoenviada] = useState(false);
    const [enviarsolicitud,guardarEnviarSolicitud] = useState(false);
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
        guardarAlertaexito(false);
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
    }

    const enviar = () => {
        if (desvinculacion === 'no'){
            guardarEnviarSolicitud(true);
            enviarDesvinculacion();
        }
        else if(desvinculacion === 'si'){
            guardarDesvinculacionautoenviada(true);
            console.log("iniciando desvinculacion automatica");
        }
    }
    const enviarDesvinculacion = () => {
        guardarDesvinculacionautoenviada(false);
        guardarEnviarSolicitud(true);
    }
    const envioDefinitivo =  async () => {
        guardarEnviarSolicitud(false);
        var desAutomatica = false;
        if (desvinculacion==='si') {
            desAutomatica = true;
            guardarTienesicologo(false);
        }
        var envio = {mensaje: mensaje, motivo: "Desvinculacion",forzosa: desAutomatica,psicologo:correopsicologo};
        console.log(envio);
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
            <View>
                <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Solicitar Desvinculación</Text>
                <Text style={[styles.texto,{color: colorLetra}]}>Si no selecciona la desvinculación inmediata, su psicologo debera aprobar la solicitud de desvinculación</Text>
                <View style={styles.pregunta}>
                <Checkbox
                    status={desvinculacion === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (desvinculacion==='si'){
                            guardarDesvinculacion('no');
                        } 
                        else if (desvinculacion==='no'){
                            guardarDesvinculacion('si');
                        }
                    }}
                    color={colorRadio}
                />
                <Text style={[styles.texto,{color: colorLetra}]}>Desvinculación inmediata</Text>
                </View>
            </View>
            <View style={{marginTop: RFPercentage(5)}}>
                <Text style={[styles.texto,{color: colorLetra}]}>Describe tu motivo (opcional):</Text>
                    <TextInput
                        label="Mensaje"
                        onChangeText={(texto) => guardarMensaje(texto)}
                        style={[globalStyles.entradaTexto,{borderColor:colorBordeInput,backgroundColor:colorFondoInput}]}
                        theme={{colors: {text: colorTextoInput, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                        multiline={true}
                    />
            </View>
            <View style={{marginTop:5}}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>enviar()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="send" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={desvinculacionautoenviada} onDismiss={() => guardarDesvinculacionautoenviada(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Desvinculación Automática</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Confirmar desvinculación inmediata</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> enviarDesvinculacion()} color={colorLetra}>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> guardarDesvinculacionautoenviada(false)} color={colorLetra}>No</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={enviarsolicitud} onDismiss={() => guardarEnviarSolicitud(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Desviculación</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>¿Esta seguro de desvincularse de su psicólogo?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=> envioDefinitivo()} color={colorLetra}>Si</Button>
                        </View>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=> guardarEnviarSolicitud()} color={colorLetra}>No</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaexito} onDismiss={() => volver()}>
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
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:RFPercentage(3),
        marginLeft:10,
        marginBottom:RFPercentage(0.5),
        alignItems:'center'
    },
    botonS:{
        height: RFPercentage(5),
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

export default Desvinculacion;
