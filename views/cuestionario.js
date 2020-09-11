import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PreguntaTest from '../components/preguntatest';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const Cuestionario = ({navigation,route}) =>{

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


    const enviarCuestionario = async () => {

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
                        const respuesta = await axios.post(host+'/usuarios/evaluacion/evaluar/',usuario,
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

        //redireccionar
        navigation.goBack();
    }
    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}>El siguiente cuestionario aborda temas que pueden haberle 
            afectado en las últimas dos semanas. Debe responder según la escala asignada.
            </Text>
            <Text style={styles.escala}>
            0 - Nada
            </Text>
            <Text style={styles.escala}>
            1 - Un Poco
            </Text>
            <Text style={styles.escala}>
            2 - Moderadamente
            </Text>
            <Text style={styles.escala}>
            3 - Bastante
            </Text>
            <Text style={styles.escala}>
            4 - Extremadamente
            </Text>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}>Durante las última dos semanas ¿Cuánto te afectó….?</Text>
            <PreguntaTest pregunta={pregunta1} setpregunta={guardarPregunta1} texto={'Tener que esforzarme para recordar las cosas:'} />
            <PreguntaTest pregunta={pregunta2} setpregunta={guardarPregunta2} texto={'Pensar en quitarme la vida:'} />
            <PreguntaTest pregunta={pregunta3} setpregunta={guardarPregunta3} texto={'Sentirme ansioso o nervioso:'} />
            <PreguntaTest pregunta={pregunta4} setpregunta={guardarPregunta4} texto={'Sentirme sin esperanza:'} />
            <PreguntaTest pregunta={pregunta5} setpregunta={guardarPregunta5} texto={'Tener que evitar cosas porque me asustan:'} />
            <PreguntaTest pregunta={pregunta6} setpregunta={guardarPregunta6} texto={'No ser capaz de ponerme en marcha (acción):'} />
            <PreguntaTest pregunta={pregunta7} setpregunta={guardarPregunta7} texto={'Encontrar difícil concentrarme:'} />
            <PreguntaTest pregunta={pregunta8} setpregunta={guardarPregunta8} texto={'Querer hacerme daño:'} />
            <PreguntaTest pregunta={pregunta9} setpregunta={guardarPregunta9} texto={'Sentir miedo intenso:'} />
            <PreguntaTest pregunta={pregunta10} setpregunta={guardarPregunta10} texto={'Sentirme inútil:'} />
            <PreguntaTest pregunta={pregunta11} setpregunta={guardarPregunta11} texto={'Sentirme temeroso de salir de casa:'} />
            <PreguntaTest pregunta={pregunta12} setpregunta={guardarPregunta12} texto={'Sentirme cansado la mayor parte del tiempo:'} />
            <PreguntaTest pregunta={pregunta13} setpregunta={guardarPregunta13} texto={'Sentirme confundido (al pensar, recordar, etc):'} />
            <PreguntaTest pregunta={pregunta14} setpregunta={guardarPregunta14} texto={'Tener impulsos de cortarme o mutilarme:'} />
            <PreguntaTest pregunta={pregunta15} setpregunta={guardarPregunta15} texto={'Sentirme tenso:'} />
            <PreguntaTest pregunta={pregunta16} setpregunta={guardarPregunta16} texto={'Sentir que la vida no tiene sentido:'} />
            <PreguntaTest pregunta={pregunta17} setpregunta={guardarPregunta17} texto={'Sentirme ansioso dentro de una multitud:'} />
            <PreguntaTest pregunta={pregunta18} setpregunta={guardarPregunta18} texto={'No tener energía:'} />
            <PreguntaTest pregunta={pregunta19} setpregunta={guardarPregunta19} texto={'Tener dificultad para tomar decisiones:'} />

            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>enviarCuestionario()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
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
    );
}

const styles=StyleSheet.create({

    texto: {
        marginTop:25,
        fontSize: 17,
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular',
        textAlign:'justify'
    },
    escala: {
        marginTop:7,
        fontSize: 17,
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular'
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Inter-Light'
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


export default Cuestionario;