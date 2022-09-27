import { IconButton } from '@mui/material';
import {AddOutlined} from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal)
  

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam quod
        repellendus beatae consequatur cumque, vitae pariatur libero corporis
        laborum voluptates quasi non, culpa quos error debitis. Dolores repellat
        commodi rem.
      </Typography> */}
      {

        (active === null)   /* (!!active)  tmb funciona */
        ? <NothingSelectedView/> 
        : <NoteView/>
      }
      {/* <NothingSelectedView/> */}
      {/* <NoteView/> */}

      <IconButton
      onClick={ onClickNewNote }
      size='large'
      disabled= {isSaving}
      sx={{
        color:'white',
        backgroundColor: 'error.main',
        ":hover":{backgroundColor: 'error.main', opacity:0.7},
        position: 'fixed',
        right: 50,
        bottom: 50,
      }}
      >
        <AddOutlined sx={{fontSize: 15}}/>
      </IconButton>

    </JournalLayout>
  );
};
