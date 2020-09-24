import React, {useState,useEffect} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,ActivityIndicator} from 'react-native';
import { Button, Paragraph, Dialog, Portal, RadioButton,Checkbox} from 'react-native-paper';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const PreferenciasSicologo = ({navigation,route}) =>{

    const [terapia_grupal,guardarTerapia_grupal] = useState('');
    const [grupoapoyo,guardarGrupoapoyo] = useState('no');
    const [habcomunicacion,guardarHabcomunicacion] = useState('no');
    const [mismosproblemas,guardarMismosproblemas] = useState('no');
    const [otrosproblemas,guardarOtrosproblemas] = useState('no');
    const [individualincomodo,guardarIndividualincomodo] = useState('no');
    const [otro,guardarOtro] = useState('no');
    const [nodecir,guardarNodecir] = useState('no');
    const [genero_psicologo,guardarGenero_psicologo] = useState('');

    const [alertainteres,guardarAlertainteres] = useState(false);
    const [alertasigrupal,guardarAlertasigrupal] = useState(false);
    const [alertagenerosicologo,guardarAlertagenerosicologo] = useState(false);

    const [cargando,guardarCargando] = useState(false);


    useEffect(() => {
        consultar();
    },[]);
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const consultar = async () => {
        guardarCargando(true);
        try {
            console.log("df");
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.post(host+'/usuarios/paciente/perfil/',{},
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarTerapia_grupal(respuesta.data.terapia_grupal);
            console.log(respuesta);
            var motivos=respuesta.data.motivos_terapia;
            for(let i=0;i<motivos.length;i++){
                if (motivos[i]===1){
                    guardarGrupoapoyo('si');
                }
                else if(motivos[i]===2){
                    guardarHabcomunicacion('si');
                }
                else if(motivos[i]===3){
                    guardarMismosproblemas('si');
                }
                else if(motivos[i]===4){
                    guardarOtrosproblemas('si');
                }
                else if(motivos[i]===5){
                    guardarIndividualincomodo('si');
                }
                else if(motivos[i]===6){
                    guardarOtro('si');
                }
                else if(motivos[i]===7){
                    guardarNodecir('si');
                }
            }
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
                        guardarTerapia_grupal(respuesta.data.terapia_grupal);
                        var motivos=respuesta.data.motivos_terapia;
                        for(let i=0;i<motivos.length;i++){
                            if (motivos[i]===1){
                                guardarGrupoapoyo('si');
                            }
                            else if(motivos[i]===2){
                                guardarHabcomunicacion('si');
                            }
                            else if(motivos[i]===3){
                                guardarMismosproblemas('si');
                            }
                            else if(motivos[i]===4){
                                guardarOtrosproblemas('si');
                            }
                            else if(motivos[i]===5){
                                guardarIndividualincomodo('si');
                            }
                            else if(motivos[i]===6){
                                guardarOtro('si');
                            }
                            else if(motivos[i]===7){
                                guardarNodecir('si');
                            }
                        }
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
    }
    



    const enviarPreferencias = async () => {
        //validar
        if(terapia_grupal===''){
            guardarAlertasigrupal(true);
            if(genero_psicologo===''){
                guardarAlertagenerosicologo(true);
                return;
            }
            return;
        }
        console.log("aaaaaaa");
        if(terapia_grupal==='Si'){
            if(grupoapoyo==='no' && habcomunicacion==='no' &&  mismosproblemas==='no' && otrosproblemas==='no' &&  individualincomodo==='no' &&  otro==='no' &&  nodecir==='no'){
                guardarAlertainteres(true);
                if(genero_psicologo===''){
                    guardarAlertagenerosicologo(true);
                    return;
                }
            return;
            }
        }
        console.log("genero_psicologo");
        if(genero_psicologo===''){
            guardarAlertagenerosicologo(true);
            return;
        }

        var motivos_terapia=[];
        if (grupoapoyo==='si'){
            motivos_terapia=[...motivos_terapia,1];
        }
        if (habcomunicacion==='si'){
            motivos_terapia=[...motivos_terapia,2];
        }
        if(mismosproblemas==='si'){
            motivos_terapia=[...motivos_terapia,3];
        }
        if(otrosproblemas==='si'){
            motivos_terapia=[...motivos_terapia,4];
        }
        if(individualincomodo==='si'){
            motivos_terapia=[...motivos_terapia,5];
        }
        if(otro==='si'){
            motivos_terapia=[...motivos_terapia,6];
        }
        if(nodecir==='si'){
            motivos_terapia=[7];
        }
        const usuario={terapia_grupal,genero_psicologo,motivos_terapia};
        
        //Enviar
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.put(host+'/usuarios/paciente/preferencias/',usuario,
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
                        const respuesta = await axios.put(host+'/usuarios/paciente/preferencias/',usuario,
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
        //Volver
        navigation.goBack();
    }
    return (
        <ScrollView style= {globalStyles.contenedor}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}>Responde las siguientes
preguntas para brindarte opciones que se acomoden a lo que buscas:
            </Text>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}> ¿Te interesa participar en terapia grupal?</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text>Si</Text>
                    <RadioButton
                        value="first"
                        status={ terapia_grupal    === 'Si' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTerapia_grupal('Si')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text>No</Text>
                    <RadioButton
                        value="second"
                        status={ terapia_grupal === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTerapia_grupal('No')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text>Me da igual</Text>
                    <RadioButton
                        value="second"
                        status={ terapia_grupal === 'Me da igual' ? 'checked' : 'unchecked' }
                        onPress={() => guardarTerapia_grupal('Me da igual')}
                        color='black'
                    />
                </View>
            </View>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}>Selecciona los motivos por los que te interesa participar en terapia grupal:
(Si respondiste “No” o “Me da igual” a la pregunta anterior, puedes dejar esto en blanco):</Text>

            <View style={styles.pregunta}>
                <Checkbox   
                    status={grupoapoyo === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (grupoapoyo==='si'){
                            guardarGrupoapoyo('no');
                        }
                        else if (grupoapoyo==='no'){
                            guardarGrupoapoyo('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>Grupo de Apoyo </Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={habcomunicacion === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (habcomunicacion==='si'){
                            guardarHabcomunicacion('no');
                        }
                        else if (habcomunicacion==='no'){
                            guardarHabcomunicacion('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>Mejorar habilidades comunicacionales </Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={mismosproblemas === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (mismosproblemas==='si'){
                            guardarMismosproblemas('no');
                        }
                        else if (mismosproblemas==='no'){
                            guardarMismosproblemas('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>Conocer gente con mis mismos problemas</Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={otrosproblemas === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (otrosproblemas==='si'){
                            guardarOtrosproblemas('no');
                        }
                        else if (otrosproblemas==='no'){
                            guardarOtrosproblemas('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>Conocer gente con otros problemas</Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={individualincomodo === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (individualincomodo==='si'){
                            guardarIndividualincomodo('no');
                        }
                        else if (individualincomodo==='no'){
                            guardarIndividualincomodo('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>La terapia individual es incómoda para mí y/o no la encuentro útil</Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={otro === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (otro==='si'){
                            guardarOtro('no');
                        }
                        else if (otro==='no'){
                            guardarOtro('si');
                            guardarNodecir('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.textopregunta}>Otro </Text>
            </View>
            <View style={styles.pregunta}>
                <Checkbox
                    status={nodecir === 'si' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (nodecir==='si'){
                            guardarNodecir('no');
                        }
                        else if (nodecir==='no'){
                            guardarNodecir('si');
                            guardarGrupoapoyo('no');
                            guardarHabcomunicacion('no');
                            guardarMismosproblemas('no');
                            guardarOtrosproblemas('no');
                            guardarIndividualincomodo('no');
                            guardarOtro('no');
                        }
                    }}
                    color='black'
                />
                <Text style={styles.texto}>Prefiero no decir</Text>
            </View>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}>Me gustaría que me atienda un/una profesional: </Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text style={styles.texto,styles.texto2}>Masculino</Text>
                    <RadioButton
                        value="first"
                        status={ genero_psicologo === 'Masculino' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero_psicologo('Masculino')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.texto,styles.texto2}>Femenino</Text>
                    <RadioButton
                        value="second"
                        status={ genero_psicologo === 'Femenino' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero_psicologo('Femenino')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.texto,styles.texto2}>No binario</Text>
                    <RadioButton
                        value="third"
                        status={ genero_psicologo === 'No binario' ? 'checked' : 'unchecked' }
                        onPress={() => guardarGenero_psicologo('No binario')}
                        color='black'
                    />
                </View>
            </View>
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>enviarPreferencias()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
            </View> : null}
            <Portal>
                <Dialog visible={alertasigrupal} onDismiss={() => guardarAlertasigrupal(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Debe indicar su interes sobre las terapias grupales</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertasigrupal(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertainteres} onDismiss={() => guardarAlertainteres(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Debe seleccionar al menos un motivo</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertainteres(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertagenerosicologo} onDismiss={() => guardarAlertagenerosicologo(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Debe seleccionar preferencia de psicólogo</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertagenerosicologo(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    texto2:{
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    texto:{
        fontSize: 16,
        marginLeft:5,
        marginRight:10,
        marginVertical:7,
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    textopregunta: {
        fontSize: 16,
        marginLeft:5,
        marginRight:10,
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop: 5,
        marginHorizontal:10,
        alignItems:'center',
        marginRight:25
    },
    opciones:{
        flex: 0.5,
        alignItems: 'center'
    },
    casilla:{
        marginLeft:10
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: 16,
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


export default PreferenciasSicologo;