import React, { Component } from 'react';
import { Button, Modal, Input, Form, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './CustomerIndex.css';

export class CustomerIndex extends Component {
    displayName = CustomerIndex.name;
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            customerId: '',
            customerName: '',
            customerAddress: '',
            editCustomerId: '',
            editCustomerName: '',
            editCustomerAddress: '',
            customers: [],
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
        const response = await fetch('https://onboardtask.azurewebsites.net/customers')
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        this.setState({ customers: data });
    } catch(error) {
        console.log(error);
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.customerName) {
            formIsValid = false;
            errors['customerName'] = '*Please enter the Customer Name.';
        }

        if (typeof this.state.customerName !== "undefined") {
            if (!this.state.customerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["customerName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.customerAddress) {
            formIsValid = false;
            errors['customerAddress'] = '*Please enter the Customer Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    validateEditForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.editCustomerName) {
            formIsValid = false;
            errors['editCustomerName'] = '*Please enter the Customer Name.';
        }

        if (typeof this.state.editCustomerName !== "undefined") {
            if (!this.state.editCustomerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["editCustomerName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.editCustomerAddress) {
            formIsValid = false;
            errors['editCustomerAddress'] = '*Please enter the Customer Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }


    async createNew() {
        if (this.validateForm()) {
            await fetch('https://onboardtask.azurewebsites.net/customers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    CustomerName: this.state.customerName,
                    CustomerAddress: this.state.customerAddress
                })
            });
            window.location.reload()
        }
    }

    editCustomer(Id, Name, Address) {
        this.setState({
            editCustomerId: Id,
            editCustomerName: Name,
            editCustomerAddress: Address,
        })
    }

    async editData() {
        if (this.validateEditForm()) {
            await fetch('https://onboardtask.azurewebsites.net/Customers/Edit/' + this.state.editCustomerId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    customerId: this.state.editCustomerId,
                    CustomerName: this.state.editCustomerName,
                    CustomerAddress: this.state.editCustomerAddress
                })
            });
            window.location.reload();
        }
    }

    async deleteCustomer(id) {
        await fetch('https://onboardtask.azurewebsites.net/Customers/Delete/' + id, {
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
        const { open, size, customers } = this.state

        return (
            <div>
                <Button onClick={this.show('mini')} className="ui primary button">Create New</Button>
                <Modal size={size} open={open} onClose={this.close} className="Modal" name="Modal">
                    <Modal.Header><center>Create Customer</center></Modal.Header>
                    <Modal.Content>
                        <Form>
                            <center><Input type='text' placeholder='Name' name="customerName" value={this.state.customerName} onChange={this.handleChange.bind(this)} /></center><br />
                            <div style={{ color: 'red' }}>  {this.state.errors.customerName} </div>
                            <center><Input type='text' placeholder='Address' name="customerAddress" value={this.state.customerAddress} onChange={this.handleChange.bind(this)} /></center>
                            <div style={{ color: 'red' }}>  {this.state.errors.customerAddress} </div>
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
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer =>
                            <tr key={customer.customerId}>
                                <td hidden>{customer.customerId}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.customerAddress}</td>
                                <td> <Modal size="mini" className="Modal" name="Modal"
                                    trigger={<Button color="yellow" icon labelPosition="left" onClick={this.editCustomer.bind(this, customer.customerId, customer.customerName, customer.customerAddress)}><Icon name="edit" />Edit</Button>}
                                    header= 'Edit Customer'
                                    content={<div><br /><center><Input type='hidden' name='editCustomerId' placeholder='Id' value={this.state.editCustomerId} onChange={this.handleChange.bind(this)} />
                                        <Input type='text' placeholder='Name' name='editCustomerName' value={this.state.editCustomerName} onChange={this.handleChange.bind(this)} /> <br /> <br />
                                        <div style={{ color: 'red' }}>  {this.state.errors.editCustomerName} </div>
                                        <Input type='text' placeholder='Address' name='editCustomerAddress' value={this.state.editCustomerAddress} onChange={this.handleChange.bind(this)} /></center><br />
                                        <div style={{ color: 'red' }}>  {this.state.errors.editCustomerAddress} </div></div>}
                                    actions={['Cancel', { key: 'done', color: 'green', content: 'Update', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.editData }]}
                                />
                                </td>
                                <td><Modal size="mini" className="Modal" name="Modal"
                                    trigger={<Button color="red" icon labelPosition="left"><Icon name="trash" /> Delete</Button>}
                                    header='Delete Customer'
                                    content='Are you sure you want to delete ?'
                                    actions={['Cancel', { key: 'delete', content: 'delete', color: 'red', positive: true, icon: 'delete', labelPosition: 'right', onClick: this.deleteCustomer.bind(this, customer.customerId) }]}
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

