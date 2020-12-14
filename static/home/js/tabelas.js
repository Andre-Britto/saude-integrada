$('#armadilha tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.armadilha').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [

    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//


$('#idgeo tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.idgeo').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [

    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//
$('#chamada tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.chamada').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Chamadas'},
        {extend: 'excel', title: 'Chamadas'},
        {extend: 'pdf', title: 'Chamadas'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//

$('#ocupacao tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.ocupacao').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Ocupações'},
        {extend: 'excel', title: 'Ocupações'},
        {extend: 'pdf', title: 'Ocupações'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//

$('#solicitacao tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.solicitacao').DataTable({
    order: [[1, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Solicitação de Serviço'},
        {extend: 'excel', title: 'Solicitação de Serviço'},
        {extend: 'pdf', title: 'Solicitação de Serviço'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//

$('#prestador tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.prestador').DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Prestadores'},
        {extend: 'excel', title: 'Prestadores'},
        {extend: 'pdf', title: 'Prestadores'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//
$('#procedimento tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.procedimento').DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'procedimento'},
        {extend: 'excel', title: 'procedimento'},
        {extend: 'pdf', title: 'procedimento'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################////###############################################################################################################//
$('#contrato tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.contrato').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'contratos'},
        {extend: 'excel', title: 'contratos'},
        {extend: 'pdf', title: 'contratos'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################////###############################################################################################################//
$('#cirurgia tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.cirurgia').DataTable({
    order: [[0, 'desc']],
    pageLength: 12,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'cirurgia'},
        {extend: 'excel', title: 'cirurgia'},
        {extend: 'pdf', title: 'cirurgia'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################////###############################################################################################################//
$('#domicilio tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Busca" />' +
        '<span class="bar"></span>');
});

var table = $('.domicilio').DataTable({
    order: [[2, 'asc'], [3, 'asc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'domicilio'},
        {extend: 'excel', title: 'domicilio'},
        {extend: 'pdf', title: 'domicilio'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//


//###############################################################################################################////###############################################################################################################//
$('#individuo tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Busca" />' +
        '<span class="bar"></span>');
});

var table = $('.individuo').DataTable({
    order: [[1, 'asc']],
    pageLength: 10,
    responsive: true,
    placeholder: 'Busca',
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'individuo'},
        {extend: 'excel', title: 'individuo'},
        {extend: 'pdf', title: 'individuo'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################////###############################################################################################################//
$('#metas tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.metas').DataTable({
    order: [[0, 'desc']],
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'metas'},
        {extend: 'excel', title: 'metas'},
        {extend: 'pdf', title: 'metas'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});

// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//


$('#prod_ace tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});
var table = $('.prod_ace').DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Produção por ACE'},
        {extend: 'excel', title: 'Produção por ACE'},
        {extend: 'pdf', title: 'Produção por ACE'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});
// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//


$('#ento_area tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.ento_area').DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Produção por ACE'},
        {extend: 'excel', title: 'Produção por ACE'},
        {extend: 'pdf', title: 'Produção por ACE'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});
// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});


//###############################################################################################################//


$('#notificacao tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<form class="floating-labels m-t-40" ' + '<div class="form-group m-b-40">' +
        '<input type="text" class="form-control tr-padrao" id="input4" style="text-align: center" placeholder="Search" />' +
        '<span class="bar"></span>');
});

var table = $('.notificacao').DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        {extend: 'copy'},
        {extend: 'csv', title: 'Notificações'},
        {extend: 'excel', title: 'Notificações'},
        {extend: 'pdf', orientation: 'landscape', title: 'Notificações'},
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ]
});
// Apply the search
table.columns().every(function () {
    var that = this;

    $('input', this.footer()).on('keyup change clear', function () {
        if (that.search() !== this.value) {
            that
                .search(this.value)
                .draw();
        }
    });
});



