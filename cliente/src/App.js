import React, { Component } from 'react';
import './stylesheet/App.css';
import { BrowserRouter, Route} from "react-router-dom"
import Search from './Search';
import Home from './Home';
import Listproducts from './Listproducts';
import ProductDetail from './ProductDetail';


class App extends Component {
  
  render() {
    return ( 
      <div>
          <BrowserRouter>
            <div>
              <Search></Search>
              <Route exact path="/" component={Home}/>
              <Route exact path="/items" component= {Listproducts}/>
              <Route exact path="/items/:id" component= {ProductDetail}/>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
