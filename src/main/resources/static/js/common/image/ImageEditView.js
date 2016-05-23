define([
    'common/image/ImageShowView',
    'common/image/ImageCropView',
    'backbone.marionette'
], function ImageEditView(ImageShowView, ImageCropView) {

    'use strict';

    return Marionette.Object.extend({
        show: function () {
            showImageView(this.options);
        }
    });

    function showImageView(options, url) {
        var imageShowView = new ImageShowView({
            imageClass  : options.imageClass,
            url         : url,
            model       : options.model,
            defaultImage: options.defaultImage,
            imageUrlAttr: options.imageUrlAttr
        });

        imageShowView.onImageUploaded = function (url) {
            showImageCropView(options, url);
        };

        options.container.show(imageShowView);
    }

    function showImageCropView(options, url) {
        var imageCropView = new ImageCropView({
            url           : url,
            model         : options.model,
            croppieOptions: {
                viewport: options.viewport,
                boundary: options.viewport
            }
        });

        imageCropView.onImageUpdated = function (url) {
            showImageView(options, url)
        };

        imageCropView.onCancel = function () {
            showImageView(options)
        };

        options.container.show(imageCropView);
    }
});