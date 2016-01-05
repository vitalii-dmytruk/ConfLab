define([
    'text!common/view/TitleTemplate.html',
    'backbone.marionette'
], function TitleView(template) {
    return Marionette.ItemView.extend({
        template : _.template(template),
        ui: {
            title  : '#page-title',
            editBtn: '#edit-button'
        },
        triggers: {
            'click @ui.editBtn': 'edit'
        },

        onRender : setPageTitle
    });

    function setPageTitle() {
        this.ui.title.text(this.options.title);
    }
});