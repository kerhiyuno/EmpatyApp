import React, {useState,useContext} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,ActivityIndicator} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const codigosicologo = ({navigation}) =>{

    const {colorb,colorLetra,colorTextoBoton,colorBorderInput,colorPrimaryinput,
        colorPlaceholderinput,colorIcono,colorFondo,colorTextoInput,colorFondoInput} = useContext(EstilosContext);

    const [codigo,guardarCodigo] = useState('');
    const [alertacodigo,guardarAlertacodigo] = useState('');
    const [alertasicologo,guardarAlertasicologo] = useState(false);
    const [mensajeerrorenvio,guardarMensajeerrorenvio] = useState('');
    const [alertaerrorenvio,guardarAlertaErrorenvio] = useState(false);
    const [envioenprogreso,guardarEnvioenprogreso] = useState(false);

    const [cargando,guardarCargando] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const enviar = async () => {
        if (envioenprogreso===false){
            guardarEnvioenprogreso(true);
            if (codigo === ''){
                guardarAlertacodigo(true);
                return
            }
            try {
                const nombre = await AsyncStorage.getItem('datosSesion');
                guardarCargando(true);
                const respuesta = await axios.post(host+'/codigopsicologo/connect/',{codigo: codigo},
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                guardarCargando(false);
                if (respuesta.status===200){
                    guardarAlertasicologo(true);
                }
            } catch (error) {
                guardarCargando(false);
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
                            const respuesta = await axios.post(host+'/codigopsicologo/connect/',codigo,
                            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                            if (respuesta.status===200){
                                guardarAlertasicologo(true);
                            }
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
                else if (error.response.status===404 || error.response.status===400 ||error.response.status===500){
                    guardarMensajeerrorenvio(error.response.data.message);
                    guardarAlertaErrorenvio(true);
                }
            }
            guardarEnvioenprogreso(false);
        }
        else{
            console.log("envio en progreso");
        }
    }

    const encontrado = () =>{
        guardarAlertasicologo(false);
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
    }

    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[styles.texto,{color: colorLetra}]}>Si tu psicólogo o psicóloga te invitó a esta aplicación y te dió su código, puedes ingresarlo aquí:
            </Text>
            <TextInput
                label="Código de psicólogo"
                onChangeText={(texto) => guardarCodigo(texto)}
                style={[globalStyles.input,{borderColor: colorBorderInput, backgroundColor:colorFondoInput}]}
                theme={{colors: {text: colorTextoInput, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
            />
            
            <View style={[{marginTop:5}]}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>enviar()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="send" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                    </View>
                </TouchableHighlight >
                {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {styles.cargando}/> : null}
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertacodigo} onDismiss={() => {guardarEnvioenprogreso(false);guardarAlertacodigo(false);}}>
                 <Dialog.Title style={{color: colorLetra}}>Error</Dialog.Title>
                 <Dialog.Content>
                     <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Debe ingresar un código</Paragraph>
                 </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>{guardarEnvioenprogreso(false);guardarAlertacodigo(false);}} color={colorLetra}>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertasicologo} onDismiss={() => encontrado()}>
                 <Dialog.Title style={{color: colorLetra}}>Psicólogo encontrado</Dialog.Title>
                 <Dialog.Content>
                     <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Ha sido vinculado con su psicólogo</Paragraph>
                 </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=> encontrado()} color={colorLetra}>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaerrorenvio} onDismiss={() => {guardarEnvioenprogreso(false);guardarAlertaErrorenvio(false);}}>
                 <Dialog.Title style={{color: colorLetra}}>Error</Dialog.Title>
                 <Dialog.Content>
                    <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>{mensajeerrorenvio}</Paragraph>
                 </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=> {guardarEnvioenprogreso(false);guardarAlertaErrorenvio(false);}} color={colorLetra}>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:150,
        fontSize: RFPercentage(2.3),
        marginBottom:15,
        fontFamily: 'Inter-Regular',
        textAlign:'justify',
        marginHorizontal: 10
    },
    opciones:{
        flex: 0.25,
        alignItems: 'center'
    },
    botonS:{
        height: RFPercentage(5),
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8,
        marginHorizontal: 10
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize:  RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    },
    cargando: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        alignContent: 'center',
        alignSelf:'center',
        marginVertical: 0
    },
})

export default codigosicologo;