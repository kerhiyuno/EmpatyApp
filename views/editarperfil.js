import React, {useState} from 'react';
import {StyleSheet,Text,ScrollView } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../styles/global';

const editarperfil = ({navigation,route}) =>{

    const nombre = (route.params.datos.nombre);
    const telefono = (route.params.datos.telefono);
    const genero = (route.params.datos.genero);

    const [nombrecambio,guardarNombrecambio] = useState(nombre);
    const [telefonocambio,guardarTelefonocambio] = useState(telefono);
    const [generocambio,guardarGenerocambio] = useState(genero)

    const enviar = async () => {
        console.log(nombrecambio);
        console.log(telefonocambio);
        console.log(generocambio);
    }

    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={styles.texto}>Nombre:</Text>
            <TextInput
                onChangeText={(texto) => guardarNombrecambio(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                defaultValue = {nombre}
            />
            <Text style={styles.texto}>Teléfono:</Text>
            <TextInput
                onChangeText={(texto) => guardarTelefonocambio(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                defaultValue = {telefono}
                keyboardType='phone-pad'
            />
            <Text style={styles.texto}>Género:</Text>
            <TextInput
                onChangeText={(texto) => guardarGenerocambio(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                defaultValue = {genero}
            />
            <Button  style={[globalStyles.botonG,{marginBottom:25,marginTop:15}]} icon="pencil-circle" mode="contained" onPress={()=>enviar()}>
                Guardar Cambios
            </Button>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    texto: {
        marginTop:15,
        fontSize: 19,
        marginLeft:0,
        marginRight:5,
    },
    opciones:{
        flex: 0.25,
        alignItems: 'center'
    }
})

export default editarperfil;