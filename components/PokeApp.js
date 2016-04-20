/*
 * Module dependencies
 */

import React from 'react';
import PokeTable from './PokeTable';
import PokeChat from './PokeChat';
import uid from 'uid';
import $ from 'jquery';
import io from 'socket.io-client';

export default class PokeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], pokemons: [] };
    this.onGrowl = this.onGrowl.bind(this);
    this.user = uid(10);
  }

  componentWillMount() {
    
    var equipo = [];

    var sergio = {"name": "Sergio Andres",
                  "number": "1",
                  "url": "sergio-andres-web.png",
                  "mensaje" : "Hola"
                  };
    var alex =  {"name": "Alex Ciobanu",
                  "number": "2",
                  "url": "alex-web.jpg",
                  "mensaje": "Palmeloralt"
                  };
    var oriol = {"name": "Oriol Salvador",
                  "number": "3",
                  "url": "fotoweb-oriol-salvador.jpg",
                  "mensaje": "Apuntar Horas de mantenimiento"
                  };
    var jordi = {"name": "Jordi Miró",
                  "number": "4",
                  "url": "jordi-web.jpg",
                  "mensaje": "neptunes"
                  };
    equipo.push(sergio);
    equipo.push(alex);
    equipo.push(oriol);
    equipo.push(jordi);
    this.setState({ pokemons: equipo });
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (message) => {
      if (message.user !== this.user) {
        this.newMessage(message);
      }
    });
  }

  onGrowl(name,mensaje) {
    let text = `${name}: ${mensaje}!`;
    let message = { id: uid(), text: text, user: this.user };
    this.newMessage(message);
    this.socket.emit('message', message);
  }

  newMessage(message) {
    this.state.messages.push(message);
    let messages = this.state.messages;
    this.setState({ messages: messages });
  }

  render() {
    if (this.state.pokemons.length) {
      return <div className="pokeapp">
        <PokeTable pokemons={this.state.pokemons} onGrowl={ this.onGrowl } />
        <PokeChat messages={this.state.messages} />
      </div>
    } else {
      return <p>Cargando...</p>
    }
  }
}