define([
    'backbone'
], function Model() {
    return Backbone.Model.extend({
        save: function () {
            var deferred = Backbone.Model.prototype.save.apply(this, arguments);

            if (!deferred) {
                deferred = $.Deferred().reject(this);
            }

            return deferred;
        }
    });
});