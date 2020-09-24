import React, {useState} from 'react';
import {View, StyleSheet,Text,ScrollView,TouchableHighlight } from 'react-native';
import {TextInput, Button,RadioButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const editarperfil = ({navigation,route}) =>{

    const nombre = (route.params.datos.nombre);
    const telefono = (route.params.datos.telefono);
    const generodescripcion = (route.params.datos.generodescripcion);
    const genero = (route.params.datos.genero);

    const [nombrecambio,guardarNombrecambio] = useState(nombre);
    const [telefonocambio,guardarTelefonocambio] = useState(telefono);
    const [generodescripcioncambio,guardarGenerodescripcioncambio] = useState(generodescripcion);
    const [generocambio,guardarGenerocambio] = useState(genero);

    const enviar = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{fullname: nombrecambio,
            genero: generocambio,gender_description: generodescripcioncambio,telefono:telefonocambio},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
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
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{fullname: nombrecambio,
                            genero: generocambio,gender_description: generodescripcioncambio,telefono:telefonocambio},
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
        }
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
            <Text style={[styles.texto,styles.minTitulo]}>Género:</Text>
            <View style={styles.pregunta}>
                <RadioButton
                    value="first"
                    status={ generocambio === 'Masculino' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Masculino')}
                    color='black'
                />
                <Text style={styles.texto,styles.texto2}>Masculino</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="second"
                    status={ generocambio === 'Femenino' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Femenino')}
                    color='black'
                />
                <Text style={styles.texto,styles.texto2}>Femenino</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="third"
                    status={ generocambio === 'No binario' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('No binario')}
                    color='black'
                />
                <Text style={styles.texto,styles.texto2}>No Binario</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="Fourth"
                    status={ generocambio === 'Otro' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Otro')}
                    color='black'
                />
                <Text style={styles.texto,styles.texto2}>Otro</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="fifth"
                    status={ generocambio === 'Prefiero no decir' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Prefiero no decir')}
                    color='black'
                />
                <Text style={styles.texto,styles.texto2}>Prefiero no decir</Text>
            </View>
            <Text style={styles.texto}>Como prefieres que te identifiquemos:</Text>
            <TextInput
                onChangeText={(texto) => guardarGenerodescripcioncambio(texto)}
                style={globalStyles.input}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
                defaultValue = {generodescripcion}
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
        fontSize: 16,
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
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Light'
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
    texto2: {
        fontSize: 16,
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:2,
        marginLeft:10,
        alignItems:'center'
    },
    minTitulo:{
        marginTop:0,
        fontFamily: "Inter-Bold",
        fontSize:18
    },
})

export default editarperfil;