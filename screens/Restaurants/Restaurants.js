import React, { Component } from 'react';
import PreLoader from '../../components/PreLoader';
import t from 'tcomb-form-native';
import { SearchBar, ListItem } from 'react-native-elements';
const Form = t.form.Form;
import * as  firebase from 'firebase';
import { StyleSheet, FlatList } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty'
import RestaurantAddButton from '../../components/Restaurant/RestaurantAddButton'
import { NavigationActions } from 'react-navigation';

export default class Restaurants extends Component {
    constructor () {
        super();
        this.state = {
            restaurants: [],
            loaded: false,
            restaurant_logo: require('../../assets/images/logo.jpg'),
            search: ''
        };

        this.refRestaurants = firebase.database().ref().child('restaurants');
    }

    componentDidMount () {
        const {search} = this.state;

        if ( ! search){
            this.refRestaurants = firebase.database().ref().child('restaurants');
        } else {
            this.refRestaurants = firebase.database().ref().child('restaurants')
                .orderByChild('name')
                .startAt(search)
                .endAt(`${search}\uf8ff`)
        }

        this._loadFirebaseRestaurants();
    }

    _loadFirebaseRestaurants () {
        this.refRestaurants.on('value',snapshot => {
            let restaurants = [];
            snapshot.forEach(row => {
                restaurants.push({
                    id: row.key,
                    name: row.val().name,
                    address: row.val().address,
                    capacity: row.val().capacity,
                    description: row.val().description
                })
            });

            this.setState ({
                restaurants,
                loaded: true
            });
        })
    }

    addRestaurant () {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddRestaurant'       
        });
        this.props.navigation.dispatch(navigateAction);
    }

    restaurantDetail (restaurant) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailRestaurant',
            params: {restaurant}      
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderRestaurant (restaurant) {
        return (
            <ListItem  
                containerStyle={styles.item}
                titleStyle={styles.title}
                title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
                leftAvatar={{source: this.state.restaurant_logo}}
                onPress={() => this.restaurantDetail(restaurant)}
                rightIcon={{name: 'arrow-right', type: 'font-awesome', marginRight: 10 ,  style: styles.listIconStyle}}
            />
        )
    }

    searchRestaurants (search) {
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        });

        if (search.length >= 3) { //buscara hasta que tse escriban mas de 3 caracteres
            this._filterRestaurants(search);
            setTimeout(() => {
                this._loadFirebaseRestaurants();
            },1000);
        }

        this._loadFirebaseRestaurants();
    }

    _filterRestaurants (search) {
        this.refRestaurants = firebase.database().ref().child('restaurants')
                .orderByChild('name')
                .startAt(search)
                .endAt(`${search}\uf8ff`);
    }

    resetSearch () {
        this.setState({
            search: ''
        });
        this.refRestaurants = firebase.database().ref().child('restaurants');
        setTimeout(() => {
            this._loadFirebaseRestaurants();
        },1000);
    }

    render () {
        const {loaded, restaurants} = this.state;

        //Si no ha cargado
        if ( !loaded) {
            return <PreLoader/>
        };

        const searchBar = (
            <SearchBar
            platform='android'
            showLoading
            cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
            placeholder='Buscar restaurante'
            onChangeText={(text) => this.searchRestaurants(text)}
            onClear={this.resetSearch.bind(this)}
            value={this.state.search}
         />
        )

        //si no tenemos restaurantes
        if( !restaurants.length){
            
            return (
                <BackgroundImage source={require('../../assets/images/bg2.jpg')}>
                    {searchBar}
                    <RestaurantEmpty text="No hay restaurantes" />
                    <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}/>
                </BackgroundImage>
            );
        }

        //cuando ya existen restaurantes
        return (
            <BackgroundImage source={require('../../assets/images/bg2.jpg')}>
                {searchBar}
                <FlatList 
                    data={restaurants}
                    renderItem={(data) => this.renderRestaurant(data.item)}
                    keyExtractor={(data) => data.id}
                />
                 <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}/>
            </BackgroundImage>
        );
    }

    
} 

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 38, 74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206,206,206, 0.6)',
    }
});