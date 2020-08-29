import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView ,TouchableHighlight} from 'react-native';
import {TextInput} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const registro6 = ({navigation,route}) =>{

    const [codigo,guardarCodigo] = useState('');

    const fullname = (route.params.usuario.fullname);
    const rut = (route.params.usuario.rut);
    const genero = (route.params.usuario.genero);
    const email = (route.params.usuario.email);
    const password = (route.params.usuario.password);
    const gender_description = (route.params.usuario.gender_description);
    const telefono = (route.params.usuario.telefono);
    const hobbies = (route.params.usuario.hobbies);
    const psico_prev = (route.params.usuario.psico_prev);
    const psiquia_prev = (route.params.usuario.psiquia_prev);
    const tratamiento_vigente = (route.params.usuario.tratamiento_vigente);
    const fcp = (route.params.usuario.fcp);
    const shd = (route.params.usuario.shd);
    const ga = (route.params.usuario.ga);
    const gd = (route.params.usuario.gd);
    const fa = (route.params.usuario.fa);
    const ap = (route.params.usuario.ap);
    const fecha_nacimiento = (route.params.usuario.fecha_nacimiento);

    const registrar = async () => {
        
        if (codigo === ''){
            //generar
            const usuario={fullname,rut,email,password,telefono,genero,gender_description,hobbies,psico_prev,psiquia_prev,tratamiento_vigente,fcp,shd,ga,gd,fa,ap,fecha_nacimiento};
            console.log(usuario);
    
            //redireccionar
            navigation.navigate('Registro 7/7',{usuario});
        }
        else{
            //generar
            const usuario={fullname,rut,email,password,telefono,genero,gender_description,hobbies,psico_prev,psiquia_prev,tratamiento_vigente,fcp,shd,ga,gd,fa,ap,codigo,fecha_nacimiento};
            console.log(usuario);
            //redireccionar
            navigation.navigate('Iniciar Sesion');
        }

        //limpiar formulario

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
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Siguiente</Text>
                    </View>
                </TouchableHighlight >
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:150,
        fontSize: 19,
        marginLeft:5,
        marginRight:5,
        marginBottom:15,
    },
    opciones:{
        flex: 0.25,
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

export default registro6;