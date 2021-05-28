import React, { useReducer, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import ImageUploader from 'components/ImageUploader';
import StdMessages from 'messages/standard';
import { axiosState, uploadProgress } from 'utils/constants';

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
  pictureUrls,
  addPictureUrl,
  setBusy,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Initialize dropped images with the given picture urls
  const droppedImages = useRef(
    pictureUrls.map((pictureUrl, index) => ({
      id: index,
      status: uploadProgress.uploaded,
      secureUrl: pictureUrl,
    }))
  );

  // If there is any image waiting or uploading, we are busy
  const updateBusyness = () =>
    setBusy(
      droppedImages.current.some(
        (img) =>
          img.status === uploadProgress.waiting ||
          img.status === uploadProgress.uploading
      )
    );

  const dropImages = (images) => {
    updateBusyness();
    droppedImages.current = [
      ...droppedImages.current,
      ...images.map((image, index) => ({
        id: index + droppedImages.current.length,
        file: image,
        status: uploadProgress.waiting,
      })),
    ];
  };
  const removeDroppedImage = (imageId) => {
    droppedImages.current = droppedImages.current.filter(
      (img) => img.id !== imageId
    );
  };
  const changeDroppedImage = (imageId, newImageProps) => {
    // Apply changes
    droppedImages.current = droppedImages.current.map((image) =>
      image.id === imageId ? { ...image, ...newImageProps } : image
    );
  };
  const getDroppedImageName = (imageId) => {
    const matches = droppedImages.current.filter((img) => img.id === imageId);
    return matches.length === 0 ? undefined : matches[0].file.name;
  };

  const onUploadStateChange = (imageId, state, data) => {
    switch (state) {
      case axiosState.progress:
        changeDroppedImage(imageId, { status: uploadProgress.uploading });
        break;
      case axiosState.success:
        addPictureUrl(data.secureUrl);
        changeDroppedImage(imageId, {
          status: uploadProgress.uploaded,
          secureUrl: data.secureUrl,
        });
        break;
      case axiosState.error:
      default: {
        const imgName = getDroppedImageName(imageId);
        removeDroppedImage(imageId);
        enqueueSnackbar(
          StdMessages.IMPORT_ERROR(imgName, 'Unsupported file format.'),
          {
            variant: 'error',
          }
        );
        break;
      }
    }

    updateBusyness();
    forceUpdate();
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    dropImages(acceptedFiles);
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
          droppedImages={droppedImages.current}
          onUploadStateChange={onUploadStateChange}
        />
      </div>
      <em style={{ marginTop: '10px' }}>
        Only *.jpeg, *.jpg and *.png images are accepted.
      </em>
    </div>
  );
}
