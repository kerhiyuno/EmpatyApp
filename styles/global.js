import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: '2.5%',
        marginBottom: 10
    },
    titulo: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 25,
        fontSize: 22,
        fontFamily: "Inter-Bold",
        color: '#141414'
    },
    botonG:{
        backgroundColor: '#1e524c',
        borderRadius: 8
    },
    botonAlerta:{
        color: '#357870',
        borderColor: '#357870',
        fontSize: 50,
    },
    input:{
        marginBottom: 24,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#357870',
        borderWidth: 1,
        height: 45,
        marginHorizontal: 8
    },
    textoAlerta:{
        fontSize:17,
        fontFamily:'Inter-Regular'
    }
});
export default globalStyles;