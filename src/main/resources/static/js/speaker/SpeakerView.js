define(['text!speaker/SpeakerTemplate.html', 'backbone.marionette'], function (template) {
    //noinspection JSUnusedGlobalSymbols
    return Marionette.ItemView.extend({
          template: _.template(template),
          bindings: {
              '[data-email]'   : 'id',
              '[data-name]'    : 'name',
              '[data-position]': 'position',
              '[data-about]'   : 'about'
          },

          onRender: function () {
              this.stickit();
          }
    });
});
