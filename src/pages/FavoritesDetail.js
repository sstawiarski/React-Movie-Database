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
        email,
        favorites,
        isLoading
    }, setState] = React.useState({
            email: props.match.params.email,
            favorites: [],
            isLoading: true
    })

    React.useEffect(() => {
        fetch(`http://localhost:4000/profile/${email}/all`)
        .then(response => response.json())
        .then(json => {
            json = JSON.parse(json);
            setState({ favorites: json.favorites })
        });

        setState({isLoading: false})
    }, [email]);

        return (
            <div className="favorites-detail-box">
                <Header>{`${email}'s Favorites`}</Header>
                <Card bg="light">
                    <Card.Body>
                        <Grid>

                            {favorites.map(item => {
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
                    <CollectionViewWithSpinner isLoading={isLoading} data={favorites} perPage={3} />
                </div>
            </div>
        );

}

export default FavoritesDetail;