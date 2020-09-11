import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,ScrollView,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import globalStyles from '../styles/global';
import {Avatar} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'

const Notificaciones = () => {

    const {notificaciones,obtenerCantidad, reiniciarCantidad} = useContext(NotificacionesContext);
    const [mostrarnotificaciones,guardarMostrarnotificaciones] = useState([]);

    useEffect(() => {
        guardarMostrarnotificaciones(obtenerCantidad());
        console.log("hola");
    },[notificaciones]);

    useEffect(() => {
        reiniciarCantidad();
        console.log("cantidad 0");
    },[]);
    
    return(
        <View>
            <FlatList
                data={mostrarnotificaciones}
                style={{marginBottom: 10}}
                renderItem={({item,index}) => (
                    <View style={styles.notificaciones}>
                        <Text style={styles.title}> {item.title} </Text>
                       <Text style={styles.body}> {item.body} </Text>
                     </View>
                )
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    notificaciones:{
        borderWidth:2,
        borderColor:"#828282",
        marginTop: 20,
        marginHorizontal:10,
        borderRadius: 10
    },
    title:{
        marginBottom: 0,
        marginHorizontal: 0,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-Bold'
    },
    body:{
        marginBottom: 8,
        marginHorizontal: 0,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Regular'
    }
})

export default Notificaciones;