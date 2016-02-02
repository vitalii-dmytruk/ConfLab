define([
    'text!common/image/ImageCropTemplate.html',
    'backbone.marionette',
    'croppie'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            croppie       : '#croppie',
            submitImageBtn: '#submit-image-btn'
        },

        events: {
            'click @ui.submitImageBtn': updateImage
        },

        onRender: initCroppie

    });

    function initCroppie() {
        this.$croppie = this.ui.croppie.croppie(this.options.croppieOptions);
        this.$croppie.croppie('bind', {url: this.options.url});
    }

    function updateImage() {
        var view = this;

        this.$croppie.croppie('result', {
            type: 'canvas',
            size: 'original'
        }).then(function (url) {
            view.model.image = dataURItoBlob(url);
            view.triggerMethod('image:updated', url)
        });
    }
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }

});