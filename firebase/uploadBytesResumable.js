import { useState } from 'react';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

export const uploadData = async (photo) => {
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };

  const storageRef = ref(storage, 'images');

  const response = await fetch(photo);
  const file = await response.blob();

  const uniqueId = Date.now().toString();

  // Points to 'images/`${uniqueId}`'
  // Note that you can use variables to create child values
  const fileName = `${uniqueId}`;
  const spaceRef = ref(storageRef, fileName);

  //   Upload file and metadata to the object 'images/`${uniqueId}`'
  const uploadTask = uploadBytesResumable(spaceRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    async () => {
      //   Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
    }
  );
};
