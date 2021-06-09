import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CopyrightIcon from '@material-ui/icons/Copyright';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const creditsCollection = [
  {
    type: 'Libraries',
    list: [
      {
        name: 'React',
        refLabel: 'React website',
        ref: 'https://reactjs.org',
      },
      {
        name: 'Material-UI',
        refLabel: 'Material-UI website',
        ref: 'https://material-ui.com',
      },
      {
        name: 'React Router',
        refLabel: 'React Router website',
        ref: 'https://reactrouter.com',
      },
      {
        name: 'Axios',
        refLabel: 'Axios website',
        ref: 'https://axios-http.com/docs/intro',
      },
    ],
  },
  {
    type: 'Images',
    list: [
      {
        name: 'Library illustration',
        refLabel: 'Simon from dribbble.com',
        ref: 'https://dribbble.com/shots/11280628-Library-illustration',
      },
      {
        name: 'All icons',
        refLabel: 'Material UI icons',
        ref: 'https://www.npmjs.com/package/@material-ui/icons',
      },
    ],
  },
  {
    type: 'Animations',
    list: [
      {
        name: 'Girl tapping phone',
        refLabel: 'duxtree from lottiefiles.com',
        ref: 'https://lottiefiles.com/55461-girl-tapping-phone',
      },
      {
        name: 'Book bounce open',
        refLabel: 'Charlene Hew from lottiefiles.com',
        ref: 'https://lottiefiles.com/57288-book-bounce-open',
      },
      {
        name: 'Profile password unlock',
        refLabel: 'PassionHacks from lottiefiles.com',
        ref: 'https://lottiefiles.com/63004-profile-password-unlock',
      },
    ],
  },
];

export default function LandingCredits() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <CreditsDialog open={showDialog} onClose={() => setShowDialog(false)} />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        disableElevation={true}
        startIcon={<CopyrightIcon />}
        onClick={() => setShowDialog(true)}
      >
        Credits
      </Button>
    </>
  );
}

function CreditsDialog({ open, onClose }) {
  const theme = useTheme();
  const downSmall = useMediaQuery((innerTheme) =>
    innerTheme.breakpoints.down(innerTheme.breakpoints.values.sm)
  );

  return (
    <Dialog
      fullScreen={downSmall}
      fullWidth={false}
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          {creditsCollection.map((credits, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6">{credits.type}</Typography>
              <Grid
                container
                direction="column"
                spacing={1}
                style={{ marginTop: theme.spacing(1) }}
              >
                {credits.list.map((credit, creditIndex) => (
                  <Grid item key={creditIndex}>
                    <Typography variant="body1">
                      {`${credit.name} - `}
                      <Link
                        color="textSecondary"
                        href={credit.ref}
                        target="_blank"
                        rel="noopener"
                      >
                        {credit.refLabel}
                      </Link>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
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
            <Button onClick={onClose}>Close</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
