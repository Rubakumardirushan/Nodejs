const express = require('express');
const roleController = require('../controllers/roleController');

const router = express.Router();

router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
