$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-contrato .modal-content").html("");
                $("#modal-contrato").modal("show");
            },
            success: function (data) {
                $("#modal-contrato .modal-content").html(data.html_form);
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
                    $("#contrato tbody").html(location.reload(true));
                    $("#modal-contrato").modal("hide");
                } else {
                    $("#modal-contrato .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-contrato").click(loadForm);
    $("#modal-contrato").on("submit", ".js-contrato-create-form", saveForm);

    // Update book
    $("#contrato").on("click", ".js-update-contrato", loadForm);
    $("#modal-contrato").on("submit", ".js-contrato-update-form", saveForm);


});
