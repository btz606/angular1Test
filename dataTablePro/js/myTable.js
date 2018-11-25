(function ($) {
    "use strict";

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

var data = [{
        "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Garrett Winters",
        "position": "Director",
        "salary": "$5,300",
        "start_date": "2011/07/25",
        "office": "Edinburgh",
        "extn": "8422"
    }
];

$(document).ready(function () {
    $('#myTable').DataTable({
        data: data,
        columns: [{
                data: 'name'
            },
            {
                data: 'position'
            },
            {
                data: 'salary'
            },
            {
                data: 'office'
            }
        ]
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