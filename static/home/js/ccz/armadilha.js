$(document).ready(function () {
    // messages timeout for 10 sec
    setTimeout(function () {
        $('.alert').fadeOut('slow');
    }, 3000); // <-- time in milliseconds, 1000 =  1 sec

    // delete message
    $('.del-msg').live('click', function () {
        $('.del-msg').parent().attr('style', 'display:none;');
    })

});


$("#id_idgeo").on("change", function () {
    $.ajax({
        url: '/divs/auto/?idgeo=' + $("#idgeo").val(),
        dataType: 'json',
        statusCode: {
            500: function (data) {
                $("#quarteirao").val('');
                $("#area").val('');
                $("#estrato").val('');
                $("#id_idgeo").val('').focus();
                swal({
                    title: "IDGEO Não Existe na Base de Dados",
                    text: "Por favor, verifique o valor informado!",
                    type: "warning"
                });
            },
        },
        success: function (resposta) {
            if (resposta.is_taken) {
                $("#quarteirao").val('');
                $("#area").val('');
                $("#estrato").val('');
                $("#id_idgeo").val('').focus();
                swal({
                    title: "IDGEO Já Existe",
                    text: "Por favor, insira um valor novo!",
                    type: "warning"
                });
            }
            if (resposta) {
                $("#quarteirao").val(resposta[0][1].quarteirao);
                $("#area").val(resposta[0][2].area);
                $("#estrato").val(resposta[0][3].estrato);
                $("#rua").focus();
            }
        }
    });
});



