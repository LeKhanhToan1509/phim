
$(document).ready(function () {
    $(".like").click(function (e) {
        e.preventDefault();
        var movieId = $("#id").data("id"); 
        var likeStatus = $("#like").data("like"); 

        if (likeStatus) {
            $(".like").html('<i class="fa-regular fa-heart"></i>');
            $("#like").data("like", false); 
        } else {
            $(".like").html('<i class="fa-solid fa-heart"></i>');
            $("#like").data("like", true); 
        }

        $.ajax({
            url: `/watch/changeLike/${likeStatus}/${movieId}?_method=PATCH`,
            type: "POST",
            success: function (response) {
                if (response.like !== likeStatus) {
                    if (response.like) {
                        $(".like").html('<i class="fa-solid fa-heart"></i>');
                        $("#like").data("like", true); 
                    } else {
                        $(".like").html('<i class="fa-regular fa-heart"></i>');
                        $("#like").data("like", false); 
                    }
                }
            },
        });
    });
});
