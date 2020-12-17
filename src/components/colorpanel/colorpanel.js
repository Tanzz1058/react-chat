import React from 'react';
import {Button, Sidebar,Menu, Divider} from 'semantic-ui-react';

class Colorpanel extends React.Component{
    render(){
        return(
            <Sidebar
            as= {Menu}
            icon = 'labeled'
            vertical
            inverted
            visible
            width = 'very thin'
           >
                <Divider/>
                <Button icon = 'add' color='blue' size='small'/>
            </Sidebar>

        )
    }
}
export default Colorpanel;