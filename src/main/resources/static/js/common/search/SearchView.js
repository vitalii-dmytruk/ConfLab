define([
    'text!common/search/SearchTemplate.html',
    'backbone.marionette',
    'backbone.stickit',
    'select2'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template : _.template(template),
        className: 'row',

        ui: {
            selectedItem: '#selected-item',
            addBtn      : '#add-button'
        },

        triggers: {
            'click @ui.addBtn': 'add:clicked'
        },

        initialize: function () {
            this.model = new Backbone.Model();
        },

        onRender: function () {
            this.addBinding(null, '#selected-item', {
                observe      : 'result',
                initialize   : function ($el, model, options) {
                    $el.select2({
                        theme            : 'bootstrap',
                        containerCssClass: 'remove-right-radius',
                        placeholder      : "Search...",
                        allowClear       : true
                    });
                },
                selectOptions: {
                    collection   : function () {
                        return this.collection;
                    },
                    labelPath    : this.options.labelAttribute,
                    defaultOption: {
                        value: null
                    }
                }
            });
        },

        onAddClicked: function (options) {
            var result, model;
            result = options.model.get('result');
            if (result) {
                model = this.collection.get(result.id);
            } else{
                model = new this.collection.model()
            }
            this.ui.selectedItem.select2('val', '');
            this.options.onAddClicked(model);
        }
    });

});
