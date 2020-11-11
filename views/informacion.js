import React from 'react';
import {Text,StyleSheet, View} from 'react-native';
import globalStyles from '../styles/global';
import EstilosContext from '../context/estilosContext';

const Informacion = () => {
    return(
        <View style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}>¿Qué es Empaty?</Text>
            <Text style={styles.textoS}> Empaty es una plataforma que le permitirá a psicólogas y 
            psicólogos organizarsu trabajo de forma online, mantener contacto con sus pacientes y agendar 
             sesiones de trabajo ya sea en modalidad individual o grupal.
            </Text>
            <Text style={globalStyles.titulo}>¿Por qué nosotros?</Text>
            <Text style={styles.textoS}> Juntamos todas las herramientas que necesitas en un solo lugar.
            Nos integramos con Google Meets, una alternativa más segura que Zoom y cuyo plan gratuito incluye 
            videoconferencias de mayor duración, para facilitar organización de videollamadas. Con nuestra 
            aplicación, la distancia ya no se vuelve un problema en el cuidado de la salud mental.
            </Text>
        </View>
    )
}

export default Informacion;

const styles=StyleSheet.create({
    textoS:{
        marginBottom: 8,
        marginHorizontal: 0,
        marginLeft: 1,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
})