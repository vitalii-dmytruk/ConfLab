define([
    'text!common/view/TableTemplate.html',
    'backbone.marionette'
], function (template) {
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