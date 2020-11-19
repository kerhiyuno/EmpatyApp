import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight} from 'react-native';
import {Paragraph,Dialog, Portal,Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const host = ipHost();

const horariosicologo = ({navigation,route}) => {

    const {colorb,colorLetra,colorTextoBoton,colorTitulo,colorIcono,
    colorFondo} = useContext(EstilosContext);

    const [elegido,guardarElegido] = useState({});
    const [hora,guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dia,guardarDia] = useState('');
    const [mes,guardarMes] = useState('');
    const [año,guardarAño] = useState('');
    const [fecha,guardarFecha] = useState('-');
    const [fechapalabras,guardarFechapalabras] = useState('-');

    const [alertaeleccion,guardarAlertaeleccion] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);
    const [horarios,guardarHorario] = useState([]);

    useEffect( () => {
        var date= new Date();
        handleConfirm(date);
    },[]
    )

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        console.log(fecha);
        hideDatePicker();
        console.log(date);
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        if(mes < 10){
            mes='0' + mes
        }
        if(dia < 10){
            dia = '0' + dia
        }
        guardarDia(dia);
        guardarMes(mes);
        var año = date.getFullYear();
        guardarAño(año);
        console.log('-------');
        console.log(dia)
        console.log("---------");
        var completo = año+'-'+mes+'-'+dia;
        console.log(completo);
        guardarFecha(completo);
        var psicologo = route.params.email;
        var fecha=completo;
        var solicitud = {fecha,psicologo};
        console.log(solicitud);
        var name = await AsyncStorage.getItem('datosSesion');
        try {
            var respuesta = await axios.post(host+'/horarios/horarioaldia/',solicitud,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
            console.log(respuesta.data.length)
            guardarHorario(respuesta.data);
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.code === 'token_not_valid'){
                console.log('yes');
                try {
                    const refresh0 = await AsyncStorage.getItem('datosSesion')
                    var refresh = JSON.parse(refresh0).refresh;
                    refresh = {refresh}
                    var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                    refresh = JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name = await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/horarios/horarioaldia/',solicitud,
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        if(respuesta.data.length>0){
                            guardarHorario(respuesta.data);
                        }
                    } catch (error) {
                        console.log(error.response);
                        console.log("error acaa");
                        //navigation.navigate('Home');
                    }  
                } catch (error) {
                    console.log("error aqui");
                    console.log(error.response);
                }
            }
        }
        
    };


  const horario = async ()=>{
    try {
        console.log("df");
        const nombre = await AsyncStorage.getItem('datosSesion');
        const respuesta = await axios.get(host+'/usuarios/afinidad/',
        {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
        guardarSicologos(respuesta.data);
        console.log(respuesta.data[0]);

    } catch (error) {
        console.log("error");
        console.log(error);
        console.log(error.response);
        if(error.response.data.code==='token_not_valid'){
            console.log('yes');
            try {
                const refresh0 = await AsyncStorage.getItem('datosSesion')
                var refresh = JSON.parse(refresh0).refresh;
                refresh = {refresh}
                var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                refresh = JSON.parse(refresh0).refresh;
                await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                try {
                    var name = await AsyncStorage.getItem('datosSesion');
                    const respuesta = await axios.get(host+'/usuarios/afinidad/',
                    {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(hola);          
                } catch (error) {
                    console.log(error.response);
                    console.log("error acaa");
                    //navigation.navigate('Home');
                }  
            } catch (error) {
                console.log("error aqui");
                console.log(error.response);
            }
        }
    }
}
    const traductordia = (dia) => {
        var dias = '';
        if(dia == 1){
            dias = 'Lunes'
        }
        else if(dia == 2){
            dias = 'Martes'
        }
        else if(dia == 3){
            dias = 'Miércoles'
        }
        else if(dia == 4){
            dias = 'Jueves'
        }
        else if(dia == 5){
            dias = 'Viernes'
        }
        else if(dia == 6){
            dias = 'Sábado'
        }
        else if(dia == 7){
            dias = 'Domingo'
        }
        return dias;
    }

    const traductorhora = (bloque) => {
        var bloques = '';
        if(bloque == 1){
            bloques =' 8:00'
        }
        else if(bloque == 2){
            bloques = '9:00'
        }
        else if(bloque == 3){
            bloques = '10:00'
        }
        else if(bloque == 4){
            bloques = '11:00'
        }
        else if(bloque == 5){
            bloques = '12:00'
        }
        else if(bloque == 6){
            bloques = '13:00'
        }
        else if(bloque == 7){
            bloques = '14:00'
        }
        else if(bloque == 8){
            bloques = '15:00'
        }
        else if(bloque == 9){
            bloques = '16:00'
        }
        else if(bloque == 10){
            bloques = '17:00'
        }
        else if(bloque == 11){
            bloques = '18:00'
        }
        else if(bloque == 12){
            bloques = '19:00'
        }
        else if(bloque == 13){
            bloques = '20:00'
        }
        return bloques;
    }

    const finalizar = async () =>{
        guardarAlertaeleccion(false);
        //Enviar eleccion y ir a Home
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.post(host+'/solicitudes/manage/',elegido,
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta.data);
            guardarAlertaexito(true);
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
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.post(host+'/solicitudes/manage/',elegido,
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
        console.log(elegido);
    }

    const fechaformateo=(fecha)=>{
        var f=fecha.split('-');
        fecha = f[2]+"-"+f[1]+"-"+f[0];
        return fecha;
    }

    const elegirhorario = (id) =>{
        var motivo="Primera Sesion";
        var email=route.params.email;
        var mensaje=""
        const objeto = {"psicologo":email,"bloque":id,"motivo":motivo,"mensaje": mensaje,"fecha":fecha};
        var dias=traductordia(dia);
        var bloques=traductorhora(id);
        guardarAlertaeleccion(true);
        guardarHora(bloques);
        guardarElegido(objeto);
        fechaalerta();
    }

    const fechaalerta = () => {
        var separado = fecha.split('-');
        console.log(separado);
        if(separado[1] == '01'){
            guardarFechapalabras('Enero');
        }
        else if(separado[1] == '02'){
            guardarFechapalabras('Febrero');
        }
        else if(separado[1] == '03'){
            guardarFechapalabras('Marzo');
        }
        else if(separado[1] == '04'){
            guardarFechapalabras('Abril');
        }
        else if(separado[1] == '05'){
            guardarFechapalabras('Mayo');
        }
        else if(separado[1] == '06'){
            guardarFechapalabras('Junio');
        }
        else if(separado[1] == '07'){
            guardarFechapalabras('Julio');
        }
        else if(separado[1] == '08'){
            guardarFechapalabras('Agosto');
        }
        else if(separado[1] == '09'){
            guardarFechapalabras('Septiembre');
        }
        else if(separado[1] == '10'){
            guardarFechapalabras('Octubre');
        }
        else if(separado[1] == '11'){
            guardarFechapalabras('Noviembre');
        }
        else if(separado[1] == '12'){
            guardarFechapalabras('Diciembre');
        }
    }

    return (
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Elige un horario para tu primera sesión</Text>            
            <TouchableHighlight  underlayColor = {'transparent'} style={[styles.botonC,{backgroundColor: colorb}]} onPress={showDatePicker} >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="calendar" color={colorIcono} size={RFPercentage(3)}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Seleccionar fecha</Text>
                </View>
            </TouchableHighlight>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date(año+"-"+mes+"-"+dia)}
            />
            <View style={{alignItems:'center',marginTop:10,marginBottom:40}}> 
                <Text style={{marginLeft:10,fontSize:RFPercentage(2.3),fontFamily:'Inter-Regular',color: colorLetra}}>Fecha seleccionada: {fechaformateo(fecha)}</Text>
            </View>
            <View style={{alignItems:'center',marginBottom:RFPercentage(1)}}>
                <Text style={{marginLeft:10,fontSize:RFPercentage(3),fontFamily:'Inter-Bold',color: colorLetra}}>Seleccione una hora:</Text>
            </View>
            {horarios.length>0 ? <Text></Text> : <View style={{alignItems:'center',alignContent:'center',marginHorizontal:30,marginTop:5}}><Text style={{fontSize:RFPercentage(2.3),fontFamily:'Inter-Regular',color: colorLetra}}>No hay horarios disponibles el día seleccionado</Text></View>}
            <FlatList
                data={horarios}
                style={{marginBottom: 10}}
                renderItem={({item,index}) => (
                    <TouchableHighlight underlayColor = {'transparent'} onPress={() => elegirhorario(horarios[index]["id"])} style={[styles.botonC,{backgroundColor: colorb}]} >
                        <View>
                        <Text style={[styles.textoC,{color: colorTextoBoton}]}> {traductorhora(item["id"])}</Text>
                        </View>
                    </TouchableHighlight>
                )
                }
                keyExtractor={(item, index) => index.toString()}
            />
            <Portal>
                <Dialog visible={alertaeleccion} onDismiss={() => guardarAlertaeleccion(false)}>
                    <Dialog.Title>Elegir horario</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph style={[globalStyles.textoAlerta,{fontSize:16}]}>¿Está seguro de elegir este horario?  {dia} de {fechapalabras} a las {hora}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:30}}>
                            <Button onPress={() => finalizar()} color='#3c2c18'>Si</Button>
                        </View>
                        <View style={{marginRight:10}}>
                            <Button onPress={() => guardarAlertaeleccion(false)} color='#3c2c18'>No</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertaexito} onDismiss={() => {guardarAlertaexito(false);navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});}}>
                    <Dialog.Title>Elegir horario</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph style={[globalStyles.textoAlerta,{fontSize:16}]}>La solicitud ha sido enviada correctamente</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{marginRight:10}}>
                            <Button onPress={() => {guardarAlertaexito(false);navigation.reset({index: 0,routes: [{ name: 'Inicio' }],});}} color='#3c2c18'>Ok</Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View >
    );
}

const styles=StyleSheet.create({
    botonC:{
        marginTop: 5,
        height: RFPercentage(5),
        marginBottom: 5,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#e35d17',
        alignItems: 'center',
        borderRadius: 8
    },
    textoC:{
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: RFPercentage(2.5),
        color: 'white',
        fontFamily: 'Inter-Light'
    }
});

export default horariosicologo;
