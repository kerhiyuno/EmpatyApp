import React from 'react';
import {View,StyleSheet,Text,TouchableHighlight} from 'react-native';

const BloqueHorario = (props) => {

    var {numeroBloque,numeroDia,bloque,d,guardard,disponibles,guardarDisponibles} = props;

    const eliminar = async (obj) => {
        var lista=disponibles;
        for(var i = lista.length - 1; i >= 0; i--) {
            if(JSON.stringify(obj) === JSON.stringify(lista[i])) {
                lista.splice(i, 1);
                console.log("hola");
            }
        }
        await guardarDisponibles(lista);
    }
    
    const eleccion = async () => {
        if(d === 'no'){
            console.log("es no");
            await guardard('si');
            await guardarDisponibles([...disponibles,{"bloque":numeroBloque,"dia":numeroDia}]);
        }else{
            console.log("es si");
            await guardard('no');
            await eliminar({"bloque":numeroBloque,"dia":numeroDia});
        }
    }

    return(
        <TouchableHighlight style={d==='no'? [styles.opciones,styles.botonno] : [styles.opciones,styles.boton]} onPress={()=> eleccion()} >
                <View>
                    <Text style={styles.textboton}>{bloque}</Text>
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
        height: 35,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#1e524c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botonno: {
        marginTop: 2,
        height: 35,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: '#5e5e5e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textboton:{
        color: 'white',
        fontFamily:'Inter-Light'
    },
})

export default BloqueHorario;
