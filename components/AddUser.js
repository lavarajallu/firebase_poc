import React, {Component} from 'react';
import {Alert, View,TextInput, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux'
import firebase from '../Firebase';



export default class AddUser extends Component {


	constructor(props){
		super(props);
		this.state = {
			loading:false,
			user_Fields:{
				fname:'',
				lname:'',
				email:''
			}
			
		}
	}

componentDidMount(){
	console.log('this.props.item: ', this.props.item)
	if(this.props.item != undefined){
		var data = this.props.item
		this.setState({
			user_Fields:data
		})
	}
}

 addUser(){
 	let { fname, lname, email } = this.state.user_Fields;
 	if(fname == null || fname == ''){
 		Alert.alert("POC_CRUD", "please enter first name");
 	} 
 	else if(lname == null || lname == ''){
 		Alert.alert("POC_CRUD", "please enter last name");
 	}
 	else if(email == null || email == ''){
 		Alert.alert("POC_CRUD", "please enter email");
 	}
 	else if (!this.validateEmail(email)) {
      Alert.alert("POC_CRUD", "Please enter valid E-Mail Address");
    } else {
    	    this.setState({loading:true})
    	    let user_Obj = { email:email, fname:fname, lname:lname}
    	    if(this.props.is_useredit && this.props.is_useredit == false){
    	    	firebase.database().ref('UsersList/').update(user_Obj).then((data)=>{
			        	if(data){
			        	    console.log('updated: ', data);
			        	    this.setState({loading:false})
			        	    Alert.alert('POC_CRUD', 'User updated Successfully.');
			        	    Actions.home({data:data})
			        	}
		        	}).catch((error)=>{
		           //error callback
		             console.log('error ' , error)
		        })

    	    }else {
    	    	 firebase.database().ref('UsersList/').push(user_Obj).then((data)=>{
			        	if(data){
			        	    console.log('added: ', data);
			        	    this.setState({loading:false})
			        	    Alert.alert('POC_CRUD', 'User added Successfully.');
			        	    Actions.home({data:data})
			        	}
		        	}).catch((error)=>{
		           //error callback
		             console.log('error ' , error)
		          })
    	    }

    }
  
};

  handleChange(name, e) {
    var change = this.state.user_Fields;
    var string1 = e;
    change[name] = string1;
    this.setState({ user_Fields: change });
  }

  validateEmail = email => {
    var re = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    return re.test(email);
  };



	render(){
		return(
		       
		       <View style={styles.container}>
		              <View>
				         <ActivityIndicator color="red" size="large" animating={this.state.loading} />
				      </View>
		       	    <TextInput
		       	       style = {styles.input} 
					   autoCapitalize="none" 
		               onSubmitEditing={() => this.lastname.focus()} 
		               autoCorrect={false} 
		               keyboardType='default' 
		               returnKeyType="next" 
		               placeholder='First Name' 
		               onChangeText={this.handleChange.bind(this, "fname")}
		               value={this.state.user_Fields.fname}
		               placeholderTextColor='grey'
				    />
				    <TextInput
				       style = {styles.input} 
					   autoCapitalize="none" 
					   ref={(input)=> this.lastname = input} 
		               onSubmitEditing={() => this.emailaddress.focus()} 
		               autoCorrect={false} 
		               keyboardType='default' 
		               returnKeyType="next" 
		               placeholder='Last Name' 
		               onChangeText={this.handleChange.bind(this, "lname")}
		               value={this.state.user_Fields.lname}
		               placeholderTextColor='grey'
				    />
			        <TextInput 
			           style = {styles.input} 
		               autoCapitalize="none" 
		               ref={(input)=> this.emailaddress = input} 
		               autoCorrect={false} 
		               keyboardType='email-address' 
		               returnKeyType="done" 
		               placeholder='Email Address' 
		               onChangeText={this.handleChange.bind(this, "email")}
		               value={this.state.user_Fields.email}
		                onSubmitEditing={() => {
		                  this.addUser();
		                }}
		               placeholderTextColor='grey'
		            />
		          <TouchableOpacity style={styles.buttonContainer} 
                     onPress={this.addUser.bind(this)}>
                     {this.props.is_useredit == false ? (
                     	<Text  style={styles.buttonText}>Update User</Text>
                     	):(
                     	<Text  style={styles.buttonText}>Add User</Text>
                     	)}
                 </TouchableOpacity> 
		       </View>
		)
	}
}
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 45,
        marginBottom: 10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:4,
        padding: 10,
        fontWeight:'600',
        fontSize:18,
        color: 'black'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        borderWidth:1,
        borderColor:'#2980b6',
        borderRadius:4,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:18
    }
 })
