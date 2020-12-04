import React,{useState,useContext} from 'react';
import {Text,StyleSheet, View} from 'react-native';
import globalStyles from '../styles/global';
import EstilosContext from '../context/estilosContext';
import {ExpandableListView} from 'react-native-expandable-listview';
 import { RFPercentage } from "react-native-responsive-fontsize";


 

const Informacion = () => {

    const {colorb,colorTextoBoton,colorTitulo,colorIcono,colorFondo,colorBordeInput} = useContext(EstilosContext);

      function handleItemClick({index}) {
        console.log(index);
      };
     
      function handleInnerItemClick({innerIndex, item, itemIndex}) {
        console.log(innerIndex);
      };

      const CONTENT = [
        {
          id: '90',
          categoryName: 'Mi perfil',
          subCategory: [
            {
              customInnerItem: (
                  <Text style={styles.textoC}>Ve tus datos personales</Text>
              ),
              id: '1',
              name:
                "",
            },
            {customInnerItem: (
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={styles.textoC}>Edita tus datos personales en </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold'}]}>Editar Perfil</Text>
                <Text style={[styles.textoC,{marginLeft:0}]}>.</Text>
              </View>
            ),id: '2', name: ''},
          ],
        },
        {
          id: '91',
          categoryName: 'Mis sesiones',
          subCategory: [{customInnerItem: (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={styles.textoC}>Revisa tus sesiones agendadas en </Text>
              <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold'}]}>Agenda</Text>
              <Text style={[styles.textoC,{marginLeft:0}]}>.</Text>
            </View>
          ),id: '1', name: ''},
          {customInnerItem: (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={styles.textoC}>Revisa tu sesión más próxima en </Text>
              <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold'}]}>Siguiente Cita</Text>
              <Text style={[styles.textoC,{marginLeft:0}]}>.</Text>
            </View>
          ),id: '2', name: ''},
          {customInnerItem: (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={styles.textoC}>Califica tus sesiones en </Text>
              <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold'}]}>Encuestas pendientes</Text>
              <Text style={[styles.textoC,{marginLeft:0}]}>.</Text>
            </View>
          ),id: '3', name: ''}],
        },
        {
          id: '92',
          categoryName: 'Cita',
          subCategory: [{customInnerItem: (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Puedes ingresar a una cita a través de </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginTop:2.5}]}>Agenda </Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginTop:2.5,marginRight:0}]}>o </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Siguiente cita</Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom:2.5}]}>, dentro de  </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Mis sesiones</Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
              </View>
            </View>
          ),id: '1', name: ''},
          {customInnerItem: (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Si una reunión ya ha comenzado, puedes unirte</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginBottom:2.5}]}>presionando en </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Unirse a la sesión</Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
              </View>
            </View>
          ),id: '2', name: ''},
          {customInnerItem: (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Si tu psicólogo te ha asignado a un sub-grupo,</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginBottom:2.5}]}>puedes ingresar en </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Unirse al sub-grupo.</Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
              </View>
            </View>
          ),id: '3', name: ''}],
        },
        {
          id: '93',
          categoryName: 'Chat',
          subCategory: [{customInnerItem: (
            <Text style={styles.textoC}>Conversa con tu psicólogo en tiempo real.</Text>
        ),id: '1', name: ''}],
        },
        {
          id: '94',
          categoryName: '¿Cómo te sientes?',
          subCategory: [{customInnerItem: (
            <Text style={styles.textoC}>Aquí puedes informarle a tu psicólogo de tu estado de ánimo.</Text>
        ),id: '1', name: ''}],
        },
        {
          id: '95',
          categoryName: 'Encuesta personal',
          subCategory: [{customInnerItem: (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Al responder este cuestionario, tendrás</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={[styles.textoC,{marginVertical:0,marginBottom:2.5}]}>disponible la sección </Text>
                <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Buscar Psicólogo</Text>
                <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
              </View>
            </View>
          ),id: '1', name: ''
          },
          {customInnerItem: (
            <Text style={styles.textoC}>Ayuda a tu psicólogo a conocer tu estado psicológico.</Text>
        ),id: '2', name: ''
        }],
        },
        {
            id: '96',
            categoryName: 'Disconformidad con el grupo',
            subCategory: [{customInnerItem: (
              <Text style={styles.textoC}>Informa a tu psicólogo de algún problema.</Text>
          ),id: '1', name: ''}],
        },
        {
            id: '97',
            categoryName: 'Desvincularse de Psicólogo',
            subCategory: [{customInnerItem: (
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Si quieres desvincularte inmediatamente,</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={[styles.textoC,{marginVertical:0,marginBottom:2.5}]}>selecciona la opción </Text>
                  <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginBottom:2.5}]}>Desvinculación inmediata</Text>
                  <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
                </View>
              </View>
            ),id: '1', name: ''},
        {customInnerItem: (
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={[styles.textoC,{marginVertical:0,marginTop:2.5}]}>Si no seleccionas </Text>
              <Text style={[styles.textoC,{marginLeft:0,fontWeight:'bold',marginVertical:0,marginTop:2.5}]}>Desvinculación inmediata</Text>
              <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginTop:2.5,marginRight:0}]}>,</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={[styles.textoC,{marginVertical:0}]}>tu psicólogo podrá conversar contigo antes</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={[styles.textoC,{marginVertical:0,marginBottom: 2.5}]}>de la decisión definitiva</Text>
              <Text style={[styles.textoC,{marginLeft:0,marginVertical:0,marginBottom: 2.5}]}>.</Text>
            </View>
          </View>
        ),id:'2', name: ''}],
        },
        {
            id: '98',
            categoryName: 'Botón de pánico',
            subCategory: [{customInnerItem: (
              <Text style={styles.textoC}>Con este botón puedes alertar a tu psicólogo de algún problema grave y llamar a alguien de confianza.</Text>
          ),id: '1', name: ''}],
        },
        {
            id: '99',
            categoryName: 'Personalizar',
            subCategory: [{customInnerItem: (
              <Text style={styles.textoC}>Elige un conjunto de colores para personalizar la aplicación.</Text>
          ),id: '1', name: ''}],
        }
          ,
      ];
    return(
        <View style={[globalStyles.contenedor,{backgroundColor:colorFondo}]} underlayColor = {'transparent'}>
        <ExpandableListView
                data={CONTENT} // required
                onInnerItemClick={handleInnerItemClick}
                onItemClick={handleItemClick}
                animated={false}
                itemContainerStyle={{backgroundColor:'transparent'}}
                innerItemContainerStyle={{marginBottom:RFPercentage(1),fontSize:10,borderRadius:10,marginHorizontal:RFPercentage(3),backgroundColor:colorb}}
                innerItemLabelStyle={{fontSize:RFPercentage(2),color:colorTextoBoton,marginVertical:5}}
            />
        </View>
    )
}

export default Informacion;

const styles=StyleSheet.create({
    textoS:{
        marginBottom: 8,
        marginHorizontal: 0,
        marginLeft: 1,
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter-Regular',
        textAlign:'justify'
    },
    textoC: {
      marginLeft: 7,
      marginVertical:5,
      fontSize: RFPercentage(2),
      color: 'white',
      fontFamily: 'Inter-Light',
  }
    
})