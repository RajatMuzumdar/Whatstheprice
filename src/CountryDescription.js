
import React from 'react';
import { Card, CardContent, Typography, Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const CountryDescription = ({ countryName }) => {
  const [description, setDescription] = React.useState('');
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${countryName}`
    )
      .then(response => response.json())
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        setDescription(pages[pageId].extract);
      });
  }, [countryName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>wanna know more...</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" component="div" flexGrow={1}>
              {countryName}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CountryDescription;
