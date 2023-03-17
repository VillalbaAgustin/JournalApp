import { TurnedIn, TurnedInNot } from '@mui/icons-material';
import {Grid,ListItem,ListItemButton,ListItemIcon,ListItemText} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {

  const dispatch = useDispatch();

  const  idActive  = useSelector(state => state.journal.active?.id)

  const newTitle = useMemo(()=> {
    return title.length > 17
    ? title.substring(0,17) +'...'
    : title;
  },[title])

  const onActiveNote = () =>{
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  }

  return (
    <ListItem disablePadding sx={{backgroundColor:'secondary.main', mb:1}}>
      <ListItemButton onClick={onActiveNote}>
        <ListItemIcon>
          {
            (id === idActive) ? <TurnedIn/> : <TurnedInNot />
          }
        </ListItemIcon>

        <Grid container >
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
