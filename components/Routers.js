import React, {Component} from 'react';
import {View} from 'react-native';
import{Router, Scene, Stack, ActionConst} from 'react-native-router-flux'
import Home from './Home'
import AddUser from './AddUser'
//import MainIndex from './MainIndex'


export default class Routers extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
		       <View style={{flex:1}}>
		       	 <Router>
				    <Stack key="root">
				      <Scene key="home" component={Home} initial type={ActionConst.RESET} hideNavBar={true}  />
				      <Scene key="adduser" component={AddUser} title="Add New User"  />
				    </Stack>
				 </Router>
		       </View>
		)
	}
}




