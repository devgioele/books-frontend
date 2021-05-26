import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import ImageUploader from 'components/ImageUploader';
import StdMessages from 'messages/standard';

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
    },
  },
  dropzoneDrag: {
    borderColor: theme.palette.custom.lightGrey,
  },
  content: {
    [theme.breakpoints.up('xs')]: {
      minHeight: '100px',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '200px',
    },
  },
}));

/*
If the file has been dropped, the name is stored in the field 'name'.
If it has been selected with some file explorer, the name is stored in
the field 'path'.
We normalize by setting the name equal to the path, if the name is missing,
such that the field `name` is always available.
*/
const normalizeNamePath = (files) =>
  files.map((file) => {
    const normalizedFile = file;
    if (!normalizedFile.name) normalizedFile.name = file.path;
    return normalizedFile;
  });

export default function ImageDropzone({
  minImages,
  maxImages,
  uploadUrls,
  setUploadUrls,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const addToUpload = (images) =>
    setImagesToUpload((prev) => [...prev, ...images]);
  const removeToUpload = (k) =>
    setImagesToUpload((prev) => prev.filter((img) => img !== k));

  const onDrop = (acceptedFiles, fileRejections) => {
    addToUpload(acceptedFiles);
    fileRejections.forEach((fileRejection) =>
      enqueueSnackbar(StdMessages.IMPORT_ERROR(fileRejection.file.name), {
        variant: 'error',
      })
    );
  };
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
        <ImageUploader
          className={classes.content}
          maxConcurrentUploads={1}
          imagesToUpload={imagesToUpload}
          removeToUpload={removeToUpload}
          addUploadUrl={(url) => setUploadUrls([uploadUrls, ...url])}
        />
      </div>
      <em style={{ marginTop: '10px' }}>
        Only *.jpeg, *.jpg and *.png images are accepted.
      </em>
    </div>
  );
}
