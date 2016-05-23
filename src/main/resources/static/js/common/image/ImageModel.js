define([
    'common/Model'
], function ImageModel(Model) {
    'use strict';
    return Model.extend({
        defaults: function () {
            return {
                image: null
            }
        },

        saveImage: function () {
            return this.image ? buildUpdateImagePromise(this) : buildNoImagePromise(this);
        }
    });


    function buildNoImagePromise(model) {
        var promise;
        if (model.get('image') && model.isDeleted) {
            promise = $.ajax({
                url    : model.getUrl(),
                type   : 'DELETE',
                success: function () {
                    model.set('image', null);
                }
            });
        } else {
            promise = $.Deferred().resolve();
        }

        return promise;
    }

    function buildUpdateImagePromise(model) {

        return $.ajax({
            url        : model.getUrl(),
            type       : model.get('image') ? 'PUT' : 'POST',
            contentType: false,
            data       : getFormData(model),
            dataType   : 'text',
            processData: false,
            success    : function (response) {
                model.set('image', response);
            }
        });
    }

    function getFormData(model) {
        var formData = new FormData(),
            fileName = 'image.png',
            fileData = model.image;

        fileData && formData.append('image', fileData, fileName);

        return formData;
    }
});