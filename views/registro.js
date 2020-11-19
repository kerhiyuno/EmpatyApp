import React, {useState,useContext} from 'react';
import {View,StyleSheet,Text,useWindowDimensions,TouchableHighlight} from 'react-native';
import {TextInput, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstilosContext from '../context/estilosContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const registro = ({navigation}) =>{

    const {colorb,colorBorderInput,colorTextoBoton,colorLetra,colorPrimaryinput,
        colorPlaceholderinput,colorError,colorIcono,colorFondo,colorTitulo} = useContext(EstilosContext);

    const {width, height} = useWindowDimensions();
    const textinputsize = height*0.07

    const [fullname,guardarFullname] = useState('');
    const [rut,guardarRut] = useState('');
    const [email,guardarEmail] = useState('');
    const [telefono,guardarTelefono] = useState('');
    const [password,guardarPassword] = useState('');
    const [password2,guardarPassword2] = useState('');
    const [fecha_nacimiento,guardarFecha] = useState('-');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const [dia,guardarDia] = useState("01");
    const [mes,guardarMes] = useState("01");
    const [año,guardarAño] = useState("2002");
   
    const [alerta,guardarAlerta] = useState(false);
    const [alertaedad,guardarAlertaedad] = useState(false);
    const [alertacontra,guardarAlertacontra] = useState(false);
    const [alertaemail,guardarAlertaEmail] = useState(false);
    const [alertarut,guardarAlertaRut] = useState(false);

    const [erroremail,guardarErrorEmail] =useState(false);
    const [errorRut,guardarErrorRut] =useState(false);
    const [errorContraseña,guardarErrorContraseña] =useState(false);

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        guardarDia(dia);
        guardarMes(mes);
        if(mes<10){
            mes='0'+mes
        }
        if(dia<10){
            dia='0'+dia
        }
        var año = date.getFullYear()
        guardarAño(año);
        var completo=año+'-'+mes+'-'+dia;
        guardarFecha(completo);
    };
    

    const mayor18=(año,mes,dia)=>{
        var actual=new Date();
        var añoactual=actual.getFullYear();
        var mesactual=actual.getMonth()+1;
        var diaactual=actual.getDate();
        if (añoactual-año>18){
            return 'si';
        }
        else if(añoactual-año==18){
            if(mesactual>mes){
                return 'si';
            }
            else if(mesactual==mes){
                console.log(diaactual);
                console.log(dia);
                console.log(diaactual<=dia);
                if(diaactual>=dia){
                    console.log("hola");
                    return 'si';
                }
            }
            return 'no';
        }
        else if (añoactual-año==17){
            console.log()
            if(mes>mesactual){
                return 'si';
            }
            else if(mes==mesactual){
                if(diaactual>=dia){
                    return 'si';
                }
            }
            return 'no';
        }
        else{
            return 'no'
        }
    }
    const fechaformateo=(fecha)=>{
        if(fecha==='-'){
            return '-';
        }
        var f=fecha.split('-');
        fecha = f[2]+"-"+f[1]+"-"+f[0];
        return fecha;
    }

    const validateEmail = email => {
        if (email===''){
            return true;
        }
        var re = /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        console.log(email);
        console.log(re.test(email));
        return re.test(email);
        };

    const verificarRut = (rut) => {
        console.log(rut);
        if(rut===''){
            guardarErrorRut(false);
            return true;
        }
        console.log(rut);
        // Despejar Puntos
        var valor = rut.replace('.','');
        // Despejar Guión
        valor = valor.replace('-','');
       
        // Aislar Cuerpo y Dígito Verificador
        var cuerpo = valor.slice(0,-1);
        var dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        rut = cuerpo + '-'+ dv;
        
        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) { 
            guardarErrorRut(true);
            console.log("error longitud");
            return false;
        }
        
        // Calcular Dígito Verificador
        var suma = 0;
        var multiplo = 2;
        
        // Para cada dígito del Cuerpo
        for(var i=1;i<=cuerpo.length;i++) {
        
            // Obtener su Producto con el Múltiplo Correspondiente
            var index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { 
                multiplo = multiplo + 1;
            } else { 
                multiplo = 2; 
            }
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    var dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { 
        guardarErrorRut(true); 
        console.log("error digito verificador"); 
        return false;
    }
    guardarErrorRut(false);
}

    const contraseñasIguales = (password,password2) => {
        if(password==='' || password2===''){
            guardarErrorContraseña(false);
            return
        }
        if(password!==password2){
            guardarErrorContraseña(true);
        }else{
            guardarErrorContraseña(false);
        }
    }


    //registra el cliente
    const registrar= async () =>{
        //validar
        if (fullname === '' || rut === '' || email === '' || telefono === '' || fecha_nacimiento ==='-'|| password === '' || password2 === ''){
            guardarAlerta(true);
            if(errorContraseña==true){
                guardarAlertacontra(true);
                if (mayor18(año,mes,dia)==='no'){
                    console.log("debe ser mayor de 18 años");
                    guardarAlertaedad(true);
                    if (erroremail==true){
                        guardarAlertaEmail(true);
                        if (errorRut==true){
                            guardarAlertaRut(true);
                            return
                        }
                        return
                    }
                    if (errorRut==true){
                        guardarAlertaRut(true);
                        return
                    }
                    if (errorRut==true){
                        guardarAlertaRut(true);
                        return
                    }
                    return
                }
                return
                if (erroremail==true){
                    guardarAlertaEmail(true);
                    if (errorRut==true){
                        guardarAlertaRut(true);
                        return
                    }
                    return
                }
                if (errorRut==true){
                    guardarAlertaRut(true);
                    return
                }
            }
            if (mayor18(año,mes,dia)==='no'){
                console.log("debe ser mayor de 18 años");
                guardarAlertaedad(true);
                if (erroremail==true){
                    guardarAlertaEmail(true);
                    if (errorRut==true){
                        guardarAlertaRut(true);
                        return
                    }
                    return
                }
                if (errorRut==true){
                    guardarAlertaRut(true);
                    return
                }
                return
            }
            if (erroremail==true){
                guardarAlertaEmail(true);
                if (errorRut==true){
                    guardarAlertaRut(true);
                    return
                }
                return
            }
            if (errorRut==true){
                guardarAlertaRut(true);
                return
            }
            return
        }
        if(errorContraseña==true){
            guardarAlertacontra(true);
            if (mayor18(año,mes,dia)==='no'){
                console.log("debe ser mayor de 18 años");
                guardarAlertaedad(true);
                if (erroremail==true){
                    guardarAlertaEmail(true);
                    return
                }
                return
                }
                if (erroremail==true){
                    guardarAlertaEmail(true);
                    return
            }
            return
        }
        if (mayor18(año,mes,dia)==='no'){
            console.log("debe ser mayor de 18 años");
            guardarAlertaedad(true);
            if (erroremail==true){
                guardarAlertaEmail(true);
                return
            }
            return
        }
        if (erroremail==true){
            guardarAlertaEmail(true);
            return
        }

        //generar
        const usuario={fullname,rut,email,telefono,password,fecha_nacimiento};
        console.log(usuario)
        //redireccionar
        navigation.navigate('Registro 2/7',{usuario});
        return;
    }
    return (
        <KeyboardAwareScrollView>
        <View style={[globalStyles.contenedor,{backgroundColor: colorFondo,justifyContent:'space-around'}]}>
            <TextInput
                label="Nombre Completo"
                onChangeText={(texto) => guardarFullname(texto)}
                style={[globalStyles.input,{marginTop:10,borderColor: colorBorderInput,height: textinputsize}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
            />
            <TouchableHighlight underlayColor = {'transparent'} style={[styles.botonC,{backgroundColor: colorb,height: height*0.05}]} onPress={showDatePicker} >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="calendar" color={colorIcono} size={RFPercentage(3)}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Fecha de nacimiento</Text>
                </View>
            </TouchableHighlight>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date(año+"-"+mes+"-"+dia+"T10:00:00.000Z")}
            />
            <Text style={{marginBottom:5,marginLeft:13,fontSize:15,marginLeft:15,fontFamily:'Inter-Regular',color: colorLetra}}>Fecha seleccionada: {fechaformateo(fecha_nacimiento)}</Text>
            <TextInput
                label="rut (Ej:12345678-9)"
                onChangeText={(texto) => {guardarRut(texto);verificarRut(texto);}}
                style={[globalStyles.input,{marginBottom:0,borderColor: colorBorderInput,height: textinputsize}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
            />
            <Text  style={{marginBottom:1,marginLeft:13,fontSize:13,color: colorError}}>{errorRut==true ? 'Rut no válido' : ''}</Text>
                <TextInput
                    label="Correo"
                    onChangeText={(texto) => {guardarEmail(texto); console.log("cambio",texto); if (!validateEmail(texto)) {
                        guardarErrorEmail(true);
                        }else{
                            guardarErrorEmail(false);
                        } }}
                    style={[globalStyles.input,{marginBottom:0,borderColor: colorBorderInput,height: textinputsize}]}
                    theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                />
                <Text  style={{marginBottom:0,marginLeft:13,fontSize:13,color: colorError}}>{erroremail==true ? 'Correo no válido' : ''}</Text>
            <TextInput
                label="Teléfono"
                onChangeText={(texto) => guardarTelefono(texto) }
                style={[globalStyles.input,{borderColor: colorBorderInput,height: textinputsize}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                keyboardType='phone-pad'
            />
            <TextInput
                label="Contraseña"
                onChangeText={(texto) => {guardarPassword(texto); contraseñasIguales(password2,texto)}}
                style={[globalStyles.input,{borderColor: colorBorderInput,height: textinputsize}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                secureTextEntry={true}
            />
            <TextInput
                label="Repetir contraseña"
                onChangeText={(texto) => {guardarPassword2(texto); contraseñasIguales(password,texto)}}
                style={[globalStyles.input,{marginBottom:0,borderColor: colorBorderInput,height: textinputsize}]}
                theme={{colors: {text: colorLetra, primary: colorPrimaryinput,placeholder: colorPlaceholderinput}}}
                secureTextEntry={true}
            />
            <Text  style={{marginBottom:1,marginLeft:13,fontSize:14,color: colorError}}>{errorContraseña==true ? 'Las contraseñas deben ser iguales' : ''}</Text>
            <TouchableHighlight  style={[styles.botonS,{backgroundColor:colorb,height: height*0.05}]} underlayColor = {'transparent'} onPress={()=>registrar()}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="greater-than" color={colorIcono} size={RFPercentage(3)}></Icon>
                    <Text style={[styles.textoC,{color: colorTextoBoton}]}>Siguiente</Text>
                </View>
            </TouchableHighlight >
            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertaedad} onDismiss={() => guardarAlertaedad(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Debes ser mayor de 18 años</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertaedad(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertacontra} onDismiss={() => guardarAlertacontra(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>Las contraseñas deben ser iguales</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertacontra(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertaemail} onDismiss={() => guardarAlertaEmail(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El correo ingresado no es válido</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertaEmail(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={alertarut} onDismiss={() => guardarAlertaRut(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={globalStyles.textoAlerta}>El rut ingresado no es válido</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlertaRut(false)} color='#3c2c18'>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
        </KeyboardAwareScrollView>

    );
}

const styles=StyleSheet.create({
   
    botonC: {
        height: RFPercentage(5),
        marginBottom: 0,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#e35d17',
        borderRadius: 8
    },
    textoC: {
        marginBottom: 2,
        marginHorizontal: 5,
        fontSize: RFPercentage(2.5),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-Light'
    },
    botonS:{
        height: RFPercentage(5),
        marginTop: 5,
        marginHorizontal: 9,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e35d17",
        borderRadius: 8
    },
})

export default registro;