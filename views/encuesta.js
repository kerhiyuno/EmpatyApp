import React,{useEffect,useState,useContext} from 'react';
import {Text,View,StyleSheet,TouchableHighlight, ColorPropType} from 'react-native';
import {Button,Paragraph,Dialog, Portal} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../styles/global';
import {ipHost} from '../components/hosts.js';
import {TextInput} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';

const host = ipHost();

const encuesta = ({navigation,route}) => {

    const {colorb,colorLetra,colorTextoBoton,colorBordeInput,colorPrimaryinput,
        colorPlaceholderinput,colorBotonDesactivado,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);

    const [cargando, guardarCargando] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);

    const [nombresicologo,guardarNombreSicologo] = useState('Juan');
    const [calificacion11,guardarCalificacion11] = useState(false);
    const [calificacion12,guardarCalificacion12] = useState(false);
    const [calificacion13,guardarCalificacion13] = useState(false);
    const [calificacion14,guardarCalificacion14] = useState(false);
    const [calificacion15,guardarCalificacion15] = useState(false);
    const [calificacion21,guardarCalificacion21] = useState(false);
    const [calificacion22,guardarCalificacion22] = useState(false);
    const [calificacion23,guardarCalificacion23] = useState(false);
    const [calificacion24,guardarCalificacion24] = useState(false);
    const [calificacion25,guardarCalificacion25] = useState(false);
    const [calificacion31,guardarCalificacion31] = useState(false);
    const [calificacion32,guardarCalificacion32] = useState(false);
    const [calificacion33,guardarCalificacion33] = useState(false);
    const [calificacion34,guardarCalificacion34] = useState(false);
    const [calificacion35,guardarCalificacion35] = useState(false);
    const [mensaje,guardarMensaje] = useState('');

    const [medalla1,guardarMedalla1] = useState(false);
    const [medalla2,guardarMedalla2] = useState(false);
    const [medalla3,guardarMedalla3] = useState(false);

    const id = route.params.id;
    const fecha = route.params.fecha;
    console.log(route.params);

    useEffect(() => {
        datospsicologo();
    },[]);
    
    /*const consultar = async () => {
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarNombre(respuesta.data.fullname);
            guardarEmail(respuesta.data.email);
            guardarTelefono(respuesta.data.telefono);
            guardarGenero(respuesta.data.genero);
            guardarGenerodescripcion(respuesta.data.gender_description);
            console.log(respuesta);
            guardarCargando(false);
        } catch (error) {
            console.log("error");
            console.log(error);
            console.log(error.response);
            if(error.response.data.code==='token_not_valid'){
                console.log('token_not_valid');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarNombre(respuesta.data.fullname);
                        guardarEmail(respuesta.data.email);
                        guardarTelefono(respuesta.data.telefono);
                        guardarGenero(respuesta.data.genero);
                        guardarGenerodescripcion(respuesta.data.gender_description);
                        guardarCargando(false);
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
    }*/

    const datospsicologo = async () => {
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log("asadas")
            console.log(respuesta);
            guardarNombreSicologo(respuesta.data.fullname);
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
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.get(host+'/usuarios/psicologo/perfil/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        guardarNombreSicologo(respuesta.data.fullname);
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
    const eleccion = (numero) => {
        if (numero===1){
            console.log(medalla1)
            if (medalla1===false){
                guardarMedalla1(true);
            }
            else if(medalla1===true){
                guardarMedalla1(false);
            }
        }
        else if (numero===2){
            if (medalla2===false){
                guardarMedalla2(true);
            }
            else if(medalla2===true){
                guardarMedalla2(false);
            }
        }
        else if( numero===3){
            if (medalla3===false){
                guardarMedalla3(true);
            }
            else if(medalla3===true){
                guardarMedalla3(false);
            }
        }
    }
    const calificar = (pregunta,numero) => {
        if (pregunta===1){
            if (numero===1){
                guardarCalificacion11(true);
                guardarCalificacion12(false);
                guardarCalificacion13(false);
                guardarCalificacion14(false);
                guardarCalificacion15(false);
            }
            else if (numero===2){
                guardarCalificacion11(false);
                guardarCalificacion12(true);
                guardarCalificacion13(false);
                guardarCalificacion14(false);
                guardarCalificacion15(false);
            }
            else if (numero===3){
                guardarCalificacion11(false);
                guardarCalificacion12(false);
                guardarCalificacion13(true);
                guardarCalificacion14(false);
                guardarCalificacion15(false);
            }
            else if (numero===4){
                guardarCalificacion11(false);
                guardarCalificacion12(false);
                guardarCalificacion13(false);
                guardarCalificacion14(true);
                guardarCalificacion15(false);
            }
            else if (numero===5){
                guardarCalificacion11(false);
                guardarCalificacion12(false);
                guardarCalificacion13(false);
                guardarCalificacion14(false);
                guardarCalificacion15(true);
            }
        }
        else if (pregunta===2){
            if (numero===1){
                guardarCalificacion21(true);
                guardarCalificacion22(false);
                guardarCalificacion23(false);
                guardarCalificacion24(false);
                guardarCalificacion25(false);
            }
            else if (numero===2){
                guardarCalificacion21(false);
                guardarCalificacion22(true);
                guardarCalificacion23(false);
                guardarCalificacion24(false);
                guardarCalificacion25(false);
            }
            else if (numero===3){
                guardarCalificacion21(false);
                guardarCalificacion22(false);
                guardarCalificacion23(true);
                guardarCalificacion24(false);
                guardarCalificacion25(false);
            }
            else if (numero===4){
                guardarCalificacion21(false);
                guardarCalificacion22(false);
                guardarCalificacion23(false);
                guardarCalificacion24(true);
                guardarCalificacion25(false);
            }
            else if (numero===5){
                guardarCalificacion21(false);
                guardarCalificacion22(false);
                guardarCalificacion23(false);
                guardarCalificacion24(false);
                guardarCalificacion25(true);
            }
        }
        else if(pregunta===3){
            if (numero===1){
                guardarCalificacion31(true);
                guardarCalificacion32(false);
                guardarCalificacion33(false);
                guardarCalificacion34(false);
                guardarCalificacion35(false);
            }
            else if (numero===2){
                guardarCalificacion31(false);
                guardarCalificacion32(true);
                guardarCalificacion33(false);
                guardarCalificacion34(false);
                guardarCalificacion35(false);
            }
            else if (numero===3){
                guardarCalificacion31(false);
                guardarCalificacion32(false);
                guardarCalificacion33(true);
                guardarCalificacion34(false);
                guardarCalificacion35(false);
            }
            else if (numero===4){
                guardarCalificacion31(false);
                guardarCalificacion32(false);
                guardarCalificacion33(false);
                guardarCalificacion34(true);
                guardarCalificacion35(false);
            }
            else if (numero===5){
                guardarCalificacion31(false);
                guardarCalificacion12(false);
                guardarCalificacion33(false);
                guardarCalificacion34(false);
                guardarCalificacion35(true);
            }
        }
    }

    const enviar = async () => {
        console.log(fecha);
        var calificacion1 = '';
        var calificacion2 = '';
        var calificacion3 = '';

        if (calificacion11===true){
            calificacion1='1'
        }
        else if(calificacion12===true){
            calificacion1='2'
        }
        else if(calificacion13===true){
            calificacion1='3'
        }
        else if(calificacion14===true){
            calificacion1='4'
        }
        else if(calificacion15===true){
            calificacion1='5'
        }
        if (calificacion21===true){
            calificacion2='1'
        }
        else if(calificacion22===true){
            calificacion2='2'
        }
        else if(calificacion23===true){
            calificacion2='3'
        }
        else if(calificacion24===true){
            calificacion2='4'
        }
        else if(calificacion25===true){
            calificacion2='5'
        }
        if (calificacion31===true){
            calificacion3='1'
        }
        else if(calificacion32===true){
            calificacion3='2'
        }
        else if(calificacion33===true){
            calificacion3='3'
        }
        else if(calificacion34===true){
            calificacion3='4'
        }
        else if(calificacion35===true){
            calificacion3='5'
        }

        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/feedback/evaluar/',{sesion: id , fecha_sesion: fecha, tono_voz: calificacion1, buen_trato: calificacion2, me_senti_bien: calificacion3,
                amable:medalla1,entiende:medalla2,ayuda:medalla3,comentario: mensaje},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            guardarAlertaexito(true);
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
                        const respuesta = await axios.post(host+'/feedback/evaluar/',{id_sesion: id , fecha_sesion: fecha, tono_voz: calificacion1, buen_trato: calificacion2, me_senti_bien: calificacion3,
                            amable:medalla1,entiende:medalla2,ayuda:medalla3,comentario: mensaje},
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarAlertaexito(true);
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
            <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
                <Text style={[globalStyles.titulo,{marginBottom:10,color: colorTitulo}]}>Encuesta de satisfacción</Text>
                <Text style={[styles.textoS,{textAlign:'center',color: colorLetra}]}>Califica tu sesión con {nombresicologo}</Text>
                <Text style={[styles.textoS,{textAlign:'center',color: colorLetra}]}>1: Muy malo       5: Muy bueno</Text>
                <View style={{marginTop:10}}>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}>Su tono de voz era agradable: </Text>
                    <View style={styles.fila}>
                        <TouchableHighlight style={calificacion11=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> {calificar(1,1)}} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>1</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion12=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(1,2)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>2</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion13=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(1,3)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>3</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion14=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(1,4)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>4</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion15=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(1,5)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>5</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}>Tuvo un buen trato conmigo: </Text>
                    <View style={styles.fila}>
                        <TouchableHighlight style={calificacion21=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> {calificar(2,1)}} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>1</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion22=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(2,2)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>2</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion23=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(2,3)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>3</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion24=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(2,4)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>4</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion25=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(2,5)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>5</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}>Me sentí bien durante la sesión: </Text>
                    <View style={styles.fila}>
                        <TouchableHighlight style={calificacion31=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> {calificar(3,1)}} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>1</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion32=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(3,2)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>2</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion33=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(3,3)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>3</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion34=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(3,4)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>4</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={calificacion35=== false ? [styles.opcionespuntaje,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opcionespuntaje,styles.boton,{backgroundColor: colorb}]} onPress={()=> calificar(3,5)} >
                            <View>
                                <Text style={[styles.textboton,{color: colorTextoBoton}]}>5</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <TextInput
                    label="Comentarios adicionales"
                    onChangeText={(texto) => guardarMensaje(texto)}
                    style={[globalStyles.input,{borderColor:colorBordeInput}]}
                    theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                    multiline={true}
                />
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}>¿Quieres darle una medalla a {nombresicologo}?</Text>
                <View style={styles.fila}>
                    <TouchableHighlight style={medalla1=== false ? [styles.opciones,styles.botonno] : [styles.opciones,styles.boton,{backgroundColor: colorb}]} onPress={()=> eleccion(1)} >
                        <View>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Amable</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={medalla2===false? [styles.opciones,styles.botonno] : [styles.opciones,styles.boton,{backgroundColor: colorb}]} onPress={()=> eleccion(2)} >
                        <View>
                            <Text style={styles.textboton,{color: colorTextoBoton}}>Me entiende</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={medalla3===false? [styles.opciones,styles.botonno] : [styles.opciones,styles.boton,{backgroundColor: colorb}]} onPress={()=> eleccion(3)} >
                        <View>
                            <Text style={styles.textboton,{color: colorTextoBoton}}>Buena ayuda</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} onPress={() => enviar() }>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="pencil-outline" color={colorIcono} size={25}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                    </View>
                </TouchableHighlight>
                <Portal>
                    <Dialog style={{backgroundColor: colorFondo}} visible={alertaexito} onDismiss={() => {guardarAlertaexito(false);navigation.navigate('Iniciar Sesion')}}>
                        <Dialog.Title style={{color: colorLetra}}>Éxito</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={[globalStyles.textoAlerta,{color: colorLetra}]}>Las respuestas han sido guardadas correctamente</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>{guardarAlertaexito(false);navigation.reset({index: 1,routes: [{ name: 'Inicio' },{name: 'Sesion'}],});}} color={colorLetra}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
    );
}

const styles=StyleSheet.create({
    entradaTexto:{
        marginTop: 20,
        marginBottom: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#357870',
        borderWidth: 1,
        height: 90,
        marginHorizontal: 8
    },
    botonC:{
        marginTop: 5,
        height: 40,
        marginBottom: 5,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#e35d17',
        alignItems: 'center',
        borderRadius: 8,
    },
    textoS:{
        marginHorizontal: 0,
        marginLeft: 1,
        fontSize: 15,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    botonS:{
        height: 35,
        marginTop:20,
        marginBottom: 10,
        marginHorizontal: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoC:{
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Inter-Light'
    },
    textoNombre:{
        marginLeft:5
    },
    texto: {
        fontSize: 15,
        marginLeft:5,
        marginRight:10,
        marginVertical:7,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    texto2:{
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    opciones:{
        flex: 0.3
    },
    opcionespuntaje:{
        flex: 0.2,
        borderRadius: 50
    },

    fila:{
        flex: 1,
        flexDirection:'row',
        marginTop:0,
        justifyContent:'center',
        marginHorizontal:10
    },
    boton: {
        height: 30,
        marginHorizontal: 2,
        backgroundColor: '#e35d17',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonno: {
        height: 30,
        marginHorizontal: 2,
        backgroundColor: '#5e5e5e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textboton:{
        color: 'white'
    },
    
})

export default encuesta;
