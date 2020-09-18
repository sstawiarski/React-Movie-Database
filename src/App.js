import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation';
import Profile from './components/SignInButton'
import Container from 'react-bootstrap/Container'
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SignIn from './pages/SignIn';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails'
import UserProfile from './pages/UserProfile';
import FavoritesDetail from './pages/FavoritesDetail';
import ForumDetails from './pages/ForumDetails';
import EditProfile from './pages/EditProfile';
import ForumThread from './pages/ForumThread';
import Forums from './pages/Forums'

const App = (props) => {

  return (
    <div className="App">
      <Container>
        <Profile />
        <Navigation bg="light" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/about" component={About} />
          <Route exact path="/forums" component={Forums} />
          <Route exact path="/forums/:id" component={ForumDetails} />
          <Route exact path="/forums/:id/:threadId" component={ForumThread} />
          <Route exact path="/details/:id" render={(props) => <MovieDetails isText={false} {...props} />} />
          <Route exact path="/search/:title" render={(props) => <MovieDetails isText={true} {...props} />} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile/:username" component={UserProfile} />
          <Route exact path="/profile/:username/favorites" component={FavoritesDetail} />
          <Route exact path="/profile/:username/edit" component={EditProfile} />
        </Switch>
      </Container>
    </div>
  );

}

export default App;
