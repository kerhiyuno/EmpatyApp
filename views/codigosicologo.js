import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const codigosicologo = ({navigation,route}) =>{

    const [codigo,guardarCodigo] = useState('');
    const [alertacodigo,guardarAlertacodigo] = useState('');


    const enviar = async () => {
        if (codigo === ''){
            guardarAlertacodigo(true);
        }
        else{
         console.log("enviar");   
        }
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
            <Dialog visible={alertacodigo} onDismiss={() => guardarAlertaedad(false)}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{fontSize:17}}>Debe ingresar un código</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={{marginRight:10}}>
                        <Button onPress={()=>{guardarAlertacodigo(false);}} color='#3c2c18'>Ok</Button>
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
        fontSize: 20,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default codigosicologo;