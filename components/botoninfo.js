import React, {useState,useContext} from 'react';
import {View,StyleSheet,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';

const BotonInfo = ({navigation}) =>{

    const {colorb,colorIcono} = useContext(EstilosContext);
    
    const salir = async() =>{
        navigation.navigate('Informacion');
    }

    return(
        <View style={{justifyContent:"center",marginRight: 20}}>
            <TouchableHighlight style={[styles.botonS,{color: colorb}]} onPress={() => salir() }>
                    <Icon name="information-outline" color={colorIcono} size={30}></Icon>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    botonC:{
        marginTop: 0,
        height: 10,
        marginBottom: 0,
        marginHorizontal: 0,
        justifyContent: 'center',
        backgroundColor: '#e35d17',
        alignItems: 'center',
        borderRadius: 8,
    },
})

export default BotonInfo;
