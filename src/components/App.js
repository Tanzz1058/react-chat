import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {Grid} from 'semantic-ui-react';
import Colorpanel from './colorpanel/colorpanel';
import Metapanel from './metapanel/metapanel';
import Sidepanel from './sidepanel/sidepanel';
import Messages from './messages/messages';

function App({currentUser, currentChannel}) {
  return (
    <Grid columns="equal" className="app" style={{backgroundColor: '#eee'}}>
      <Colorpanel/>
      <Sidepanel 
      key = {currentUser && currentUser.uid}
      currentUser={currentUser}/>
      <Grid.Column style={{marginLeft: 320}}>
        <Messages 
        key ={currentChannel && currentChannel.id}
        currentUser={currentUser}
        currentChannel = {currentChannel}/>
      </Grid.Column>
      <Grid.Column width={4}>
        <Metapanel/>
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = state =>({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})
export default connect(mapStateToProps)(App);
