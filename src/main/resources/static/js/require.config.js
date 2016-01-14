var require = {
    baseUrl: '../',
    paths  : {
        "core"                  : 'js/core',
        "account"               : 'js/account',
        "common"                : 'js/common',
        "menu"                  : 'js/menu',
        "header"                : 'js/header',
        "speaker"               : 'js/speaker',
        "speech"                : 'js/speech',
        "event"                 : 'js/event',
        "auth"                  : 'js/auth',
        "text"                  : 'lib/requirejs-text/text',
        "jquery"                : 'lib/jquery/jquery.min',
        "toastr"                : 'lib/toastr/toastr.min',
        "select2"               : 'lib/select2/js/select2.full',
        "underscore"            : 'lib/underscore/underscore-min',
        "backbone"              : 'lib/backbone/backbone-min',
        "backbone.marionette"   : 'lib/marionette/backbone.marionette',
        "backbone.babysitter"   : 'lib/backbone.babysitter/backbone.babysitter',
        "backbone.radio"        : 'lib/backbone.radio/backbone.radio',
        "backbone.stickit"      : 'lib/backbone.stickit/backbone.stickit',
        "backbone.nested.models": 'lib/backbone-nested-models/backbone-nested-models',
        "backbone.validation"   : 'lib/backbone-validation/backbone-validation-min',
        "bootstrap"             : 'lib/bootstrap/js/bootstrap.min'
    },
    shim   : {
        "jquery"                : {
            exports: "$"
        },
        "select2"               : {
            "deps": ['jquery']
        },
        "bootstrap"             : {
            "deps": ['jquery']
        },
        "toastr"              : {
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
