import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };

        this.search = React.createRef();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        this.setState({search: event.target.value});
    }

    handleSearch(event) {
        event.preventDefault();
        const input = this.state.search;
        this.props.handleSearch(input);
        this.setState({search: ""});
    }

    render() {
        return (
            <div id="navbar">
                <Navbar bg={this.props.bg} expand="lg">
                    <Navbar.Brand href="/">MovieDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/movies">Movies</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        <Form onSubmit={this.handleSearch} inline>
                            <FormControl type="text" value={this.state.search} ref={this.search} onChange={this.handleInput} placeholder="Search by title" className="mr-sm-2" />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export { Navigation };