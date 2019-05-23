//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("formatSatisfaction", function(value) {

    return "images/satisfaction-" + 
            (Math.floor(parseInt(value) / 20)).toString() + 
            ".png";
   
});