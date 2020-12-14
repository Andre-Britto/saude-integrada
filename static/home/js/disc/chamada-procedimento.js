$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-chamada-procedimento .modal-content").html("");
                $("#modal-chamada-procedimento").modal("show");
            },
            success: function (data) {
                $("#modal-chamada-procedimento .modal-content").html(data.html_form);
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
                    $("#chamada-procedimento tbody").html(location.reload(true));
                    $("#modal-chamada-procedimento").modal("hide");
                } else {
                    $("#modal-chamada-procedimento .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-update-chamada-procedimento").click(loadForm);
    $("#modal-chamada-procedimento").on("submit", ".js-chamada-procedimento-create-form", saveForm);

    // Update book
    $("#chamada-procedimento").on("click", ".js-update-chamada-procedimento", loadForm);
    $("#modal-chamada-procedimento").on("submit", ".js-chamada-procedimento-update-form", saveForm);


});
