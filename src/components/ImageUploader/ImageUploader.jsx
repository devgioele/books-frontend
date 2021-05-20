import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAxiosDispatcher } from 'hooks/axios';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import StdMessages from 'messages/standard';
import CloudImage from 'components/CloudImage';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import {
  CircularProgress,
  GridList,
  GridListTile,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // previewContainer: {
  //   padding: '12px',
  //   height: '100px',
  //   maxHeight: '100px',
  // },
  // previewItem: { height: `calc(100% - ${theme.spacing(2)}px)` },
  // preview: { height: '100%', objectFit: 'scale-down' },
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
  imgLoading: {
    height: '100%',
    width: 'auto',
    opacity: 0.5,
  },
}));

export default function ImageUploader({
  maxConcurrentUploads,
  toUpload,
  removeToUpload,
  uploaded,
  setUploaded,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadingTasks] = useAxiosDispatcher(
    'uploading book image',
    maxConcurrentUploads,
    toUpload,
    removeToUpload,
    (key, body) => setUploaded([...uploaded, body.secureUrl]),
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
    uploaded.length + uploadingTasks.length + toUpload.length === 0;

  // TODO: Fix the warning 'each child in a list should have
  //  a unique "key" prop'.
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
        {toUpload.map((img) => (
          <GridListTile key={img.key} cols={1}>
            <img
              className={classes.imgLoading}
              key={img.key}
              alt={img.key}
              src={img.data}
            />
          </GridListTile>
        ))}
        {uploadingTasks.map((upload) => (
          <GridListTile key={upload.key} cols={1}>
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
              className={classes.imgLoading}
              key={upload.key}
              alt={upload.key}
              src={upload.data}
            />
          </GridListTile>
        ))}
        {uploaded.map((img) => (
          <GridListTile key={img.publicId} cols={1}>
            <CloudImage
              key={`image preview ${img.publicId}`}
              alt={`image preview ${img.publicId}`}
              url={img.secureUrl}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
