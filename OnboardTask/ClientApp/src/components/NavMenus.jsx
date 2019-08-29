import React, { Component } from 'react';
import { Container, Menu, } from 'semantic-ui-react'

export default class NavMenus extends Component {
    displayName = NavMenus.name
    render()
    return(
const NavMenus = () => (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            Project Name
        </Menu.Item>
                        <Menu.Item as='a'>Home</Menu.Item>
                    </Container>
                </Menu>
            </div>
        )
    )
}