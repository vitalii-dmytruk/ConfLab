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
            '': home
        }
    });

    function home() {
        this.container.show(new HomepageView());
    }

});
