(function ($) {
    "use strict";

    /* 点击切换登陆与注册 btz */
    $('.login-li').click(function () {
        $("#login").css("display", 'block');
        $("#register").css("display", 'none');
    })

    $('.register-li').click(function () {
        $("#register").css("display", 'block');
        $("#login").css("display", 'none');

    })

})(jQuery);

// Styles Switcher
jQuery(document).ready(function () {

    // Show Colors Panel
    jQuery('#show-panel').click(function () {
        if (jQuery(this).hasClass('show-panel')) {
            jQuery('.colors-switcher').css({
                'right': 0
            });
            jQuery('#show-panel').removeClass('show-panel');
            jQuery('#show-panel').addClass('hide-panel');
        } else if (jQuery(this).hasClass('hide-panel')) {
            jQuery('.colors-switcher').css({
                'right': '-100px'
            });
            jQuery('#show-panel').removeClass('hide-panel');
            jQuery('#show-panel').addClass('show-panel');
        }
    });

});

$(document).ready( function () {
    $('#myTable').DataTable();
} );

window.onload = function (e) {
    // var cookie = readCookie("style");
    // var title = cookie ? cookie : getPreferredStyleSheet();
    // setActiveStyleSheet(title);
}

window.onunload = function (e) {
    // var title = getActiveStyleSheet();
    // createCookie("style", title, 365);
}

// var cookie = readCookie("style");
// var title = cookie ? cookie : getPreferredStyleSheet();
// setActiveStyleSheet(title);