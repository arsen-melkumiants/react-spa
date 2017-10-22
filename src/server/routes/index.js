const express = require('express');
const path = require('path');
const mime = require('mime-types');

const router = express.Router();

/* GET home page. */
router.get('*', (req, res, next) => {
	let contentType = req.get('Content-Type') || mime.lookup(req.path) || 'html';
	if (contentType.indexOf('html') === -1) {
		next();
		return;
	}

	res.sendFile(path.join(__dirname, '../../../dist/index.html'));
});

module.exports = router;
