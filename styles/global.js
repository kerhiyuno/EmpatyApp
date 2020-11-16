import {StyleSheet} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingTop:10,
        paddingHorizontal:10
    },
    titulo: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 16,
        fontSize: RFPercentage(3.4),
        fontFamily: "Inter-Bold",
        color: '#141414'
    },
    botonG:{
        backgroundColor: '#e35d17',
        borderRadius: 8
    },
    botonAlerta:{
        color: '#357870',
        borderColor: '#357870',
        fontSize: 50,
    },
    input:{
        marginBottom: RFPercentage(1),
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#357870',
        borderWidth: 1,
        height: 45,
        marginHorizontal: 13,
        fontSize:RFPercentage(2)
    },
    entradaTexto:{
        marginTop: 15,
        marginBottom: 24,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#357870',
        borderWidth: 1,
        height: RFPercentage(28),
        marginHorizontal: 8
    },
    textoAlerta:{
        fontSize:16,
        fontFamily:'Inter-Regular'
    },
    cargando: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        alignContent: 'center',
        alignSelf:'center',
        marginVertical: 200
     }
});
export default globalStyles;