$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-ocupacao .modal-content").html("");
                $("#modal-ocupacao").modal("show");
            },
            success: function (data) {
                $("#modal-ocupacao .modal-content").html(data.html_form);
            }
        });
    };

    var saveForm = function () {
        var form = $(this);
        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: form.attr("method"),
            dataType: 'json',
            success: function (data) {
                if (data.form_is_valid) {
                    swal({
                        title: "Sucesso",
                        type: "success"
                    });
                    $("#ocupacao tbody").html(location.reload(true));
                    $("#modal-ocupacao").modal("hide");
                } else {
                    $("#modal-ocupacao .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-ocupacao").click(loadForm);
    $("#modal-ocupacao").on("submit", ".js-ocupacao-create-form", saveForm);

    // Update book
    $("#ocupacao").on("click", ".js-update-ocupacao", loadForm);
    $("#modal-ocupacao").on("submit", ".js-ocupacao-update-form", saveForm);


});
