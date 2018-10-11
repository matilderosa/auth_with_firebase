
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import * as secrets from '../config';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: secrets.FIREBASE_API_KEY,
      authDomain: secrets.AUTH_DOMAIN ,
      databaseURL: secrets.DATABASE_URL,
      projectId: secrets.PROJECT_ID,
      storageBucket: secrets.STORAGE_BUCKET,
      messagingSenderId: secrets.MESSAGING_SENDER_ID
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
            Log Out
        </Button>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
