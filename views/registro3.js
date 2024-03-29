import React, {useState} from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import globalStyles from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EleccionHobbies from '../components/checkbox';

const registro3 = ({navigation,route}) =>{

    const [musica,guardarMusica] = useState('no');
    const [videojuegos,guardarVideojuegos] = useState('no');
    const [lectura,guardarLectura] = useState('no');
    const [peliculasseries,guardarPeliculasseries] = useState('no');
    const [airelibre,guardarAirelibre] = useState('no');
    const [cocina,guardarCocina] = useState('no');
    const [deporte,guardarDeporte] = useState('no');
    const [otros,guardarOtros] = useState('no');


    const fullname = (route.params.usuario.fullname);
    const rut = (route.params.usuario.rut);
    const genero = (route.params.usuario.genero);
    const email = (route.params.usuario.email);
    const password = (route.params.usuario.password);
    const gender_description = (route.params.usuario.gender_description);
    const telefono = (route.params.usuario.telefono);
    const fecha_nacimiento = (route.params.usuario.fecha_nacimiento);

    const [hobbies,guardarHobbies] = useState([])

    const registrar = async () => {
        //hobbies
        //generar
        const usuario={fullname,rut,email,password,telefono,genero,gender_description,hobbies,fecha_nacimiento};
        console.log(usuario);
        
        //redireccionar
        navigation.navigate('Registro 4/7',{usuario});
    }
    
    return (
        <ScrollView style= {globalStyles.contenedor}>
            <Text style={globalStyles.titulo}>Hobbies</Text>
            <EleccionHobbies hobbie={musica} sethobbie={guardarMusica} texto={'Musica'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={1}/>
            <EleccionHobbies hobbie={videojuegos} sethobbie={guardarVideojuegos} texto={'Videojuegos'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={2}/>
            <EleccionHobbies hobbie={lectura} sethobbie={guardarLectura} texto={'Lectura'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={3}/>
            <EleccionHobbies hobbie={peliculasseries} sethobbie={guardarPeliculasseries} hobbies={hobbies} texto={'Películas y/o series'} guardarHobbies={guardarHobbies} numero={4}/>
            <EleccionHobbies hobbie={airelibre} sethobbie={guardarAirelibre} hobbies={hobbies} texto={'Actividades al aire libre'} guardarHobbies={guardarHobbies} numero={5}/>
            <EleccionHobbies hobbie={cocina} sethobbie={guardarCocina} texto={'Cocina'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={6}/>
            <EleccionHobbies hobbie={deporte} sethobbie={guardarDeporte} texto={'Deportes'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={7}/>
            <EleccionHobbies hobbie={otros} sethobbie={guardarOtros} texto={'Otros'} hobbies={hobbies} guardarHobbies={guardarHobbies} numero={8}/>

            <View style={[styles.container,{marginTop:5}]}>
                <TouchableHighlight  style={styles.botonS} underlayColor = {'transparent'} onPress={()=>registrar()}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="greater-than" color="white" size={25}></Icon>
                        <Text style={styles.textoC}>Siguiente</Text>
                    </View>
                </TouchableHighlight >
            </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({

    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Inter-Light'
    },
    botonS:{
        height: 40,
        marginTop: 15,
        marginHorizontal: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e524c",
        borderRadius: 8
    }
})


export default registro3;