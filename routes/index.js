const router = require('express').Router();

router.get('/', (req,res) => {
    res.redirect("index.html");
});

module.exports = router;
