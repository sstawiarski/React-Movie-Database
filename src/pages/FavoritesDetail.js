import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import CollectionView from '../components/CollectionView'
import WithSpinner from '../components/WithSpinner'

const CollectionViewWithSpinner = WithSpinner(CollectionView);
const Header = styled.h3`
    margin-top: 10px;
    text-align: center;
`;

const Image = styled.img`
    width: 100px;
    background: #eee;
    border: 3px solid transparent;

    &:hover {
        background: #e1e1e1;
        border: 3px solid black;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(160px, 1fr));
    width: 100%;
    height: 100%;
`;

const GridItem = styled.div`
    margin: 10px 0px 10px 10px;
`;

class FavoritesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.email,
            favorites: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/profile/${this.state.email}/all`)
            .then(response => response.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ favorites: json.favorites })
            });

            this.setState({isLoading: false})
    }

    render() {
        return (
            <div className="favorites-detail-box">
                <Header>{`${this.state.email}'s Favorites`}</Header>
                <Card bg="light">
                    <Card.Body>
                        <Grid>

                            {this.state.favorites.map(item => {
                                return (

                                    <GridItem key={item.imdb}>

                                        <Link to={`/details/${item.imdb}`}>
                                            <Image src={item.poster} alt={`Poster for ${item.title}`} />
                                        </Link>

                                    </GridItem>
                                    
                                );
                            })}

                        </Grid>
                    </Card.Body>
                </Card>
                <div id="collection">
                    <CollectionViewWithSpinner isLoading={this.state.isLoading} data={this.state.favorites} perPage={3} />
                </div>
            </div>
        );
    }

}

export default FavoritesDetail;