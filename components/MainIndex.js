import React, {Component} from 'react';
import {Button, View, Text, StyleSheet,TextInput} from 'react-native';
import firebase from '../Firebase';

class MainIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticatedUser: false,
      email:'',
      password:'',
      errorMessage:null
    };
  }

  onAnonymousLogin = () => {
    console.log('db: ', firebase.database())

    firebase.auth()
      //.signInAnonymously()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log('login Successfully' , res);
        this.setState({
          isAuthenticatedUser: true,
        });
      })
      .catch(error => {
        console.log(`firebase auth error = $(error)`);
      });
  };

  writeUserData =() => {
    //firebase.database().ref('Users/').set({
    // firebase.database().ref('UsersList/').push({
    //     email:'kiranmeduri@gmail.com',
    //     fname:'Kiran',
    //     lname:'Meduri'
    // }).then((data)=>{
    //     //success callback
    //     console.log('data: ' , data)
    //     //this.readUserData()
    //     //this.updateSingleData()
    // }).catch((error)=>{
    //     //error callback
    //     console.log('error ' , error)
    // })
}

readUserData() {
    firebase.database().ref('UsersList/').on('value', function (snapshot) {
        console.log('Users', snapshot.val())
    });
}

updateSingleData(email){
    firebase.database().ref('Users/').update({
        email:'allulavaraj@gmail.com',
    });
}

deleteData(){
    firebase.database().ref('Users/').remove();
    //.ref(`/UsersList/${id}`).remove()
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        
        <Button
          title="Already have an account? Login"
          onPress={this.writeUserData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default MainIndex;
