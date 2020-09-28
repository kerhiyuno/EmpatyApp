import React from 'react';
import {RadioButton} from 'react-native-paper';
import {View,StyleSheet,Text} from 'react-native';

const PreguntaTest = (props) =>{

    const { pregunta,setpregunta,texto } = props;

    return(
        <View>
            <Text style={styles.texto}>{texto}</Text>
            <View style={styles.pregunta}>
                <View style={styles.opciones}>
                    <Text style={styles.numero}>0</Text>
                    <RadioButton
                        value="zero"
                        status={ pregunta === '0' ? 'checked' : 'unchecked' }
                        onPress={() => setpregunta('0')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.numero}>1</Text>
                    <RadioButton
                        value="first"
                        status={ pregunta === '1' ? 'checked' : 'unchecked' }
                        onPress={() => setpregunta('1')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.numero}>2</Text>
                    <RadioButton
                        value="second"
                        status={ pregunta === '2' ? 'checked' : 'unchecked' }
                        onPress={() => setpregunta('2')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.numero}>3</Text>
                    <RadioButton
                        value="third"
                        status={ pregunta === '3' ? 'checked' : 'unchecked' }
                        onPress={() => setpregunta('3')}
                        color='black'
                    />
                </View>
                <View style={styles.opciones}>
                    <Text style={styles.numero}>4</Text>
                    <RadioButton
                        value="fourth"
                        status={ pregunta === '4' ? 'checked' : 'unchecked' }
                        onPress={() => setpregunta('4')}
                        color='black'
                    />
                </View>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    numero:{
        fontFamily: 'Inter-Regular',
        fontSize: 14
    },
    texto: {
        marginTop:0,
        fontSize: 15,
        marginLeft:5,
        marginRight:5,
        fontFamily: 'Inter-Regular'
    },
    pregunta:{
        flex: 1,
        flexDirection:'row',
        marginTop:2,
        marginLeft:10
    },
    opciones:{
        flex: 0.2,
        alignItems: 'center'
    }
})

export default PreguntaTest;