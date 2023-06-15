const express = require('express');
const { createEmail, getAllEmails } = require('../controllers/emailControllers');
const router = express.Router();

router.route( '/email/create' ).post( createEmail );
router.route( '/email/all').get(getAllEmails);

module.exports = router ;