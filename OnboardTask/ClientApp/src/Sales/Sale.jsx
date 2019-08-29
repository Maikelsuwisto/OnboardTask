import React, { Component } from 'react';
import { Button, Modal, Input} from 'semantic-ui-react';
import './Sale.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class Sale extends Component {
    displayName = Sale.name;
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            saleId: '', 
            customerId: '',
            productId: '',
            storeId: '',
            customerName: '',
            productName: '',
            storeName: '',
            saleDate: new Date(),
            editSaleId: '',
            editCustomerId: '',
            editProductId: '',
            editStoreId: '',
            editSaleName: '',
            editCustomerName: '',
            editProductName: '',
            editstoreName: '',
            editSaleDate: '',
            sales: [],
            customers: [],
            products: [],
            stores: [],
            errors: {}
        };
        this.loadData = this.loadData.bind(this);
        this.createNew = this.createNew.bind(this);
        this.editData = this.editData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChanged = this.handleChanged.bind(this);


    }
    async componentDidMount() {
        this.loadData();
        this.customerData();
        this.productData();
        this.storeData();

    }
    async loadData() {
        const response = await fetch('https://localhost:44327/sales', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        this.setState({ sales: data });
    } catch(error) {
        console.log(error);
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.customerId) {
            formIsValid = false;
            errors['customerId'] = '*Please Choose Customer Name.';
        }
        if (!this.state.productId) {
            formIsValid = false;
            errors['productId'] = '*Please Choose Product Name.';
        }
        if (!this.state.storeId) {
            formIsValid = false;
            errors['storeId'] = '*Please Choose Store Name.';
        }
        if (!this.state.saleDate) {
            formIsValid = false;
            errors['saleDate'] = '*Please enter the Date'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }


    async createNew() {
        if (this.validateForm()) {
            await fetch('https://localhost:44327/sales/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    CustomerId: this.state.customerId,
                    ProductId: this.state.productId,
                    StoreId: this.state.storeId,
                    SaleDate: this.state.saleDate,
                })
            });
            window.location.reload()
        }
    }

    editSale(Id, CustomerName, ProductName, storeName, dateSold) {
        this.setState({
            editSaleId: Id,
            editCustomerId: CustomerName,
            editProductId: ProductName,
            editStoreId: storeName,
            editSaleDate: dateSold,
        })
    }

    async editData() {
        await fetch('https://localhost:44327/sales/Edit/' + this.state.editSaleId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                salesId: this.state.editSaleId,
                customerId: this.state.editCustomerId,
                productId: this.state.editProductId,
                storeId: this.state.editStoreId,
                dateSold: this.state.editSaleDate,
            })
        });
        window.location.reload();
    }

    async deleteSale(id) {
        await fetch('https://localhost:44327/sales/Delete/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.reload();
    }

    customerData() {
        fetch('https://localhost:44327/customers')
            .then(response => response.json())
            .then(data => this.setState({ customers: data }));
    }

    productData() {
        fetch('https://localhost:44327/products')
            .then(response => response.json())
            .then(data => this.setState({ products: data }));
    }

    storeData() {
        fetch('https://localhost:44327/stores')
            .then(response => response.json())
            .then(data => this.setState({ stores: data }));
    }


    handleChanged(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(date) {
        console.log(date)
        this.setState({
            saleDate: date
        });
    }

    show = size => () => this.setState({ size, open: true })
    close = () => {
        this.setState({ open: false });
    }


    render() {
        const { open, size } = this.state
        let customers = [{ Id: '', customerName: 'Select Customer' }].concat(this.state.customers)
        let products = [{ Id: '', productName: 'Select Product' }].concat(this.state.products)
        let stores = [{ Id: '', storeName: 'Select Store' }].concat(this.state.stores)
        let editCustomers = this.state.customers
        let editProducts = this.state.products
        let editStores = this.state.stores
        let sales = this.state.sales.map((sale) => {
            return (
                <tr key={sale.salesId}>
                    <td hidden>{sale.salesId}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.storeName}</td>
                    <td>{sale.dateSold}</td>
                    <td> <Modal size="mini" className="Modal"
                        trigger={<Button color="blue" onClick={this.editSale.bind(this, sale.salesId, sale.customerName, sale.productName, sale.storeName, sale.dateSold)}>Edit</Button>}
                        header='Edit sale'
                        content={<div><br /><center><Input type='hidden' name='editSaleId' placeholder='Id' value={this.state.editSaleId} onChange={this.handleChanged} /> <br/>
                            <select name='editCustomerId' value={sale.customerId} onChange={this.handleChanged}>
                                <option>{this.state.editCustomerId}</option>
                                {editCustomers.map((customer) => <option key={customer.customerId} value={customer.customerId}> {customer.customerName} </option>)}
                            </select><br /><br />
                            <select name='editProductId' value={sale.productId} onChange={this.handleChanged}>
                                <option>{this.state.editProductId}</option>
                                {editProducts.map((product) => <option key={product.productId} value={product.productId}> {product.productName} </option>)}
                            </select><br /><br />
                            <select name='editStoreId' value={sale.storeId} onChange={this.handleChanged} >
                                <option>{this.state.editStoreId}</option>
                                {editStores.map((store) => <option key={store.storeId} value={store.storeId}> {store.storeName} </option>)}
                            </select><br /><br />
                            <DatePicker id='date'
                                value={this.state.editSaleDate}
                                selected={this.state.saleDate}
                                onChange={this.handleChange}
                                dateFormat="yyyy-mmmm-dd"
                            /></center><br /></div>}
                        actions={['Cancel', { key: 'done', content: 'Update', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.editData }]}
                    />
                    </td>
                    <td><Modal size="mini"
                        trigger={<Button color="red">Delete</Button>}
                        header='Delete sale'
                        content='Are you sure you want to delete ?'
                        actions={['No', { key: 'yes', content: 'Yes', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.deleteSale.bind(this, sale.salesId) }]}
                    />
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <Button onClick={this.show('mini')} className="ui primary button">Create New</Button>
                <Modal size={size} open={open} onClose={this.close} className="Modal" name="Modal">
                    <Modal.Header><center>Create sale</center></Modal.Header>
                    <Modal.Content>
                        <center> <select name='customerId' value={this.state.customerId} onChange={this.handleChanged}> {customers.map((customer) => <option key={customer.customerId} value={customer.customerId}> {customer.customerName} </option>)}
                        </select></center><br /><div style={{ color: 'red' }}>  {this.state.errors.customerId} </div>
                        <center> <select name='productId' value={this.state.productId} onChange={this.handleChanged} > {products.map((product) => <option key={product.productId} value={product.productId}> {product.productName} </option>)}
                        </select></center><br />
                        <div style={{ color: 'red' }}>  {this.state.errors.productId} </div>
                        <center> <select name='storeId' value={this.state.storeId} onChange={this.handleChanged} > {stores.map((store) => <option key={store.storeId} value={store.storeId}> {store.storeName} </option>)}
                        </select><br /><br />
                            <div style={{ color: 'red' }}>  {this.state.errors.storeId} </div>
                            <DatePicker id='date' name='dateSale' selected={this.state.saleDate} onChange={(event) => this.handleChange(event)} dateFormat="yyyy-MM-dd" />
                            <div style={{ color: 'red' }}>  {this.state.errors.saleDate} </div></center>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button type="submit" positive icon='checkmark' labelPosition='right' content="Create New" onClick={this.createNew}
                        />
                    </Modal.Actions>
                </Modal>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th hidden>Id</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Sale Date</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales}
                    </tbody>
                </table>
            </div>
        );
    }
}
