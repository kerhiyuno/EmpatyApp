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
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold'
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
        marginBottom: 21,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#357870',
        borderWidth: 1,
        height: 40,
        marginHorizontal: 8
    }
});
export default globalStyles;