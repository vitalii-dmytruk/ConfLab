define([
    'select2'
], function () {
    'use strict';

    return function CollectionBinding(Collection, attribute, allowNew, labelPath, placeholder) {
        labelPath   = labelPath || 'name';
        placeholder = placeholder || 'Choose from the list';

        return {
            observe      : attribute,
            collection   : new Collection(),
            initialize   : function ($el, model, options) {
                options.collection.fetch().then(function () {
                    $el.select2({
                        tags       : !!allowNew,
                        theme      : 'bootstrap',
                        placeholder: placeholder,
                        allowClear : true
                    });
                })
            },
            getVal       : function ($el, event, options) {
                return getFromSelectedOption($el) || buildFromModel($el, options, labelPath);
            },
            selectOptions: {
                collection   : function ($el, options) {
                    return options.collection;
                },
                labelPath    : labelPath,
                defaultOption: {
                    value: null
                }
            }
        };
    };

    function buildFromModel($el, options, labelPath) {
        var item, model;

        item            = {};
        item[labelPath] = $el.val();
        model           = new options.collection.model(item);
        return model.attributes;
    }

    function getFromSelectedOption($el) {
        var selected = $el.find('option:selected');
        return selected.data('stickit-bind-val');
    }
});