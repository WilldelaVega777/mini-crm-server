//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});

//---------------------------------------------------------------------
// Global Helper Data:
//---------------------------------------------------------------------
var DateFormats = {
    short    : "MMM DD",
    long     : "DD MMMM - YYYY"
};