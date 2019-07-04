import React, {Component} from 'react'
import {View,Text,ActivityIndicator} from 'react-native'
import {Button} from 'react-native-elements'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import {connect} from 'react-redux'
import * as actions from '../actions'

class MapScreen extends Component{
	state = {
		mapLoaded:false,
		region:{
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta:0.09
		}
	}
	componentDidMount(){
		this.setState({mapLoaded:true})
	}
	onRegionChangeComplete(region){
		this.setState({region})
	}

	onButtonPress = () =>{
		this.props.fetchJobs(this.state.region)
		let response = fetch('https://exp.host/--/api/v2/push/send',{
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				to:'ExponentPushToken[U11_2HG2wWdgfEKXNWfgK-]',
				sound:'default',
				title:'Demo',
				body:'Abdo'
			})
			})

	}
	render(){
		if(!this.state.mapLoaded){
			return(
				<View style={{flex:1,justifyConten:'center'}}>
					<ActivityIndicator />
				</View>
				)
		}
		return(
				<View style={{flex:1}}>
					<MapView
					provider={PROVIDER_GOOGLE}
					key={'YAIzaSyDQrn6UtJT-SW8jB4ZeixX498jaZ-gHDc8'}
					region={this.state.region}
					style={{flex:1}} 
					onRegionChangeComplete={()=>this.onRegionChangeComplete.bind(this)}
					/>
					<View style={styles.buttonContainer}>
						<Button 
							large
							title = "Search This Area"
							backgroundColor = "#009688"
							icon = {{name:'search'}}
							onPress = {this.onButtonPress}
						/>
					</View>
				</View>

			)
	}
}

const styles = {
	buttonContainer:{
		position:'absolute',
		bottom:20,
		left:0,
		right:0
	}
}
export default connect(null,actions)(MapScreen);