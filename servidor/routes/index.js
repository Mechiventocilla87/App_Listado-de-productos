var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */

let products = {
    categories: [],
    items: [],
}


router.get('/api/items', function (req, res, next) {
    const productoBuscado = req.query.search
    products.categories = [];
    products.items = [];

    axios
        .get('https://api.mercadolibre.com/sites/MLA/search?q=' + productoBuscado + '&limit=4')
        .then(result => {
            const data = result.data.results

            for (let i = 0; i < data.length; i++) {

                let obj = {
                    id: data[i].id,
                    title: data[i].title,
                    price: {
                        currency: data[i].currency_id,
                        amount: String(data[i].price).split('.')[0],
                        decimals: String(data[i].price).split('.')[1] || '0',
                    },
                    picture: data[i].thumbnail,
                    condition: data[i].condition,
                    free_shipping: data[i].shipping.free_shipping,
                    location: data[i].address.state_name
                }

                products.items.push(obj)
                
            }

             const filters = result.data.filters
                 for (let i = 0; i < filters.length; i++) {
                    if (filters[i].id === 'category') {
                        let filter = filters[i].values 
                             for (let j = 0; j < filter[0].path_from_root.length; j++) {
                                products.categories.push(filter[0].path_from_root[j].name) 
                             }
                         
                    }
                    
                 }

            res.json(products)
            
        })

});


router.get('/api/items/:id', function (req, res, next) {
    const id = req.params.id;
    let product = {};
    let productDescription = {};
    axios
        .get('https://api.mercadolibre.com/items/' + id)
        .then(result => {
            product = result.data;
            return axios.get('https://api.mercadolibre.com/items/' + id + '/description')
            })
            .then(result => {
               productDescription = result.data;
               const category = product.category_id;
               return axios.get('https://api.mercadolibre.com/categories/' + category)
            })
            .then(resultCategory => {
                let resultProduct = {
                  categories: resultCategory.data.path_from_root,
                  item: {
                    id: product.id,
                    title: product.title,
                    price: {
                      currency: product.currency_id,
                      amount: String(product.price).split('.')[0],
                      decimals: String(product.price).split('.')[1] || '0',
                    },
                    picture: product.thumbnail,
                    condition: product.condition,
                    free_shipping: product.shipping.free_shipping,
                    sold_quantity: product.sold_quantity,
                    description: productDescription.plain_text
                  }
                }

                res.json(resultProduct);

            })

});

module.exports = router;