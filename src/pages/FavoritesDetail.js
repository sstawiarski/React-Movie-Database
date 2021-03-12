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

const FavoritesDetail = (props) => {

    const [{
        favorites,
        isLoading
    }, setState] = React.useState({
            favorites: [],
            isLoading: true
    })

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDR}/favorites/${props.match.params.username}/all`)
        .then(response => response.json())
        .then(json => {
            setState({ favorites: json.favorites })
        });

        setState({isLoading: false})
    }, [props.match.params.username]);

        return (
            <div className="favorites-detail-box">
                <Header>{`${props.match.params.username}'s Favorites`}</Header>
                <Card bg="light">
                    <Card.Body>
                        <Grid>

                            {favorites ? favorites.map(item => {
                                return (

                                    <GridItem key={item.imdb}>

                                        <Link to={`/details/${item.imdb}`}>
                                            <Image src={item.poster} alt={`Poster for ${item.title}`} />
                                        </Link>

                                    </GridItem>
                                    
                                );
                            }): null}

                        </Grid>
                    </Card.Body>
                </Card>
                <div id="collection">
                    {favorites ? <CollectionViewWithSpinner isLoading={isLoading} data={favorites} perPage={3} /> : null }
                </div>
            </div>
        );

}

export default FavoritesDetail;