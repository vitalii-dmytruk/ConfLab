define([
    'common/image/ImageShowView',
    'common/image/ImageCropView',
    'backbone.marionette'
], function (ImageShowView, ImageCropView) {

    'use strict';

    return Marionette.Object.extend({
        show: function () {
            showImageView(this.options);
        }
    });

    function showImageView(options, url) {
        var imageShowView = new ImageShowView({
            height      : options.boundary.height,
            width       : options.boundary.width,
            url         : url,
            model       : options.model,
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
                boundary: options.boundary
            }
        });

        imageCropView.onImageUpdated = function (url) {
            showImageView(options, url)
        };

        options.container.show(imageCropView);
    }
});