const Product = require('../models/product');

////////////////////////////////////////////////////////////////

const getIndex = (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200)
                .render('index', {
                    path: '/',
                    pageTitle: 'Book Your Books online',
                    products
                });
        })
        .catch((err) => {
            console.log('Product.findAll() error: ', err);
        })
};

module.exports = {
    getIndex
}