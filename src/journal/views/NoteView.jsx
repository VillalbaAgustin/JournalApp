import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, Note, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import  Swal  from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';


export const NoteView = () => {
  
  const dispatch = useDispatch();

  const { active: activeNote, messageSaved, isSaving } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();

  }, [date]);


  const fileInputRef = useRef();


  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'Success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;
    console.log('Subiendo archivos');
    // dispatch(isSaving);
    dispatch(startUploadingFiles(target.files));
  }
  
  const onDelete = () => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>

        <input 
        type="file" 
        multiple
        ref={fileInputRef}
        onChange={ onFileInputChange }
        style= {{display: 'none'}}
        />

        <IconButton 
        color='primary'
        disabled= {isSaving}
        onClick= {() => fileInputRef.current.click()} 
        >
          <UploadOutlined/>
        </IconButton>

        <Button 
        onClick={onSaveNote} 
        color="primary" 
        sx={{ padding: 2 }}
        disabled= {isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Insert a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          label="What happened today?"
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid 
      container
      justifyContent='end'
      >
        <Button
        onClick={onDelete}
        sx={{ mt: 2}}
        color= "error"
        >
          <DeleteOutline/>
          Delete
        </Button>
      </Grid>

      <ImageGallery images={ activeNote.imageUrls} />
    </Grid>
  );
};
