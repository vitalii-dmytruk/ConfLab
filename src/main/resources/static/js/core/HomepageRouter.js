define([
    'backbone.marionette',
    'core/HomepageView'
], function (Marionette, HomepageView) {

    'use strict';

    return Marionette.AppRouter.extend({

        initialize: function (options) {
            this.container  = options.container;
        },

        routes: {
            '': 'home'
        },

        home: function(){
            this.container.show(new HomepageView());
        }

    });

});
