define([
    'backbone',
    'common/Service',
    'auth/Session',
    'auth/LoginView',
    'auth/AccessDeniedView'
], function (Backbone, Service, Session, LoginView, AccessDeniedView) {

    'use strict';

    return Service.extend({

        channelName: 'auth',

        initialize: function (options) {
            this.container = options.container;
            this.session   = new Session();
            setupErrorHandling(this.session);
            this.start();
        },

        refreshSession: function () {
            return $.when(this.session.fetch());
        },

        onStart: function () {
            this.channel.reply({
                isAuthenticated: this.isAuthenticated,
                currentUser    : this.getCurrentUser,
                login          : this.login,
                logout         : this.logout,
                accessDenied   : this.accessDenied
            }, this);
        },

        isAuthenticated: function () {
            return this.session.get('isAuthenticated');
        },

        getCurrentUser: function () {
            return this.session.get('user');
        },

        login: function () {
            var loginView = new LoginView(),
                self      = this;

            loginView.on('login:confirm', function (user) {
                self.session.fetch({
                    headers: {
                        'Authorization': 'Basic ' + btoa(user.get('username') + ':' + user.get('password'))
                    },
                    success: function () {
                        self.channel.trigger('login');
                        Backbone.history.loadUrl(Backbone.history.fragment);
                    }
                });

            });

            loginView.on('login:cancel', function () {
                Backbone.history.loadUrl('');

            });
            this.container.show(loginView);

        },

        logout: function () {
            var self = this;

            $.ajax({
                url    : 'logout',
                type   : 'POST',
                success: function () {
                    self.channel.trigger('logout');
                    self.session.clear();
                    Backbone.history.navigate('', {trigger: true});
                }
            });
        },

        accessDenied: function () {
            this.container.show(new AccessDeniedView());
        }
    });

    function setupErrorHandling(authService) {
        $.ajaxSetup({
            statusCode: {
                401: function (jqXHR) {
                    var response = '';
                    try {
                        response = jqXHR.responseJSON.error;
                        console.warn(response);
                    } catch (err) {
                    }
                    authService.session.clear();
                    authService.login();
                }
            }
        });
    }
});
