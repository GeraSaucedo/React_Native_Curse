import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import AppButton from "../components/AppButton";
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import facebook from '../utils/facebook'


export default class Start extends Component{

    static navigationOptions = {
        title: 'Expo App'
    };

    login() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        });
        this.props.navigation.dispatch(navigateAction)
    }

    register() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        });
        this.props.navigation.dispatch(navigateAction)
    }

    async facebook () { 
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebook.config.application_id,
            { permissions: facebook.config.permissions }
        )

        if(type === "success") {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInAndRetrieveDataWithCredential(credentials)
                .catch(error => {
                    Toast.showWithGravity('Error accediendo con facebook', Toast.LONG, Toast.BOTTOM);
                })
        } else if(type === "cancel") {
            Toast.showWithGravity('Inicio de sesión cacnelado', Toast.LONG, Toast.BOTTOM);
        } else {
            Toast.showWithGravity('Error Desconocido', Toast.LONG, Toast.BOTTOM);
        }
    }

    render (){
        return (
            <BackgroundImage source={require('../assets/images/bg3.jpg')}>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <AppButton
                        bgColor="red"
                        title="Entrar"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor="#fff"
                    ></AppButton>
                     <AppButton
                        bgColor="green"
                        title="Registrarme"
                        action={this.register.bind(this)}
                        iconName="user-plus"
                        iconSize={30}
                        iconColor="#fff"
                    ></AppButton>
                     <AppButton
                        bgColor="rgba(67, 67, 146, 0.7)"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="facebook"
                        iconSize={30}
                        iconColor="#fff"
                    ></AppButton>
                </View>
            </BackgroundImage>
        )    
}



}