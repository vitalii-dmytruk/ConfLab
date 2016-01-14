define([
    'core/ConfLabsApp',
    'backbone.marionette'
], function AjaxConfig(confLab) {
    'use strict';

    return function AjaxConfig() {
        confLab.on('before:start', initErrorsHandling);
    };

    function initErrorsHandling() {
        $.ajaxSetup({
            statusCode: {
                400: showHttpError,
                403: showHttpError,
                404: showHttpError,
                500: showHttpError,
                401: showAuthWarning
            }
        });

        $(document).ajaxError(showAjaxError);
    }

    function showHttpError(jqXHR) {
        confLab.notify.error(jqXHR.responseJSON.message, jqXHR.responseJSON.error);
    }

    //noinspection JSUnusedLocalSymbols
    function showAjaxError(e, jqXHR) {
        if (jqXHR.readyState != 4) {
            confLab.notify.error('Connection ' + jqXHR.statusText + ': ' + jqXHR.state());
        }
    }

    function showAuthWarning() {
        confLab.notify.warn('Your session is expired', 'Please sign in');
    }
});