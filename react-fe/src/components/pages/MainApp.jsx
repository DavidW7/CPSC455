import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import ReactMapGL, {Marker} from "react-map-gl";
import config from '../../config';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CircularProgress from '@material-ui/core/CircularProgress';
import Geocode from "react-geocode";

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});

const MainApp = () => {
  let MAPBOX_TOKEN = "pk.eyJ1IjoiZGF2aWR3NyIsImEiOiJja3Jwc3RpdGQ4cjUyMm9tbjh6MmU2YzN6In0.rKQNwIwSGSGjw_u8UHM5XQ";

  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 49.269520,
    longitude: -123.251240,
    width: '100vw',
    height: '100vh',
    zoom:10
  });

  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
      newListings.push(
        <Grid item key={listing.listingId}>
          <ParkSpotListingCard
            listingId={listing.listingId}
            imgUrl={listing.imgUrl}
            size={listing.size}
            location={listing.location}
            numberAvail={listing.numberAvail}
            dayPrice={listing.dayPrice}
          />
        </Grid>
      );
    }
    setListings(newListings);
    setLoading(false);
  };

  const displayListingLocationOnMap = (listing) => {
    Geocode.fromAddress(listing.location).then(
        (response) => {
          let { lat, lng } = response.results[0].geometry.location;
          <Marker longitude={lng} latitude={lat}>
            <h1>PARKING</h1>
          </Marker>
        },
        (error) => {
          console.error(error);
        }
    );
  }

  useEffect(() => {
    axios.get(url + "/listings/").then((resp) => {
      responseToListings(resp.data);
    });
  }, [url]);

  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      axios.get(url + "/listings/search?searchTerm=" + searchTerm).then((resp) => {
        responseToListings(resp.data);
      });
    } else {
      axios.get(url + "/listings/").then((resp) => {
        responseToListings(resp.data);
      });
    }
  }, [searchTerm, url]);

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> Available Parking Spaces <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {loading ?
          <Grid item>
            <CircularProgress />
          </Grid>
          : null}
        {listings}
      </Grid>
      <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => setViewport(viewport)}

      >
        {listings.map(displayListingLocationOnMap)}
      </ReactMapGL>
    </div>
  );
};

export default withFirebase(MainApp);
