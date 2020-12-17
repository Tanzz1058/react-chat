import React from 'react';
import { Button, Input, Modal , Icon} from 'semantic-ui-react';
import mime from 'mime-types';

class FileModal extends React.Component{
    state = {
        authorized: ['image/png', 'image/jpeg'],
        file: null
    }
    addFile = event =>{
        const file = event.target.files[0];
        if(file){
            this.setState({file: file});
        }
    }
    sendFile = () =>{
        const {file} = this.state;
        if(file !== null){
            if(this.isAuthorized(file.name)){
                const metadata = {contentType: mime.lookup(file.name)};
                this.props.uploadFile(file, metadata);
                this.props.closeModal();
                this.clearFile()
            }
        }
    }

    clearFile = () =>{
        this.setState({file: null})
    }

    isAuthorized = fileName =>{
        return this.state.authorized.includes(mime.lookup(fileName))
    }
    render(){
        const {modal, closeModal} = this.props;
        return(
            <Modal basic open = {modal} onClose = {closeModal}>
                <Modal.Header>
                    Select an image file
                </Modal.Header>
                <Modal.Content>
                    <Input
                    fluid 
                    name= 'file'
                    label = 'File types: jpg, png'
                    type = 'file'
                    onChange = {this.addFile}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button color = 'green' inverted onClick = {this.sendFile}>
                        <Icon name= 'checkmark'/>Send
                    </Button>
                    <Button color = 'red' inverted onClick = {closeModal}>
                        <Icon name= 'remove'/>Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default FileModal;