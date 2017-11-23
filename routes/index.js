const router = require('express').Router();
const axios = require('axios');

var jaydataUrl = "https://jaydata.herokuapp.com/portfolio";

router.get('/', (req,res) => {
    //res.redirect("index.html");
    res.render("home");
});

router.get('/projects', (request,response) => {
    axios.get(`${jaydataUrl}/projects?pid=${request.query.pid}`)
        .then((ares) => {
            var params = {
                pid: request.query.pid,
                name : ares.data.name,
                description : ares.data.description,
                status : ares.data.status,
                icon  : ares.data.icon,
                image  : ares.data.image,
                stackTags : ares.data.stackTags,
                isActive : ares.data.isActive,
                theme : ares.data.theme,
                publishDate : ares.data.publishDate,
                appLink : ares.data.appLink,
                dirName : ares.data.directory,
                directory : 'projects/'+ares.data.directory,
                gitHubLink : ares.data.gitHubLink
            }

            response.render("projects", params);
        }) // end of axios.get.then
        .catch((error)=>{
            response.render("projects");
        }) // end of axios.get.catch


});

module.exports = router;
