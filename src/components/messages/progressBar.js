import React from 'react';
import {Progress} from 'semantic-ui-react';

const progressBar = ({uploadStatus, percentageUploaded}) =>(
    uploadStatus === 'uploading' &&
    <Progress
    size = 'medium'
    indicating
    percent = {percentageUploaded}
    inverted
    progress
    className = 'progress_bar'/>
)

export default progressBar;