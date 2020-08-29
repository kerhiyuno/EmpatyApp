import React from 'react';
import {Checkbox} from 'react-native-paper';
import {View,StyleSheet,Text} from 'react-native';

const EleccionHobbies = (props) =>{

    var { hobbie,sethobbie,texto,hobbies,guardarHobbies,numero} = props;

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
            <Text style={styles.texto}>{texto}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    texto: {
        fontSize: 17,
        marginLeft:5,
        marginRight:5
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:10,
        alignItems:'center'
    }
})

export default EleccionHobbies;