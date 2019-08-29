import React, { Component } from 'react';
import { MenuBar } from './Menu';
import { Container } from 'semantic-ui-react';


export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <div>
                <MenuBar />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
