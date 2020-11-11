import React, {useState,useContext} from 'react';
import {Button,Paragraph,Dialog, Portal} from 'react-native-paper';
import {View,StyleSheet,Text,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../styles/global';
import EstilosContext from '../context/estilosContext';

const BotonSalir = ({navigation}) =>{

    const {colorSalir,colorTextoBoton,colorIcono} = useContext(EstilosContext);

    const [alertaseguro,guardarAlertaseguro] = useState(false);

    const salir = async() =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Iniciar Sesion' }],
        });
    }

    return(
        <View>
            <TouchableHighlight  style={[styles.botonS,{backgroundColor:colorSalir}]} underlayColor = {'transparent'} onPress={()=> guardarAlertaseguro(true)}>
                <View style={{flexDirection:'row',justifyContent:'center',marginHorizontal:8}}>
                    <Icon name="logout" color={colorIcono} size={25}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Salir</Text>
                </View>
            </TouchableHighlight>
            <Portal>
                <Dialog visible={alertaseguro} onDismiss={() => guardarAlertaseguro(false)}>
                    <Dialog.Title>Salir</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>¿Está seguro que desea salir del registro?</Paragraph>
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

const styles=StyleSheet.create({
    botonS:{
        height: 35,
        marginRight:10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d15311",
        borderRadius: 8
    },
    textoC: {
        marginHorizontal: 5,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default BotonSalir;
