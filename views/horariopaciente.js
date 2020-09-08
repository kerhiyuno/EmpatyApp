import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import globalStyles from '../styles/global';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HorarioDia from '../components/horariodia'
import AsyncStorage from '@react-native-community/async-storage';

const HorarioPaciente = ({navigation}) =>{
    const [disponibles,guardarDisponibles] = useState([]);

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

    const registrar = async () => {
        console.log(disponibles);
        //validar
        const usuario = {disponibles}
        //guardar en api
        try {
            const nombre = await AsyncStorage.getItem('datosSesion');
            console.log(nombre);
            const respuesta = await axios.put('http://10.0.2.2:8000/horarios/mihorario/',usuario,
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
                    var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                    refresh=JSON.parse(refresh0).refresh;
                    await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                    try {
                        var name= await AsyncStorage.getItem('datosSesion');
                        const respuesta = await axios.put('http://10.0.2.2:8000/horarios/mihorario/',usuario,
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

        navigation.goBack();
    }

    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={globalStyles.titulo}> Horario </Text>
            <Text style={[styles.texto,{fontFamily: "Inter-SemiBold"}]}> Escoge el horario que mas te acomode:</Text>
            
            <HorarioDia numeroDia={1} dia={'Lunes'} d1={l1} d2={l2} d3={l3} d4={l4} d5={l5} d6={l6} d7={l7} d8={l8} d9={l9} d10={l10} d11={l11} d12={l12} d13={l13} 
            guardard1={guardarl1} guardard2={guardarl2} guardard3={guardarl3} guardard4={guardarl4} guardard5={guardarl5} guardard6={guardarl6} guardard7={guardarl7}
            guardard8={guardarl8} guardard9={guardarl9} guardard10={guardarl10} guardard11={guardarl11} guardard12={guardarl12} guardard13={guardarl13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>

            <HorarioDia numeroDia={2} dia={'Martes'} d1={ma1} d2={ma2} d3={ma3} d4={ma4} d5={ma5} d6={ma6} d7={ma7} d8={ma8} d9={ma9} d10={ma10} d11={ma11} d12={ma12} d13={ma13} 
            guardard1={guardarma1} guardard2={guardarma2} guardard3={guardarma3} guardard4={guardarma4} guardard5={guardarma5} guardard6={guardarma6} guardard7={guardarma7}
            guardard8={guardarma8} guardard9={guardarma9} guardard10={guardarma10} guardard11={guardarma11} guardard12={guardarma12} guardard13={guardarma13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            
            <HorarioDia numeroDia={3} dia={'Miércoles'} d1={mi1} d2={mi2} d3={mi3} d4={mi4} d5={mi5} d6={mi6} d7={mi7} d8={mi8} d9={mi9} d10={mi10} d11={mi11} d12={mi12} d13={mi13} 
            guardard1={guardarmi1} guardard2={guardarmi2} guardard3={guardarmi3} guardard4={guardarmi4} guardard5={guardarmi5} guardard6={guardarmi6} guardard7={guardarmi7}
            guardard8={guardarmi8} guardard9={guardarmi9} guardard10={guardarmi10} guardard11={guardarmi11} guardard12={guardarmi12} guardard13={guardarmi13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            
            <HorarioDia numeroDia={4} dia={'Jueves'} d1={j1} d2={j2} d3={j3} d4={j4} d5={j5} d6={j6} d7={j7} d8={j8} d9={j9} d10={j10} d11={j11} d12={j12} d13={j13} 
            guardard1={guardarj1} guardard2={guardarj2} guardard3={guardarj3} guardard4={guardarj4} guardard5={guardarj5} guardard6={guardarj6} guardard7={guardarj7}
            guardard8={guardarj8} guardard9={guardarj9} guardard10={guardarj10} guardard11={guardarj11} guardard12={guardarj12} guardard13={guardarj13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>

            <HorarioDia numeroDia={5} dia={'Viernes'} d1={v1} d2={v2} d3={v3} d4={v4} d5={v5} d6={v6} d7={v7} d8={v8} d9={v9} d10={v10} d11={v11} d12={v12} d13={v13} 
            guardard1={guardarv1} guardard2={guardarv2} guardard3={guardarv3} guardard4={guardarv4} guardard5={guardarv5} guardard6={guardarv6} guardard7={guardarv7}
            guardard8={guardarv8} guardard9={guardarv9} guardard10={guardarv10} guardard11={guardarv11} guardard12={guardarv12} guardard13={guardarv13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>

            <HorarioDia numeroDia={6} dia={'Sábado'} d1={s1} d2={s2} d3={s3} d4={s4} d5={s5} d6={s6} d7={s7} d8={s8} d9={s9} d10={s10} d11={s11} d12={s12} d13={s13} 
            guardard1={guardars1} guardard2={guardars2} guardard3={guardars3} guardard4={guardars4} guardard5={guardars5} guardard6={guardars6} guardard7={guardars7}
            guardard8={guardars8} guardard9={guardars9} guardard10={guardars10} guardard11={guardars11} guardard12={guardars12} guardard13={guardars13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>

            <HorarioDia numeroDia={7} dia={'Domingo'} d1={d1} d2={d2} d3={d3} d4={d4} d5={d5} d6={d6} d7={d7} d8={d8} d9={d9} d10={d10} d11={d11} d12={d12} d13={d13} 
            guardard1={guardard1} guardard2={guardard2} guardard3={guardard3} guardard4={guardard4} guardard5={guardard5} guardard6={guardard6} guardard7={guardard7}
            guardard8={guardard8} guardard9={guardard9} guardard10={guardard10} guardard11={guardard11} guardard12={guardard12} guardard13={guardard13}
            disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            
            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Enviar</Text>
                    </View>
                </TouchableHighlight >
            </View>
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
        backgroundColor: '#1e524c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botonno:{
        marginTop: 2,
        height: 35,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#5e5e5e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textboton:{
        color: 'white'
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
        backgroundColor: "#1e524c",
        borderRadius: 8,
        marginTop: 15
    }
})

export default HorarioPaciente;
