import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Searchbar = (props) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    React.useEffect(() => {
        props.onChange(value)
    }, [value])

        return (
            <Container id="searchbar" style={{width: "85%", marginTop: "5%"}}>
                <Form>
                    <Form.Group controlId="database-search">
                        <Form.Control type="text" value={value} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Enter a movie title here to search the database.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        );
}

export { Searchbar };