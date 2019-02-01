import React, { Component } from 'react';
import './stylesheet/App.css';
import Breadcrumbs from './Breadcrumbs';


class ProductDetail extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      productoConId: [],
      categories: [],
      loading: true

    }  
    
  }

  componentDidMount () {

    fetch('http://localhost:3001/api/items/'+ this.props.match.params.id)
      .then(res => {
       return res.json()
       })
      .then(data => {
        this.setState({
          productoConId: data.item,
          categories: data.categories,
          loading: false
          })
          
        })
  }

  render() {

    if (this.state.loading) {
      return <p>Cargando...</p>
    }

    const breadcrumbs_detalle = this.state.categories.map((u,i) =>  
        <Breadcrumbs breadCrumbs={u.name} thiskey={i} separate={i < this.state.categories.length - 1 ? " > " : ""}/>)                    

    return ( 
      <div>
        <div className="breadcrumbs_container">
          <div className="box_breadcrumbs">
            {breadcrumbs_detalle}
          </div>         
        </div>
        <div className="box_container_detalle">
          <div className="box_product_detalle">
             <div className="colum_izq">
               <div className="img_container_box">
                 <img className="image" src={this.state.productoConId.picture} alt=""/>
                </div>
                <div className="description">
                  <h3>Descripción del producto.-</h3>
                  <p>
                  {this.state.productoConId.description}
                  </p>
                </div>
             </div>             
             <div className="colum_der">
              <div className="condition">
                 <span>{this.state.productoConId.condition === 'new' ? 'Nuevo':'Usado'}  | </span>
                 <span>{this.state.productoConId.sold_quantity} vendidos</span>
              </div>
              <div className="title_product">
                 <h3>{this.state.productoConId.title}</h3>
              </div>
              <div className="price">
                  <span className="pesos">{this.state.productoConId.price.currency === 'ARS' && "$"}</span>
                  <span>{this.state.productoConId.price.amount}</span> 
                  <span className="decimales_precio">{this.state.productoConId.price.decimals}</span>
              </div>
              <button>Comprar</button>               
             </div>
          </div> 
        </div>
      </div>  
    );
  }
}

export default ProductDetail;