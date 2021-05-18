import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { uploadBookImage } from 'api/books';
import { useAxiosDispatcher } from 'hooks/axios';
import makeUnique from '../../utils/strings';
import toBase64 from '../../utils/images';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100px',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.palette.custom.lightGrey,
    borderStyle: 'solid',
  },
}));

export default function ImageUploader({
  maxConcurrentUploads,
  toUpload, // contains files
  removeToUpload,
  uploaded,
  setUploaded,
  onExpectedError,
}) {
  const classes = useStyles();
  const [upload, tasksWorking] = useAxiosDispatcher(
    'uploading book image',
    (key, body) => setUploaded([...uploaded, body.secureUrl]),
    onExpectedError
  );

  // Effect that runs whenever the limit is changed, images to upload are
  // queued or uploads are completed
  useEffect(() => {
    const tasksReady = maxConcurrentUploads - tasksWorking.length;
    console.log(`tasksReady = ${tasksReady}`);
    const nextToUpload = toUpload[0];
    // If we can start another upload without exceeding the limit
    // and there is another job pending
    if (tasksReady > 0 && nextToUpload) {
      removeToUpload(nextToUpload);
      const newKey = makeUnique(
        (key) => !!tasksWorking[key],
        nextToUpload.name
      );
      console.log(`newKey = ${newKey}`);
      upload(newKey, uploadBookImage, toBase64(nextToUpload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxConcurrentUploads, tasksWorking, toUpload]);

  return <div className={classes.root}></div>;
}
