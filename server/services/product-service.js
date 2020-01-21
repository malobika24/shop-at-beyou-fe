const axios = require('axios')

class ProductService {
  getProducts(page, searchQuery) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products?page=${page}&&searchQuery=${searchQuery}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  getItemsOnSale(page) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products/sale?page=${page}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  getNewItems(page) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products/new?page=${page}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  
  getProductById(id) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products/${id}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  
  getProductByBrand(brand, page) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products/brands/${brand}?page=${page}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  
  getRelatedItems(type) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .get(`http://${URL}/api/products/relatedProducts?type=${type}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
  
  addReviewById(id,name,comments,stars) {
	  let URL = process.env['MICROS_PRODUCTS_URL'] || 'localhost:8080';
	    return axios
	      .post(`http://${URL}/api/products/addReview/${id}?name=${name}&&comments=${comments}&&stars=${stars}`)
	      .then(response => {
	        if (response.data) {
	          return response.data;
	        }
	      })
	      
  }
}
module.exports = ProductService;