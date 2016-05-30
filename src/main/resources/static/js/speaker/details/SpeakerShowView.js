define([
    'text!speaker/details/SpeakerTemplate.html',
    'backbone.marionette'
], function SpeakerShowView(template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        bindings: {
            '#email'     : {
                attributes: [{
                    name   : 'href',
                    observe: 'email',
                    onGet  : function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe   : 'email'
            },
            '#name'      : 'name',
            '#position'  : 'position',
            '#company'   : {
                observe: 'company',
                onGet  : function (value) {
                    return value && value.name;
                }
            },
            '#about'     : 'about',
            '#avatar-img': {
                initialize: function ($el) {
                    $el.one('error', function () {
                        this.src = '/img/invalid-image.png';
                    });
                },
                attributes: [{
                    name   : 'src',
                    observe: 'image',
                    onGet  : function (value) {
                        return value || '/img/default-avatar.png';
                    }
                }]
            }
        },

        onRender: function () {
            this.stickit();
        }
    });
});