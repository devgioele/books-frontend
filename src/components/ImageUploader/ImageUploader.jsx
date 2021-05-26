import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAxiosDispatcher } from 'hooks/axios';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import StdMessages from 'messages/standard';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import {
  CircularProgress,
  GridList,
  GridListTile,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { uploadBookImage } from 'api/books';

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    height: '100%',
    padding: '10px',
  },
  icon: {
    color: theme.palette.divider,
    height: '50px',
    width: '50px',
  },
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'scale-down',
  },
  imgLoading: {
    opacity: 0.5,
  },
}));

export default function ImageUploader({
  imagesToUpload,
  removeToUpload,
  addUploadUrl,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadedImages, setUploadedImages] = useState([]);
  const addUploadedImage = (img) => {
    console.log(
      `adding uploaded image, while current uploaded images = ${JSON.stringify(
        uploadedImages
      )}`
    );
    setUploadedImages((prev) => [...prev, img]);
  };
  const [uploadingImages] = useAxiosDispatcher(
    uploadBookImage,
    'uploading book image',
    imagesToUpload,
    removeToUpload,
    (img, response) => {
      addUploadedImage(img);
      addUploadUrl(response.secure_url);
    },
    (key, err) => {
      const reason = err.message.includes('413')
        ? 'File is too big.'
        : err.message;
      enqueueSnackbar(`${StdMessages.IMPORT_ERROR(key, reason)}`, {
        variant: 'warning',
      });
    }
  );

  const emptyPreview =
    uploadedImages.length + uploadingImages.length + imagesToUpload.length ===
    0;
  console.log(`imagesToUpload = ${JSON.stringify(imagesToUpload)}`);
  console.log(`uploadingImages = ${JSON.stringify(uploadingImages)}`);
  console.log(`uploadedImages = ${JSON.stringify(uploadedImages)}`);

  return emptyPreview ? (
    <Grid
      container
      className={classes.iconContainer}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <AddPhotoIcon className={classes.icon} />
    </Grid>
  ) : (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cellHeight={100}
        cols={3}
        spacing={theme.spacing(2)}
      >
        {uploadedImages.length > 0 &&
          uploadedImages.map((uploadedImg, index) => (
            <GridListTile key={`uploadedImage-${index}`} cols={1}>
              <img
                className={classes.img}
                key={index}
                alt="uploaded image"
                src={URL.createObjectURL(uploadedImg)}
              />
            </GridListTile>
          ))}
        {uploadingImages.length > 0 &&
          uploadingImages.map((uploadingImg, index) => (
            <GridListTile key={`uploadingImage-${index}`} cols={1}>
              <Grid
                container
                style={{ height: '100%', position: 'absolute' }}
                direction="column"
                justify="center"
                alignItems="center"
              >
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  color="secondary"
                  size={50}
                  thickness={4}
                />
              </Grid>
              <img
                className={clsx(classes.img, classes.imgLoading)}
                key={uploadingImg.name}
                alt="uploading image"
                src={URL.createObjectURL(uploadingImg)}
              />
            </GridListTile>
          ))}
        {imagesToUpload.length > 0 &&
          imagesToUpload.map((imgToUpload, index) => (
            <GridListTile key={`imageToUpload-${index}`} cols={1}>
              <img
                className={clsx(classes.img, classes.imgLoading)}
                key={imgToUpload.name}
                alt="image to be uploaded"
                src={URL.createObjectURL(imgToUpload)}
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
