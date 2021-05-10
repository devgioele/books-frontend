import React, { createRef, useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useAxios from 'hooks/axios';
import { getSellLink } from 'api/books';
import { CircularProgress, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  contentElement: {
    width: '100%',
  },
  linkField: (textLength) => ({
    // Set the width to match the length of the text with some margin
    // 1ch is the width of the char '0'
    width: `${textLength + 2}ch`,
    maxWidth: '100%',
  }),
}));

export default function BookLinkDialog({ backToParent, bookToLink }) {
  const [link, setLink] = useState('');
  const classes = useStyles(link.length || 0);
  const linkFieldRef = useRef(null);
  const [generateLink, cancelGeneration, , , isGenerating] = useAxios(
    getSellLink,
    'generating the sell link',
    // TODO: Copy linkData.link to the clipboard
    (linkData) => {
      setLink(linkData?.link || '');
      linkFieldRef.current.focus();
      console.log('focused');
    },
    () => setInvalid(true)
  );
  const handleClose = () => backToParent(false)();
  useEffect(() => {
    generateLink(bookToLink.bookId);
    return () => cancelGeneration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={true}>
      <DialogTitle align="center">
        <Typography variant="h5">
          {isGenerating
            ? `Generating your sell link for '${bookToLink.title}'...`
            : 'Sell link copied to the clipboard!'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              {isGenerating ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  color="secondary"
                  size={20}
                  thickness={4}
                />
              ) : (
                <CheckCircleIcon style={{ color: green[500], fontSize: 40 }} />
              )}
            </Grid>
            {!isGenerating && (
              <Grid item xs={12}>
                <TextField
                  ref={linkFieldRef}
                  className={classes.linkField}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  onFocus={(e) => {
                    e.target.select();
                    document.execCommand('copy');
                  }}
                  value={link}
                />
              </Grid>
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button onClick={handleClose} disabled={isGenerating}>
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
