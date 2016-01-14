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
                400: showHttpError,
                403: showHttpError,
                404: showHttpError,
                500: showHttpError
            }
        });

        $(document).ajaxError(showAjaxError);
    }

    function showHttpError(jqXHR) {
        confLab.notify.error(jqXHR.responseJSON.message, jqXHR.responseJSON.error);
    }

    //noinspection JSUnusedLocalSymbols
    function showAjaxError(e, jqXHR) {
        if(jqXHR.readyState != 4){
            confLab.notify.error('Connection ' + jqXHR.statusText + ': ' + jqXHR.state());
        }
    }
});