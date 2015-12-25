define([
    'text!common/view/SearchTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        onRender: function () {
            this.addBinding(null, '#search-item', {
                observe      : 'result',
                selectOptions: {
                    collection   : function () {
                        return this.collection;
                    },
                    labelPath    : this.options.labelAttribute,
                    defaultOption: {
                        label: 'Search...',
                        value: null
                    }
                }
            });
        }
    });

});
