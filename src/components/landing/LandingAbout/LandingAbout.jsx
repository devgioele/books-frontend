import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import CloudImage from 'components/CloudImage';

// TODO: migrate texts to markdown.

const useStyles = makeStyles((theme) => ({
  image: {
    width: '150px',
    height: '150px',
    borderRadius: 10,
    boxShadow: `0px 1px 3px 0px ${theme.colors.shadowGray}`,
    objectFit: 'cover',
  },
}));

const people = [
  {
    name: 'Gioele De Vitti',
    img:
      'https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163770/Books/gioele_de_vitti_l35mg9.',
    role: 'Frontend Developer',
    description:
      'Coming from an electronic engineering background, I enjoy developing' +
      ' embedded applications and designing printed circuit boards. ' +
      'I love gaming and networking. My proverb of choice is "sapere aude".',
  },
  {
    name: 'Riccardo Busetti',
    img:
      'https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163769/Books/riccardo_busetti_nhobde.',
    role: 'Backend Developer',
    description:
      'I come from an IT background working on mainly on mobile ' +
      'and backend development. I have been interning in different companies ' +
      'in the past years, working on products used by hundreds and millions of ' +
      'people worldwide. Currently my areas of interest are distributed systems, ' +
      'software architecture and scalability.',
  },
];

export default function LandingAbout() {
  const downXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      spacing={downXSmall ? 4 : 8}
      direction='column'
      justify='flex-start'
      alignItems='stretch'
    >
      {people.map((person, key) => (
        <Grid item key={key}>
          <Person person={person} />
        </Grid>
      ))}
    </Grid>
  );
}

function Person({ person }) {
  const classes = useStyles();

  return (
    <Grid container justify='flex-start' alignItems='center' spacing={2}>
      <Grid item>
        <CloudImage className={classes.image} alt='person' url={person.img} />
      </Grid>
      <Grid item>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='flex-start'
          spacing={1}
        >
          <Grid item>
            <Typography variant='h4'>{person.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='textSecondary'>
              {person.role}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>{person.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
