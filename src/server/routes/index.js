const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

module.exports = router;
