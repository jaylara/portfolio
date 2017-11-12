const router = require('express').Router();

router.get('/', (req,res) => {
    res.redirect("index.html");
});

//routes
const blurbsRoute = require('./blurbs');
const projectsRoute = require('./projects');

// Blurb API Routes
router.route('/api/blurbs')
    .get(blurbsRoute.selectAllItems);
    //.post(itemRoute.check_user, itemRoute.createItem);

router.route('/api/blurbs/:id')
    .get(blurbsRoute.selectItem);

// Project API Routes
router.route('/api/projects')
    .get(projectsRoute.selectAllItems);

router.route('/api/projects/:id')
    .get(projectsRoute.selectItem);

module.exports = router;
