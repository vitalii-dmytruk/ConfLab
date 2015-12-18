define([
    'text!common/view/SearchTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        bindings: {
            '#search-item': {
                observe      : 'result',
                selectOptions: {
                    collection   : function () {
                        return this.collection;
                    },
                    labelPath    : 'name',
                    defaultOption: {
                        label: 'Search...',
                        value: null
                    }
                }
            }
        },

        onRender: function () {
            this.stickit()
        }
    });

});
