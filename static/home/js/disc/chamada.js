$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-chamada .modal-content").html("");
                $("#modal-chamada").modal("show");
            },
            success: function (data) {
                $("#modal-chamada .modal-content").html(data.html_form);
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
                    $("#chamada tbody").html(location.reload(true));
                    $("#modal-chamada").modal("hide");
                } else {
                    $("#modal-chamada .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-chamada").click(loadForm);
    $("#modal-chamada").on("submit", ".js-chamada-create-form", saveForm);

    // Update book
    $("#chamada").on("click", ".js-update-chamada", loadForm);
    $("#modal-chamada").on("submit", ".js-chamada-update-form", saveForm);


});
