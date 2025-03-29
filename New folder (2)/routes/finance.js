const express = require('express');
const router = express.Router();

const { handleCreateFinance, handleDeleteFinance, handleGetFinance, handleUpdateFinance } = require('../controllers/finance');

router.get('/', handleGetFinance);
router.post('/', handleCreateFinance);
router.put('/', handleUpdateFinance);
router.delete('/', handleDeleteFinance);

module.exports = router;