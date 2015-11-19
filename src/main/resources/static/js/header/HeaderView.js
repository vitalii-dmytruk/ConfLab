define([
    'backbone.marionette',
    'backbone.radio',
    'text!header/HeaderTemplate.html',
    'backbone.stickit'
], function (Marionette, Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        className: 'container-fluid',
        template : _.template(template),

        initialize: function (options) {
            this.session = options.session;
        },

        onRender: function () {
            this.stickit(this.session, {
                '#currentUsername': {
                    observe   : 'username',
                    visible   : true,
                    updateView: true
                },
                '#loginLogout'    : {
                    observe     : 'isAuthenticated',
                    updateMethod: 'html',
                    onGet       : function (isAuthenticated) {
                        return isAuthenticated ?
                               '<a href="#logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a>' :
                               '<a href="#login"><span class="glyphicon glyphicon-log-in"></span> Login</a>'

                    }
                }
            });
        }

    });

});
