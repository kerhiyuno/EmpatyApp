import React, {useState} from 'react';
import {View, StyleSheet,Text,ScrollView,TouchableHighlight } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <TouchableHighlight style={styles.botonS} onPress={() => enviar() }>
                <View style={{flexDirection:'row'}}>
                    <Icon name="pencil-outline" color="white" size={25}></Icon>
                    <Text style={[styles.textoC]}> Guardar Cambios</Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    texto: {
        marginTop:10,
        fontSize: 18,
        marginLeft:8,
        marginRight:0,
        fontFamily: 'Inter-Regular'
    },
    opciones:{
        flex: 0.25,
        alignItems: 'center'
    },
    textoC:{
        marginBottom: 2,
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Regular'
    },
    botonS:{
        height: 40,
        marginTop: 5,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    },
})

export default editarperfil;