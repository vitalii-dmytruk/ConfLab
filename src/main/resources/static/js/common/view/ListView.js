define([
    'text!common/view/ListTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childViewContainer: '[data-table]',

        ui : {
             title : '#page-title'
        },

        bindings : {
            '#add-button' : {
                attributes : [{
                    name : 'href',
                    onGet : function () {
                        return '#' + this.collection.url + '/new';
                    }
                }]
            }
        },

        onRender : function () {
            this.ui.title.text(this.options.title);
        }
    });


});