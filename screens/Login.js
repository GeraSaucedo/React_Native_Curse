import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
import { Card } from 'react-native-elements';
const Form = t.form.Form;
import * as  firebase from 'firebase';
import Toast from 'react-native-simple-toast';

export default class Login extends Component {
    constructor() {
        super();

        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password
        });

        this.options = {
            fields: {
                email: {
                    help: 'Introduce tu email',
                    error: 'Email incorrecto',
                    autoCapitalize: 'none',

                },
                password: {
                    help: 'Introduce tu contraseña',
                    error: 'contraseña incorrecta',
                    password: 'true',
                    secureTextEntry: true,

                }
            }
        };
    }

    login () {
        const validate = this.refs.form.getValue();
        if(validate) {
            firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
                .then (() => {
                    Toast.showWithGravity("Bienvenido",Toast.LONG,Toast.BOTTOM);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if(errorCode === 'auth/wrong-passoword') {
                        Toast.showWithGravity('Password Incorrecto', Toast.LONG, Toast.BOTTOM);
                    } else {
                        Toast.showWithGravity(errorMessage, Toast.LONG, Toast.BOTTOM);
                    }
                });
        }
    }

    render () {
        return (
            <BackgroundImage source={require('../assets/images/bg3.jpg')}>
                <View>
                    <Card wrapperStyle={{paddingLeft:10}} title="Iniciar sesion">
                        <Form
                            ref="form"
                            type={this.user}
                            options={this.options}
                        />
                        <AppButton
                        bgColor="blue"
                        title="Login"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor="#fff"
                    ></AppButton>

                    </Card>
                </View>

            </BackgroundImage>
        );
    }


}
