import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import axios from 'axios';
import './index.css'

export default function FormDialog({ handleUpload }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date('2021-08-18'));
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [pending, setPending] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    axios.post('/api/stories',
      {
        author,
        desc,
        date,
        content
      })
      .then((response) => {
        console.log(response);
        setPending(false);
        setAuthor('');
        setDesc('');
        setContent('');
        setDate(new Date('2021-08-18'));
        handleClose();
        handleUpload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='dialogDiv' dir="rtl">
      <IconButton color="primary" sx={{ backgroundColor: "#282c34" }} onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle style={{ textAlign: "right" }}>העלאת סיפור חדש</DialogTitle>
        <DialogContent style={{ textAlign: "right" }}>
          <DialogContentText style={{ textAlign: "right" }}>
            !העלו סיפור חדש של מועדון הבירה
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2} style={{ width: "100%" }}>
              <TextField
                autoFocus
                margin="dense"
                id="author"
                label="Author"
                type="text"
                value={author}
                fullWidth
                variant="standard"
                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                style={{ direction: "rtl" }}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="desc"
                label="Description"
                type="text"
                value={desc}
                fullWidth
                variant="standard"
                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                style={{ direction: "rtl" }}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <DesktopDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                views={["year", "month", "day"]}
                value={date}
                onChange={(e) => setDate(e)}
                renderInput={(params) => <TextField {...params} />}
                required
              />
              <TextField
                placeholder="...הסיפור"
                multiline
                rows={10}
                value={content}
                fullWidth
                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions style={{ marginRight: "5%", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose}>Cancel</Button>
          {
            pending
              ?
              <CircularProgress style={{ padding: "1px" }} />
              :
              <Button onClick={handleSubmit} style={{ marginRight: "-6%" }}>Upload</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}