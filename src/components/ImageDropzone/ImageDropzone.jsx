import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import ImageUploader from '../ImageUploader';
import StdMessages from '../../messages/standard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropzone: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    outline: 'none',
    '&:hover': {
      borderColor: theme.palette.custom.lightGrey,
      '& $icon': {
        color: theme.palette.custom.lightGrey,
        height: '60px',
        width: '60px',
      },
    },
  },
  dropzoneDrag: {
    borderColor: theme.palette.custom.lightGrey,
  },
  iconContainer: {
    padding: '10px',
    height: '100px',
  },
  icon: {
    color: theme.palette.divider,
    height: '50px',
    width: '50px',
  },
  iconDrag: {
    color: theme.palette.custom.lightGrey,
    height: '60px',
    width: '60px',
  },
}));

export default function ImageDropzone({
  minImages,
  maxImages,
  currentImages,
  setCurrentImages,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const uploadImages = (imageFiles) =>
    setImagesToUpload([...imagesToUpload, ...imageFiles]);
  const removeToUpload = (image) =>
    setImagesToUpload(imagesToUpload.filter((img) => img !== image));
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    uploadImages(acceptedFiles);
    // Show error for failed imports
    fileRejections.forEach((fileRejection) =>
      enqueueSnackbar(StdMessages.IMPORT_ERROR(fileRejection), {
        variant: 'error',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png',
  });

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.dropzone, isDragActive && classes.dropzoneDrag)}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Grid
          container
          className={classes.iconContainer}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <AddPhotoIcon
            className={clsx(classes.icon, isDragActive && classes.iconDrag)}
          />
        </Grid>
      </div>
      <em style={{ marginTop: '10px' }}>
        Only *.jpeg, *.jpg and *.png images are accepted.
      </em>
      <ImageUploader
        style={{ marginTop: '10px' }}
        maxConcurrentUploads={3}
        toUpload={imagesToUpload}
        removeToUpload={removeToUpload}
        uploaded={currentImages}
        setUploaded={setCurrentImages}
        onExpectedError={() => {}}
      />
    </div>
  );
}
