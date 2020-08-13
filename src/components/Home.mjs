import React from 'react';
import { Body } from "./Body";
import { Featured } from './Featured';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: "tt0816692",
            isSearching: false
        }
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=cc276c76&i=${this.state.featured}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                title: json.Title,
                year: json.Year,
                plot: json.Plot,
                poster: json.Poster
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="main-content">
                <Row>

                    <Col>
                        <Body />
                    </Col>

                    <Col xs={4}>
                        <Featured
                            bg="light"
                            src={this.state.poster}
                            title={this.state.title + ' ('+ this.state.year +')'}
                            desc={this.state.plot}
                            imdb={this.state.featured}/>
                    </Col>

                </Row>


            </div>

        );
    }
}

export default Home;