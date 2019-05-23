//---------------------------------------------------------------------
// Handlebars Helper:
//---------------------------------------------------------------------
Handlebars.registerHelper("hideIfNot", function(value, currentSetting) {
    var setting = eval(currentSetting);
    var retVal;
    if (value === setting)
    {
        retVal = 'style="display:table-row;"';
    }
    else
    {
        retVal = 'style="display:none;"';
    }
    return new Handlebars.SafeString(retVal);
});