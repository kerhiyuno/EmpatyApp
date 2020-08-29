import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight } from 'react-native';
import {Button, Paragraph, Dialog, Portal, RadioButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const registro4 = ({navigation,route}) =>{

    const [psico_prevS,guardarPsico_prev] = useState('');
    const [psiquia_prevS,guardarPsiquia_prev] = useState('');
    const [tratamiento_vigenteS,guardarTratamiento_vigente] = useState('');
    const [alerta,guardarAlerta] = useState(false);
    
    const fullname = (route.params.usuario.fullname);
    const rut = (route.params.usuario.rut);
    const genero = (route.params.usuario.genero);
    const email = (route.params.usuario.email);
    const password = (route.params.usuario.password);
    const gender_description = (route.params.usuario.gender_description);
    const telefono = (route.params.usuario.telefono);
    const hobbies = (route.params.usuario.hobbies);
    const fecha_nacimiento = (route.params.usuario.fecha_nacimiento);

    const registrar = async () => {
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
        //generar
        const usuario={fullname,rut,email,password,telefono,genero,gender_description,hobbies,psico_prev,psiquia_prev,tratamiento_vigente,fecha_nacimiento};
        console.log(usuario);
    
        //redireccionar
        navigation.navigate('Registro 5/7',{usuario});
        //limpiar formulario

    }
    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={[styles.texto,{fontWeight: "bold"}]}>Para dar información preliminar de utilidad a su psicólogo o psicóloga, responda las siguientes preguntas:</Text>
            <Text style={styles.texto}>¿Haz recibido tratamiento psicológico con anterioridad?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text>Si</Text>
                    <RadioButton
                        value="first"
                        status={ psico_prevS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsico_prev('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text>No</Text>
                    <RadioButton
                        value="second"
                        status={ psico_prevS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsico_prev('No')}
                        color='black'
                    />
                </View>
            </View>
            <Text style={styles.texto}>¿Haz recibido tratamiento psiquiátrico con anterioridad?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text>Si</Text>
                    <RadioButton
                        value="first"
                        status={ psiquia_prevS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsiquia_prev('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text>No</Text>
                    <RadioButton
                        value="second"
                        status={ psiquia_prevS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarPsiquia_prev('No')}
                        color='black'
                    />
                </View>
            </View>
            <Text style={styles.texto}>¿Estás bajo tratamiento farmacológico/psiquiátrico actualmente?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text>Si</Text>
                    <RadioButton
                        value="first"
                        status={ tratamiento_vigenteS === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTratamiento_vigente('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text>No</Text>
                    <RadioButton
                        value="second"
                        status={ tratamiento_vigenteS === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTratamiento_vigente('No')}
                        color='black'
                    />
                </View>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Siguiente</Text>
                    </View>
                </TouchableHighlight >
            </View>
            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{fontSize:17}}>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:25,
        fontSize: 17,
        marginLeft:5,
        marginRight:5
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10
    },
    opciones:{
        flex: 0.5,
        alignItems: 'center'
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    botonS:{
        height: 40,
        marginBottom: 0,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8,
        marginTop: 15
    }
})

export default registro4;