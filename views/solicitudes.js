import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import {Paragraph,Dialog, Portal,Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ipHost} from '../components/hosts.js';
import EstilosContext from '../context/estilosContext';

const host = ipHost();

const solicitudes = () =>{

    const {colorb,colorLetra,colorTextoBoton,colorTitulo,colorIcono,colorFondo} = useContext(EstilosContext);

    const [solicitudes, guardarSolicitudes] = useState([]);
    const [cargando, guardarCargando] = useState(false);
    const [alertaborrar,guardarAlertaborrar] = useState(false);
    const [aborrar,guardarAborrar] = useState('');

    useEffect( () => {
        buscar();
    },[])

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const buscar = async() =>{
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            guardarSolicitudes(respuesta.data);
            console.log(respuesta.data);
            guardarCargando(false);
        } catch (error) {
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
                        const respuesta = await axios.get(host+'/solicitudes/manage/',
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarSolicitudes(respuesta.data);
                        guardarCargando(false);      
                    } catch (error) {
                        console.log(error.response);
                    }  
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
    }

    const fechaformateo=(fecha)=>{
        if(fecha==='-'){
            return '-';
        }
        var f=fecha.split('-');
        fecha = f[2]+"-"+f[1]+"-"+f[0];
        return fecha;
    }

    const eliminarCita = async (id) =>{
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.delete(host+'/solicitudes/manage/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),},data:{id:id}});
            console.log(respuesta);
            buscar();
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
                        var id = {id}
                        const respuesta = await axios.delete(host+'/solicitudes/manage/',id,
                        {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        buscar();
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
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            {cargando===true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ? <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Solicitudes pendientes</Text> : null}
            {solicitudes.length>0 ? null :  cargando===false ? <View style={{alignItems:'center'}}><Text style={{fontSize:17,color: colorLetra}}>No tienes solicitudes pendientes</Text></View>: null}
            <FlatList
                data={solicitudes}
                style={{marginBottom: 20}}
                renderItem={({item,index}) => (
                    <View style={styles.solicitud}>
                        <View style={{flex:1,flexDirection: 'column'}}>
                                <View style={{flex:1,flexDirection: 'row',marginTop:5}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>Psicólogo</Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>{item.psicologo_sol}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>Hora: </Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>{item.horario_inicio}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <View style={{flex:0.4}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>Fecha: </Text>
                                    </View>
                                    <View style={{flex:0.6}}>
                                        <Text style={[styles.textoC,{color: colorLetra}]}>{fechaformateo(item.fecha_reunion)}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableHighlight onPress={ () => {guardarAborrar(item.id);guardarAlertaborrar(true)} } style={[styles.botonC,{backgroundColor: colorb}]}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Icon name="delete-outline" color={colorIcono} size={20}></Icon>
                                <Text style={[styles.textoB,{color: colorTextoBoton}]}>Eliminar</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )
                }
                keyExtractor={solicitudes => solicitudes.id.toString()}
            />
            <Portal>
                <Dialog visible={alertaborrar} onDismiss={() => {eliminarCita(aborrar);guardarAlertaborrar(false);}}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>¿Está seguro que desea eliminar la solicitud?</Paragraph>
                    </Dialog.Content>
                        <Dialog.Actions>
                            <View style={{marginRight:30}}>
                                <Button onPress={()=> {eliminarCita(aborrar);guardarAlertaborrar(false);}} color='#3c2c18'>Si</Button>
                            </View>
                            <View style={{marginRight:10}}>
                            <Button onPress={() => guardarAlertaborrar(false)} color='#3c2c18'>No</Button>
                        </View>
                        </Dialog.Actions>
                </Dialog>
            </Portal>
        </View >
    );
}

const styles=StyleSheet.create({
    solicitud:{
        borderWidth:2,
        borderColor:"#828282",
        marginBottom: 10,
        borderRadius: 10
    },
    botonC:{
        marginTop: 10,
        height: 30,
        marginBottom: 5,
        marginHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: '#942c2c',
        borderRadius: 8
    },
    textoC:{
        marginTop:2,
        marginBottom: 0,
        marginHorizontal: 25,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoB:{
        marginTop:0,
        marginBottom: 0,
        marginHorizontal: 0,
        fontSize: 16,
        color: 'white',
        fontFamily:'Inter-Light'
    },
})




export default solicitudes;