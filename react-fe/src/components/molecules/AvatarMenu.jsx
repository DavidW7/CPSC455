import { Menu, MenuItem, Fade, Box } from "@material-ui/core";
import { withFirebase } from '../Firebase';

const AvatarMenu = (props) => {
  const { shown, setShown, anchorEl, firebase } = props;

  const handleLogout = () => {
    firebase.firebaseSignOut();
    setShown(false);
    window.location.href = "/";
  };

  const redirectToMyReviews = () => {
    window.location.href = "/myReviews";
  };

  const redirectToMyListings = () => {
    window.location.href = "/myListings";
  };

  const redirectToCreateListing = () => {
    window.location.href = "/createListing";
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
        <MenuItem onClick={redirectToCreateListing}>Create Listing</MenuItem>
        <MenuItem onClick={redirectToMyListings}>My Listings</MenuItem>
        <MenuItem onClick={redirectToMyReviews}>My Reviews</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/*<CreateListingPage open={createListingOpen} setOpen={setCreateListingOpen} />*/}
    </Box >
  );
};

export default withFirebase(AvatarMenu);
