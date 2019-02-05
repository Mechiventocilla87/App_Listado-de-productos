import React, { Component } from 'react';
import './stylesheet/App.css';
import { Link } from "react-router-dom";
import img_shipping from './images/Icono_Envio.png';
import Breadcrumbs from './Breadcrumbs';


class Listproducts extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      BreadcrumbsDeProductos: [],
      repoProductosBuscados: [],
      loading: true
    }  
  }
  

  CargaDeBusquedaDeProductos () {
    const urlParams = new URLSearchParams(window.location.search);
    const busqueda = urlParams.get('search')

    
    if(this.lastSearch === busqueda) return;
    
    this.lastSearch = busqueda

    fetch('http://localhost:3001/api/items?search='+ busqueda)
      .then(res => {
       return res.json()
       })
      .then(data => {
        this.setState({
          BreadcrumbsDeProductos: data.categories,
          repoProductosBuscados: data.items,
          loading: false
          })
        })
  }

  componentDidUpdate () {
    this.CargaDeBusquedaDeProductos();
  } 

  componentDidMount(){
    this.CargaDeBusquedaDeProductos();
  }


  render() {

    if (this.state.loading) {
      return <p>Cargando...</p>
    }

    const breadproducts = this.state.BreadcrumbsDeProductos.map((u, i) =>                     
                          <Breadcrumbs breadCrumbs={u} thiskey={i} separate={i < this.state.BreadcrumbsDeProductos.length - 1 ? " > " : ""} />
                          )
                          
    const products = this.state.repoProductosBuscados.map((r, i) =>
                 
                    <Link className="link_box" to={"/items/"+ r.id}>
                     <div key={i} className="box_products">
                        <div className="img_container">
                          <img className="img_product" src={r.picture}/>                        
                        </div>
                        <div className="info_product">
                          <div className="info_price">
                            <span className="pesos">{r.price.currency === 'ARS' ? "$" : "USD"}</span>
                            <span>{r.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                            <span className="decimales_precio">{r.price.decimals.padEnd(2, 0)}</span>
                            <img src={img_shipping} className={r.free_shipping === true ? "show" : "hidden"}/>
                          </div>
                          <div className="info_text">
                            <p>{r.title}</p>
                          </div>
                        </div> 
                        <div className="info_location">
                        <p>{r.location}</p>
                        </div>                   
                     </div>
                    </Link>)   
    return ( 
      <div>
        <div className="breadcrumbs_container">
          <div className="box_breadcrumbs">
         {breadproducts}
         </div>
        </div>       
       <div className="box_container">       
         {products}
       </div> 
      </div>
    );
  }
}

export default Listproducts;