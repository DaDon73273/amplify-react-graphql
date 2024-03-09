import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { uploadData } from 'aws-amplify/storage';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import * as React from 'react';

function App({ signOut }) {


  //Commenting out code that I was working on
  const ref = React.useRef(null);


  

  //Upload File in a Browser
  const uploadFile = async (event) => {
    if (event?.target?.files) {
      const file = event.target.files[0];
      uploadData({
        key: file.name,
        data: file
      });
    }
  };

  const processFile = ({ file, key }) => {
    return {
      file,
      key,
      metadata: {
        id: key,
      },
    };
  };
  async function upload(filename,file){
    try {
      const result = await uploadData({
        key: filename,
        data: file,
        options: {
            accessLevel: 'private'
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }
  
  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
        <StorageManager 
          acceptedFileTypes={['text/csv']}
          accessLevel="private"
          showThumbnails={false}
          processFile={processFile}
          ref={ref}
        />
        <Button onClick={() => ref.current.uploadFile}>upload file</Button>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);