import React,{useEffect,useState,useContext} from 'react';
import {Text,FlatList,View,ScrollView,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext';
import globalStyles from '../styles/global';


const Notificaciones = () => {

    const {notificaciones,obtenerCantidad, reiniciarCantidad} = useContext(NotificacionesContext);
    const {colorLetra,colorNotificacionesBorder,colorFondo} = useContext(EstilosContext);
    const [mostrarnotificaciones,guardarMostrarnotificaciones] = useState([]);

    useEffect(() => {
        guardarMostrarnotificaciones(obtenerCantidad());
    },[notificaciones]);

    useEffect(() => {
        reiniciarCantidad();
        console.log("cantidad 0");
    },[]);
    
    return(
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo}]}>
            <FlatList
                data={mostrarnotificaciones}
                style={{marginBottom: 10}}
                renderItem={({item,index}) => (
                    <View style={[styles.notificaciones,{borderColor: colorNotificacionesBorder}]}>
                        <Text style={[styles.title,{color: colorLetra}]}>{item.title}</Text>
                       <Text style={[styles.body,{color: colorLetra}]}>{item.body}</Text>
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
        marginTop: 15,
        marginHorizontal:10,
        borderRadius: 10
    },
    title:{
        marginBottom: 0,
        marginHorizontal: 7,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Bold'
    },
    body:{
        marginBottom: 8,
        marginHorizontal: 7,
        fontSize: 15,
        color: 'black',
        fontFamily: 'Inter-Regular',
        textAlign: 'justify'
    }
})

export default Notificaciones;