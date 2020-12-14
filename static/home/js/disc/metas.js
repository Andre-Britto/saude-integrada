$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#modal-metas .modal-content").html("");
                $("#modal-metas").modal("show");
            },
            success: function (data) {
                $("#modal-metas .modal-content").html(data.html_form);
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
                    $("#metas tbody").html(location.reload(true));
                    $("#modal-metas").modal("hide");
                } else {
                    $("#modal-metas .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };



    /* Binding */

    // Create book
    $(".js-create-metas").click(loadForm);
    $("#modal-metas").on("submit", ".js-meta-create-form", saveForm);

    // Update book
    $("#metas").on("click", ".js-update-metas", loadForm);
    $("#modal-metas").on("submit", ".js-metas-update-form", saveForm);


});
