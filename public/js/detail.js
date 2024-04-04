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
            url: `/watch/changeLike/${movieId}`,
            type: "POST",
            data: { like: likeStatus },
            success: function (response) {
                console.log(response);
                if (response.liked) {
                    $(".like").html('<i class="fa-solid fa-heart"></i>');
                    $("#like").data("like", true);
                } else {
                    $(".like").html('<i class="fa-regular fa-heart"></i>');
                    $("#like").data("like", false);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error occurred: " + error);
            },
        });
    });
});

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
            url: `/watch/changeLike/${likeStatus}/${movieId}`,
            type: "POST",
            success: function (response) {
                console.log(response);
                if (response.liked) {
                    $(".like").html('<i class="fa-solid fa-heart"></i>');
                    $("#like").data("like", true);
                } else {
                    $(".like").html('<i class="fa-regular fa-heart"></i>');
                    $("#like").data("like", false);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error occurred: " + error);
            },
        });
    });
});
