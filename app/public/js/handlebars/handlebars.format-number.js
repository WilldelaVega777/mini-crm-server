//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("formatNumber", function(value) {

    var n = value;
    var c =  0; 
    var d = "."; 
    var t = ","; 
    s = (n < 0) ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + 
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + 
            (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
   
});