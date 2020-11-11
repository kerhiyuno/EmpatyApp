import React,{useContext} from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';

import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import EstilosContext from '../context/estilosContext';

const Preferencias = ({navigation}) => {

    const {colorb,colorLetra,colorTextoBoton,colorIcono,
        colorTitulo,colorFondo} = useContext(EstilosContext);

    return (
        <ScrollView style={[globalStyles.contenedor,{backgroundColor: colorFondo}]} >
            <Text style={[globalStyles.titulo,{color: colorTitulo}]}>Preferencias de Búsqueda</Text>
            <Text style={[styles.textoS,{marginBottom:20,color: colorLetra}]}>Para iniciar la búsqueda de psicólogo, selecciona tus preferencias:</Text>     
            <View style={[styles.container,{marginTop:10}]}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("PreferenciasSicologo") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="account-question-outline" color={colorIcono} size={25}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Preferencias de Psicólogo</Text>
                        </View>
                    </TouchableHighlight>
            </View>

            <View style={[styles.container,{marginTop:5}]}>
                    <TouchableHighlight style={[styles.botonS,{backgroundColor: colorb}]} underlayColor = {'transparent'} onPress={() => navigation.navigate("ElegirHorario") }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="calendar-question" color={colorIcono} size={25}></Icon>
                            <Text style={[styles.textoC,{color: colorTextoBoton}]}>Horario</Text>
                        </View>
                    </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
      },
    botonS:{
        height: 70,
        marginBottom: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
    textoS:{
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-Regular'
    },
    textoC: {
        marginBottom: 0,
        marginHorizontal: 7,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    }
})

export default Preferencias;