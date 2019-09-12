import React, { Component } from 'react';
import { Button, Modal, Input, Form, Icon } from 'semantic-ui-react';
import '../Customer/CustomerIndex.css';

export class Product extends Component {
    displayName = Product.name;
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            productId: '',
            productName: '',
            price: '',
            editProductId: '',
            editProductName: '',
            editPrice: '',
            products: [],
            errors: {}
        };
        this.loadData = this.loadData.bind(this);
        this.createNew = this.createNew.bind(this);
        this.editData = this.editData.bind(this);

    }

    async componentDidMount() {
        this.loadData();

    }
    async loadData() {
        const response = await fetch('https://onboardtask.azurewebsites.net/products/index')
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        this.setState({ products: data });
    } catch(error) {
        console.log(error);
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.productName) {
            formIsValid = false;
            errors['productName'] = '*Please enter the product Name.';
        }

        if (typeof this.state.productName !== "undefined") {
            if (!this.state.productName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["productName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.price) {
            formIsValid = false;
            errors['price'] = '*Please enter the price'
        }

        if (!this.state.editProductName) {
            formIsValid = false;
            errors['productName'] = '*Please enter the product Name.';
        }

        if (typeof this.state.editProductName !== "undefined") {
            if (!this.state.productName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["productName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.editPrice) {
            formIsValid = false;
            errors['price'] = '*Please enter the price'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    validateEditForm() {

        let errors = {}

        let formIsValid = true

        if (!this.state.editProductName) {
            formIsValid = false;
            errors['editProductName'] = '*Please enter the product Name.';
        }

        if (typeof this.state.editProductName !== "undefined") {
            if (!this.state.productName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["editProductName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.editPrice) {
            formIsValid = false;
            errors['editPrice'] = '*Please enter the price'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    async createNew() {
        if (this.validateForm()) {
            await fetch('https://onboardtask.azurewebsites.net/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ProductName: this.state.productName,
                    Price: this.state.price
                })
            });
            window.location.reload()
        }
    }

    editproduct(Id, Name, Address) {
        this.setState({
            editProductId: Id,
            editProductName: Name,
            editPrice: Address,
        })
    }

    async editData() {
        if (this.validateEditForm()) {
            await fetch('https://onboardtask.azurewebsites.net/products/Edit/' + this.state.editProductId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: this.state.editProductId,
                    productName: this.state.editProductName,
                    price: this.state.editPrice
                })
            });
            window.location.reload();
        }
    }

    async deleteproduct(id) {
        await fetch('https://onboardtask.azurewebsites.net/products/Delete/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.reload();
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    show = size => () => this.setState({ size, open: true })
    close = () => {
        this.setState({ open: false });

    }

    render() {
        const { open, size, products } = this.state

        return (
            <div>
                <Button onClick={this.show('mini')} className="ui primary button">Create New</Button>
                <Modal size={size} open={open} onClose={this.close} className="Modal" name="Modal">
                    <Modal.Header><center>Create product</center></Modal.Header>
                    <Modal.Content>
                        <Form>
                            <center><Input type='text' placeholder='Product Name' name="productName" value={this.state.productName} onChange={this.handleChange.bind(this)} /></center><br />
                            <div style={{ color: 'red' }}>  {this.state.errors.productName} </div>
                            <center><Input type='text' placeholder='Price' name="price" value={this.state.price} onChange={this.handleChange.bind(this)} />
                                <div style={{ color: 'red' }}>  {this.state.errors.price} </div></center>
                            </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button type="submit" color="green" positive icon='checkmark' labelPosition='right' content="Create New" onClick={this.createNew}
                        />
                    </Modal.Actions>
                </Modal>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th hidden>Id</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.productId}>
                                <td hidden>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td> <Modal size="mini" className="Modal"
                                    trigger={<Button color="yellow" icon labelPosition="left" onClick={this.editproduct.bind(this, product.productId, product.productName, product.price)}><Icon name="edit" />Edit</Button>}
                                    header='Edit product'
                                    content={<div><br /><center><Input type='hidden' name='editProductId' placeholder='Id' value={this.state.editProductId} onChange={this.handleChange.bind(this)} />
                                        <Input type='text' placeholder='Product Name' name='editProductName' value={this.state.editProductName} onChange={this.handleChange.bind(this)} /> <br /> <br />
                                        <div style={{ color: 'red' }}>  {this.state.errors.editProductName} </div>
                                        <Input type='text' placeholder='Price' name='editPrice' value={this.state.editPrice} onChange={this.handleChange.bind(this)} /></center><br />
                                        <div style={{ color: 'red' }}>  {this.state.errors.editPrice} </div></div>}
                                    actions={['Cancel', { key: 'done', content: 'Update', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.editData }]}
                                />
                                </td>
                                <td><Modal size="mini" className="Modal" name="Modal"
                                    trigger={<Button color="red" icon labelPosition="left"><Icon name="trash" />Delete</Button>}
                                    header='Delete product'
                                    content='Are you sure you want to delete ?'
                                    actions={['No', { key: 'delete', content: 'delete', color: 'red', positive: true, icon: 'delete', labelPosition: 'right', onClick: this.deleteproduct.bind(this, product.productId) }]}
                                />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
