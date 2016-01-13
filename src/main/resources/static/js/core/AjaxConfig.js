define([
    'core/ConfLabsApp',
    'backbone.marionette'
], function AjaxConfig(confLab) {
    'use strict';

    return Marionette.Object.extend({
        initialize: function () {
            confLab.on('before:start', initErrorsHandling);
        }
    });

    function initErrorsHandling() {
        $.ajaxSetup({
            statusCode: {
                404: showError,
                500: showError,
                403: showError
            }
        });
    }

    function showError(jqXHR) {
        confLab.notify.error(jqXHR.responseJSON.error);
    }
});