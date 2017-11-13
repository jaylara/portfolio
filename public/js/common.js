//makes ajax request
function AjaxRequest(pUrl, pOnSuccess) {
    this.ajaxInfo = { method: 'GET', url: pUrl, dataType: 'json', success: pOnSuccess };
    this.execute = () => {$.ajax(this.ajaxInfo);}
}//end of AjaxRequest()

const initializeBlurbs = (resp) => {
    var domBlurbs = $('.blurbs');

    resp.forEach((blurb) => {
	       domBlurbs.append(`<div class='blurb'><span class='icon'>${blurb.icon}</span><p>${blurb.text}</p></div>`);
	});
} // end of initializeBlurbs()

const initializeProjects = (resp) => {
    var domProjects = $('.projects');
    var className = "info-tile"
    resp.forEach((project) => {
	       domProjects.append(`<div class='${className} ${className}-${project.theme}'><div class='title'>${project.name}</div>`
                            + `<div class='status'>${project.status}</div>`
                            + `<div class='details'>${project.stackTags}</div></div>`);
	});
} // end of initializeProjects()

$(() => {
    var jaydataUrl = "https://jaydata.herokuapp.com/portfolio";
	(new AjaxRequest(`${jaydataUrl}/blurbs`, initializeBlurbs)).execute();
	(new AjaxRequest(`${jaydataUrl}/projects`, initializeProjects)).execute();
});
