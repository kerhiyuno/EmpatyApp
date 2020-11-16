import React, {useState,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native';
import globalStyles from '../styles/global';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const Panico = ({navigation}) => {

    const {colorb,colorLetra,colorTextoBoton,colorBordeInput,colorPlaceholderinput,
        colorPrimaryinput,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);

    const [alertaenviar,guardarAlertaenviar] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);


  const volver = () =>{
    navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
}
    const enviar = async () => {
        var envio = {"a":"a"};
        console.log(envio);
        guardarAlertaexito(true);
        /*try {
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
        }*/
    }

    return(
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <View style={{flex:1}}>
                <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Botón de pánico</Text>
                <Text style={[styles.texto,{color: colorLetra}]}>¿Necesitas ayuda?</Text>
            </View>
            <View style={{flex: 4,alignItems:"center"}}>
                <TouchableHighlight  style={[styles.botonS]} underlayColor = {'transparent'} onPress={()=>enviar()}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Presiona aquí</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alertaenviar} onDismiss={() => guardarAlertaenviar(false)}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>¿Estas seguro de enviar una alerta?</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> enviar()} color='#3c2c18'>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> guardarAlertaenviar(false)} color='#3c2c18'>No</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertaexito} onDismiss={() => {guardarAlertaexito(false);volver()}}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El mensaje se ha enviado correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarAlertaexito(false);volver()}} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles=StyleSheet.create({
    texto: {
        fontSize: RFPercentage(2.5),
        marginLeft:7,
        marginRight:7,
        fontFamily: 'Inter-Regular',
        textAlign:'center'
    },
    botonS:{
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'red'
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Panico;
