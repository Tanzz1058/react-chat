import React from 'react';
import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
import {connect} from 'react-redux';


class Userpanel extends React.Component{

    state = {
        user: this.props.currentUser
    }

    dropDownOptions = () =>[
        {
            key: "User",
            text: <span><strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "Avatar",
            text: <span>Change avatar</span>
        },
        {
            key: "SignOut",
            text: <span onClick ={this.handleClick}>Sign Out</span>
        }
    ];

    handleClick = () =>{
        firebase 
        .auth()
        .signOut()
        .then(() => console.log('signed out'))
        .catch(err => console.log(err))
    }

    render(){
        
        return(
            <Grid style={{backgroundColor: '4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2em', margin: '0'}}>
                        <Header inverted floated="left" as="h2">
                            <Icon name ="chat"/> 
                            <Header.Content>
                                Devchat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    <Header inverted as="h4" style={{padding: "0.25em"}}>
                        <Image src= {this.state.user.photoURL} spaced ="right" avatar/>
                        <Dropdown trigger={
                       <span>{this.state.user.displayName}</span> }
                       options = {this.dropDownOptions()}/>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state =>({
    user: state.user.currentUser
})
export default connect(mapStateToProps)(Userpanel);