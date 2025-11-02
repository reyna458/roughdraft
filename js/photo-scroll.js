$(document).ready(function () {
    let photoCount = 1;
    const maxPhotos = 9;

    function photoUpdate() {
        const photoChoice = `url(./assets/cover${photoCount}.webp)`;
        $('header').css("background-image", photoChoice);
    }

    // Initialize
    photoUpdate();

    $('#left').click(function() {
        photoCount--;
        if (photoCount < 1) {
            photoCount = maxPhotos;
        }
        console.log('Left:', photoCount);
        photoUpdate();
    });

    $('#right').click(function() {
        photoCount++;
        if (photoCount > maxPhotos) {
            photoCount = 1;
        }
        console.log('Right:', photoCount);
        photoUpdate();
    });
});
