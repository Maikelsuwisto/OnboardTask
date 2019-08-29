import React, { Component } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react';

export class Store extends Component {
    displayName = Store.name;
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            storeId: '',
            storeName: '',
            storeAddress: '',
            editStoreId: '',
            editStoreName: '',
            editStoreAddress: '',
            stores: [],
            errors: {}
        };
        this.loadData = this.loadData.bind(this);
        this.createNew = this.createNew.bind(this);
        this.editData = this.editData.bind(this);

    }

    componentDidMount() {
        this.loadData();

    }

    loadData() {
        fetch('https://localhost:44327/stores/index', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ stores: data }));
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.storeName) {
            formIsValid = false;
            errors['storeName'] = '*Please enter the product Name.';
        }

        if (typeof this.state.storeName !== "undefined") {
            if (!this.state.storeName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["storeName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.storeAddress) {
            formIsValid = false;
            errors['storeAddress'] = '*Please enter the storeAddress'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    createNew() {
        if (this.validateForm()) {
            fetch('https://localhost:44327/stores/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    storeName: this.state.storeName,
                    storeAddress: this.state.storeAddress
                })
            });
            window.location.reload()
        }
    }

    editStore(Id, Name, Address) {
        this.setState({
            editStoreId: Id,
            editStoreName: Name,
            editStoreAddress: Address,
        })
    }

    editData() {
        fetch('https://localhost:44327/stores/Edit/' + this.state.editStoreId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                storeId: this.state.editStoreId,
                storeName: this.state.editStoreName,
                storeAddress: this.state.editStoreAddress
            })
        });
        window.location.reload();
    }

    deletestore(id) {
        fetch('https://localhost:44327/stores/Delete/' + id, {
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
        const { open, size, stores } = this.state

        return (
            <div>
                <Button onClick={this.show('mini')} className="ui primary button">Create New</Button>
                <Modal size={size} open={open} onClose={this.close} className="Modal" name="Modal">
                    <Modal.Header><center>Create store</center></Modal.Header>
                    <Modal.Content>
                        <Form>
                            <center><Input type='text' placeholder='Store Name' name="storeName" value={this.state.storeName} onChange={this.handleChange.bind(this)} /></center><br />
                            <div style={{ color: 'red' }}>  {this.state.errors.storeName} </div>
                            <center><Input type='text' placeholder='Store Address' name="storeAddress" value={this.state.storeAddress} onChange={this.handleChange.bind(this)} />
                                <div style={{ color: 'red' }}>  {this.state.errors.storeAddress} </div></center>
                        </Form>
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
                            <th>Store Name</th>
                            <th>Store Address</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store =>
                            <tr key={store.storeId}>
                                <td hidden>{store.storeId}</td>
                                <td>{store.storeName}</td>
                                <td>{store.storeAddress}</td>
                                <td> <Modal size="mini" className="Modal"
                                    trigger={<Button color="blue" onClick={this.editStore.bind(this, store.storeId, store.storeName, store.storeAddress)}>Edit</Button>}
                                    header='Edit store'
                                    content={<div><br /><center><Input type='hidden' name='editStoreId' placeholder='Id' value={this.state.editStoreId} onChange={this.handleChange.bind(this)} />
                                        <Input type='text' placeholder='Store Name' name='editStoreName' value={this.state.editStoreName} onChange={this.handleChange.bind(this)} /> <br /> <br />
                                        <Input type='text' placeholder='Store Address' name='editStoreAddress' value={this.state.editStoreAddress} onChange={this.handleChange.bind(this)} /></center><br /></div>}
                                    actions={['Cancel', { key: 'done', content: 'Update', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.editData }]}
                                />
                                </td>
                                <td><Modal size="mini"
                                    trigger={<Button color="red">Delete</Button>}
                                    header='Delete store'
                                    content='Are you sure you want to delete ?'
                                    actions={['No', { key: 'yes', content: 'Yes', positive: true, icon: 'checkmark', labelPosition: 'right', onClick: this.deletestore.bind(this, store.storeId) }]}
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
