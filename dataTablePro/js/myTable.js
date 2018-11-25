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

    // 初始化图片验证的js
    $('#mpanel2').codeVerify({
        type: 1,
        width: '400px',
        height: '50px',
        fontSize: '30px',
        codeLength: 6,
        btnId: 'check-btn',
        ready: function () {},
        success: function () {
            alert('验证匹配！');
        },
        error: function () {
            alert('验证码不匹配！');
        }
    });

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