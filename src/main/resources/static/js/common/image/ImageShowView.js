define([
    'text!common/image/ImageShowTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            imageEl       : '#image',
            imageFile     : '#image-file',
            imageDeleteBtn: '#image-delete-btn'
        },

        events: {
            'change @ui.imageFile'    : readFile,
            'click @ui.imageDeleteBtn': deleteImage
        },

        onRender: function () {
            initImage(this);
            updateDeleteBtnState(this);
        }
    });

    function initImage(view) {
        var options = view.options;
        view.ui.imageEl.attr({
            src  : options.url || view.model.get(options.imageUrlAttr),
            style: 'height:' + options.height + 'px;width:' + options.width + 'px;'
        });
    }

    function updateDeleteBtnState(view) {
        var imageUrlAttr    = view.options.imageUrlAttr,
            model           = view.model,
            defaultImageUrl = model.defaults()[imageUrlAttr],
            isImageChanged  = model.get(imageUrlAttr) !== defaultImageUrl || model.image;
        view.ui.imageDeleteBtn.toggleClass('hidden', !isImageChanged);
    }

    function readFile(e) {
        var view  = this,
            files = e.target.files,
            file  = files && files[0];

        if (file) {
            var reader    = new FileReader();
            reader.onload = function (e) {
                view.triggerMethod('image:uploaded', e.target.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    function deleteImage() {
        var imageUrlAttr    = this.options.imageUrlAttr,
            model           = this.model,
            defaultImageUrl = model.defaults()[imageUrlAttr];

        model.set(imageUrlAttr, null);
        model.image         = null;
        this.ui.imageEl.attr('src', defaultImageUrl);
        this.ui.imageDeleteBtn.addClass('hidden');
    }

});