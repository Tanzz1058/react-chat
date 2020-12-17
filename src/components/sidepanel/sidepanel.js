import React from 'react';
import {Menu} from 'semantic-ui-react';
import Userpanel from './Userpanel';
import Channels from './Channels';

class Sidepanel extends React.Component{
    render(){
        return(
            <Menu
            inverted
            sixe="large"
            fixed="left"
            vertical
            style={{backgroundColor:"4c3c4c", fontSize: "1.2rem"}}>
                <Userpanel currentUser = {this.props.currentUser}/>
                <Channels currentUser = {this.props.currentUser}/>
            </Menu>
        )
    }
}
export default Sidepanel;