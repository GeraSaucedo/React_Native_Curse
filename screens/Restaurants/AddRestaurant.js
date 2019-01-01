import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from '../../components/AppButton';
import { VRFieldOfView, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import { options, Restaurant} from '../../forms/restaurant';
import t from 'tcomb-form-native';
import {Card} from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-simple-toast';
