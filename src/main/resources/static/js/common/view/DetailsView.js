define([
    'text!common/view/DetailsTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title  : '#page-title',
            editBtn: '#edit-button'
        },

        events: {
            'click @ui.editBtn': showEditView
        },

        regions: {
            editRegion    : '[data-edit-region]',
            descendantRegion: '[data-descendant-region]'
        },

        onRender: function () {
            setPageTitle(this);
        },

        onBeforeShow: function () {
            showShowView(this);
            this.descendantRegion.show(this.options.attachedItemTableView);
        }

    });


    function showEditView() {
        var view, editView;

        view = this;

        editView = new this.EditView({
            model: this.model.clone()
        });

        editView.onSubmit = function (args) {
            args.model.save().done(function () {
                view.model.set(args.model.attributes);
                showShowView(view)
            });
        };
        editView.onCancel = function () {
            showShowView(view);
        };

        this.editRegion.show(editView);
    }

    function showShowView(view) {
        view.editRegion.show(new view.ShowView({
            model: view.model
        }));
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }
});