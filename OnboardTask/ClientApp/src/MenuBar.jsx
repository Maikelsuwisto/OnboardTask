import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

export default () => (
    <Menu inverted>
        <Container>
            <Menu.Item as="a" header>
                <h1>React</h1>
            </Menu.Item>

            <Menu.Menu position="left">
                <Menu.Item as="a" name="Customers">
                    >Customer
                </Menu.Item>

                <Menu.Item as="a" name="Products">
                    Products
        </Menu.Item>
                <Menu.Item as="a" name="Stores">
                    Stores
        </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
);