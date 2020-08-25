import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation';
import Container from 'react-bootstrap/Container'
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails'

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
      <div className="App">
        <Container>
          <Navigation bg="light" handleSearch={(term) => {
            this.setState({
              searchTerm: term,
              isSearching: true
            })
          }} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={Movies} />
            <Route exact path="/details/:id" render={(props) => <MovieDetails isText={false} {...props} />} />
            <Route exact path="/search/:title" render={(props) => <MovieDetails isText={true} {...props} />} />
          </Switch>
        </Container>
        {this.state.searchTerm && this.state.isSearching && <Redirect to={{
          pathname: `/search/${encodeURI(this.state.searchTerm)}`,
          state: { title: encodeURI(this.state.searchTerm) }
        }} />}
      </div>
    );
  }

}

export default App;
