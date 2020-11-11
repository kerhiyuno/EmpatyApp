import React, {useState,useEffect,useContext} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,ActivityIndicator} from 'react-native';
import {Button,Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HorarioDia from '../components/horariodia'
import AsyncStorage from '@react-native-community/async-storage';
import EstilosContext from '../context/estilosContext';
import {ipHost} from '../components/hosts.js';

const host = ipHost();

const HorarioPaciente = ({navigation}) =>{

    const {colorb,colorLetra,colorTextoBoton,colorBotonDesactivado,colorTitulo,
        colorIcono,colorFondo} = useContext(EstilosContext);

    const [disponibles,guardarDisponibles] = useState([]);
    const [guardadoenprogreso,guardarGuardadoenprogreso] = useState(false);
    const [alertaexito,guardarAlertaexito] = useState(false);

    const [l1,guardarl1] = useState('no');
    const [l2,guardarl2] = useState('no');
    const [l3,guardarl3] = useState('no');
    const [l4,guardarl4] = useState('no');
    const [l5,guardarl5] = useState('no');
    const [l6,guardarl6] = useState('no');
    const [l7,guardarl7] = useState('no');
    const [l8,guardarl8] = useState('no');
    const [l9,guardarl9] = useState('no');
    const [l10,guardarl10] = useState('no');
    const [l11,guardarl11] = useState('no');
    const [l12,guardarl12] = useState('no');
    const [l13,guardarl13] = useState('no');

    const [ma1,guardarma1] = useState('no');
    const [ma2,guardarma2] = useState('no');
    const [ma3,guardarma3] = useState('no');
    const [ma4,guardarma4] = useState('no');
    const [ma5,guardarma5] = useState('no');
    const [ma6,guardarma6] = useState('no');
    const [ma7,guardarma7] = useState('no');
    const [ma8,guardarma8] = useState('no');
    const [ma9,guardarma9] = useState('no');
    const [ma10,guardarma10] = useState('no');
    const [ma11,guardarma11] = useState('no');
    const [ma12,guardarma12] = useState('no');
    const [ma13,guardarma13] = useState('no');

    const [mi1,guardarmi1] = useState('no');
    const [mi2,guardarmi2] = useState('no');
    const [mi3,guardarmi3] = useState('no');
    const [mi4,guardarmi4] = useState('no');
    const [mi5,guardarmi5] = useState('no');
    const [mi6,guardarmi6] = useState('no');
    const [mi7,guardarmi7] = useState('no');
    const [mi8,guardarmi8] = useState('no');
    const [mi9,guardarmi9] = useState('no');
    const [mi10,guardarmi10] = useState('no');
    const [mi11,guardarmi11] = useState('no');
    const [mi12,guardarmi12] = useState('no');
    const [mi13,guardarmi13] = useState('no');

    const [j1,guardarj1] = useState('no');
    const [j2,guardarj2] = useState('no');
    const [j3,guardarj3] = useState('no');
    const [j4,guardarj4] = useState('no');
    const [j5,guardarj5] = useState('no');
    const [j6,guardarj6] = useState('no');
    const [j7,guardarj7] = useState('no');
    const [j8,guardarj8] = useState('no');
    const [j9,guardarj9] = useState('no');
    const [j10,guardarj10] = useState('no');
    const [j11,guardarj11] = useState('no');
    const [j12,guardarj12] = useState('no');
    const [j13,guardarj13] = useState('no');

    const [v1,guardarv1] = useState('no');
    const [v2,guardarv2] = useState('no');
    const [v3,guardarv3] = useState('no');
    const [v4,guardarv4] = useState('no');
    const [v5,guardarv5] = useState('no');
    const [v6,guardarv6] = useState('no');
    const [v7,guardarv7] = useState('no');
    const [v8,guardarv8] = useState('no');
    const [v9,guardarv9] = useState('no');
    const [v10,guardarv10] = useState('no');
    const [v11,guardarv11] = useState('no');
    const [v12,guardarv12] = useState('no');
    const [v13,guardarv13] = useState('no');

    const [s1,guardars1] = useState('no');
    const [s2,guardars2] = useState('no');
    const [s3,guardars3] = useState('no');
    const [s4,guardars4] = useState('no');
    const [s5,guardars5] = useState('no');
    const [s6,guardars6] = useState('no');
    const [s7,guardars7] = useState('no');
    const [s8,guardars8] = useState('no');
    const [s9,guardars9] = useState('no');
    const [s10,guardars10] = useState('no');
    const [s11,guardars11] = useState('no');
    const [s12,guardars12] = useState('no');
    const [s13,guardars13] = useState('no');

    const [d1,guardard1] = useState('no');
    const [d2,guardard2] = useState('no');
    const [d3,guardard3] = useState('no');
    const [d4,guardard4] = useState('no');
    const [d5,guardard5] = useState('no');
    const [d6,guardard6] = useState('no');
    const [d7,guardard7] = useState('no');
    const [d8,guardard8] = useState('no');
    const [d9,guardard9] = useState('no');
    const [d10,guardard10] = useState('no');
    const [d11,guardard11] = useState('no');
    const [d12,guardard12] = useState('no');
    const [d13,guardard13] = useState('no');

    const [cargando,guardarCargando] = useState(false);
    const [dia,guardarDia] = useState('Lunes')
    useEffect(() => {
        consultarHorario();
    },[]);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const cargarDatos = async (data) =>{
        console.log(data);
        var arreglo = []
        for (let i = 0; i<data.length;i++){
            console.log(data[i]);
            if (data[i].dia==1){
                if(data[i].bloque==1){
                    guardarl1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardarl2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardarl3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardarl4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardarl5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardarl6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardarl7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardarl8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardarl9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardarl10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardarl11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardarl12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardarl13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==2){
                if(data[i].bloque==1){
                    guardarma1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardarma2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardarma3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardarma4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardarma5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardarma6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardarma7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardarma8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardarma9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardarma10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardarma11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardarma12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardarma13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==3){
                if(data[i].bloque==1){
                    guardarmi1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardarmi2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardarmi3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardarmi4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardarmi5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardarmi6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardarmi7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardarmi8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardarmi9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardarmi10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardarmi11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardarmi12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardarmi13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==4){
                if(data[i].bloque==1){
                    guardarj1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardarj2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardarj3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardarj4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardarj5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardarj6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardarj7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardarj8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardarj9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardarj10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardarj11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardarj12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardarj13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==5){
                if(data[i].bloque==1){
                    guardarv1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardarv2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardarv3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardarv4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardarv5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardarv6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardarv7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardarv8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardarv9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardarv10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardarv11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardarv12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardarv13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==6){
                if(data[i].bloque==1){
                    guardars1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardars2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardars3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardars4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardars5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardars6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardars7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardars8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardars9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardars10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardars11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardars12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardars13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
            else if (data[i].dia==7){
                if(data[i].bloque==1){
                    guardard1('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==2){
                    guardard2('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==3){
                    guardard3('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==4){
                    guardard4('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==5){
                    guardard5('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==6){
                    guardard6('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==7){
                    guardard7('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==8){
                    guardard8('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==9){
                    guardard9('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==10){
                    guardard10('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==11){
                    guardard11('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==12){
                    guardard12('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
                else if(data[i].bloque==13){
                    guardard13('si');
                    arreglo.push({"bloque":data[i].bloque,"dia":data[i].dia});
                }
            }
        }
        guardarDisponibles(arreglo);
    }

    const consultarHorario =  async () => {
        guardarCargando(true);
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            const respuesta = await axios.get(host+'/horarios/mihorario/',
            {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
            console.log(respuesta);
            var data = respuesta.data;
            cargarDatos(data);
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
                        const respuesta = await axios.get(host+'/horarios/mihorario/',
                         {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                        console.log(respuesta);
                        guardarCargando(false);
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


    const registrar = async () => {
        console.log(guardadoenprogreso);
        if (guardadoenprogreso===false){
            guardarGuardadoenprogreso(true);
            console.log(disponibles);
            //validar
            const usuario = {disponibles}
            //guardar en api
            try {
                const nombre = await AsyncStorage.getItem('datosSesion');
                console.log(nombre);
                const respuesta = await axios.put(host+'/horarios/mihorario/',usuario,
                {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
                if (respuesta.status===200){
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
                            const respuesta = await axios.put(host+'/horarios/mihorario/',usuario,
                            {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                            console.log(respuesta);
                            if (respuesta.status===200){
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
            console.log("enprogreso");
        }
    }

    return (
        <ScrollView style= {[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            {cargando === true ? <ActivityIndicator  size = "large" animating = {cargando} style = {globalStyles.cargando}/> : null}
            {cargando===false ?
            <View>
                <Text style={[globalStyles.titulo,{color: colorTitulo}]}> Horario </Text>
                <Text style={[styles.texto,{fontFamily: "Inter-SemiBold",color: colorLetra}]}> Escoge el horario que mas te acomode:</Text>
                <View style={{flexDirection:'column',marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableHighlight onPress={() => guardarDia('Lunes')} style={dia==='Lunes'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Lunes')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Lunes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => guardarDia('Martes')} style={dia==='Martes'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Martes')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Martes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => guardarDia('Miércoles')} style={dia==='Miercoles'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Miercoles')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Miércoles</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => guardarDia('Jueves')} style={dia==='Jueves'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Jueves')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Jueves</Text>
                        </TouchableHighlight >
                    </View>
                    <View  style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableHighlight onPress={() => guardarDia('Viernes')} style={dia==='Viernes'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Viernes')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Viernes</Text>
                        </TouchableHighlight >
                        <TouchableHighlight onPress={() => guardarDia('Sábado')} style={dia==='Sabado'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Sabado')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Sábado</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => guardarDia('Domingo')} style={dia==='Domingo'? [styles.opciones,styles.boton,{backgroundColor: colorb}] : [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}]} onPress={()=> guardarDia('Domingo')}>
                            <Text style={[styles.textboton,{color: colorTextoBoton}]}>Domingo</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {dia==='Lunes' ?
                <HorarioDia numeroDia={1} dia={'Lunes'} d1={l1} d2={l2} d3={l3} d4={l4} d5={l5} d6={l6} d7={l7} d8={l8} d9={l9} d10={l10} d11={l11} d12={l12} d13={l13} 
                guardard1={guardarl1} guardard2={guardarl2} guardard3={guardarl3} guardard4={guardarl4} guardard5={guardarl5} guardard6={guardarl6} guardard7={guardarl7}
                guardard8={guardarl8} guardard9={guardarl9} guardard10={guardarl10} guardard11={guardarl11} guardard12={guardarl12} guardard13={guardarl13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null}
                {dia==='Martes' ?
                <HorarioDia numeroDia={2} dia={'Martes'} d1={ma1} d2={ma2} d3={ma3} d4={ma4} d5={ma5} d6={ma6} d7={ma7} d8={ma8} d9={ma9} d10={ma10} d11={ma11} d12={ma12} d13={ma13} 
                guardard1={guardarma1} guardard2={guardarma2} guardard3={guardarma3} guardard4={guardarma4} guardard5={guardarma5} guardard6={guardarma6} guardard7={guardarma7}
                guardard8={guardarma8} guardard9={guardarma9} guardard10={guardarma10} guardard11={guardarma11} guardard12={guardarma12} guardard13={guardarma13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>  : null}
                {dia==='Miercoles' ?
                <HorarioDia numeroDia={3} dia={'Miércoles'} d1={mi1} d2={mi2} d3={mi3} d4={mi4} d5={mi5} d6={mi6} d7={mi7} d8={mi8} d9={mi9} d10={mi10} d11={mi11} d12={mi12} d13={mi13} 
                guardard1={guardarmi1} guardard2={guardarmi2} guardard3={guardarmi3} guardard4={guardarmi4} guardard5={guardarmi5} guardard6={guardarmi6} guardard7={guardarmi7}
                guardard8={guardarmi8} guardard9={guardarmi9} guardard10={guardarmi10} guardard11={guardarmi11} guardard12={guardarmi12} guardard13={guardarmi13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null}
                {dia==='Jueves' ?
                <HorarioDia numeroDia={4} dia={'Jueves'} d1={j1} d2={j2} d3={j3} d4={j4} d5={j5} d6={j6} d7={j7} d8={j8} d9={j9} d10={j10} d11={j11} d12={j12} d13={j13} 
                guardard1={guardarj1} guardard2={guardarj2} guardard3={guardarj3} guardard4={guardarj4} guardard5={guardarj5} guardard6={guardarj6} guardard7={guardarj7}
                guardard8={guardarj8} guardard9={guardarj9} guardard10={guardarj10} guardard11={guardarj11} guardard12={guardarj12} guardard13={guardarj13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null}
                {dia==='Viernes' ?
                <HorarioDia numeroDia={5} dia={'Viernes'} d1={v1} d2={v2} d3={v3} d4={v4} d5={v5} d6={v6} d7={v7} d8={v8} d9={v9} d10={v10} d11={v11} d12={v12} d13={v13} 
                guardard1={guardarv1} guardard2={guardarv2} guardard3={guardarv3} guardard4={guardarv4} guardard5={guardarv5} guardard6={guardarv6} guardard7={guardarv7}
                guardard8={guardarv8} guardard9={guardarv9} guardard10={guardarv10} guardard11={guardarv11} guardard12={guardarv12} guardard13={guardarv13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null }
                {dia==='Sabado' ?
                <HorarioDia numeroDia={6} dia={'Sábado'} d1={s1} d2={s2} d3={s3} d4={s4} d5={s5} d6={s6} d7={s7} d8={s8} d9={s9} d10={s10} d11={s11} d12={s12} d13={s13} 
                guardard1={guardars1} guardard2={guardars2} guardard3={guardars3} guardard4={guardars4} guardard5={guardars5} guardard6={guardars6} guardard7={guardars7}
                guardard8={guardars8} guardard9={guardars9} guardard10={guardars10} guardard11={guardars11} guardard12={guardars12} guardard13={guardars13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null }
                {dia==='Domingo' ?
                <HorarioDia numeroDia={7} dia={'Domingo'} d1={d1} d2={d2} d3={d3} d4={d4} d5={d5} d6={d6} d7={d7} d8={d8} d9={d9} d10={d10} d11={d11} d12={d12} d13={d13} 
                guardard1={guardard1} guardard2={guardard2} guardard3={guardard3} guardard4={guardard4} guardard5={guardard5} guardard6={guardard6} guardard7={guardard7}
                guardard8={guardard8} guardard9={guardard9} guardard10={guardard10} guardard11={guardard11} guardard12={guardard12} guardard13={guardard13}
                disponibles={disponibles} guardarDisponibles={guardarDisponibles}/> : null }
                
                <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight  style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={()=>registrar()}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="greater-than" color={colorIcono} size={25}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Enviar</Text>
                        </View>
                    </TouchableHighlight >
                </View>
            </View> : null}
            <Portal>
                <Dialog visible={alertaexito} onDismiss={() => {guardarGuardadoenprogreso(false);guardarAlertaexito(false);navigation.goBack();}}>
                    <Dialog.Title>Éxito</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El horario ha sido guardado correctamente</Paragraph>
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
    texto:{
        marginTop:0,
        fontSize: 17,
        marginLeft:5,
        marginRight:5,
        fontFamily:'Inter-Regular'
    },
    fila:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10
    },
    opciones:{
        flex: 0.25
    },
    boton:{
        marginTop: 2,
        height: 35,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#e35d17',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    botonno:{
        marginTop: 2,
        height: 35,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#5e5e5e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    textboton:{
        color: 'white',
        fontFamily:'Inter-Light'
    },
    textoC:{
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
        backgroundColor: "#e35d17",
        borderRadius: 8,
        marginTop: 15
    }
})

export default HorarioPaciente;
