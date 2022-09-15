const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send ('HELLO ANTONIO MOPT')
});
module.exports = router;