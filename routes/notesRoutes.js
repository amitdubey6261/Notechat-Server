const express = require('express');
const { createNotes, getAllNotes, getNotesDetails, deleteNotes } = require('../controllers/notesControllers');
const { isAuthenticatedUser } = require('../middleware/isAuth');
const router = express.Router() ; 

router.route('/notes/create').post( isAuthenticatedUser , createNotes);
router.route('/notes/all').get(getAllNotes);
router.route('/notes/:id').get(getNotesDetails);
router.route('/notes/delete/:id').delete( isAuthenticatedUser , deleteNotes);

module.exports = router ; 