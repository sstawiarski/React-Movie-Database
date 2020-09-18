import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Navigation = (props) => {

    const history = useHistory();
    const [search, setSearch] = React.useState(null);

    const handleInput = (event) => {
        setSearch(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
        history.push(`/search/${encodeURI(search)}`);
        setSearch("");
    }

    return (
        <div id="navbar">
            <Navbar bg={props.bg} expand="lg">
                <Navbar.Brand href="/">MovieDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/forums">Forums</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Form onSubmit={handleSearch} inline>
                        <FormControl type="text" value={search|| ""} onChange={handleInput} placeholder="Search by title" className="mr-sm-2" />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export { Navigation };