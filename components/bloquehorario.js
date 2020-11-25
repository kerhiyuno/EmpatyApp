import React,{useContext} from 'react';
import {View,StyleSheet,Text,TouchableHighlight} from 'react-native';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const BloqueHorario = (props) => {

    var {numeroBloque,numeroDia,bloque,d,guardard,disponibles,guardarDisponibles} = props;

    const {colorb,colorTextoBoton,colorBotonDesactivado} = useContext(EstilosContext);

    const eliminar = async (obj) => {
        var lista=disponibles;
        for(var i = lista.length - 1; i >= 0; i--) {
            if(JSON.stringify(obj) === JSON.stringify(lista[i])) {
                lista.splice(i, 1);
            }
        }
        await guardarDisponibles(lista);
    }
    
    const eleccion = async () => {
        if(d === 'no'){
            await guardard('si');
            await guardarDisponibles([...disponibles,{"bloque":numeroBloque,"dia":numeroDia}]);
        }else{
            await guardard('no');
            await eliminar({"bloque":numeroBloque,"dia":numeroDia});
        }
    }

    return(
        <TouchableHighlight style={d==='no'? [styles.opciones,styles.botonno,{backgroundColor:colorBotonDesactivado}] : [styles.opciones,styles.boton,{backgroundColor: colorb}]} onPress={()=> eleccion()} >
                <View>
                    <Text style={[styles.textboton,{color: colorTextoBoton}]}>{bloque}</Text>
                </View>
        </TouchableHighlight>
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
        color: 'white',
        fontFamily:'Inter-Light',
        fontSize: RFPercentage(2)
    },
})

export default BloqueHorario;
