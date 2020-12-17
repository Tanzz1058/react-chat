import React from 'react';
import {Button, Segment, Input} from 'semantic-ui-react';
import firebase from '../../firebase';
import FileModal from './FileModal';
import uuidv4 from 'uuid/v4';
import ProgressBar from './progressBar';
 
class MessagesForm extends React.Component{

    state = {
        messages : '',
        loading: false,
        errors: [],
        modal: false,
        uploadTask: null,
        uploadStatus: '',
        storageRef: firebase.storage().ref(),
        percentageUploaded: 0
    }

    openModal = () =>{
        this.setState({modal: true})
    }

    closeModal = () =>{
        this.setState({modal: false})
    }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value})
    }

    createMessage = (fileUrl = null) =>{
        const message = {
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL
            }
        }
        if(fileUrl !== null){
           message['image'] = fileUrl
        }else{
            message['content'] = this.state.messages
        }
        return message;
    }

    sendMessage = () =>{
        const {messagesRef, currentChannel} = this.props;

        if(this.state.messages){
            this.setState({loading: true});
            messagesRef.child(currentChannel.id).push()
            .set(this.createMessage())
            .then(() =>{
                this.setState({loading: false, errors: []})
            })
            .catch(err =>{
                this.setState({loading: false, errors: this.state.errors.concat(err)})
            })
        }else{
            this.setState({errors: this.state.errors.concat({message: 'Write a message'})})
        }
    }

    sendFileMessage = (downloadURL, ref, pathToUpload) =>{
        ref.child(pathToUpload)
        .push()
        .set(this.createMessage(downloadURL))
        .then(() =>this.setState({uploadStatus: 'done'}))
        .catch(err =>{
            console.log(err);
            this.setState({errors: this.state.errors.concat(err)})
        })
        
    }

    uploadFile = (file, metadata) =>{
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuidv4()}.jpg`;
        const pathToUpload = this.props.currentChannel.id;

        this.setState({
            uploadStatus: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {
            this.state.uploadTask.on('state_changed', snapshot => {
                const percentageUploaded = Math.round((snapshot.bytesTransferred /snapshot.totalBytes)*100);
                this.setState(({percentageUploaded}));
            },
            err =>{
                console.log(err);
                this.setState({
                    err: this.state.errors.concat(err),
                    uploadTask: null,
                    uploadStatus: 'error'
                })
            }, () =>{
                this.state.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                   this.sendFileMessage(downloadURL, ref, pathToUpload);
                  })
                  .catch((err) =>{
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadTask: null,
                        uploadStatus: 'error'
                    });
                    console.log(err);
                  })
            })
            
        } )
    }

   

    render(){
        return(
            <Segment className = 'message__form'>
                <Input
                fluid
                name = 'messages'
                label = {<Button icon = 'add'/>}
                labelPosition='left'
                style = {{marginBottom: '.7em'}}
                placeholder = 'Write your messages'
                onChange = {this.handleChange}
                value = {this.state.messages}
                className ={this.state.errors.some(error => error.message.includes("message")) ? 'error' : ''}/>
            <Button.Group widths = '2'>
                <Button
                color = 'orange'
                content = 'Add Reply'
                labelPosition = 'left'
                icon = 'edit'
                onClick = {this.sendMessage}
                disabled = {this.state.loading}/>
                <Button
                color = 'green'
                content = 'Add Media'
                labelPosition = 'left'
                icon = 'cloud upload'
                onClick = {this.openModal}/>

             <FileModal
                uploadFile= {this.uploadFile}
                modal = {this.state.modal}
                closeModal= {this.closeModal}/>
            </Button.Group>
            <ProgressBar
                 uploadStatus = {this.state.uploadStatus}
                 percentageUploaded = {this.state.percentageUploaded}
                />
            </Segment>
            
        )
    }
}

export default MessagesForm;