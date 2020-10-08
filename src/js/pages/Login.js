import React from 'react';
import Parse from 'parse';
import { Redirect, Link } from "react-router-dom";

//Styles
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import loginStyles from './Login.module.css';
import { styles } from '../../styles';
import Typography from '@material-ui/core/Typography';


//Redux
import { connect } from "react-redux";
import { getAuthInfo, setAuth,setProfile } from '../reducers/login';

class LoginForm extends React.Component{
    constructor(props){
		super(props);

		Parse.initialize(process.env.REACT_APP_parseAppId , process.env.REACT_APP_parseJavascriptKey);
        Parse.serverURL = process.env.REACT_APP_parseServerUrl;

        this.state = { 
            username: '', 
            password: '',
            toDashboard: false
        }
    }

    handleChange = (e, { name, value }) => this.setState({ 
        [name]: value 
    })

    logIn =  async () => {
        // Create a new instance of the user class
        var that = this;
        await Parse.User.logIn(this.state.username, this.state.password).then(async function(user)  {
            await that.props.setAuth(true);
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            that.setState({
				toDashboard:true
            });

            const loggedInUser = {
                username: user.get("username"),
                email: user.get("email"),
                first_name: user.get("firstname"),
                last_name: user.get("lastname"),
                role: user.get("role"),
                organization: String(user.get("organization")), 
            };

            
            that.props.setProfile(loggedInUser);
        })
    }
    render(){
        if (this.state.toDashboard === true) {
            return <Redirect to='/app/formcreation' />
        }

        const { username, password } = this.state;

        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' className={loginStyles.grid}>
                <Grid.Column style={{ maxWidth: 450 }}>
                {/* <Header as={Link} to="/" className={loginStyles.header} textAlign='center'>
                    <h1>PUENTE</h1>
                </Header> */}
                <Header as={Link} to="/">
                    <Typography  variant="h1" >
                        <div style={{color:styles.theme.primaryAppColor}}>PUENTE</div>
                    </Typography>
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='username' value={username} onChange={this.handleChange} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password' 
                            value={password}
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.logIn} className={loginStyles.button} fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                {/* <Message>
                    New to us? <a href='/'>Sign Up</a>
                </Message> */}
                </Grid.Column>
            </Grid>
        )
    }
}  
    const mapStateToProps = (state) => {
        return { 
            authInfo: getAuthInfo(state)
        }
    };
  
    const mapDispatchToProps = {
        setAuth,
        setProfile
    };
  
  export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
  