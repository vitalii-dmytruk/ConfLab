define([
    'toastr'
], function (toastr) {
    'use strict';

    return function Notification() {
        toastr.options = {
            closeButton      : true,
            iconClasses      : {
                error  : 'notification-error',
                info   : 'notification-info',
                success: 'notification-success',
                warning: 'notification-warning'
            },
            preventDuplicates: true
        };

        this.success = function (msg, title) {
            toastr.success(msg, title || 'Success');
        };
        this.info    = function (msg, title) {
            toastr.info(msg, title || 'Information');
        };
        this.warn    = function (msg, title) {
            toastr.warning(msg, title || 'Warning');
        };
        this.error   = function (msg, title) {
            toastr.error(msg, title || 'Error');
        };
    };
});