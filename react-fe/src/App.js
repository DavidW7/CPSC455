import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import MainApp from './components/pages/MainApp';
import ListingPage from './components/pages/ListingPage';
import MyListingsPage from './components/pages/MyListingsPage';
import CreateListingPage from "./components/pages/CreateListingPage";
import EditUserInfoPage from "./components/pages/EditUserInfoPage";
import MyBookingsTable from './components/pages/MyBookingsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/app">
          <MainApp />
        </Route>
        <Route exact path="/myListings">
          <MyListingsPage />
        </Route>
        <Route exact path="/myBookings">
          <MyBookingsTable />
        </Route>
        <Route path="/listing-page/:listingId">
          <ListingPage />
        </Route>

        <Route exact path="/createListing">
          <CreateListingPage />
        </Route>

        <Route exact path="/editUserInfo">
          <EditUserInfoPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
