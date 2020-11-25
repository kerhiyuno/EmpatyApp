import React, {useState,useContext} from 'react';
import {Button,Paragraph,Dialog, Portal} from 'react-native-paper';
import {TouchableHighlight, View,StyleSheet,Text} from 'react-native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from './hosts.js';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const BotonLogout = ({navigation}) => {

    const { reiniciarContenido } = useContext(NotificacionesContext);
    const [alertaseguro,guardarAlertaseguro] = useState(false);

    const {colorTextoBoton,colorSalir,colorIcono,colorLetra,colorFondo} = useContext(EstilosContext);


    const Logout = async () => {
        try {
            const name = await AsyncStorage.getItem('datosSesion');
            const Bearer = JSON.parse(name).refresh;
            const postdata = {Bearer: Bearer}
            var logout = await axios.post(host+'/account/logout/',postdata,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access)}});
            await AsyncStorage.removeItem('datosSesion');
            reiniciarContenido();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Iniciar Sesion' }],
            });
            console.log(logout);
        } catch (error){
            console.log("error");
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
                        const postdata = {Bearer: refresh}
                        var logout = await axios.post(host+'/account/logout/',postdata,
                        {
                            headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),},
                        });
                        await AsyncStorage.removeItem('datosSesion');
                        console.log(logout);
                        reiniciarContenido();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Iniciar Sesion' }],
                        });      
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
        <View>
            <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorSalir}]} underlayColor = {'transparent'} onPress={()=> guardarAlertaseguro(true)}>
                <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:8}}>
                    <Icon name="logout" color={colorIcono} size={RFPercentage(3)}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Salir</Text>
                </View>
            </TouchableHighlight>
            
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaseguro} onDismiss={() => guardarAlertaseguro(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Salir</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>¿Está seguro que desea cerrar sesión?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:30}}>
                            <Button onPress={()=>{guardarAlertaseguro(false); Logout();}} color={colorLetra}>Si</Button>
                        </View>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>guardarAlertaseguro(false)} color={colorLetra}>No</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles=StyleSheet.create({
    botonS:{
        height: RFPercentage(5.5),
        marginHorizontal: 0,
        marginRight:10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d15311",
        borderRadius: 8
    },
    textoC: {
        marginHorizontal: 5,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})


export default BotonLogout;
