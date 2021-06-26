import { Menu, MenuItem, Fade, Box } from "@material-ui/core";
import RegisterForm from '../organisms/RegisterForm';
import LoginForm from '../organisms/LoginForm';
import { useState } from 'react';
import { withFirebase } from '../Firebase';

const AvatarMenu = (props) => {
  const { shown, setShown, anchorEl, firebase } = props;
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpenRegister = () => {
    setShown(false);
    setRegisterOpen(true);
  };

  const handleOpenLogin = () => {
    setShown(false);
    setLoginOpen(true);
  };

  const handleLogout = () => {
    firebase.firebaseSignOut();
    setShown(false);
  };

  const handleClose = () => {
    setShown(false);
  };

  return (
    <Box>
      <Menu
        keepMounted
        open={shown}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}>
        <MenuItem onClick={handleOpenLogin}>Login</MenuItem>
        <MenuItem onClick={handleOpenRegister}>Register</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <RegisterForm open={registerOpen} setOpen={setRegisterOpen} />
      <LoginForm open={loginOpen} setOpen={setLoginOpen} />
    </Box>
  );
};

export default withFirebase(AvatarMenu);
