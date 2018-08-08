$(function () {
    $('#send').click(function () {
        var msgBody = {
            data: $('#msgBody').val()
        }
        $.ajax({
            type: 'POST',
            url: "/sendMsg",
            data: msgBody
        }).success(function (response) {
            // console.info(response);

        }).fail(function (response) {
            console.info(response);
        }).done(function () {
        });
    })
});