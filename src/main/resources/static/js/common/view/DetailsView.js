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
            content   : '[data-content-region]',
            attachment: '[data-attachment-region]'
        },

        onRender: function () {
            setPageTitle(this);
        },

        onBeforeShow: showShowView,

        showAttachment : function (view) {
            this.showChildView('attachment', view);
        }
    });

    function showEditView() {
        var view, editView;

        view = this;

        editView = new this.EditView({
            model: this.model.clone()
        });

        editView.onSubmit = save.bind(view);
        editView.onCancel = showShowView.bind(view);

        this.getRegion('content').show(editView);
    }

    function save(args) {
        var view = this;
        args.model.save().done(function () {
            view.model.set(args.model.attributes);
            showShowView.call(view);
        });
    }


    function showShowView() {
        this.getRegion('content').show(new this.ShowView({
            model: this.model
        }));
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }
});