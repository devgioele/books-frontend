import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAxiosDispatcher } from 'hooks/axios';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import StdMessages from 'messages/standard';
import CloudImage from 'components/CloudImage';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

const useStyles = makeStyles((theme) => ({
  previewContainer: {
    padding: '12px',
    height: '100px',
    maxHeight: '100px',
  },
  previewItem: { height: `calc(100% - ${theme.spacing(2)}px)` },
  preview: { height: '100%', objectFit: 'scale-down' },
  iconContainer: {
    height: '100%',
    padding: '10px',
  },
  icon: {
    color: theme.palette.divider,
    height: '50px',
    width: '50px',
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
  const { enqueueSnackbar } = useSnackbar();
  const [uploadingTasks] = useAxiosDispatcher(
    'uploading book image',
    maxConcurrentUploads,
    [], // toUpload,
    removeToUpload,
    (key, body) => setUploaded([...uploaded, body.secureUrl]),
    (key, err) => {
      const reason = err.message.includes('413')
        ? 'File is too large.'
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
  return (
    <Grid
      container
      className={classes.previewContainer}
      direction="row"
      alignItems="center"
      justify="flex-start"
      spacing={2}
    >
      {!emptyPreview &&
        uploaded.map((img) => (
          <Grid item className={classes.previewItem} key={img.publicId}>
            <CloudImage
              className={classes.preview}
              key={`image preview ${img.publicId}`}
              alt={`image preview ${img.publicId}`}
              url={img.secureUrl}
            />
          </Grid>
        ))}
      {!emptyPreview &&
        uploadingTasks.map((upload) => (
          <Grid item className={classes.previewItem} key={upload.key}>
            <img
              className={classes.preview}
              key={`image preview ${upload.key}`}
              alt={`image preview ${upload.key}`}
              src={upload.data}
            />
          </Grid>
        ))}
      {!emptyPreview &&
        toUpload.map((img) => (
          <Grid item className={classes.previewItem} key={img.key}>
            <img
              className={classes.preview}
              key={`image preview ${img.key}`}
              alt={`image preview ${img.key}`}
              src={img.data}
            />
          </Grid>
        ))}
      {emptyPreview && (
        <Grid
          container
          className={classes.iconContainer}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <AddPhotoIcon className={classes.icon} />
        </Grid>
      )}
    </Grid>
  );
}
