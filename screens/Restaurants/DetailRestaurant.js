import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from "react-native";
import BackgroundImage from '../../components/BackgroundImage';

export default class DetailRestaurant extends Component {
    constructor (props) {
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            restaurant: params.restaurant
        };
    }


    editRestaurant () {

    }

    goHome () {

    }

    render () {
        const {restaurant} = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/bg3.jpg')}>
                <ScrollView>

                </ScrollView>
            </BackgroundImage>
        )
    }

}