define([
    'text!common/view/ListTemplate.html',
    'backbone.marionette'
], function ListComponentView(template) {
    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title : '#table-title',
            addBtn: '#add-button'
        },

        regions: {
            editRegion      : '#edit-region',
            listRegion      : '#list-region',
            selectItemRegion: '[data-select-item-region]'
        },

        onBeforeShow: function () {
            this.ui.addBtn.hide();
        },

        showTitle: function (title) {
            this.ui.title.text(title);
        }
    });
});