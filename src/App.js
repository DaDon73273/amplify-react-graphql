import { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { uploadData } from 'aws-amplify/storage';
import * as React from 'react';
import { list } from 'aws-amplify/storage';

function App({ signOut }) {

  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus]=useState(false)

  //added
  const [objects, setObjects] = useState([]);

  const complexobject = {
    id:"1223",
    name:"pfarelo",
    address:
    {
      Street:{
        name:"Llama"
      }
    },
    Phone:{
      Contact:{
        primary:"1203936",
        secondary:"7228362"
      }
    }
  }

 //console.log(Array.of(objects.items))
/*
  const uploadfile = async () => {
    const result = await uploadData(fileData.name, fileData,{
      contentType: fileData.type,
    })
    setFileStatus(true)
    console.log(21,result)
  }
*/
useEffect(() => {
  listObjects();

}, []);

async function listObjects(){
  try {
    const objectList = await list({
      //prefix: 'private/eu-west-1:bf5303d5-3c18-c1eb-3ae9-83cd142670e0/',
      options: {
        accessLevel: 'private',
      }
    });
    setObjects(objectList.items);
    //console.log(objectList.items);
    // render list items from response.items
   // e.target.reset();
  } catch (error) {
    console.log('Error ', error);
  }
}


  async function uploadFile(){
   
    try {
      const result = await uploadData({
        key: fileData.name,
        data: fileData,
        options: {
            accessLevel: 'private'
        }
      }).result;
      setFileStatus(true)
      //listObjects();
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }


  /*
  const uploadDataInBrowser = async (event) => {
    if (event?.target?.files) {
      const file = event.target.files[0];
      uploadData({
        key: file.name,
        data: file
      });
    }
  };
  */
  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
        
        <div>
        <input type="file" accept={[".csv",".docx",".txt"]} onChange={(e)=> setFileData(e.target.files[0])}/>
        </div>
        <div>
          <button onClick={uploadFile}>Upload File</button>
        </div>
        {fileStatus ? "File uploaded succcefully" : ""}
     
        <div>
        {Array.prototype.map.call(objects, (x,i) => (
          <div className="row" key={i}>{x.key}</div>
        ))}
      </div>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);