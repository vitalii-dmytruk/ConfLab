define([
    'text!common/view/DetailsTemplate.html',
    'backbone.marionette'
], function DetailsView(template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        regions: {
            content   : '[data-content-region]',
            attachment: '[data-attachment-region]'
        },

        onChildviewEdit: showEditView,
        onBeforeShow   : showShowView,

        showAttachment: function (view) {
            this.showChildView('attachment', view);
        }
    });

    function showEditView() {
        var view, contentView;

        view = this;

        contentView = new this.EditView({
            model: this.model.clone()
        });

        contentView.onSubmit = save.bind(view);
        contentView.onCancel = showShowView.bind(view);

        this.getRegion('content').show(contentView);
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
});