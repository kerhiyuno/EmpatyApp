import React, {useState,useContext} from 'react';
import {View,StyleSheet,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext';
import { RFPercentage } from "react-native-responsive-fontsize";

const BotonInfo = ({navigation}) =>{

    const {colorb,colorIcono} = useContext(EstilosContext);
    
    const salir = async() =>{
        navigation.navigate('Informacion');
    }

    return(
        <View style={{justifyContent:"center",marginRight: 20}}>
            <TouchableHighlight style={{color: colorb}} onPress={() => salir() } underlayColor = {'transparent'}>
                    <Icon name="information-outline" color={colorIcono} size={RFPercentage(4.7)}></Icon>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default BotonInfo;
