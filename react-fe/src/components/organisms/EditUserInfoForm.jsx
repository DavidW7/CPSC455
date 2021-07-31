import {
  TextField,
  Box, FormControl, InputLabel, Select, MenuItem, Button
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ListingForm = (props) => {
  const { onSubmit, startDate, endDate, imgUrl, carAmt, locn, dRate, instr, descr, parkingType, parkingSize, listingId } = props;

  const useStyles = makeStyles((theme) => ({
    submitButton: {
      marginBottom: theme.spacing(2),
    },
    formControl: {
      marginBottom: theme.spacing(2),
    },
    availabilityText: {
      color: 'red',
      marginBottom: theme.spacing(2),
    },
    descriptionText: {
      marginBottom: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  // const handleStartDateChange = (date) => {
  //   setSelectedStartDate(date);
  // };
  //
  // const handleEndDateChange = (date) => {
  //   setSelectedEndDate(date);
  // };
  //
  // const handleImgChange = (event) => {
  //   setImageUrl(event.target.value);
  // };
  //
  // const handleCarAmountChange = (event) => {
  //   setCarAmount(event.target.value);
  // };
  //
  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };
  //
  // const handleParkingSizeChange = (event) => {
  //   setSizeOfParking(event.target.value);
  // };
  //
  // const handleTypeOfParkingChange = (event) => {
  //   setTypeOfParking(event.target.value);
  // };

  // const submit = () => {
  //   if (listingId) {
  //     onSubmit(listingId, selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
  //   } else {
  //     onSubmit(selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
  //   }
  // };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // props.firebase.firebaseRegisterUserEmailPass(email, password).then(() => {
    //   window.location.href = '/app';
    //   handleClose();
    // }).catch(() => {
    //   // TODO: Error message for user
    // });
  };

  return (
    <div className="CreateListingPage" >
      <Box boxShadow={3} className="booking">
        <h2>Edit User Info</h2>
        <form  onSubmit={handleSubmit}>
          <TextField
              className={classes.textField}
              id="firstName"
              label="First Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={firstName}
              // onChange={}
          />
          <TextField
              className={classes.textField}
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={lastName}
              // onChange={}
          />
          <TextField
              className={classes.textField}
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              // onChange={}
          />
          <TextField
              className={classes.textField}
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              // onChange={}
          />
          <Button type="submit" variant="contained" color="secondary" className={classes.submitButton} fullWidth>
            Confirm Change User Info
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ListingForm;
