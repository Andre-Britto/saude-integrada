$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-prestador .modal-content").html("");
                $("#modal-prestador").modal("show");
            },
            success: function (data) {
                $("#modal-prestador .modal-content").html(data.html_form);
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
                    $("#prestador tbody").html(data.html_prestador_list);
                    $("#modal-prestador").modal("hide");
                } else {
                    $("#modal-prestador .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-prestador").click(loadForm);
    $("#modal-prestador").on("submit", ".js-prestador-create-form", saveForm);

    // Update book
    $("#prestador").on("click", ".js-update-prestador", loadForm);
    $("#modal-prestador").on("submit", ".js-prestador-update-form", saveForm);

    // Delete book
    $("#book-table").on("click", ".js-delete-book", loadForm);
    $("#modal-prestador").on("submit", ".js-book-delete-form", saveForm);

});
