import React, {useState} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {ipHost} from '../components/hosts.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Slider } from "@miblanchard/react-native-slider";

const host = ipHost();

const Sentimiento = ({navigation,route}) => {

    const [mensaje,guardarMensaje] = useState('');
    const [valorslider,guardarValorslider] = useState(0);
    const [alertaexito,guardarAlertaexito] = useState(false);
    const [cargando,guardarCargando] = useState(false);

    const enviar = async () => {
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/sentimiento/manage/',{texto:mensaje,slider:parseInt(valorslider[0])},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta.data);
            if (respuesta.data.message==="Sentimiento registrado"){
                guardarAlertaexito(true);
                guardarCargando(false);
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
                        const respuesta = await axios.post(host+'/sentimiento/manage/',{texto:mensaje,slider:valorslider},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta.data);
                        if (respuesta.data.message==="Sentimiento registrado"){
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
    const volver = () =>{
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
    }

    return(
        <View style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}>Sentimientos</Text>
            <Text style={styles.texto}>¿Cómo te sientes?</Text>
            <View style={styles.slider}>
                <Slider
                value= {valorslider}
                onValueChange={value => guardarValorslider(value)}
                maximumValue = {100}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.9}}>
                    <Icon name="emoticon-sad-outline" color="black" size={35}></Icon>
                </View>
                <View style={{flex:0.1}}>
                    <Icon name="emoticon-happy-outline" color="black" size={35}></Icon>
                </View>
            </View>
            <View style={{marginTop: 40}}>
                <Text style={styles.texto}>Exprésate (esto no será visto por nadie):</Text>
                    <TextInput
                        label="Mensaje"
                        onChangeText={(texto) => guardarMensaje(texto)}
                        style={[globalStyles.entradaTexto,]}
                        theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                        multiline={true}
                    />
            </View>
            <View style={{marginTop:5}}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>enviar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="send" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} /> : null}
            <Portal>
                    <Dialog visible={alertaexito} onDismiss={() => {guardarAlertaexito(false);volver()}}>
                        <Dialog.Title>Éxito</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={globalStyles.textoAlerta}>Se ha enviado correctamente
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=>{guardarAlertaexito(false);volver()}} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
        </View>
    )
}

export default Sentimiento;

const styles=StyleSheet.create({
    texto: {
        fontSize: 16,
        marginLeft:7,
        marginRight:7,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    textoS:{
        marginBottom: 8,
        marginHorizontal: 0,
        marginLeft: 1,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    botonS:{
        height: 40,
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
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    },
    slider: {
        marginTop:30,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    }
})