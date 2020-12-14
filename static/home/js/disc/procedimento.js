$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-procedimento .modal-content").html("");
                $("#modal-procedimento").modal("show");
            },
            success: function (data) {
                $("#modal-procedimento .modal-content").html(data.html_form);
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
                    $("#procedimento tbody").html(data.html_procedimento_list);
                    $("#modal-procedimento").modal("hide");
                } else {
                    $("#modal-procedimento .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-procedimento").click(loadForm);
    $("#modal-procedimento").on("submit", ".js-procedimento-create-form", saveForm);

    // Update book
    $("#procedimento").on("click", ".js-update-procedimento", loadForm);
    $("#modal-procedimento").on("submit", ".js-procedimento-update-form", saveForm);


});
