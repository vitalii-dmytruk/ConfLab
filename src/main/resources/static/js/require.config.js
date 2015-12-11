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
        "conference"            : 'js/conference',
        "auth"                  : 'js/auth',
        "text"                  : 'lib/requirejs-text/text',
        "jquery"                : 'lib/jquery/jquery.min',
        "select2"               : 'lib/select2/select2',
        "underscore"            : 'lib/underscore/underscore-min',
        "backbone"              : 'lib/backbone/backbone-min',
        "backbone.marionette"   : 'lib/marionette/backbone.marionette',
        "backbone.babysitter"   : 'lib/backbone.babysitter/backbone.babysitter',
        "backbone.radio"        : 'lib/backbone.radio/backbone.radio',
        "backbone.stickit"      : 'lib/backbone.stickit/backbone.stickit',
        "backbone.nested.models": 'lib/backbone-nested-models/backbone-nested-models',
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
        "underscore"            : {
            "exports": "_"
        },
        "backbone"              : {
            "deps"   : ['underscore'],
            "exports": "Backbone"
        },
        "backbone.marionette"   : {
            "deps"   : ['backbone', 'backbone.babysitter', 'backbone.radio'],
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
