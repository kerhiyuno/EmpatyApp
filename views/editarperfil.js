import React, {useState,useContext} from 'react';
import {View, StyleSheet,Text,ScrollView,TouchableHighlight } from 'react-native';
import {TextInput, Button,RadioButton, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const editarperfil = ({route}) =>{

    const {colorb,colorLetra,colorTextoBoton,colorBordeInput,
        colorPrimaryinput,colorPlaceholderinput,colorIcono,colorFondo} = useContext(EstilosContext);

    const nombre = (route.params.datos.nombre);
    const telefono = (route.params.datos.telefono);
    const generodescripcion = (route.params.datos.generodescripcion);
    const genero = (route.params.datos.genero);

    const [nombrecambio,guardarNombrecambio] = useState(nombre);
    const [telefonocambio,guardarTelefonocambio] = useState(telefono);
    const [generodescripcioncambio,guardarGenerodescripcioncambio] = useState(generodescripcion);
    const [generocambio,guardarGenerocambio] = useState(genero);

    const [alertaexito,guardarAlertaexito] = useState(false);
    const [guardadoenprogreso,guardarGuardadoenprogreso] = useState(false);

    const enviar = async () => {
        if (guardadoenprogreso===false){
            guardarGuardadoenprogreso(true);
            try {
                const nombre = await AsyncStorage.getItem('datosSesion');
                const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{fullname: nombrecambio,
                genero: generocambio,gender_description: generodescripcioncambio,telefono:telefonocambio},
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                console.log(respuesta);
                if (respuesta.status===200){
                    guardarAlertaexito(true);
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
                            var name = await AsyncStorage.getItem('datosSesion');
                            const respuesta = await axios.put(host+'/usuarios/paciente/perfil/',{fullname: nombrecambio,
                                genero: generocambio,gender_description: generodescripcioncambio,telefono:telefonocambio},
                                {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                            console.log(respuesta);
                            if (respuesta.status===200){
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
        else{
            console.log("enprogreso");
        }
    }

    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[styles.texto,{color: colorLetra}]}>Nombre:</Text>
            <TextInput
                onChangeText={(texto) => guardarNombrecambio(texto)}
                style={[globalStyles.input,{borderColor:colorBordeInput}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                defaultValue = {nombre}
            />
            <Text style={[styles.texto,{color: colorLetra}]}>Teléfono:</Text>
            <TextInput
                onChangeText={(texto) => guardarTelefonocambio(texto)}
                style={[globalStyles.input,{borderColor:colorBordeInput}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                defaultValue = {telefono}
                keyboardType='phone-pad'
            />
            <Text style={[styles.texto,styles.minTitulo,{color: colorLetra}]}>Género:</Text>
            <View style={styles.pregunta}>
                <RadioButton
                    value="first"
                    status={ generocambio === 'Masculino' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Masculino')}
                    color='black'
                />
                <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Masculino</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="second"
                    status={ generocambio === 'Femenino' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Femenino')}
                    color='black'
                />
                <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Femenino</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="third"
                    status={ generocambio === 'No binario' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('No binario')}
                    color='black'
                />
                <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>No Binario</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="Fourth"
                    status={ generocambio === 'Otro' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Otro')}
                    color='black'
                />
                <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Otro</Text>
            </View>
            <View style={styles.pregunta}>
                <RadioButton
                    value="fifth"
                    status={ generocambio === 'Prefiero no decir' ? 'checked' : 'unchecked' }
                    onPress={() => guardarGenerocambio('Prefiero no decir')}
                    color='black'
                />
                <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Prefiero no decir</Text>
            </View>
            <Text style={[styles.texto,{color: colorLetra}]}>Como prefieres que te identifiquemos:</Text>
            <TextInput
                onChangeText={(texto) => guardarGenerodescripcioncambio(texto)}
                style={[globalStyles.input,{borderColor:colorBordeInput}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                defaultValue = {generodescripcion}
            />
            <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} onPress={() => enviar() }>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="pencil-outline" color={colorIcono} size={RFPercentage(3)}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}> Guardar Cambios</Text>
                </View>
            </TouchableHighlight>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alertaexito} onDismiss={() => {guardarGuardadoenprogreso(false);guardarAlertaexito(false)}}>
                    <Dialog.Title style={{color: colorLetra}}>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Los cambios han sido guardados correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarGuardadoenprogreso(false);guardarAlertaexito(false)}} color={colorLetra}>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    texto: {
        fontSize:  RFPercentage(2),
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
        fontSize: RFPercentage(2.5),
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Light'
    },
    botonS:{
        height: RFPercentage(6),
        marginTop: 5,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    texto2: {
        fontSize: RFPercentage(2),
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginLeft:10,
        alignItems:'center'
    },
    minTitulo:{
        marginTop:0,
        fontFamily: "Inter-Bold",
        fontSize:RFPercentage(2.5)
    },
})

export default editarperfil;