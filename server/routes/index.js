'use strict';

require('dotenv').config();
const router = require('express').Router();

const axios = require('axios');
const ProductService = require('../services/product-service');
const productService = new ProductService();

router.get('/getitemsOnSale', (req, res) => {
	let page = req.query.page ? Number(req.query.page) : 0;
    let limit = req.query.limit ? Number(req.query.limit) : 5;
    productService.getItemsOnSale(page)
    .then((db) => {
            res.json(db);
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

router.get('/getNewItems', (req, res) => {
	let page = req.query.page ? Number(req.query.page) : 0;
    productService.getNewItems(page)
    .then((db) => {
            res.json(db);
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});



router.get('/getitems', (req, res) => {
  let category = req.query.category || '';
  let page = req.query.page ? Number(req.query.page) : 0;
  let limit = req.query.limit ? Number(req.query.limit) : 5;
  productService.getProducts(page, category)
    .then((db) => {
            res.json(db);
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

router.get('/getitemsbybrand/:brand', (req, res) => {
	  const brand = req.params.brand;
	  let page = req.query.page ? Number(req.query.page) : 0;
	  let limit = req.query.limit ? Number(req.query.limit) : 5;
	  productService.getProductByBrand(brand, page)
	    .then((db) => {
	            res.json(db);
	    })
	    .catch((err) => {
	      res.status(500).send(`Error connecting to database: ${err}`);
	    });
	});

router.get('/getrelateditems', (req, res) => {
	  let type = req.query.type;
	  productService.getRelatedItems(type)
	    .then((db) => {
	            res.json(db);
	    })
	    .catch((err) => {
	      res.status(500).send(`Error connecting to database: ${err}`);
	    });
});
router.get('/getitem/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  productService.getProductById(itemId)
    .then((prod) => {

        /* EXCEPTION: document not found */
        if (prod === null) {
          return res.status(404).send('Item not found');
        }

        res.json(prod);
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });

});


router.post('/addreview/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const reviewDoc = {
    name: req.body.name,
    comment: req.body.comment,
    stars: Number(req.body.stars),
    date: Date.now()
  };

  productService.addReviewById(id,reviewDoc.name,reviewDoc.comment,reviewDoc.stars)
    .then((doc) => {

        res.send(doc);
    })

});

/*router.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;

  connectToDatabase()
    .then((db) => {
      db.collection('cart').findOne({ userId: userId }, (err, docs) => {
        if (err) {
          return res.status(500).send(`Error finding document in database with error: ${err}`);
        }

        res.json(docs);
      })
    })
});

router.get('/search/:queryFilter', (req, res) => {
  const queryFilter = req.params.queryFilter;

  connectToDatabase()
    .then((db) => {
      db.collection('item').find({ $text: { $search: queryFilter }}).toArray((err, docs) => {
        if (err) {
          return res.status(500).send(`Error retrieving from database with error: ${err}`);
        }

        res.send(docs);
      })
    })
});

router.post('/cart/:userId/:itemId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const itemId = parseInt(req.params.itemId);

  connectToDatabase()
    .then((db) => {
      db.collection('cart').findOne({userId: userId}, (err, doc) => {
        if (err) {
          return res.status(500).send(`Error in finding document in database with error: ${err}`);
        }

        res.json(doc);
      })
    });

});

router.post('/addtocart/:itemId/:userId', (req, res) => {
  const userId = req.params.userId;
  const itemId = parseInt(req.params.itemId);

  connectToDatabase()
    .then((db) => {
      db.collection('cart').aggregate([
        { $match: { userId: userId }},
        { $unwind: '$items' },
        { $match: { 'items._id': itemId } }
      ], ((err, doc) => {
        if (err) {
          return res.status(500).send(`Error retrieving document from database with error: ${err}`);
        }

        if (doc.length) {
          const quantity = doc[0].items.quantity + 1;
          db.collection('cart').findOneAndUpdate(
            { userId: userId, "items._id": itemId },
            { $set: { "items.$.quantity": quantity } },
            { upsert: true, returnOriginal: false },
            ((err, doc) => {
              res.send(doc.value);
            })
          )
        } else {
          db.collection('item').findOne({ _id: itemId }, ((err, item) => {
            if (err) {
              return res.status(500).send(`Error finding document in database with error: ${err}`);
            }

            item.quantity = 1;
            db.collection('cart').findOneAndUpdate(
              {userId: userId},
              {"$push": {items: item}},
              {
                upsert: true,
                returnOriginal: false
              }, ((err, result) => {
                if (err) {
                  return res.status(500).send(`Error updating document in database with error: ${err}`);
                }

                res.send(result.value);
              })
            )
          }))

        }
      }));
    })
});
*/
module.exports = router;