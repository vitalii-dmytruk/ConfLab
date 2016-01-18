define([
    'core/ConfLabsApp',
    'backbone.radio',
    'backbone.marionette'
], function AjaxConfig(confLab, Radio) {
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
        notify('error', jqXHR.responseJSON.message, jqXHR.responseJSON.error);
    }

    //noinspection JSUnusedLocalSymbols
    function showAjaxError(e, jqXHR) {
        if (jqXHR.readyState != 4) {
            notify('error', 'Connection ' + jqXHR.statusText + ': ' + jqXHR.state());
        }
    }

    function showAuthWarning(jqXHR) {
        notify('warn', jqXHR.responseJSON.message, 'Please sign in');
    }

    function notify(type, message, title) {
        Radio.channel('notify').request(type, message, title);
    }
});