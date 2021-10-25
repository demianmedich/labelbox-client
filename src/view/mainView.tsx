import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import LabelingView from './labelingView';
import styles from './mainView.module.css';

export default function MainView(): React.ReactElement {
  return (
    <div className={styles.mainView}>
      <Header />
      <Main />
    </div>
  );
}

function Header(): React.ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LABELBOX
          </Typography>
          <Button color="inherit">Open</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Main(): React.ReactElement {
  return <LabelingView />;
}
