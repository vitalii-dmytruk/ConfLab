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
            setupErrorHandling(this);
            setupCsrf();
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
                var credentials = user.get('username') + ':' + user.get('password');
                self.session.fetch({
                    headers: {
                        'Authorization': 'Basic ' + b64EncodeUnicode(credentials)
                    },
                    success: function (model, response, options) {
                        setupCsrf(options.xhr);
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
                    clearSession(self);
                    Backbone.history.navigate('', {trigger: true});
                }
            });
        },

        accessDenied: function () {
            this.container.show(new AccessDeniedView());
        }
    });

    function clearSession(authService) {
        authService.session.clear();
        authService.channel.trigger('logout');
    }

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
                    clearSession(authService);
                    authService.login();
                }
            }
        });
    }

    function setupCsrf(xhr) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(xhr)
            }
        });
    }

    function getCsrfToken(xhr) {
        var csrfToken;
        if (xhr) {
            csrfToken                    = xhr.getResponseHeader('X-CSRF-TOKEN') || '';
            localStorage['X-CSRF-TOKEN'] = csrfToken;
        } else {
            csrfToken = localStorage['X-CSRF-TOKEN'] || '';
        }
        return csrfToken;
    }

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
});
