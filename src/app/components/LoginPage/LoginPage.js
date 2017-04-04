import React from 'react'
import 'bootstrap/less/bootstrap.less';
import {IndexLink, browserHistory} from 'react-router'
import {
    FormGroup,
    Form,
    Col,
    Row,
    Button,
    ControlLabel
} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/fa/facebook-official';
import utils from '../Utils'


export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            mas:'You can login here...',
            isAdmin: 0
        };
    }

    componentWillMount() {
        console.log("[LoginPage]: MOUNTING");
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
    facebook_login(){
        FB.login(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                console.log('Success')
            } else if (response.status === 'not_authorized') {
                console.log('not authorized')
            } else {
                console.log('You are not logged into Facebook.');
            }
        }, {scope: 'publish_actions'});

    }

    render(){
        var  username = null;
        // check if the user have login, if not, redirect him to the login page
        if (window.sessionStorage.getItem('username')) {
            // alert("you are not log in yet");
            // msg = 'you are not loggin yet';
            browserHistory.push('/');
        }

        let verify = (data) =>{
            if(data.adminCorrect == true){
                this.setState({isAdmin: 1});
            }
            if(data.correct == false){
                this.setState({mas: data.msg});
            }else{
                if(username == null){
                    username = this.refs.username.value;
                }
                window.sessionStorage.setItem('uID',data.uID);
                window.sessionStorage.setItem('username',username);
                browserHistory.push('/');
            }
        };
        let fire = () =>  utils.sendJSON('/api/login',{
            username: this.refs.username.value,
            password: this.refs.password.value
        },verify);
        let login = () => this.facebook_login();
        let FB_fire = function(response){
            login();
            username = response.email;
            utils.sendJSON('/api/login',{
                username: response.email,
                password: response.id
            },verify);
        };

        let mas = this.state.mas;
        return(

            <Form horizontal className="login">
                <FormGroup>
                    <Col xsOffset={2} sm={8}>
                        {mas}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                        Username
                        </Col>
                        <Col sm={10}>
                            <input ref="username" type="email" placeholder="Username" />
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <input ref="password" type="password" placeholder="Password" />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" onClick = {fire}>
                            Sign in
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" onClick={() => browserHistory.push('/resetpassword')} >
                            Forget Password
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <FacebookLogin
                            appId="1734208480228199"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={FB_fire}
                            cssClass="my-facebook-button-class"
                            icon={<TiSocialFacebookCircular size={30}/>}
                        />
                    </Col>

                </FormGroup>


            </Form>

        )
    }
}
