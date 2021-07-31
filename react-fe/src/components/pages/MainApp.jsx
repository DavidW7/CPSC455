import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import ReactMapGL, {Marker} from "react-map-gl";
import config from '../../config';
import axios from 'axios';
import {Button, Grid, Typography} from '@material-ui/core';
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
  const [selectedParkSpot, setSelectedParkSpot] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.269520,
    longitude: -123.251240,
    width: '100vw',
    height: '100vh',
    zoom:10
  });

  const getLatLongFromAddress = (address) => {
    Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          return [lat, lng];
        },
        (error) => {
          console.error(error);
        }
    );
  }

  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
      Geocode.fromAddress(listing.location).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        newListings.push(
          <Grid item key={listing.listingId}>
            <ParkSpotListingCard
              listingId={listing.listingId}
              imgUrl={listing.imgUrl}
              size={listing.size}
              location={listing.location}
              numberAvail={listing.numberAvail}
              dayPrice={listing.dayPrice}
              lat={lat}
              lng={lng}
            />
          </Grid>
        )
      })
    }
    setListings(newListings);
    setLoading(false);
  };


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
      {loading ?
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {listings.map((listing) => (
              <Marker
                  key={listing.listingId}
                  longitude={listing.lng}
                  latitude={listing.lat}
              >
                <Button
                  class={'marker-btn'}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedParkSpot(listing);
                  }}
                >
                  <h1>DFLS;DFKJAS;LDFKJSDFASDFSF</h1>
                </Button>
              </Marker>
          ))}
        </ReactMapGL> : null}
    </div>
  );
};

export default withFirebase(MainApp);
