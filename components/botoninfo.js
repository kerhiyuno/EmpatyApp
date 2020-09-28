import React, {useState} from 'react';
import {View,StyleSheet,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BotonInfo = ({navigation}) =>{
    
    const salir = async() =>{
        navigation.navigate('Informacion');
    }

    return(
        <View style={{justifyContent:"center",marginRight: 20}}>
            <TouchableHighlight style={styles.botonS} onPress={() => salir() }>
                    <Icon name="information-outline" color="white" size={30}></Icon>
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
