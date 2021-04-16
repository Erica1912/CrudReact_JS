//
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  FormGroup,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "reactstrap";
import { isElementOfType } from "react-dom/test-utils";

const data = [
  { id: 1, name: "joe", email: "Joe@ea.com" },
  { id: 3, name: "Arley", email: "arley@ae.com" },
  { id: 4, name: "habid", email: "habid@ae.com" },
  { id: 2, name: "Yessica", email: "Yessica@ae.com" },
  { id: 7, name: "Yessica", email: "Yessica@ae.com" },
  { id: 9, name: "Yessica", email: "Yessica@ae.com" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      name: "",
      email: "",
    },
    modalInsert: false,
    modalEdit: false,
  };

  handleOnChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostarModalInsertar = () => {
    this.setState({ modalInsert: true });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsert: false });
  };
  mostarModalEditar = (registro) => {
    this.setState({ modalEdit: true, form: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEdit: false });
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsert: false });
  };

  editar = (dato) => {
    let contador = 0;
    const lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].name = dato.name;
        lista[contador].email = dato.email;
      }
      contador = contador + 1;
    });
    this.setState({ data: lista, modalEdit: false });
  };

  eliminar = (dato) => {
    let opcion = window.confirm("Eliminar registro" + dato.id);
    if (opcion) {
      
       contador = 0;
      let lista = this.state.data;
      lista.map((registro) => {
        if ((registro.id = dato.id)) {
          lista.splice(contador, 1);          
          console.log(contador)
        }
        contador++;
      });
      this.setState({data:lista})
    }
  };

  render() {
    return (
      <Container>
        <br />
        <Button
          color="success"
          onClick={() => {
            this.mostarModalInsertar();
          }}
        >
          {" "}
          Insertar nuevo
        </Button>

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader closeButton></ModalHeader>

          <ModalBody>
            <h1>Insertar nuevo usuario</h1>
            <FormGroup>
              <label>Id</label>
              <input
                className="form-control"
                type="text"
                name="id"
                value={this.state.data.length + 1}
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => this.ocultarModalInsertar()}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader closeButton></ModalHeader>

          <ModalBody>
            <h1>Editar</h1>
            <FormGroup>
              <label>Id</label>
              <input
                className="form-control"
                type="text"
                name="id"
                value={this.state.form.id}
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.form.name}
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={this.state.form.email}
                onChange={this.handleOnChange}
              ></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => this.ocultarModalEditar()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>

          <thbody>
            {this.state.data.map((elemento) => (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.name}</td>
                <td>{elemento.email}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.mostarModalEditar(elemento);
                    }}
                  >
                    Modificar
                  </Button>{" "}
                  <Button color="danger" onClick={()=>{this.eliminar(elemento)}}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </thbody>
        </Table>
      </Container>
    );
  }
}

export default App;
