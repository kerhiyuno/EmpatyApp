import React, {useState} from 'react';
import {Button,Paragraph,Dialog, Portal} from 'react-native-paper';
import {View} from 'react-native';

const BotonSalir = ({navigation,route}) =>{
    
    const [alertaseguro,guardarAlertaseguro] = useState(false);

    const salir = async() =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Iniciar Sesion' }],
        });
    }

    return(
        <View>
            <Button onPress={()=> guardarAlertaseguro(true)}  style={{backgroundColor:'#1e524c',marginRight:5}}theme={{colors: {text: 'white', primary: 'white'}}}>Salir</Button>
            <Portal>
                <Dialog visible={alertaseguro} onDismiss={() => guardarAlertaseguro(false)}>
                    <Dialog.Title>Salir</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{fontSize:17}}>¿Está seguro que desea salir del registro?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:30}}>
                            <Button onPress={()=>{guardarAlertaseguro(false); salir();}} color='#0f4866'>Si</Button>
                        </View>
                        <View style={{marginRight:10}}>
                            <Button onPress={()=>guardarAlertaseguro(false)} color='#0f4866'>No</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default BotonSalir;
