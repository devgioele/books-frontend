import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStatelessAxios } from 'hooks/axios';
import Grid from '@material-ui/core/Grid';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import {
  CircularProgress,
  GridList,
  GridListTile,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { uploadBookImage } from 'api/books';
import { uploadProgress } from 'utils/constants';
import CloudImage from 'components/CloudImage';

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
    padding: theme.spacing(1),
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

export default function ImageUploader({ droppedImages, onUploadStateChange }) {
  const classes = useStyles();
  const theme = useTheme();

  const [uploadImage] = useStatelessAxios(uploadBookImage);

  const uploadImageGuarded = (image) => {
    /*
    'image.id' that is used for the callback that we pass in 'uploadImage'
    is bound to the scope of this function.
    This means that when the callback is used, 'image.id' is always gonna be
    the same.
     */
    uploadImage((state, data) => {
      onUploadStateChange(image.id, state, data);
    }, image.file);
  };

  useEffect(() => {
    droppedImages
      .filter((image) => image.status === uploadProgress.waiting)
      .forEach((image) => uploadImageGuarded(image));
  }, [droppedImages]);

  return droppedImages.length === 0 ? (
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
        {droppedImages.map((image, index) => (
          <GridListTile key={index} cols={1}>
            <DroppedImage image={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

function altFromStatus(imageStatus) {
  switch (imageStatus) {
    case uploadProgress.uploaded:
      return 'uploaded image';
    case uploadProgress.uploading:
      return 'uploading image';
    case uploadProgress.waiting:
      return 'image to be uploaded';
    default:
      return 'invalid image';
  }
}

function DroppedImage({ image }) {
  const classes = useStyles();
  const [downloaded, setDownloaded] = useState(false);
  const cloudImg = (
    <CloudImage
      className={classes.img}
      alt={altFromStatus(image.status)}
      url={image.secureUrl}
      cutExtension={true}
      onLoad={() => setDownloaded(true)}
    />
  );
  const downloadRequired =
    image.status === uploadProgress.uploaded && !image.file;
  const loading =
    image.status === uploadProgress.uploading ||
    (downloadRequired && !downloaded);

  return (
    <>
      {loading && (
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
      )}
      {
        // If not downloaded yet, show preview if it is available
        !downloaded && image.file && (
          <img
            className={clsx(
              classes.img,
              image.status !== uploadProgress.uploaded && classes.imgLoading
            )}
            alt={altFromStatus(image.status)}
            src={URL.createObjectURL(image.file)}
          />
        )
      }
      {downloadRequired && cloudImg}
    </>
  );
}
