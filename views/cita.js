import React,{useState} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Linking,Alert} from 'react-native';
import {Headline,Paragraph, Dialog, Portal,Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import InAppBrowser from 'react-native-inappbrowser-reborn'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const cita = ({navigation,route}) =>{

    const [nolink,guardarNolink] = useState(false);
    const [nosubgrupo,guardarNosubgrupo] = useState(false);

    const openLink=async(link) =>{
        try {
          const url = link;
          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
              // iOS Properties
              dismissButtonStyle: 'cancel',
              preferredBarTintColor: '#357870',
              preferredControlTintColor: 'white',
              readerMode: false,
              animated: true,
              modalPresentationStyle: 'fullScreen',
              modalTransitionStyle: 'partialCurl',
              modalEnabled: true,
              enableBarCollapsing: false,
              // Android Properties
              showTitle: true,
              toolbarColor: '#6200EE',
              secondaryToolbarColor: 'black',
              enableUrlBarHiding: true,
              enableDefaultShare: true,
              forceCloseOnRedirection: false,
              // Specify full animation resource identifier(package:anim/name)
              // or only resource name(in case of animation bundled with app).
              animations: {
                startEnter: 'slide_in_right',
                startExit: 'slide_out_left',
                endEnter: 'slide_in_left',
                endExit: 'slide_out_right'
              },
              headers: {
                'my-custom-header': 'my custom header value'
              }
            })
           // Alert.alert(JSON.stringify(result))
           // console.log("holadasdasdas");
          }
          else Linking.openURL(url)
        } catch (error) {
            console.log("holaXd");
          Alert.alert(error.message)
        }
      }



    const funcion = async (id) =>{
        try {
          console.log('---');
          console.log(id);
          const name = await AsyncStorage.getItem('datosSesion');
          const Bearer=JSON.parse(name).refresh;
          var sesion=id;
          const postdata={sesion}
          var respuesta =await axios.post('http://10.0.2.2:8000/videoconf/urlMeet/',postdata,
          {
              headers: {
                  'Authorization': 'Bearer ' +(JSON.parse(name).access),
                  },
          }
          );
          console.log(respuesta);
          if(respuesta.data.url==='No existe url para la sesion aun.'){
           guardarNolink(true);
          }
          else{
            openLink(respuesta.data.url);}
      } catch (error){
          console.log("error");
          console.log(error);
          console.log(error.response);
          if(error.response.data.code==='token_not_valid'){
              console.log('token_not_valid');
              try {
                  const refresh0 = await AsyncStorage.getItem('datosSesion')
                  var refresh = JSON.parse(refresh0).refresh;
                  refresh = {refresh}
                  var respuesta = await axios.post('http://10.0.2.2:8000/account/token/refresh/',refresh);
                  refresh=JSON.parse(refresh0).refresh;
                  await AsyncStorage.setItem('datosSesion',JSON.stringify({ access: respuesta.data.access,refresh: refresh}));
                  try {
                      var name= await AsyncStorage.getItem('datosSesion');
                      const postdata={
                          Bearer: refresh
                      }
                      var respuesta =await axios.post('http://10.0.2.2:8000/videoconf/urlMeet/',postdata,
                      {
                          headers: {'Authorization': 'Bearer ' +(JSON.parse(name).access),},
                      });
                      console.log(respuesta);
                      if(respuesta.data.url==='No existe url para la sesion aun.'){
                            guardarNolink(true);
                        }
                    else{
                        openLink(respuesta.data.url);}
                  } catch (error) {
                      console.log(error.response);
                      console.log("error acaa");
                      //navigation.navigate('Home');
                  }
              } catch (error) {
                  console.log("error aqui");
                  console.log(error.response);
              }
          }


      }
    }
    const funcion2 = async (id) =>{
        guardarNosubgrupo(true);
    }
    return (
        <View style={globalStyles.contenedor}>
            <Text style={globalStyles.titulo}> Datos de la sesión </Text>
            <View style={{marginTop: 20}}>
                <View style={{marginBottom:20}}>
                    <Text style={styles.texto}>Dia: {route.params.dia} de {route.params.mes}  </Text>
                    <Text style={styles.texto}>Hora: {route.params.hora}</Text>
                </View>
            </View>
            <TouchableHighlight onPress={  () => funcion(route.params.id)} style={styles.botonC} >
                        <View>
                        <Text style={styles.textoC}>Unirse a la sesión</Text>
                        </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={  () => funcion2(route.params.id)} style={styles.botonC} >
                        <View>
                        <Text style={styles.textoC}>Unirse al sub-grupo</Text>
                        </View>
            </TouchableHighlight>

            <Portal>
                <Dialog visible={nolink} onDismiss={() => guardarNolink(false)} >
                    <Dialog.Title>Aviso</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>La sesión no se encuentra disponible</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarNolink(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={nosubgrupo} onDismiss={() => guardarNosubgrupo(false)} >
                    <Dialog.Title>Aviso</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>No has sido asignado a un sub-grupo</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarNosubgrupo(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>

    );
}
const styles=StyleSheet.create({
    botonC: {
        marginTop: 10,
        height: 45,
        marginBottom: 5,
        marginHorizontal: 24,
        justifyContent: 'center',
        backgroundColor: '#1e524c',
        alignItems: 'center',
        borderRadius: 8
    },

    textoC: {
        marginBottom: 2,
        marginHorizontal: 10,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Inter-Light'
    },
    texto:{
        fontSize: 17,
        marginHorizontal:25,
        fontFamily:'Inter-Regular'
    }
})

export default cita;