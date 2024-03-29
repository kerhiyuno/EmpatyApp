import React, {useState} from 'react';
import {Button,Paragraph,Dialog, Portal} from 'react-native-paper';
import {TouchableHighlight, View} from 'react-native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const BotonLogout = ({navigation,route}) => {
    const [alertaseguro,guardarAlertaseguro] = useState(false);

    const Logout = async () => {
        try {
            const name = await AsyncStorage.getItem('datosSesion');
            const Bearer = JSON.parse(name).refresh;
            const postdata = {Bearer: Bearer}
            var logout = await axios.post('http://10.0.2.2:8000/account/logout/',postdata,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access)}});
            await AsyncStorage.removeItem('datosSesion');
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
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const postdata = {
                            Bearer: refresh
                        }
                        var logout = await axios.post('http://10.0.2.2:8000/account/logout/',postdata,
                        {
                            headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),},
                        });
                        await AsyncStorage.removeItem('datosSesion');
                        console.log(logout);
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
            <Button onPress={()=> guardarAlertaseguro(true)}  style={{backgroundColor:'#1e524c',marginRight:5}}theme={{colors: {text: 'white', primary: 'white'}}}>Salir</Button>
            <Portal>
                <Dialog visible={alertaseguro} onDismiss={() => guardarAlertaseguro(false)}>
                    <Dialog.Title>Salir</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{fontSize:17}}>¿Está seguro que desea cerrar sesión?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:30}}>
                            <Button onPress={()=>{guardarAlertaseguro(false); Logout();}} color='#3c2c18'>Si</Button>
                        </View>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>guardarAlertaseguro(false)} color='#3c2c18'>No</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default BotonLogout;
