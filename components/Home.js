import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux'
import db from '../db.json'
import firebase from '../Firebase';

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
            data: [],
            selected: (new Map(): Map<string, boolean>)
		}
	}

	componentDidMount(){ 
		this.readDatafrom_firedataBase()
	}

	readDatafrom_firedataBase(){
	  this.setState({loading:true})
	   firebase.database().ref('UsersList/').once('value').then(snapshot => {
       let user_Details = snapshot.val()
       var response = Object.entries(user_Details).map(item => ({...item[1], id: item[0]}));
        this.setState({data: response, loading:false},()=>{
        	//console.log('dataa: : ', this.state.data)
        });
       });
	}

	editItem(item){
		console.log('edit_item', item.item)
		Actions.adduser({item:item.item, is_useredit:false})

	}


	deleteItem(item) {
		var Id = item.item.id
		  this.setState({
		    loading: true
		  });
		  firebase.database().ref(`/UsersList/${Id}`).remove().then(() => {
		    this.setState({
		      loading: false
		    },()=>{
		    	this.readDatafrom_firedataBase()
		    	Alert.alert('POC_CRUD', "Document successfully deleted!");
		    });
		  }).catch((error) => {
		    console.error("Error removing document: ", error);
		    this.setState({
		      loading: false
		    });
		  });
    }


	_keyExtractor = (item, index) => item.id;

	_renderItem(item){
	  	return(
    		<View style={styles.row_parentview}>
    			<View style={styles.rowdata_view}>
    			 <Image
				    source={{ uri: 'https://media.wired.com/photos/5b8999943667562d3024c321/master/w_2560%2Cc_limit/trash2-01.jpg' }}
				    style={styles.profile_icon}
				  />
				  <View style={styles.user_view}>
					  <Text style={styles.lightText}> 
					     {item.item.lname} {item.item.fname}
					  </Text>
					   <Text style={styles.lightText}> 
					     {item.item.email}
					  </Text>
				  </View>

				  <View style={styles.icons_row}>
				  	   <TouchableOpacity onPress={this.editItem.bind(this, item)}>
						  <Image
						    source={require('../assets/edit_icon.png')}
						    style={styles.icon}
						  />
					  </TouchableOpacity>
					  <TouchableOpacity onPress={this.deleteItem.bind(this, item)}>
						  <Image
						    source={require('../assets/delete_icon.png')}
						    style={styles.icon}
						  />
					  </TouchableOpacity>
				  </View>
    			</View>

    		</View>
	    )
	  }

	_displayLoading() {
	    if (this.state.loading) {
	      return (
	        <View style={styles.loading_container}>
	          <ActivityIndicator size='large' />
	        </View>
	      )
	    }
	}

	render(){
		return(
		       <View style={styles.container}>
		       {this._displayLoading()}
		       	<FlatList
			        data={this.state.data}
			        extraData={this.state}
			        keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
			      />    
			      <TouchableOpacity onPress={this.addnewUser} style={styles.addnewbutton}>
			      <Text style={styles.userText}>Add New User</Text>
			      </TouchableOpacity>
		       </View>
		)
	}

	addnewUser(){
		Actions.adduser()
	}
}

const styles = StyleSheet.create({
	container:{
	  flex: 1,
	  backgroundColor: "#192338",
	  padding:8,
	  paddingVertical:10,
	  position: "relative"
	},
	addnewbutton:{
		height:45,
		width:240,
		borderRadius:4,
		borderColor:'green',
		borderWidth:2,
		alignSelf:'center',
		justifyContent:'center'
	},
	userText:{
		fontSize:16,
		fontWeight:'600',
		color:'white',
		textAlign:'center'
	},
	lightText:{
		fontSize:13,
		fontWeight:'900',
		color:'white',
		textAlign:'left'
	},
profile_icon:{ width: 50, height: 50, margin: 6, borderRadius:25 },
 loading_container:{
 	flex:1, 
 	justifyContent:'center'
 },
 user_view:{
 	flex:1, 
 	justifyContent:'center', 
 	flexDirection:'column'
 },
 icon:{ width: 30, height: 30, margin: 6, borderRadius:25 },
 icons_row:{flex:1, justifyContent:'flex-end', alignItems:'center', flexDirection:'row'},
 rowdata_view:{flex:1, flexDirection:'row', justifyContent:'flex-start', backgroundColor:'green', padding:10, marginVertical:6, borderWidth:1, borderRadius:10},
 row_parentview:{flex:1, justifyContent:'center'}
})