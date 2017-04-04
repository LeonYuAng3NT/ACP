import React from 'react';
import style from './style.css';

import 'bootstrap/less/bootstrap.less';

import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Carousel from 'react-bootstrap/lib/Carousel';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';

import {browserHistory} from 'react-router'
import utils from '../Utils';

import megpoidgumi from '../megpoidgumi.png';
// import dummyb1p1 from '../dummyb1p1.jpeg';
// import dummyb1p2 from '../dummyb1p2.jpeg';
// import dummyb1p3 from '../dummyb1p3.jpeg';
// import dummyb1p4 from '../dummyb1p4.jpeg';
// import dummyb2p1 from '../dummyb2p1.jpeg';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

export default class Product extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pID:'',
			dummyImage: undefined,
			ready: false,
			err: undefined,
			name: "",
			imageSource: "",
			artist: "",
			description: lorem,

		}



		if (!props.location.query.pID) {  /* Assign default image megpoid gumi */
			this.state.dummyImage = megpoidgumi
			this.state.ready = true
			this.state.title = 'Gumi Megpoid';
			this.state.imageSource = this.state.dummyImage;
			this.state.artist = 'Cyferouss';
			this.state.description = lorem;
		} else {
			/* Bind this as the call back function for image requesting... */
			this._handleProductInfo = this._handleProductInfo.bind(this)
			utils.fetchJSON(
				'/api/product?pID='+props.location.query.pID,
				this._handleProductInfo
			)
		}
	}

	componentDidMount() {
		console.log("[Product]: DID MOUNT")
		window.scrollTo(0, 0);
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1734208480228199',
				xfbml      : true,
				version    : 'v2.8'
			});
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					console.log('connected');
				} else if (response.status === 'not_authorized') {
					console.log('we are not logged in');
				} else {
					console.log('you are not logged in Facebook');
				}
			});
		};
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));


	}

	_handleProductInfo(oProductInfo) {
		console.log(oProductInfo);
		if (oProductInfo.err) {
			this.setState({
				err: true
			})
		} else {
			this.setState({
				pID:oProductInfo.pID,
				ready: true,
				name: oProductInfo.name,
				imageSource: oProductInfo.imageURL,
				artist: oProductInfo.artist,
				description: oProductInfo.description
			})
		}
	}
	facebook_upload(data) {
		console.log(data);


		FB.api('/me/feed', 'post', {link: 'http://localhost:8849/product?'+data.pID}, function(response) {
			if (!response || response.error) {
				if(response){
					console.log(response.error);
				}

				console.log('failed');
			} else {

				console.log('success');
			}
		});
	};

	_onFire(product) {
 		console.log("[CREATE COMMENT]: FIRE");
 		utils.sendJSON(
 			'/api/pull',
 			product,
 			(json) => {
 				console.log("[CREATE COMMIT]: CALLBACK FROM BACK");
 				console.log(json)
 			}
 		)
 	}

	render() {

		 var unhide = true;
        // check if the user have login, if not, redirect him to the login page
        if (window.sessionStorage.getItem('username') == null) {
            unhide = false;
        }
		var FB_fire = () => this.facebook_upload({
			pID: this.state.pID,
			photo:this.state.imageSource

		});
		var fire = () => this._onFire({
			name:'newgumi',
			parent:'P12345',
			root: 'P12345'
 		});

		var redirect = () =>{
			browserHistory.push("/create_product");
		};


		/* for comments, there will be a specific component... */
		let template = (
			<Grid>
				<PageHeader> {this.state.name} </PageHeader>
				<Row>
					<center>
						<Image src={this.state.imageSource} id={style.Constrained} rounded responsive />
					</center>

				</Row>

				<Col md={8}>
					<Panel header="Author" id={style.Margined}>
						<h2> {this.state.artist} </h2>
					</Panel>
					<Panel header="Description" id={style.Margined}>
						<p>
							{this.state.description}
						</p>
					</Panel>

				</Col>
				<Col md={4}>
					<div id={style.Margined}>
						<center>
							<ButtonGroup vertical block id={style.VerticalCentering}>
								<Button bsStyle='info' bsSize='large' onClick={() => browserHistory.push('/project/dummy_old')}>View Project</Button>
								<Button bsStyle='info' bsSize='large' onClick={() => browserHistory.push('/create_comment/'+this.state.pID+'/'+this.state.name)}>Create Comment</Button>
								<Button bsStyle='info' bsSize='large' onClick={(fire) => browserHistory.push('/commentsPage/'+this.state.pID+'/'+this.state.name)}>View All Comments</Button>
								<Button onClick= {FB_fire} bsSize='large' bsStyle="info" >Share on Facebook</Button>
							</ButtonGroup>
						</center>
					</div>
				</Col>
				<Col smOffset={2} sm={10}>
 				<Button type="submit" onClick= {fire} bsStyle="success" className={(unhide)?'':'hidden'}>Download this project</Button>
				<Button onClick= {redirect} bsStyle="info" className={(unhide)?'':'hidden'}>Return Uploading</Button>

 				</Col>
			</Grid>
		)


		let actualLayout = <div>loading...</div>

		if (this.state.err) {
			actualLayout = <div>error</div>
		} else if (this.state.ready) {
			actualLayout = template
		}

		return actualLayout
	}
}
