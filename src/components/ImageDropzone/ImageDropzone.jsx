import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import ImageUploader from 'components/ImageUploader';
import StdMessages from 'messages/standard';
import {
  axiosState,
  computeFillingState,
  fillingState,
  uploadProgress,
} from 'utils/constants';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropzone: {
    borderRadius: 5,
    borderWidth: 3,
    borderStyle: 'dashed',
    outline: 'none',
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.custom.lightGrey,
    },
  },
  dropzoneNotEnough: {
    borderColor: red[500],
  },
  dropzoneNotEnoughHover: {
    '&:hover': {
      borderColor: red[200],
    },
  },
  dropzoneNotEnoughDrag: {
    borderColor: red[200],
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
  pictureUrlsRef,
  addPictureUrl,
  removePictureUrl,
  setBlocked,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Initialize dropped images with the given picture urls
  const droppedImages = useRef(
    pictureUrlsRef.current.map((pictureUrl, index) => ({
      id: index,
      status: uploadProgress.uploaded,
      secureUrl: pictureUrl,
    }))
  );

  const [filling, setFilling] = useState(
    computeFillingState(minImages, maxImages, droppedImages.current.length)
  );

  useEffect(() => {
    // Update filling
    const newFilling = computeFillingState(
      minImages,
      maxImages,
      droppedImages.current.length
    );
    setFilling(newFilling);
    /*
    Block if there are not enough images or
    there is any image waiting/uploading
     */
    setBlocked(
      newFilling === fillingState.NOT_ENOUGH ||
        droppedImages.current.some(
          (img) =>
            img.status === uploadProgress.waiting ||
            img.status === uploadProgress.uploading
        )
    );
  }, [droppedImages.current]);

  const rejectFiles = (files, nameExtractor, reason) =>
    files.forEach((file) =>
      enqueueSnackbar(StdMessages.IMPORT_ERROR(nameExtractor(file), reason), {
        variant: 'error',
      })
    );

  // Generates a new unique id for a dropped image according to the given index
  const newUniqueDroppedImageId = (index) => {
    if (droppedImages.current.length === 0) return index;
    return (
      droppedImages.current[droppedImages.current.length - 1].id + 1 + index
    );
  };

  const dropImages = (images) => {
    const freeSlots = maxImages - droppedImages.current.length;
    const importingImages = images.slice(0, freeSlots);
    const overflowedImages = images.slice(freeSlots);

    if (importingImages.length > 0) {
      droppedImages.current = [
        ...droppedImages.current,
        ...importingImages.map((image, index) => ({
          id: newUniqueDroppedImageId(index),
          file: image,
          status: uploadProgress.waiting,
        })),
      ];
    }
    rejectFiles(
      overflowedImages,
      (img) => img.name,
      'Maximum number of images reached.'
    );
    forceUpdate();
  };

  const removeDroppedImage = (imageId) => {
    droppedImages.current = droppedImages.current.filter(
      (img) => img.id !== imageId
    );
    forceUpdate();
  };
  const changeDroppedImage = (imageId, newImageProps) => {
    // Apply changes
    droppedImages.current = droppedImages.current.map((image) =>
      image.id === imageId ? { ...image, ...newImageProps } : image
    );
    forceUpdate();
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
      case axiosState.abort:
        removePictureUrl(data.secureUrl);
        removeDroppedImage(imageId);
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
    forceUpdate();
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    dropImages(acceptedFiles);
    rejectFiles(
      fileRejections,
      (fileRejection) => fileRejection.file.name,
      'Invalid file format.'
    );
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png',
  });

  const dropzoneClasses = () => {
    if (filling === fillingState.NOT_ENOUGH) {
      return clsx(
        classes.dropzone,
        classes.dropzoneNotEnough,
        classes.dropzoneNotEnoughHover,
        isDragActive && classes.dropzoneNotEnoughDrag
      );
    }
    return clsx(classes.dropzone, isDragActive && classes.dropzoneDrag);
  };

  return (
    <div className={classes.root}>
      <div className={dropzoneClasses()} {...getRootProps()}>
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
