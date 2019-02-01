import React, { Component } from 'react';
import './stylesheet/App.css';
import img_logo from './images/Ada_Iso_Blanco.png';
import img_search from './images/Icono_Search.png';
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      valorDelInput : '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput(e){
    this.setState({
      valorDelInput: e.target.value
    })
  }

  render() {
    return (  
        <nav>
          <div className="cabecera">
            <figure>            
              <img className="logo" src={img_logo}/>
            </figure>
            <input value={this.state.valorDelInput} onChange={this.onChangeInput} type="text" placeholder="Nunca dejes de buscar_"/>
            <button className="search" id="search_products">
               <Link to={"/items?search=" + this.state.valorDelInput}><img className="icon_search" src={img_search}/></Link>
            </button>
          </div>
        </nav>
    );
  }
}

export default Search;