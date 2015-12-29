define([
    'text!common/search/SearchTemplate.html',
    'backbone.marionette',
    'backbone.stickit',
    'select2'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            selectedItem: '#selected-item'
        },

        modelEvents: {
            'change:result': onSelectionChanged
        },

        onRender: function () {
            this.addBinding(null, '#selected-item', {
                observe      : 'result',
                initialize   : function ($el, model, options) {
                    $el.select2({
                        theme      : 'bootstrap',
                        placeholder: 'Add from the list',
                        allowClear : true
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
        }
    });

    function onSelectionChanged() {
        var result, item;
        result = this.model.get('result');
        if (result) {
            this.ui.selectedItem.select2('val', '');
            item = this.collection.get(result.id);
            this.options.onItemSelected(item);
        }
    }

});
