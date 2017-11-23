var jaydataUrl = 'https://jaydata.herokuapp.com/portfolio';
var preloader = '<div class="preloader"><img src="/img/preloader-glass-bar.gif" alt="Loading.." /> '
                +'<p>Waking up jaydata.herokuapp.com</p></div>';

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//makes ajax request
function AjaxRequest(pUrl, pOnSuccess) {
    this.ajaxInfo = { method: 'GET', url: pUrl, dataType: 'json', success: pOnSuccess };
    this.execute = () => {$.ajax(this.ajaxInfo);}
} // end of AjaxRequest()

function handleBlurbsLoad() {
    $('#blurbs').html(preloader);
    //$('#blurbs').empty();
    // .append(`<div class='blurb'><span class='icon'>👔</span><p>Working as a bug finder and program maker, for about 10 years, in the 'old world' of large tech and frustrated by company politics, I decided to leave. The last four years gave me ample time to reevaluate myself and what I want for my future. Fast forward... I'm back for more!</p></div>`);
    (new AjaxRequest(`${jaydataUrl}/blurbs`, initializeBlurbs)).execute();
} // end of handleBlurbsLoad()

function handleProjectsLoad() {
    $('#projects').html(preloader);
    //$('#projects').empty();
    // .append(`<div class="info-tile info-tile-blue" onclick="location.href='/projects?pid=1'"><div class="title">Go-ceries</div><div class="status">GitHub Available. Deployment In Progress.</div><div class="details">Express/EJS + jQuery + MongoDB</div></div>`);
    (new AjaxRequest(`${jaydataUrl}/projects`, initializeProjects)).execute();
} // end of handleProjectsLoad()


function handleProjectLoad() {
    $('#project').html(preloader);
    //$('#project').empty()
    var pid = getUrlParameter("pid");
    (new AjaxRequest(`${jaydataUrl}/projects?pid=${pid}`, initializeProject)).execute();
} // end of handleProjectLoad()


const initializeBlurbs = (resp) => {
    var domBlurbs = $('#blurbs');
    setTimeout(() => {
        domBlurbs.empty();
        resp.forEach((blurb) => {
    	       domBlurbs.append(`<div class='blurb'><span class='icon'>${blurb.icon}</span><p>${blurb.text}</p></div>`);
        });
    },500);
} // end of initializeBlurbs()

const initializeProjects = (resp) => {
    var domProjects = $('#projects');
    var className = "info-tile"
    setTimeout(() => {
        domProjects.empty();
        resp.forEach((project, i) => {
            var style = (project.image !== '')? `style="background-image: url('/img/projects/${project.image}.PNG')"` :'';
            var theme = (style === '')? `${className}-${project.theme}` : '';
    	       domProjects.append(`<div class='${className} ${theme}' ${style} `
                                    + `onclick="location.href='/projects?pid=${i}'">`
                                    + `<div class='title'>${project.name}</div>`
                                    // + `<div class='status'>${project.status}</div>`
                                    + `<div class='details'>${project.stackTags}</div></div>`);
        });
    },500);
} // end of initializeProjects()

const initializeProject = (resp) => {
    var domProject = $('#project');
    var className = "info-tile"
    setTimeout(() => {
        domProject.empty();
        project = resp;
    	       domProject.append(`<div class='${className} ${className}-${project.theme}' onclick="location.href='/projects?pid=${project.pid}'">`
                                    +`<div class='title'>${project.name}</div>`
                                    + `<div class='status'>${project.status}</div>`
                                    + `<div class='details'>${project.stackTags}</div></div>`);
    },500);
} // end of initializeProject()

$(() => {
    //$('header .title').attr("tooltip", "Go to Home Page");
});
