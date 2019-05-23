//-------------------------------------------------------------------------
// Document Ready Section:
//-------------------------------------------------------------------------
$(function () {

    //---------------------------------------------------------------------
    // Material Design
    //---------------------------------------------------------------------
    $.material.init();

    //---------------------------------------------------------------------
    // Animate CSS
    //---------------------------------------------------------------------
    $.fn.extend({
        animateCss: function (animationName, cb) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (cb) { cb(); }
            });
        }
    });

});