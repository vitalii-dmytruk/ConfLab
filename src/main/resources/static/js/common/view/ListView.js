define([
    'text!common/view/ListTemplate.html',
    'backbone.marionette'
], function ListView(template) {
    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title : '#table-title',
            addBtn: '#add-button'
        },

        triggers: {
            'click @ui.addBtn': 'create:new'
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
        },

        supportCreating: function () {
            this.ui.addBtn.show();
        }
    });
});