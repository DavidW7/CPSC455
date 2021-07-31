import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import ListingForm from '../organisms/ListingForm';
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import Geocode from "react-geocode";
import {Marker} from "react-map-gl";

const CreateListingPage = (props) => {
    const url = config.api.url;
    const [authUserHeaders, setAuthUserHeaders] = useState(null);

    const setAuthHeaders = () => {
        if (props.firebase.getAuthHeaders()) {
            setAuthUserHeaders(props.firebase.getAuthHeaders());
        } else {
            setTimeout(setAuthHeaders, 100);
        }
    };

    useEffect(setAuthHeaders, []);

    const createListing = (startDate, endDate, imgUrl, numberAvail, location, dayPrice, description, instructions, type, size) => {
        axios.post(url + "/listings/", {
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            imgUrl,
            numberAvail,
            size,
            location,
            dayPrice,
            description,
            instructions,
            type,
        }, authUserHeaders).then(() => {
            alert("Successfully Created Listing");
        }).catch(err => {
            alert("Server error - Failed to create: " + err);
        });
    };

    return (
        <div>
            <Header />
            <ListingForm
                onSubmit={createListing}
            />
        </div>
    );
};
export default withFirebase(CreateListingPage);
