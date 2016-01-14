define([
    'common/Router',
    'core/HomepageView',
    //'core/Page404View',
    'backbone.radio'
], function (Router, HomepageView, /*Page404View,*/ Radio) {

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
        //this.container.show(new Page404View());

        Radio.channel('notify').request('error', 'Path "' + path + '" does not not exists.');
    }
});