import React, {useState,useContext} from 'react';
import {View,StyleSheet,Text,ScrollView ,TouchableHighlight,useWindowDimensions} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal, RadioButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const registro2 = ({navigation,route}) =>{

    const {colorb,colorBorderInput,colorTextoBoton,colorLetra,colorIcono,colorFondo} = useContext(EstilosContext);

    const {width, height} = useWindowDimensions();

    const [genero,guardarGenero] = useState('');
    const [gender_description,guardarGender_description] = useState('');

    const [alerta,guardarAlerta] =useState(false)

    const fullname = (route.params.usuario.fullname);
    const rut = (route.params.usuario.rut);
    const email = (route.params.usuario.email);
    const password = (route.params.usuario.password);
    const telefono = (route.params.usuario.telefono);
    const fecha_nacimiento = (route.params.usuario.fecha_nacimiento);

    const registrar = async () => {
        //validar
        if (gender_description === '' || genero === ''){
            guardarAlerta(true);
            return
        }
        //generar
        const usuario={fullname,rut,email,password,telefono,genero,gender_description,fecha_nacimiento};
        console.log(usuario);
        //redireccionar
        navigation.navigate('Registro 3/7',{usuario});
        //limpiar formulario
    }
    return (
        <KeyboardAwareScrollView>
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <View style={{flex: 1}}>
                <Text style={[styles.texto,styles.minTitulo,{color: colorLetra}]}>Género:</Text>
                <View style={styles.pregunta}>
                    <RadioButton
                        value="first"
                        status={ genero === 'Masculino' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero('Masculino')}
                        color='black'
                    />
                    <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Masculino</Text>
                </View>
                <View style={styles.pregunta}>
                    <RadioButton
                        value="second"
                        status={ genero === 'Femenino' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero('Femenino')}
                        color='black'
                    />
                    <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Femenino</Text>
                </View>
                <View style={styles.pregunta}>
                    <RadioButton
                        value="third"
                        status={ genero === 'No binario' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero('No binario')}
                        color='black'
                    />
                    <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>No Binario</Text>
                </View>
                <View style={styles.pregunta}>
                    <RadioButton
                        value="Fourth"
                        status={ genero === 'Otro' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero('Otro')}
                        color='black'
                    />
                    <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Otro</Text>
                </View>
                <View style={styles.pregunta}>
                    <RadioButton
                        value="fifth"
                        status={ genero === 'Prefiero no decir' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero('Prefiero no decir')}
                        color='black'
                    />
                    <Text style={[styles.texto,styles.texto2,{color: colorLetra}]}>Prefiero no decir</Text>
                </View>
            </View>
            <View style={{flex: 4}}>
            <Text style={[styles.texto,{marginTop: 20,marginBottom:5,color: colorLetra}]}>¿Cómo prefieres que te identifiquemos?</Text>
            <TextInput
                label="Hombre, Mujer, Otro"
                onChangeText={(texto) => guardarGender_description(texto) }
                style={[globalStyles.input,{borderColor: colorBorderInput}]}
                theme={{colors: {text: '#3c2c18', primary: '#3c2c18'}}}
            />
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor:colorb,height: height*0.05}]} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="greater-than" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                    </View>
                </TouchableHighlight >
            </View>
            </View>
            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:0,
        fontSize: RFPercentage(2.5),
        marginLeft:5,
        marginRight:5,
        fontFamily: 'Inter-Regular'
    },
    texto2: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10,
        alignItems:'center'
    },
    minTitulo:{
        marginTop:15,
        fontFamily: "Inter-Bold",
        fontSize: RFPercentage(3)
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
        marginBottom: 0,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    }
})


export default registro2;