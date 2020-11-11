import React, {useContext} from 'react';
import {Checkbox} from 'react-native-paper';
import {View,StyleSheet,Text} from 'react-native';
import EstilosContext from '../context/estilosContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const EleccionHobbies = (props) =>{

    var { hobbie,sethobbie,texto,hobbies,guardarHobbies,numero} = props;

    const {colorLetra} = useContext(EstilosContext);

    const eliminar = (number) => {
        var lista=hobbies;
        for(var i = lista.length - 1; i >= 0; i--) {
            if(lista[i] === number) {
                lista.splice(i, 1);
            }
        }
        guardarHobbies(lista);
    }

    return(
        <View style={styles.pregunta}>
            <Checkbox
                status={hobbie === 'si' ? 'checked' : 'unchecked'}
                onPress={() => {
                    if (hobbie==='si'){
                        sethobbie('no');
                        eliminar(numero);
                    } 
                    else if (hobbie==='no'){
                        sethobbie('si');
                        guardarHobbies([...hobbies,numero]);
                        console.log(numero);
                    }
                }}
                color='black'
            />
            <Text style={[styles.texto,{color: colorLetra}]}>{texto}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    texto: {
        fontSize: RFPercentage(2.5),
        marginLeft:5,
        marginRight:5,
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:8,
        marginLeft:10,
        alignItems:'center'
    }
})

export default EleccionHobbies;