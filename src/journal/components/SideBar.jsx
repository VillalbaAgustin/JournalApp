import {Drawer,Box,Toolbar,Typography,Divider,List,Avatar} from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  console.log(photoURL);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" //temporary
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Avatar src={photoURL} alt="photoPerfil" />
          <Typography variant="h6" noWrap ml={1} /* component={div} */>
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note}/>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
