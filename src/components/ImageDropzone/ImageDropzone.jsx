import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import ImageUploader from 'components/ImageUploader';
import StdMessages from 'messages/standard';
import { makeFilenameUnique, toBase64 } from 'utils/files';

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

export default function ImageDropzone({
  minImages,
  maxImages,
  currentImages,
  setCurrentImages,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const uploadImages = (imgFiles) =>
    imgFiles.forEach((imgFile) =>
      toBase64(imgFile)
        .then((data) => {
          const newKey = makeFilenameUnique(
            (key) => !!imagesToUpload.find((img) => img.key === key),
            imgFile.name
          );
          console.log(`dropzone chose new key: ${newKey}`);
          // TODO: This does not update the list as it should!
          //  It only does so once!?!
          setImagesToUpload([...imagesToUpload, { key: newKey, data }]);
        })
        .catch(() =>
          enqueueSnackbar(StdMessages.IMPORT_ERROR(imgFile.name), {
            variant: 'warning',
          })
        )
    );

  console.log(imagesToUpload);

  const removeToUpload = (key) =>
    setImagesToUpload(imagesToUpload.filter((img) => img.key !== key));
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
        <ImageUploader
          className={classes.content}
          maxConcurrentUploads={3}
          toUpload={imagesToUpload}
          removeToUpload={removeToUpload}
          uploaded={currentImages}
          setUploaded={setCurrentImages}
        />
      </div>
      <em style={{ marginTop: '10px' }}>
        Only *.jpeg, *.jpg and *.png images are accepted.
      </em>
    </div>
  );
}
