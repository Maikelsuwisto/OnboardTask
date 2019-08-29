import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CustomerIndex } from './Customer/CustomerIndex';
import { Product } from './Product/Product';        
import { Store } from './Store/Store';
import { Sale } from './Sales/Sale';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={CustomerIndex} />
                    <Route exact path='/CustomerIndex' component={CustomerIndex} />
                    <Route path='/Product' component={Product} />
                    <Route path='/Store' component={Store} />
                    <Route path='/Sale' component={Sale} />
                </Layout>
            </div>
        );
    }
}
