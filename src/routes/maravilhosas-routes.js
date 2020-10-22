const express = require('express');
const router = express.Router();
const controller = require('../controllers/maravilhosas-controller');
const cors = require('cors')

router.get('/maravilhosas', cors(), controller.getMaravilhosas );
router.get('/maravilhosas/:id', cors(), controller.getMaravilhosaById );
router.post('/maravilhosas', cors(), controller.addMaravilhosa );
router.put('/maravilhosas/:id', cors(), controller.updateMaravilhosa)
router.delete('/maravilhosas/:id', cors(), controller.deleteMaravilhosa)

module.exports = router;