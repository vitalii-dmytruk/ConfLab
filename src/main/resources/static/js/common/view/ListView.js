define([
    'text!common/view/ListTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childViewContainer: '[data-table]',

        ui : {
            title : '#page-title',
            addButton: '#add-button'
        },

        onRender : function () {
            setAddItemLink(this);
            setPageTitle(this);
        }
    });


    function setAddItemLink(view) {
        view.ui.addButton.attr('href', '#' + view.collection.url + '/new');
    }

    function setPageTitle(view) {
        view.ui.title.text(view.options.title);
    }
});