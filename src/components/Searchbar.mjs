import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({value: event.target.value}, () => {
            this.props.onChange(this.state.value)
        });
    }

    render() {
        return (
            <Container id="searchbar" style={{width: "85%", marginTop: "5%"}}>
                <Form>
                    <Form.Group controlId="database-search">
                        <Form.Control type="text" value={this.state.value} onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            Enter a movie title here to search the database.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

export { Searchbar };