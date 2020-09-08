import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const codigosicologo = ({navigation,route}) =>{

    const [codigo,guardarCodigo] = useState('');
    const [alertacodigo,guardarAlertacodigo] = useState('');
    const [alertasicologo,guardarAlertasicologo] = useState(false);

    const enviar = async () => {
        if (codigo === ''){
            guardarAlertacodigo(true);
            return
        }
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/codigopsicologo/connect/',mensaje,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            if (respuesta.status===200){
                guardarAlertasicologo(true);
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
                        const respuesta = await axios.post(host+'/codigopsicologo/connect/',usuario,
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
        }
    }

    const encontrado = () =>{
        guardarAlertasicologo(false);
        navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});
    }

    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={styles.texto}>Si tu psicólogo o psicóloga te invitó a esta aplicación y te dió su código, puedes ingresarlo aquí:
            </Text>
            <TextInput
                label="Código de psicólogo"
                onChangeText={(texto) => guardarCodigo(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
            />
            
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>enviar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="send" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alertacodigo} onDismiss={() => guardarAlertacodigo(false)}>
                 <Dialog.Title>Error</Dialog.Title>
                 <Dialog.Content>
                     <Paragraph style={globalStyles.textoAlerta}>Debe ingresar un código</Paragraph>
                 </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>{guardarAlertacodigo(false);}} color='#3c2c18'>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertasicologo} onDismiss={() => encontrado()}>
                 <Dialog.Title>Psicólogo encontrado</Dialog.Title>
                 <Dialog.Content>
                     <Paragraph style={globalStyles.textoAlerta}>Ha sido vinculado con su psicólogo</Paragraph>
                 </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=> encontrado()} color='#3c2c18'>Ok</Button>
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
        fontSize: 18,
        marginLeft:5,
        marginRight:5,
        marginBottom:15,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },

    opciones:{
        flex: 0.25,
        alignItems: 'center'
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

export default codigosicologo;