import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation';
import Profile from './components/SignInButton'
import Container from 'react-bootstrap/Container'
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SignIn from './pages/SignIn';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails'

import UserProvider from './UserProvider';
import UserProfile from './pages/UserProfile';
import FavoritesDetail from './pages/FavoritesDetail';
import EditProfile from './pages/EditProfile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      isSearching: false
    }
  }

  render() {
    return (
      <UserProvider>
        <div className="App">
          <Container>
            <Profile />
            <Navigation bg="light" handleSearch={(term) => {
              this.setState({
                searchTerm: term,
                isSearching: true
              })
            }} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movies" component={Movies} />
              <Route path="/about" component={About} />
              <Route exact path="/details/:id" render={(props) => <MovieDetails isText={false} {...props} />} />
              <Route exact path="/search/:title" render={(props) => <MovieDetails isText={true} {...props} />} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/profile/:email" component={UserProfile} />
              <Route exact path="/profile/:email/favorites" component={FavoritesDetail} />
              <Route exact path="/profile/:email/edit" component={EditProfile} />
            </Switch>
          </Container>
          {this.state.searchTerm && this.state.isSearching && <Redirect to={{
            pathname: `/search/${encodeURI(this.state.searchTerm)}`,
            state: { title: encodeURI(this.state.searchTerm) }
          }} />}
        </div>
      </UserProvider>
    );
  }

}

export default App;
