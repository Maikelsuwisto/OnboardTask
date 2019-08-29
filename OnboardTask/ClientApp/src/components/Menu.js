import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';



export class MenuBar extends Component {
    static displayName = MenuBar.name;

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu inverted>
                <Menu.Item as={Link} 
                    name='Customer' to='CustomerIndex'
                    active={activeItem === 'CustomerIndex'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} 
                    name='Product' to='Product'
                    active={activeItem === 'Product'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link}
                    name='Store' to='Store'
                    active={activeItem === 'Store'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link}
                    name='Sale' to='Sale'
                    active={activeItem === 'Store'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        );
    }
}
