import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default class Sopstvenik extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            items: [],
            openModal: false

        }
    }

    componentWillMount() {
        this.fetchItems();

    }


    fetchItems =  () => {

        fetch('http://localhost:8080/sopstvenik')
            .then(data => {
                data.json().then(item => {
                    this.setState({
                        items:item
                    }, () => console.log(this.state.items));
                })
            })


    };


    delete = (id) => {

        fetch(`http://localhost:8080/sopstvenik/delete/${id}`)
            .then(res => {
                console.log(res.status);
                if(res.status === 200){
                    let items = this.state.items.filter(item => {
                        return item.id !== id;
                    });
                    this.setState({
                        items:items
                    });
                }
            });



    };



    addSopstvenik = () => {
        let sopstvenik = {
            ime: this.nameInput.value,
            prezime: this.surNameInput.value,
            adresa: this.adresaInput.value,
            godini: this.godiniInput.value,

        };

        fetch("http://localhost:8080/sopstvenik/add",{
            method: 'POST',
            body: JSON.stringify(sopstvenik),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.status === 200){
                    let items2 = this.state.items;
                    items2.push(sopstvenik);
                    this.setState({
                        items: items2,
                        openModal: false
                    })
                }
            });
    };

    render() {
        let modalClose = () =>  {this.setState({openModal:false})};
        let modalOpen = () =>  {this.setState({openModal:true})};
        return (


            <div>

                <h1>Site sopstvenici: </h1>
                {this.state.items.map(item => (
                    <div style={{'border': '1px solid darkgrey'}}>
                        <h4>Ime: {item.ime}</h4>
                        <h4>Prezime: {item.prezime}</h4>
                        <h4>Adresa: {item.adresa}</h4>
                        <h4>Godini: {item.godini}</h4>
                        <Link to={`/vozila/sopstvenik/${item.id}`}> <h4>Vidi vozila</h4> </Link>
                        <button onClick={() => this.delete(item.id)}>Izbrisi</button>
                    </div>
                ))}

                <br/><br/>
                <Button onClick={modalOpen} className='btn btn-primary'>Dodaj</Button>

                <br/>
                <Link to='/shop'>Nazad kon vozila </Link>


                <Modal
                    size="lg"
                    show={this.state.openModal}
                    onHide={modalClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Додај сопственик
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Име</Form.Label>
                                <Form.Control type="text" placeholder="Име" ref={input => this.nameInput = input} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Презиме</Form.Label>
                                <Form.Control type="text" placeholder="Презиме" ref={input => this.surNameInput = input} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Адреса</Form.Label>
                                <Form.Control type="text" placeholder="Адреса" ref={input => this.adresaInput = input} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Години</Form.Label>
                                <Form.Control type="text" placeholder="Години" ref={input => this.godiniInput = input} />
                            </Form.Group>

                            <Form.Group>
                                <Button className="btn btn-primary" onClick={this.addSopstvenik}>Додај</Button>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>


        );
    }
}

















///////////////////////////////////////////////////////////////////////

/*


import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Sopstvenik() {

    useEffect( () => {
            fetchItems();
        }, []
    );

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(
            'http://localhost:8080/sopstvenik'
        );

        const items = await data.json();
        console.log(items);
        setItems(items);
    }

    return (
        <div>
            <h1>Site sopstvenici: </h1>
            {items.map(item => (
                <div style={{'border': '1px solid darkgrey'}}>
                    <h4>Ime: {item.ime}</h4>
                    <h4>Prezime: {item.prezime}</h4>
                    <h4>Adresa: {item.adresa}</h4>
                    <h4>Godini: {item.godini}</h4>
                    <Link to={`/vozila/sopstvenik/${item.id}`}> <h4>Vidi vozila</h4> </Link>
                </div>
            ))}
            <br/>
            <Link to='/shop'>Nazad kon vozila </Link>

        </div>
    );
}

export default Sopstvenik;
*/