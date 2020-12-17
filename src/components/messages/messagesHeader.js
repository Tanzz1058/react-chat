import React from 'react';
import { Input,Segment, Header, Icon } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

class MessagesHeader extends React.Component{
    render(){
        return(
            <Segment clearing>
                <Header fluid = 'true' as='h2' floated ='left' style ={{marginBottom: '0'}}>
                    <span>
                        Channel
                        <Icon name = 'star outline' color = 'black'/>
                    </span>
                    <HeaderSubHeader>
                        2 Users
                    </HeaderSubHeader>
                </Header>
                <Header floated='right' >
                    <Input
                    name = 'searchTerm'
                    icon = 'search'
                    size = 'mini'
                    placeholder = 'Search '
                    />
                </Header>
            </Segment>
        )
    
    }
}

export default MessagesHeader;