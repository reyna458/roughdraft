$(document).ready(function () {

$(document).on("click", ".plus-sign", function() {
    $('.menubar').css("display", "inline")
    $('.plus-sign').attr("src", "assets/x-sign.png")
    $('.plus-sign').toggleClass('x-sign')
    $('.plus-sign').toggleClass('plus-sign')
})

$(document).on("click", ".x-sign", function() {
    $('.menubar').css("display", "none")
    $('.x-sign').attr("src", "assets/plus-sign.png")
     $('.x-sign').toggleClass('plus-sign')
    $('.x-sign').toggleClass('x-sign')
})

})