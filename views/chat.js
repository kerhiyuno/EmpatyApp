import React,{useState,useEffect,useContext} from 'react';
import {View,StyleSheet,Text,ActivityIndicator,TouchableHighlight} from 'react-native';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ipHost} from '../components/hosts.js';
import NotificacionesContext from '../context/notificacionesContext'


const host = ipHost();

const Chat = () => {

  useEffect( () => {
    pedirmensajes();
  }
  ,[])

  const {obtenerChatroom, nuevomensaje} = useContext(NotificacionesContext);

  useEffect( () => {
    console.log("nuevo mensajexD");
    if(nuevomensaje==1){
    pedirnuevomensaje();
    }
  }
  ,[nuevomensaje])

  const pedirnuevomensaje = async () => {
    console.log("entrado");
    var chatRoom = obtenerChatroom();
    console.log(chatRoom);
        try {
          const nombre = await AsyncStorage.getItem('datosSesion');
          const respuesta = await axios.post(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:1,offset:0},
          {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
          console.log(respuesta);
          var mensajes = [respuesta.data[0],...messages]
          console.log(mensajes);
          setMessages(GiftedChat.append([], mensajes));
      } catch (error){
          console.log("error");
          console.log(error);
          console.log(error.response);
          if(error.response.data.code==='token_not_valid'){
              console.log('token_not_valid');
              try {
                  const refresh0 = await AsyncStorage.getItem('datosSesion');
                  var refresh = JSON.parse(refresh0).refresh;
                  refresh = {refresh}
                  var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                  refresh=JSON.parse(refresh0).refresh;
                  await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                  try {
                      var name= await AsyncStorage.getItem('datosSesion');
                      const respuesta = await axios.get(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:1,offset:0},
                      {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                      var mensajes = messages.concat(respuesta.data);
                      setMessages(GiftedChat.append([], mensajes));
                  } catch (error) {
                      console.log(error.response);
                      console.log("error acaa");
                  }  
              } catch (error) {
                  console.log("error aqui");
                  console.log(error.response);
              }
          }
      }
  }

  const pedirmensajes = async () => {
    var chatRoom = obtenerChatroom();
    console.log(chatRoom);
        try {
          const nombre = await AsyncStorage.getItem('datosSesion');
          const respuesta = await axios.post(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:10,offset:0},
          {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
          var mensajes = messages.concat(respuesta.data);
          setMessages(GiftedChat.append([], mensajes));
      } catch (error){
          console.log("error");
          console.log(error);
          console.log(error.response);
          if(error.response.data.code==='token_not_valid'){
              console.log('token_not_valid');
              try {
                  const refresh0 = await AsyncStorage.getItem('datosSesion');
                  var refresh = JSON.parse(refresh0).refresh;
                  refresh = {refresh}
                  var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                  refresh=JSON.parse(refresh0).refresh;
                  await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                  try {
                      var name= await AsyncStorage.getItem('datosSesion');
                      const respuesta = await axios.get(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:10,offset:0},
                      {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                      var mensajes = messages.concat(respuesta.data);
                      setMessages(GiftedChat.append([], mensajes));
                  } catch (error) {
                      console.log(error.response);
                      console.log("error acaa");
                  }  
              } catch (error) {
                  console.log("error aqui");
                  console.log(error.response);
              }
          }
      }
  }

    const [messages, setMessages] = useState([
        {
          _id: 100,
          text: 'Chat con Psicólogo',
          createdAt: new Date().getTime(),
          system: true
        },
       /* {
          _id: 101,
          text: 'Henlo1!',
          createdAt: new Date().getTime(),
          user: {
            _id: 122121,
            name: 'Test User'
          }
        },
        {
          //puedes agregar todos los otros campos que quieras
          _id: 102, // esta puede ser cualquier numero que sea diferente a otro mensaje
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            //1: mensaje de paciente, otro: mensaje de sicologo
            _id: 1,
            name: 'Paciente'
          }
        },
        {
          _id: 103,
          text: 'Henlo3!',
          createdAt: new Date().getTime(),
          user: {
            _id: 122121,
            name: 'Test User2'
          }
        }*/
      ]);
      
      const handleSend = async (newMessage = []) => {
        var chatRoom = obtenerChatroom();
        try {
          const nombre = await AsyncStorage.getItem('datosSesion');
          const respuesta = await axios.post(host+'/chat/send/',{texto:newMessage[0].text,chatroom:chatRoom},
          {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
          console.log(respuesta);
      } catch (error){
          console.log("error");
          console.log(error);
          console.log(error.response);
          if(error.response.data.code==='token_not_valid'){
              console.log('token_not_valid');
              try {
                  const refresh0 = await AsyncStorage.getItem('datosSesion');
                  var refresh = JSON.parse(refresh0).refresh;
                  refresh = {refresh}
                  var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                  refresh=JSON.parse(refresh0).refresh;
                  await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                  try {
                      var name= await AsyncStorage.getItem('datosSesion');
                      const respuesta = await axios.post(host+'/chat/send/',{texto:newMessage,chatroom:chatRoom},
                      {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                      console.log(respuesta);
                  } catch (error) {
                      console.log(error.response);
                      console.log("error acaa");
                  }  
              } catch (error) {
                  console.log("error aqui");
                  console.log(error.response);
              }
          }
      }
        setMessages(GiftedChat.append(messages, newMessage));
      }
      
      const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#e35d17'
              }
            }}
            textStyle={{
              right: {
                color: '#fff'
              }
            }}
          />
        );
      }
      const renderSend = (props) => {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
            <IconButton icon='send-circle' size={32} color='#e35d17' />
            </View>
          </Send>
        );
      }
      const scrollToBottomComponent = () => {
        return (
          <View style={styles.bottomComponentContainer}>
            <IconButton icon='chevron-double-down' size={36} color='#e35d17' />
          </View>
        );
      }
      const renderLoading = () => {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }
      const cargarAnteriores = async () =>{
        var chatRoom = obtenerChatroom();
        console.log("cargando anteriores");
        try {
          const nombre = await AsyncStorage.getItem('datosSesion');
          const respuesta = await axios.post(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:10,offset:messages.length },
          {headers: {'Authorization': 'Bearer ' +(JSON.parse(nombre).access),}});
          var mensajes = messages.concat(respuesta.data);
          setMessages(GiftedChat.append([], mensajes));
      } catch (error){
          console.log("error");
          console.log(error);
          console.log(error.response);
          if(error.response.data.code==='token_not_valid'){
              console.log('token_not_valid');
              try {
                  const refresh0 = await AsyncStorage.getItem('datosSesion');
                  var refresh = JSON.parse(refresh0).refresh;
                  refresh = {refresh}
                  var respuesta = await axios.post(host+'/account/token/refresh/',refresh);
                  refresh=JSON.parse(refresh0).refresh;
                  await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                  try {
                      var name= await AsyncStorage.getItem('datosSesion');
                      const respuesta = await axios.get(host+'/chat/fetch/',{chatroom:chatRoom,cantidad:10,offset:0},
                      {headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),}});
                      var mensajes = messages.concat(respuesta.data);
                      setMessages(GiftedChat.append([], mensajes));
                  } catch (error) {
                      console.log(error.response);
                      console.log("error acaa");
                  }  
              } catch (error) {
                  console.log("error aqui");
                  console.log(error.response);
              }
          }
      }
      }
      const renderLoadEarlier = () => {
        return (
          <TouchableHighlight style={styles.botonS} onPress={() => cargarAnteriores()} underlayColor = {'white'}>
           <View>
            <Text style={styles.textoC}>Cargar mensajes anteriores</Text>
           </View>
           </TouchableHighlight>
        );
      }
    
    return(
        <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        placeholder='Escribe un mensaje'
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        loadEarlier
        renderLoadEarlier ={renderLoadEarlier}
        infiniteScroll
        onLoadEarlier={cargarAnteriores}
        />
    )
}

const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botonS:{
      height: 40,
      marginBottom: 15,
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor:'gray'
  },
  textoC: {
    marginHorizontal: 7,
    fontSize: 17,
    color: 'white',
    fontFamily: 'Inter-Light'
}
  });

export default Chat;