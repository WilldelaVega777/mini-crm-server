//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("formatCheck", function(check) {
    return check.replace(/-/g, ' ').replace('dir', 'dir.')
           .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
               txt.substr(1).toLowerCase();});
});