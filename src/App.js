import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation';
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieSearch from './components/MovieSearch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Container>
            <Navigation bg="light" handleSearch={(term)=> this.setState({searchTerm: term})} />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/movies" component={Movies} />
              <Route path="/details/:title" component={MovieSearch}/>
            </Switch>
            {/*this.state.searchTerm && <MovieSearch input={this.state.searchTerm}/>*/}
          </Container>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
