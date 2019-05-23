//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("formatFromNow", function(datetime) {
  if (moment) {
    return moment(datetime, DateFormats.short).fromNow();
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