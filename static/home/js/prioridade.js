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


function Prioridade() {
    $.ajax({
        url: '/divs/auto/?especie=' + $("#especie").val() + '&situacao=' + $("#situacao").val(),
        dataType: 'json',
        statusCode: {
            500: function (data) {
                $("#situacao").val('');
                $("#prioridade_id").val('');
                $("#prioridade").val('Sem Prioridade').focus();
            },
        },
        success: function (resposta) {
            if (resposta.is_taken) {
                $("#prioridade").val('');
                $("#prioridade_id").val('');
                $("#situacao").val('').focus();
                swal({
                    title: "IDGEO Já Existe",
                    text: "Por favor, insira um valor novo!",
                    type: "warning"
                });
            }
            if (resposta) {
                $("#prioridade").val(resposta[0][1].prioridade);
                $("#prioridade_id").val(resposta[0][0].prioridade_id);
                $("#programa").focus();
            }
        }
    });
}



