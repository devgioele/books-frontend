import React, { useState } from 'react';
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

/*
If the file has been dropped, the name is stored in the field 'name'.
If it has been selected with some file explorer, the name is stored in
the field 'path'.
We normalize by setting the name equal to the path, if the name is missing.
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
  currentImages,
  setCurrentImages,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const uploadImages = async (imgFiles) => {
    const newImagesToUpload = await Promise.all(
      imgFiles.map(async (imgFile) =>
        toBase64(imgFile)
          .then((data) => {
            console.log(`name = ${imgFile.name}`);
            const key = makeFilenameUnique(
              (k) => !!imagesToUpload.find((img) => img.key === k),
              imgFile.name
            );
            return { key, data };
          })
          .catch(() =>
            enqueueSnackbar(StdMessages.IMPORT_ERROR(imgFile.name), {
              variant: 'warning',
            })
          )
      )
    );
    setImagesToUpload([...imagesToUpload, ...newImagesToUpload]);
  };

  const removeToUpload = (k) =>
    setImagesToUpload(imagesToUpload.filter((img) => img.key !== k));
  const onDrop = (acceptedFiles, fileRejections) => {
    const normAcceptedFiles = normalizeNamePath(acceptedFiles);
    const normFileRejections = normalizeNamePath(fileRejections);
    console.log(JSON.stringify(normAcceptedFiles));
    console.log(JSON.stringify(normFileRejections));
    uploadImages(normAcceptedFiles);
    normFileRejections.forEach((fileRejection) =>
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
