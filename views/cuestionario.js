import React, {useState,useContext} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PreguntaTest from '../components/preguntatest';
import {ipHost} from '../components/hosts.js';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const Cuestionario = ({navigation}) =>{

    const {colorb,colorLetra,colorTextoBoton,colorIcono,colorFondo} = useContext(EstilosContext);

    const [pregunta1,guardarPregunta1] = useState('');
    const [pregunta2,guardarPregunta2] = useState('');
    const [pregunta3,guardarPregunta3] = useState('');
    const [pregunta4,guardarPregunta4] = useState('');
    const [pregunta5,guardarPregunta5] = useState('');
    const [pregunta6,guardarPregunta6] = useState('');
    const [pregunta7,guardarPregunta7] = useState('');
    const [pregunta8,guardarPregunta8] = useState('');
    const [pregunta9,guardarPregunta9] = useState('');
    const [pregunta10,guardarPregunta10] = useState('');
    const [pregunta11,guardarPregunta11] = useState('');
    const [pregunta12,guardarPregunta12] = useState('');
    const [pregunta13,guardarPregunta13] = useState('');
    const [pregunta14,guardarPregunta14] = useState('');
    const [pregunta15,guardarPregunta15] = useState('');
    const [pregunta16,guardarPregunta16] = useState('');
    const [pregunta17,guardarPregunta17] = useState('');
    const [pregunta18,guardarPregunta18] = useState('');
    const [pregunta19,guardarPregunta19] = useState('');

    const [alerta,guardarAlerta] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);
    const [guardadoenprogreso,guardarGuardadoenprogreso] = useState(false);

    const [parte,guardarParte] = useState(1);

    const enviarCuestionario = async () => {
        if (guardadoenprogreso===false){

            //validar
            //validar
            if(pregunta1==='' || pregunta2==='' || pregunta3==='' || pregunta4==='' || pregunta5==='' || pregunta6==='' || 
            pregunta7==='' || pregunta8==='' || pregunta9==='' || pregunta10==='' || pregunta11==='' || pregunta12==='' || 
            pregunta13==='' || pregunta14==='' || pregunta15==='' || pregunta16==='' || pregunta17==='' || pregunta18==='' ||
            pregunta19===''){
                guardarAlerta(true);
                return
            }

            //puntajes
            var fcp = parseInt (pregunta1) + parseInt(pregunta7) + parseInt(pregunta13) + parseInt(pregunta19);
            var shd = parseInt(pregunta2) + parseInt(pregunta8) + parseInt(pregunta14);
            var ga = parseInt(pregunta3) + parseInt(pregunta9) + parseInt(pregunta15);
            var gd = parseInt(pregunta4) + parseInt(pregunta10) + parseInt(pregunta16);
            var fa = parseInt(pregunta5) + parseInt(pregunta11) + parseInt(pregunta17);
            var ap = parseInt(pregunta6) + parseInt(pregunta12) + parseInt(pregunta18);

            //generar
            const usuario={fcp,shd,ga,gd,fa,ap};
            //Enviar Resultado
            try {
                const nombre = await AsyncStorage.getItem('datosSesion');
                console.log(nombre);
                const respuesta = await axios.post(host+'/evaluacion/evaluar/',usuario,
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                if (respuesta.status===201){
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
                            var name= await AsyncStorage.getItem('datosSesion');
                            const respuesta = await axios.post(host+'/evaluacion/evaluar/',usuario,
                            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                            console.log(respuesta);
                            if (respuesta.status===201){
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
        }else{
            console.log("en progreso");
        }
    }
    const validacionVacio = (parte) =>{
        if (parte===2){
            if(pregunta1 === '' ||pregunta2 === '' ||pregunta3 === '' ||pregunta4 === '' ||pregunta5 === ''){
                guardarAlerta(true);
                return
            }
        }
        else if(parte===3){
            if(pregunta6 === '' ||pregunta7 === '' ||pregunta8 === '' ||pregunta9 === '' ||pregunta10 === ''){
                guardarAlerta(true);
                return
            }
        }
        else if(parte===4){
            if(pregunta11 === '' ||pregunta12 === '' ||pregunta13 === '' ||pregunta14 === '' ||pregunta15 === ''){
                guardarAlerta(true);
                return
            }
        }
        else if(parte===5){
            if(pregunta16 === '' ||pregunta17 === '' ||pregunta18 === '' ||pregunta19 === ''){
                guardarAlerta(true);
                return
            }
        }
        guardarParte(parte+1);
    }
    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            {parte===1 ?
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:0.5}}>
                    <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>El siguiente cuestionario aborda temas que pueden haberle 
                    afectado en las últimas dos semanas. Debe responder según la escala asignada.
                    </Text>
                    <Text style={[styles.escala,{color: colorLetra}]}>
                    0 - Nada
                    </Text>
                    <Text style={[styles.escala,{color: colorLetra}]}>
                    1 - Un Poco
                    </Text>
                    <Text style={[styles.escala,{color: colorLetra}]}>
                    2 - Moderadamente
                    </Text>
                    <Text style={[styles.escala,{color: colorLetra}]}>
                    3 - Bastante
                    </Text>
                    <Text style={[styles.escala,{color: colorLetra}]}>
                    4 - Extremadamente
                    </Text>
                </View>
                <View style={{flex:0.5}}>
                    <View style={[styles.container,{marginTop:40}]}>
                        <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarParte(2)}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="greater-than" color={colorIcono} size={RFPercentage(3)}></Icon>
                                <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                            </View>
                        </TouchableHighlight >
                    </View>
                </View>
            </View>
            : null}
            {parte===2 ?
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:0.1}}>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Parte 1 de 4</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Durante las última dos semanas ¿Cuánto te afectó….?</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>0 - Nada    4 - Extremadamente</Text>
                </View>
                    <View style={{flex:0.1}}>
                        <PreguntaTest pregunta={pregunta1} setpregunta={guardarPregunta1} texto={'Tener que esforzarme para recordar las cosas:'} />
                    </View>
                    <View style={{flex:0.1}}>
                        <PreguntaTest pregunta={pregunta2} setpregunta={guardarPregunta2} texto={'Pensar en quitarme la vida:'} />
                    </View>
                    <View style={{flex:0.1}}>
                        <PreguntaTest pregunta={pregunta3} setpregunta={guardarPregunta3} texto={'Sentirme ansioso o nervioso:'} />
                    </View>
                    <View style={{flex:0.1}}>    
                        <PreguntaTest pregunta={pregunta4} setpregunta={guardarPregunta4} texto={'Sentirme sin esperanza:'} />
                    </View>
                    <View style={{flex:0.1}}>    
                        <PreguntaTest pregunta={pregunta5} setpregunta={guardarPregunta5} texto={'Tener que evitar cosas porque me asustan:'} />
                    </View>
                <View style={{flex:0.1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                            <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarParte(1)}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Volver</Text>
                                </View>
                            </TouchableHighlight >
                        </View>
                        <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                            <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>{validacionVacio(2)}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                                </View>
                            </TouchableHighlight >
                        </View>
                    </View>
                </View>
            </View>
            :null}
            {parte===3 ?
            <View style={{flex:1,flexDirection:'column'}}>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Parte 2 de 4</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Durante las última dos semanas ¿Cuánto te afectó….?</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>0 - Nada    4 - Extremadamente</Text>
                <PreguntaTest pregunta={pregunta6} setpregunta={guardarPregunta6} texto={'No ser capaz de ponerme en marcha (acción):'} />
                <PreguntaTest pregunta={pregunta7} setpregunta={guardarPregunta7} texto={'Encontrar difícil concentrarme:'} />
                <PreguntaTest pregunta={pregunta8} setpregunta={guardarPregunta8} texto={'Querer hacerme daño:'} />
                <PreguntaTest pregunta={pregunta9} setpregunta={guardarPregunta9} texto={'Sentir miedo intenso:'} />
                <PreguntaTest pregunta={pregunta10} setpregunta={guardarPregunta10} texto={'Sentirme inútil:'} />
                <View style={{flexDirection:'row'}}>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarParte(2)}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Volver</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>{validacionVacio(3)}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                        </View>
                    </TouchableHighlight >
                </View>
            </View>
            </View>
            : null}
            {parte===4?
            <View style={{flex:1,flexDirection:'column'}}>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Parte 3 de 4</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Durante las última dos semanas ¿Cuánto te afectó….?</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>0 - Nada    4 - Extremadamente</Text>
                <PreguntaTest pregunta={pregunta11} setpregunta={guardarPregunta11} texto={'Sentirme temeroso de salir de casa:'} />
                <PreguntaTest pregunta={pregunta12} setpregunta={guardarPregunta12} texto={'Sentirme cansado la mayor parte del tiempo:'} />
                <PreguntaTest pregunta={pregunta13} setpregunta={guardarPregunta13} texto={'Sentirme confundido (al pensar, recordar, etc):'} />
                <PreguntaTest pregunta={pregunta14} setpregunta={guardarPregunta14} texto={'Tener impulsos de cortarme o mutilarme:'} />
                <PreguntaTest pregunta={pregunta15} setpregunta={guardarPregunta15} texto={'Sentirme tenso:'} />
                <View style={{flexDirection:'row'}}>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarParte(3)}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Volver</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>{validacionVacio(4)}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                        </View>
                    </TouchableHighlight >
                </View>
            </View>
            </View> : null}
            {parte===5 ?
            <View style={{flex:1,flexDirection:'column'}}>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Parte 4 de 4</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>Durante las última dos semanas ¿Cuánto te afectó….?</Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold", color: colorLetra}]}>0 - Nada    4 - Extremadamente</Text>
                <PreguntaTest pregunta={pregunta16} setpregunta={guardarPregunta16} texto={'Sentir que la vida no tiene sentido:'} />
                <PreguntaTest pregunta={pregunta17} setpregunta={guardarPregunta17} texto={'Sentirme ansioso dentro de una multitud:'} />
                <PreguntaTest pregunta={pregunta18} setpregunta={guardarPregunta18} texto={'No tener energía:'} />
                <PreguntaTest pregunta={pregunta19} setpregunta={guardarPregunta19} texto={'Tener dificultad para tomar decisiones:'} />

                <View style={{flexDirection:'row'}}>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>guardarParte(4)}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Volver</Text>
                        </View>
                    </TouchableHighlight >
                </View>
                <View style={[styles.container,{marginTop:5, flex:0.5}]}>
                <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>enviarCuestionario()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name="greater-than" color={colorIcono} size={RFPercentage(3)}></Icon>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            </View>
            </View> : null}
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
            <Portal>
                <Dialog visible={alertaexito} onDismiss={() => {guardarGuardadoenprogreso(false);guardarAlertaexito(false);navigation.goBack();}}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El formulario ha sido enviado correctamente</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:10}}>
                                <Button onPress={()=> {guardarGuardadoenprogreso(false);guardarAlertaexito(false);navigation.goBack();}} color='#3c2c18'>Ok</Button>
                            </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:4,
        marginBottom:4,
        fontSize: RFPercentage(2),
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular',
        textAlign:'justify'
    },
    escala: {
        marginTop:7,
        fontSize: RFPercentage(2),
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular'
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: RFPercentage(2.5),
        color: 'white',
        textAlign: 'center',
        fontFamily:'Inter-Light'
    },
    botonS:{
        height:  RFPercentage(6),
        marginBottom: 0,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8,
    }
})


export default Cuestionario;