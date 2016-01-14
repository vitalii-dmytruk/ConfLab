define([
    'toastr'
], function (toastr) {
    'use strict';

    return function Notification() {
        configure();

        return {
            success: success,
            info   : info,
            warn   : warn,
            error  : error,
            clear  : clear
        };
    };

    function configure() {
        toastr.options = {
            closeButton      : true,
            preventDuplicates: true,
            timeOut          : 3000,
            iconClasses      : {
                error  : 'notification-error',
                info   : 'notification-info',
                success: 'notification-success',
                warning: 'notification-warning'
            }
        };
    }

    function success(msg, title) {
        toastr.success(msg, title || 'Success');
    }

    function info(msg, title) {
        toastr.info(msg, title || 'Information');
    }

    function warn(msg, title) {
        toastr.warning(msg, title || 'Warning');
    }

    function error(msg, title) {
        toastr.error(msg, title || 'Error');
    }

    function clear() {
        toastr.clear();
    }
});