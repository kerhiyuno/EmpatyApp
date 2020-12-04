import React, {useState,useContext} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight } from 'react-native';
import {Button, Paragraph, Dialog, Portal, RadioButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const registro4 = ({navigation,route}) =>{

    const {colorb,colorTextoBoton,colorLetra,colorIcono,colorFondo} = useContext(EstilosContext);

    const [psico_prevS,guardarPsico_prev] = useState('');
    const [psiquia_prevS,guardarPsiquia_prev] = useState('');
    const [tratamiento_vigenteS,guardarTratamiento_vigente] = useState('');
    const [alerta,guardarAlerta] = useState(false);
    const [registrolisto,guardarRegistrolisto] = useState(false);
    const [registroenprogreso,guardarRegistroenprogreso] = useState(false);
    
    const fullname = (route.params.usuario.fullname);
    const rut = (route.params.usuario.rut);
    const genero = (route.params.usuario.genero);
    const email = (route.params.usuario.email);
    const password = (route.params.usuario.password);
    const gender_description = (route.params.usuario.gender_description);
    const telefono = (route.params.usuario.telefono);
    const hobbies = (route.params.usuario.hobbies);
    const fecha_nacimiento = (route.params.usuario.fecha_nacimiento);
    const numemergencia = (route.params.usuario.numemergencia);

    const registrar = async () => {
        if (registroenprogreso===false){
            guardarRegistroenprogreso(true);
            var psico_prev = true;
            var psiquia_prev = true;
            var tratamiento_vigente = true;

            //validar
            if(psico_prevS==='' || tratamiento_vigenteS===''){
                guardarAlerta(true);
                return
            }

            if(psico_prevS==='no'){
                psico_prev = false;
            }
            if(psiquia_prevS==='no'){
                psiquia_prev=false;
            }
            if(tratamiento_vigenteS==='no'){
                tratamiento_vigente=false;
            }
            //validar
            const usuario={fullname,rut,email,password,telefono,genero,gender_description,hobbies,psico_prev,psiquia_prev,tratamiento_vigente,fecha_nacimiento,numemergencia};
            //guardar en api
            try {
                console.log(usuario);
                const respuesta=await axios.post(host+'/usuarios/paciente/registro/',usuario);
                if (respuesta.status===200){
                    guardarRegistrolisto(true);
                }
            }
             catch (error){
            console.log(error);
            console.log(error.response);
            }
            //limpiar formulario
        }
        else{
            console.log("registro en progreso");
        }
    }

    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}>Para dar información preliminar de utilidad a su psicólogo o psicóloga, responda las siguientes preguntas:</Text>
            <Text style={[styles.texto,{color: colorLetra}]}>¿Haz recibido tratamiento psicológico con anterioridad?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>Si</Text>
                    <RadioButton
                        value="first"
                        status={ psico_prevS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsico_prev('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>No</Text>
                    <RadioButton
                        value="second"
                        status={ psico_prevS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsico_prev('No')}
                        color='black'
                    />
                </View>
            </View>
            <Text style={[styles.texto,{color: colorLetra}]}>¿Haz recibido tratamiento psiquiátrico con anterioridad?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>Si</Text>
                    <RadioButton
                        value="first"
                        status={ psiquia_prevS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsiquia_prev('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>No</Text>
                    <RadioButton
                        value="second"
                        status={ psiquia_prevS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsiquia_prev('No')}
                        color='black'
                    />
                </View>
            </View>
            <Text style={[styles.texto,{color: colorLetra}]}>¿Estás bajo tratamiento farmacológico/psiquiátrico actualmente?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>Si</Text>
                    <RadioButton
                        value="first"
                        status={ tratamiento_vigenteS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTratamiento_vigente('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={[styles.sino,{color: colorLetra}]}>No</Text>
                    <RadioButton
                        value="second"
                        status={ tratamiento_vigenteS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTratamiento_vigente('No')}
                        color='black'
                    />
                </View>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="greater-than" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Finalizar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={alerta} onDismiss={() => guardarAlerta(false)}>
                    <Dialog.Title style={{color: colorLetra}}>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog style={{backgroundColor: colorFondo}} visible={registrolisto} onDismiss={() => {guardarRegistrolisto(false);guardarRegistroenprogreso(false);navigation.navigate('Iniciar Sesion')}}>
                    <Dialog.Title style={{color: colorLetra}}>Registro completado</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Se ha registrado exitosamente</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>{guardarRegistrolisto(false);guardarRegistroenprogreso(false);navigation.navigate('Iniciar Sesion')}} color={colorLetra}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    sino:{
        fontFamily:'Inter-Regular'
    },
    texto: {
        marginTop:10,
        fontSize: RFPercentage(2.5),
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10
    },
    opciones:{
        flex: 0.5,
        alignItems: 'center',
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: RFPercentage(2.5),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-Light'
    },
    botonS:{
        height:  RFPercentage(5),
        marginBottom: 0,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8,
        marginTop: 15
    }
})

export default registro4;