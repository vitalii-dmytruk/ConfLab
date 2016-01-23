var require = {
    baseUrl: '../',
    paths  : {
        "core"                  : 'js/core',
        "account"               : 'js/account',
        "common"                : 'js/common',
        "header"                : 'js/header',
        "company"               : 'js/company',
        "speaker"               : 'js/speaker',
        "speech"                : 'js/speech',
        "event"                 : 'js/event',
        "auth"                  : 'js/auth',
        "text"                  : 'lib/requirejs-text/text',
        "jquery"                : 'lib/jquery/jquery.min',
        "jquery.file.upload"    : 'lib/jquery-file-upload/js/jquery.fileupload',
        "jquery.ui.widget"      : 'lib/jquery-file-upload/js/jquery.ui.widget',
        "croppie"               : 'lib/croppie/js/croppie',
        "toastr"                : 'lib/toastr/toastr.min',
        "select2"               : 'lib/select2/js/select2',
        "underscore"            : 'lib/underscore/underscore-min',
        "backbone"              : 'lib/backbone/backbone-min',
        "backbone.marionette"   : 'lib/marionette/backbone.marionette',
        "backbone.babysitter"   : 'lib/backbone.babysitter/backbone.babysitter',
        "backbone.radio"        : 'lib/backbone.radio/backbone.radio',
        "backbone.stickit"      : 'lib/backbone.stickit/backbone.stickit',
        "backbone.nested.models": 'lib/backbone-nested-models/backbone-nested-models',
        "backbone.validation"   : 'lib/backbone-validation/backbone-validation-min',
        "bootstrap"             : 'lib/bootstrap/js/bootstrap.min',
        "bootstrap.datepicker"  : 'lib/bootstrap-datepicker/js/bootstrap-datepicker'
    },
    shim   : {
        "jquery"                : {
            exports: "$"
        },
        "jquery.file.upload"    : {
            "deps": ['jquery', 'jquery.ui.widget']
        },
        "select2"               : {
            "deps": ['jquery']
        },
        "bootstrap"             : {
            "deps": ['jquery']
        },
        "bootstrap.datepicker"  : {
            "deps": ['jquery']
        },
        "toastr"                : {
            "deps": ['jquery']
        },
        "underscore"            : {
            "exports": "_"
        },
        "backbone"              : {
            "deps"   : ['underscore'],
            "exports": "Backbone"
        },
        "backbone.marionette"   : {
            "deps"   : ['backbone', 'backbone.babysitter', 'backbone.radio', "jquery"],
            "exports": "Marionette"
        },
        "backbone.nested.models": {
            "deps": ["backbone"]
        },
        "backbone.stickit"      : {
            "deps": ['backbone', 'underscore', 'jquery']
        },
        "backbone.validation"   : {
            "deps": ['backbone', 'underscore']
        }
    }
};
