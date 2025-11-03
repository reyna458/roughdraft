$(document).ready(function () {

    $.getJSON('data/gallery.json', function(gallery) {
        let galleryHTML = '';

        for (let x = 0; x < gallery.length; x++) {
            galleryHTML += `
                <div class='gallery-photo' id='${gallery[x].GalleryNum}'>
                    <img src='../assets/x-sign.png' alt='x button' class='galleryx'>
                    <img loading='lazy' src='../assets/gallery/gallery${gallery[x].GalleryNum}_compressed.webp' alt='${gallery[x].Alt}' class='galleryIMG'>
                    <h2>${gallery[x].Caption}</h2>
                </div>
            `;
        }

        $('#gallery-container').html(galleryHTML);
    });

    // When clicking any photo
    $(document).on('click', '.gallery-photo', function () {
        // Remove active class + hide all X buttons
        $('.gallery-photo').removeClass('gallery-active');
        $('.galleryx').hide();

        // Activate this one
        $(this).addClass('gallery-active');
        $(this).find('.galleryx').show();
    });

    // When clicking the X button
    $(document).on('click', '.galleryx', function (e) {
        e.stopPropagation(); // prevent triggering the .gallery-photo click
        $(this).hide();
        $(this).closest('.gallery-photo').removeClass('gallery-active');
    });
});
