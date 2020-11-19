import React,{useContext} from 'react';
import {Checkbox} from 'react-native-paper';
import {View,StyleSheet,Text,TouchableHighlight} from 'react-native';
import globalStyles from '../styles/global';
import BloqueHorario from '../components/bloquehorario';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const HorarioDia = (props) =>{

    var {numeroDia,dia,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,guardard1,guardard2,guardard3,guardard4,guardard5,
        guardard6,guardard7,guardard8,guardard9,guardard10,guardard11,guardard12,
        guardard13,disponibles,guardarDisponibles} = props;

    const {colorTitulo} = useContext(EstilosContext);

    return(
        <View>
            <Text style={[globalStyles.titulo,{fontSize:RFPercentage(3),marginTop:15,color: colorTitulo}]} >{dia}</Text>
            <View style={styles.fila}>
                <BloqueHorario numeroBloque={1} numeroDia={numeroDia} bloque={'8 a 9'} d={d1} guardard={guardard1} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={2} numeroDia={numeroDia} bloque={'9 a 10'} d={d2} guardard={guardard2} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={3} numeroDia={numeroDia} bloque={'10 a 11'} d={d3} guardard={guardard3} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={4} numeroDia={numeroDia} bloque={'11 a 12'} d={d4} guardard={guardard4} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            </View>
            <View style={styles.fila}>
                <BloqueHorario numeroBloque={5} numeroDia={numeroDia} bloque={'12 a 13'} d={d5} guardard={guardard5} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={6} numeroDia={numeroDia} bloque={'13 a 14'} d={d6} guardard={guardard6} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={7} numeroDia={numeroDia} bloque={'14 a 15'} d={d7} guardard={guardard7} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={8} numeroDia={numeroDia} bloque={'15 a 16'} d={d8} guardard={guardard8} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            </View>
            <View style={styles.fila}>
                <BloqueHorario numeroBloque={9} numeroDia={numeroDia} bloque={'16 a 17'} d={d9} guardard={guardard9} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={10} numeroDia={numeroDia} bloque={'17 a 18'} d={d10} guardard={guardard10} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={11} numeroDia={numeroDia} bloque={'18 a 19'} d={d11} guardard={guardard11} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
                <BloqueHorario numeroBloque={12} numeroDia={numeroDia} bloque={'19 a 20'} d={d12} guardard={guardard12} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            </View>
            <View style={styles.fila}>
                <BloqueHorario numeroBloque={13} numeroDia={numeroDia} bloque={'20 a 21'} d={d13} guardard={guardard13} disponibles={disponibles} guardarDisponibles={guardarDisponibles}/>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    fila:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10
    },
    opciones:{
        flex: 0.25
    },
    boton: {
        marginTop: 2,
        height: RFPercentage(5),
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#e35d17',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botonno: {
        marginTop: 2,
        height: RFPercentage(5),
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#5e5e5e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textboton:{
        color: 'white'
    },
})

export default HorarioDia;