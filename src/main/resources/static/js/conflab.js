require([
    'core/ConfLabsApp',
    'bootstrap'
], function (ConfLabApp) {

    'use strict';

    $(function () {
        new ConfLabApp().start();
    });

});