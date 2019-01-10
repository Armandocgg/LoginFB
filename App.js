import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { Facebook } from 'expo'

export default class App extends React.Component {

  state = {
    userInfo: null,
  };
  
  _login = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('694641230712598', {
        permissions: ['public_profile']
      });

      console.log(token, type)

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture{url}`);
      const userInfo = await response.json();
      this.setState({ userInfo });
      Alert.alert(
        'Logged in!',
        `Hi ${userInfo.name}!`,
      );
    } else {
      // type === 'cancel'
    }
    }catch({ message }){
      console.log(message)
      alert(`Facebook Login Error: ${message}`);
    }
  }
  
  _logup = () => {
    this.setState({userInfo: null});
  }

  render() {
    return (
      <View style={styles.container}>
      {!this.state.userInfo ? (
        <Button title="Facebook Login" onPress={this._login} />
      ) : (
        this._renderUserInfo()
      )}
      </View>
    );
  }

  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: this.state.userInfo.picture.data.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20 }}>{this.state.userInfo.name}</Text>
        <Text>ID: {this.state.userInfo.id}</Text>
        <Button title="Cerrar" onPress={this._logup} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
