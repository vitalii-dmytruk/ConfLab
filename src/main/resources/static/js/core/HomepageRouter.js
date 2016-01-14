define([
    'common/Router',
    'core/HomepageView',
    'backbone.radio'
], function (Router, HomepageView, Radio) {

    'use strict';

    return Router.extend({
        onBeforeEnter: function () {
            Radio.channel('menu').request('deactivate');
        },

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            ''     : home,
            '*path': notFound
        }
    });

    function home() {
        this.container.show(new HomepageView());
    }

    function notFound(path) {
        Radio.channel('notify').request('error', 'Path "' + path + '" does not not exists.');
    }
});