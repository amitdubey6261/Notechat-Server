const express = require('express') ; 
const { unlockNote, getAllUnlocked } = require('../controllers/unlockedContrillers');
const router = express.Router() ; 

router.route('/unlock/notes').post( unlockNote ) ; 
router.route('/unlock/all/:id').get( getAllUnlocked );

module.exports = router ; 