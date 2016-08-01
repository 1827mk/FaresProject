/**
 * Created by tanaphatdev on 1/5/2559.
 */
var dateCurrentClient;
$(document).ready(function () {
    // $('#loading').hide();
    findAllFares();
    clearAll();
    sourceAutoComplate();
    $('.sorting_disabled').removeClass('sorting_asc');

});
// Responseive
$(window).on('load resize', function() {

    if (screen.width >= 1080) {
        $("#colPictureSlide").removeClass("col-sm-12");
        $("#colPictureSlide").removeClass("marginTopcolPictureSlideOver1080");
        $("#colPictureSlide").addClass("marginTopcolPictureSlideOver980");
        $("#colPictureSlide").addClass("col-sm-9");
        $('#formHoerSlideShow').addClass('formHoerSlideShow');
    }
    else {
        $("#colPictureSlide").removeClass("col-sm-9");
        $("#colPictureSlide").addClass("col-sm-12");
        $("#colPictureSlide").addClass("marginTopcolPictureSlideOver1080");
        $('#formHoerSlideShow').removeClass('formHoerSlideShow');
    }
    //
    // if (screen.width > 1100) {
    //     $('#wellCustom').addClass('wellWidth8000');
    //     $('#wellCustom').removeClass('wellWidth720');
    // }
    // else {
    //     $('#wellCustom').addClass('wellWidth720');
    //     $('#wellCustom').removeClass('wellWidth8000');
    // }
    //
    // if (screen.width < 767) {
    //     $('#wellCustom').removeClass('wellWidth8000');
    //     $('#wellCustom').removeClass('wellWidth720');
    //     $('.btn-primary').addClass('btn270');
    //     $('.btn-primary').removeClass('btn160');
    // }
    // else {
    //     $('.btn-primary').addClass('btn160');
    //     $('.btn-primary').removeClass('btn270');
    //     // $('#wellCustom').addClass('wellWidth720');
    //     // $('#wellCustom').addClass('wellWidth8000');
    // }

})

function printData() {
    var divToPrint=document.getElementById("printFares");
    newWin= window.open("");
    $("#tableFares_filter").css("display","none");
    $("#ToolTables_tableFares_0").css("display","none");
    $("#ToolTables_tableFares_1").css("display","none");
    $("#ToolTables_tableFares_2").css("display","none");
    $("#tableFares_info").css("display","none");
    $("#tableFares_previous").css("display","none");
    $("#tableFares_next").css("display","none");
    $(".paginate_button").css("display","none");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    $("#tableFares_filter").css("display","inline");
    $("#ToolTables_tableFares_0").css("display","inline");
    $("#ToolTables_tableFares_1").css("display","inline");
    $("#ToolTables_tableFares_2").css("display","inline");
    $("#tableFares_info").css("display","inline");
    $("#tableFares_previous").css("display","inline");
    $("#tableFares_next").css("display","inline");
    $(".paginate_button").css("display","inline");
    newWin.close();
}
$('#btnPrintTable').on('click',function(){
    printData();
})

function clearAll() {

    $("#textAllFaresSource").val("");

    $("#textAllFaresDestination").val("");

    $("#textFlightSource").val("");

    $("#textFlightDestination").val("");

    $("#textTrainSource").val("");

    $("#textTrainDestination").val("");

    $("#textBusSource").val("");

    $("#textBusDestination").val("");
    $('#loading').hide();
}
var dataCheck =[];
var listdata =[];
var discription = []
function sourceAutoComplate() {
    $('#loading').show();
    var checkStatus = "online" ;
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllSource',
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==500){
                    swal({
                        title: "แจ้งเตือน",
                        text: "เซิฟเวอร์ปิดให้บริการ กรุณาลองใหม่ภายหลัง!",
                        type: "warning",
                        confirmButtonColor: "#0000FF",
                        confirmButtonText: "ตกลง",
                        closeOnConfirm: false
                    });
                    checkStatus = "offline" ;
                    $('#loading').show();
                }else{
                    checkStatus = "online" ;
                }
            }else{
                checkStatus = "online" ;
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
    if(checkStatus!="offline"){
        $('#loading').hide();
        $.each(JSON.parse(data),function(index,item){
            var list = {};
            discription.push(item.locationName);
            list.description = item.locationName;
            list.locationCode = item.locationCode;
            listdata.push({list:list});
        });

        // searchAll
        $("#textAllFaresSource").autocomplete({
            source:discription,
            minLength: 0
        });
        $("#textAllFaresDestination").autocomplete({
            source:discription,
            minLength: 0
        });
        // end

        // searchFlight
        $("#textFlightSource").autocomplete({
            source:discription,
            minLength: 0
        });
        $("#textFlightDestination").autocomplete({
            source:discription,
            minLength: 0
        });
        // end

        // searchTrain
        $("#textTrainSource").autocomplete({
            source:discription,
            minLength: 0
        });
        $("#textTrainDestination").autocomplete({
            source:discription,
            minLength: 0
        });
        // end

        // searchBus
        $("#textBusSource").autocomplete({
            source:discription,
            minLength: 0
        });
        $("#textBusDestination").autocomplete({
            source:discription,
            minLength: 0
        });
        // end
        dataCheck = listdata;
        // console.log(dataCheck);
    }

}
var checkStatus = "online";
$(document).ready(function() {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'print',
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' )
                        .prepend(
                            '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                        );

                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ]
    } );
} );
function findAllFares(){
    $("#tableFares").DataTable().destroy();

    // $('#loading').show();
    var faresData = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllFares',
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==500){
                    checkStatus = "offline" ;
                }else{
                    checkStatus = "online" ;
                }
            }else{
                checkStatus = "online" ;
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
    $('#loading').hide();

    $('#tbodyFares').empty();
    if(faresData.length == 0 ){
        swal({
            title: "แจ้งเตือน",
            text: "ไม่พบข้อมูล!",
            type: "warning",
            confirmButtonColor: "#0000FF",
            confirmButtonText: "ตกลง",
            closeOnConfirm: false
        });

    }else {
        if(checkStatus == "online") {
            $('#tbodyFares').empty();

            $.each(JSON.parse(faresData), function (index, item) {
                var date = new Date(item.promote.dateFared).toISOString().split("T")[0];
                var dates = date.split("-");
                var dateOrigin = dates[2];
                var monthOrigin = dates[1];
                var yeaOrigin = dates[0];
                var checkDateDuplicate = dateOrigin + '/' + monthOrigin + '/' + yeaOrigin;

                var priceFares ;
                var pricePromotion ;
                var balance ;
                var nameDatePros;

                var dateNow = new Date();
                // ckeck date  In the past
                var dateServer = new Date(checkDateDuplicate);

                // var dateCheck1 = dateServer.setHours(0,0,0);
                // var dateCheck2 = dateNow.setHours(0,0,0);


                if (checkDateDuplicate == "10/10/2010") {
                    checkDateDuplicate = "-"
                }else if(dateServer.setHours(0,0,0,0) >=  dateNow.setHours(0,0,0,0) )
                {
                    priceFares = item.price;
                    pricePromotion = item.promote.promotePrice;
                    balance = parseInt(priceFares - (priceFares * pricePromotion / 100));
                    nameDatePros = item.promote.promotion;
                    // console.log("OK")
                }else {
                    checkDateDuplicate = "-";
                    pricePromotion = 0.00;
                    balance = item.price;
                    nameDatePros = "-";
                    // console.log("NO")
                }


                $('#tbodyFares').append('<tr>' +
                    '<td><center>' + (item.travel.locationSourName == null ? '' : item.travel.locationSourName) + '</center></td>' +
                    '<td><center>' + (item.travel.locationDisName == null ? '' : item.travel.locationDisName) + '</center></td>' +
                    '<td><center>' + (item.price == null ? '' : parseFloat(item.price).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportName == null ? '' : item.travel.transport.transportName) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportBusiness == null ? '' : item.travel.transport.transportBusiness) + '</center></td>' +
                    '<td><center>' + (nameDatePros == null ? '' : nameDatePros) + '</center></td>' +
                    '<td><center>' + (checkDateDuplicate == null ? '' : checkDateDuplicate) + '</center></td>' +
                    '<td><center>' + (pricePromotion == null ? '' : parseFloat(pricePromotion).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (balance == null ? '' : parseFloat(balance).toFixed(2)) + '</center></td>' +
                    '</tr>');
                //
                // faresPrototype[item.id]=item;
            });
            $('#tableFares').DataTable({
                "sDom": 'T<"clear">lfrtip',

                // "dom": '<"pull-left"f><"pull-right"l>tip',
                "oTableTools": {
                    "sSwfPath": "/Fares/scripts/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sButtonText": "Export Excel.",
                            "sFileName": "*.xls"
                        },
                        {
                            'sExtends':'print',
                            'sButtonText':'Print',
                            "fnClick": function ( nButton, oConfig, oFlash ) {
                                printData();
                            }

                        }

                    ]
                },
                "bSortable": false ,
                "scrollY": "800px",
                "bLengthChange": false,
                "bSort": false,
                "language": {
                    "lengthMenu": "แสดง _MENU_ รายการ",
                    "zeroRecords": "ไม่พบข้อมูล",
                    "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                    "infoEmpty": "ไม่พบเรคคอร์ด",
                    "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
                    "decimal": "",
                    "emptyTable": "ไม่มีข้อมูลในตาราง",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "โหลด...",
                    "processing": "กำลังดำเนินการ...",
                    "search": "ค้นหา:",
                    "paginate": {
                        "first": "หน้าแรก",
                        "last": "หน้าสุดท้าย",
                        "next": "ถัดไป",
                        "previous": "ก่อนหน้า"
                    },
                    "aria": {
                        "sortAscending": ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                        "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
                    }
                }
            });
        }
    }
}
function destroyDataTableFares() {
    $('#tableFares').DataTable( {
        paging: false
    } );
    $('#tableFares').DataTable( {
        destroy: true,
        searching: false
    } );
}
// serchAll
function searchAll(source,destination) {
    var textSource = source;
    var textDestination = destination;
    $('#loading').show();
    var faresData = $.ajax({
        type: "GET",
        headers:
        {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/searchAll',
        data : {
            source:textSource,
            destination:textDestination
        },
        async: false,
    }).done(function (){
        //close loader
        $('#loading').hide();
    }).responseText;
    $('#loading').hide();
    $('#tbodyFares').empty();
    if(faresData.length == 24 ){
        swal({
            title: "แจ้งเตือน",
            text: "ไม่พบข้อมูล!",
            type: "warning",
            confirmButtonColor: "#0000FF",
            confirmButtonText: "ตกลง",
            closeOnConfirm: false
        });

    }else {
        if(checkStatus == "online") {
            $('#tbodyFares').empty();

            $.each(JSON.parse(faresData), function (index, item) {
                var date = new Date(item.promote.dateFared).toISOString().split("T")[0];
                var dates = date.split("-");
                var dateOrigin = dates[2];
                var monthOrigin = dates[1];
                var yeaOrigin = dates[0];
                var checkDateDuplicate = dateOrigin + '/' + monthOrigin + '/' + yeaOrigin;

                var priceFares ;
                var pricePromotion ;
                var balance ;
                var nameDatePros;

                var dateNow = new Date();
                // ckeck date  In the past
                var dateServer = new Date(checkDateDuplicate);

                // var dateCheck1 = dateServer.setHours(0,0,0);
                // var dateCheck2 = dateNow.setHours(0,0,0);


                if (checkDateDuplicate == "10/10/2010") {
                    checkDateDuplicate = "-"
                }else if(dateServer.setHours(0,0,0,0) >=  dateNow.setHours(0,0,0,0) )
                {
                    priceFares = item.price;
                    pricePromotion = item.promote.promotePrice;
                    balance = parseInt(priceFares - (priceFares * pricePromotion / 100));
                    nameDatePros = item.promote.promotion;
                    // console.log("OK")
                }else {
                    checkDateDuplicate = "-";
                    pricePromotion = 0.00;
                    balance = item.price;
                    nameDatePros = "-";
                    // console.log("NO")
                }


                $('#tbodyFares').append('<tr>' +
                    '<td><center>' + (item.travel.locationSourName == null ? '' : item.travel.locationSourName) + '</center></td>' +
                    '<td><center>' + (item.travel.locationDisName == null ? '' : item.travel.locationDisName) + '</center></td>' +
                    '<td><center>' + (item.price == null ? '' : parseFloat(item.price).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportName == null ? '' : item.travel.transport.transportName) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportBusiness == null ? '' : item.travel.transport.transportBusiness) + '</center></td>' +
                    '<td><center>' + (nameDatePros == null ? '' : nameDatePros) + '</center></td>' +
                    '<td><center>' + (checkDateDuplicate == null ? '' : checkDateDuplicate) + '</center></td>' +
                    '<td><center>' + (pricePromotion == null ? '' : parseFloat(pricePromotion).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (balance == null ? '' : parseFloat(balance).toFixed(2)) + '</center></td>' +
                    '</tr>');
                //
                // faresPrototype[item.id]=item;
            });
            $('#tableFares').DataTable({
                "sDom": 'T<"clear">lfrtip',
                "oTableTools": {
                    "sSwfPath": "/Fares/scripts/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sButtonText": "Export Excel.",
                            "sFileName": "*.xls"
                        },
                        {
                            'sExtends':'print',
                            'sButtonText':'Print',
                            "fnClick": function ( nButton, oConfig, oFlash ) {
                                printData();
                            }

                        }

                    ]
                },
                "bSortable": false ,
                "scrollY": "800px",
                "bLengthChange": false,
                "bSort": false,
                "language": {
                    "lengthMenu": "แสดง _MENU_ รายการ",
                    "zeroRecords": "ไม่พบข้อมูล",
                    "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                    "infoEmpty": "ไม่พบเรคคอร์ด",
                    "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
                    "decimal": "",
                    "emptyTable": "ไม่มีข้อมูลในตาราง",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "โหลด...",
                    "processing": "กำลังดำเนินการ...",
                    "search": "ค้นหา:",
                    "paginate": {
                        "first": "หน้าแรก",
                        "last": "หน้าสุดท้าย",
                        "next": "ถัดไป",
                        "previous": "ก่อนหน้า"
                    },
                    "aria": {
                        "sortAscending": ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                        "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
                    }
                }
            });
        }
    }
}
// search Trian and Bus
function searchTransport(tranCode,source,destination) {
    var source = source ;
    var destination =  destination;
    var tranCodes = tranCode;
    $('#loading').show();
    var faresData = $.ajax({
        type: "GET",
        headers:
        {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/searchTransport',
        data : {
            source:source,
            destination:destination,
            tranCodes :tranCodes
        },
        async: false,
    }).done(function (){
        //close loader
        $('#loading').hide();
    }).responseText;
    $('#loading').hide();
    $('#tbodyFares').empty();
    if(faresData.length == 24 ){
        swal({
            title: "แจ้งเตือน",
            text: "ไม่พบข้อมูล!",
            type: "warning",
            confirmButtonColor: "#0000FF",
            confirmButtonText: "ตกลง",
            closeOnConfirm: false
        });

    }else {
        if(checkStatus == "online") {
            $('#tbodyFares').empty();

            $.each(JSON.parse(faresData), function (index, item) {
                var date = new Date(item.promote.dateFared).toISOString().split("T")[0];
                var dates = date.split("-");
                var dateOrigin = dates[2];
                var monthOrigin = dates[1];
                var yeaOrigin = dates[0];
                var checkDateDuplicate = dateOrigin + '/' + monthOrigin + '/' + yeaOrigin;

                var priceFares ;
                var pricePromotion ;
                var balance ;
                var nameDatePros;

                var dateNow = new Date();
                // ckeck date  In the past
                var dateServer = new Date(checkDateDuplicate);

                // var dateCheck1 = dateServer.setHours(0,0,0);
                // var dateCheck2 = dateNow.setHours(0,0,0);


                if (checkDateDuplicate == "10/10/2010") {
                    checkDateDuplicate = "-"
                }else if(dateServer.setHours(0,0,0,0) >=  dateNow.setHours(0,0,0,0) )
                {
                    priceFares = item.price;
                    pricePromotion = item.promote.promotePrice;
                    balance = parseInt(priceFares - (priceFares * pricePromotion / 100));
                    nameDatePros = item.promote.promotion;
                    // console.log("OK")
                }else {
                    checkDateDuplicate = "-";
                    pricePromotion = 0.00;
                    balance = item.price;
                    nameDatePros = "-";
                    // console.log("NO")
                }


                $('#tbodyFares').append('<tr>' +
                    '<td><center>' + (item.travel.locationSourName == null ? '' : item.travel.locationSourName) + '</center></td>' +
                    '<td><center>' + (item.travel.locationDisName == null ? '' : item.travel.locationDisName) + '</center></td>' +
                    '<td><center>' + (item.price == null ? '' : parseFloat(item.price).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportName == null ? '' : item.travel.transport.transportName) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportBusiness == null ? '' : item.travel.transport.transportBusiness) + '</center></td>' +
                    '<td><center>' + (nameDatePros == null ? '' : nameDatePros) + '</center></td>' +
                    '<td><center>' + (checkDateDuplicate == null ? '' : checkDateDuplicate) + '</center></td>' +
                    '<td><center>' + (pricePromotion == null ? '' : parseFloat(pricePromotion).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (balance == null ? '' : parseFloat(balance).toFixed(2)) + '</center></td>' +
                    '</tr>');
                //
                // faresPrototype[item.id]=item;
            });
            $('#tableFares').DataTable({
                "sDom": 'T<"clear">lfrtip',
                "oTableTools": {
                    "sSwfPath": "/Fares/scripts/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sButtonText": "Export Excel.",
                            "sFileName": "*.xls"
                        },
                        {
                            'sExtends':'print',
                            'sButtonText':'Print',
                            "fnClick": function ( nButton, oConfig, oFlash ) {
                                printData();
                            }

                        }

                    ]
                },
                "bSortable": false ,
                "scrollY": "800px",
                "bLengthChange": false,
                "bSort": false,
                "language": {
                    "lengthMenu": "แสดง _MENU_ รายการ",
                    "zeroRecords": "ไม่พบข้อมูล",
                    "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                    "infoEmpty": "ไม่พบเรคคอร์ด",
                    "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
                    "decimal": "",
                    "emptyTable": "ไม่มีข้อมูลในตาราง",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "โหลด...",
                    "processing": "กำลังดำเนินการ...",
                    "search": "ค้นหา:",
                    "paginate": {
                        "first": "หน้าแรก",
                        "last": "หน้าสุดท้าย",
                        "next": "ถัดไป",
                        "previous": "ก่อนหน้า"
                    },
                    "aria": {
                        "sortAscending": ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                        "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
                    }
                }
            });
        }
    }
}
// searchFlight
function searchFlightTransport(source,destination,trainCode,busCode) {
    var source = source ;
    var destination =  destination;
    var trainCodes = trainCode;
    var busCodes = busCode;
    $('#loading').show();
    var faresData = $.ajax({
        type: "GET",
        headers:
        {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/searchFlightTransport',
        data : {
            source:source,
            destination:destination,
            trainCode :trainCodes,
            busCode :busCodes
        },async: false
    }).done(function (){
        //close loader
        $('#loading').hide();
    }).responseText;
    $('#loading').hide();
    $('#tbodyFares').empty();
    if(faresData.length == 24 ){
        swal({
            title: "แจ้งเตือน",
            text: "ไม่พบข้อมูล!",
            type: "warning",
            confirmButtonColor: "#0000FF",
            confirmButtonText: "ตกลง",
            closeOnConfirm: false
        });

    }else {
        if(checkStatus == "online") {
            $('#tbodyFares').empty();

            $.each(JSON.parse(faresData), function (index, item) {
                var date = new Date(item.promote.dateFared).toISOString().split("T")[0];
                var dates = date.split("-");
                var dateOrigin = dates[2];
                var monthOrigin = dates[1];
                var yeaOrigin = dates[0];
                var checkDateDuplicate = dateOrigin + '/' + monthOrigin + '/' + yeaOrigin;

                var priceFares ;
                var pricePromotion ;
                var balance ;
                var nameDatePros;

                var dateNow = new Date();
                // ckeck date  In the past
                var dateServer = new Date(checkDateDuplicate);

                // var dateCheck1 = dateServer.setHours(0,0,0);
                // var dateCheck2 = dateNow.setHours(0,0,0);


                if (checkDateDuplicate == "10/10/2010") {
                    checkDateDuplicate = "-"
                }else if(dateServer.setHours(0,0,0,0) >=  dateNow.setHours(0,0,0,0) )
                {
                    priceFares = item.price;
                    pricePromotion = item.promote.promotePrice;
                    balance = parseInt(priceFares - (priceFares * pricePromotion / 100));
                    nameDatePros = item.promote.promotion;
                    // console.log("OK")
                }else {
                    checkDateDuplicate = "-";
                    pricePromotion = 0.00;
                    balance = item.price;
                    nameDatePros = "-";
                    // console.log("NO")
                }


                $('#tbodyFares').append('<tr>' +
                    '<td><center>' + (item.travel.locationSourName == null ? '' : item.travel.locationSourName) + '</center></td>' +
                    '<td><center>' + (item.travel.locationDisName == null ? '' : item.travel.locationDisName) + '</center></td>' +
                    '<td><center>' + (item.price == null ? '' : parseFloat(item.price).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportName == null ? '' : item.travel.transport.transportName) + '</center></td>' +
                    '<td><center>' + (item.travel.transport.transportBusiness == null ? '' : item.travel.transport.transportBusiness) + '</center></td>' +
                    '<td><center>' + (nameDatePros == null ? '' : nameDatePros) + '</center></td>' +
                    '<td><center>' + (checkDateDuplicate == null ? '' : checkDateDuplicate) + '</center></td>' +
                    '<td><center>' + (pricePromotion == null ? '' : parseFloat(pricePromotion).toFixed(2)) + '</center></td>' +
                    '<td><center>' + (balance == null ? '' : parseFloat(balance).toFixed(2)) + '</center></td>' +
                    '</tr>');
                //
                // faresPrototype[item.id]=item;
            });
            $('#tableFares').DataTable({
                "sDom": 'T<"clear">lfrtip',
                "oTableTools": {
                    "sSwfPath": "/Fares/scripts/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        {
                            "sExtends": "xls",
                            "sButtonText": "Export Excel.",
                            "sFileName": "*.xls"
                        },
                        {
                            'sExtends':'print',
                            'sButtonText':'Print',
                            "fnClick": function ( nButton, oConfig, oFlash ) {
                                printData();
                            }

                        }

                    ]
                },
                "bSortable": false ,
                "scrollY": "800px",
                "bLengthChange": false,
                "bSort": false,
                "language": {
                    "lengthMenu": "แสดง _MENU_ รายการ",
                    "zeroRecords": "ไม่พบข้อมูล",
                    "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                    "infoEmpty": "ไม่พบเรคคอร์ด",
                    "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
                    "decimal": "",
                    "emptyTable": "ไม่มีข้อมูลในตาราง",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "โหลด...",
                    "processing": "กำลังดำเนินการ...",
                    "search": "ค้นหา:",
                    "paginate": {
                        "first": "หน้าแรก",
                        "last": "หน้าสุดท้าย",
                        "next": "ถัดไป",
                        "previous": "ก่อนหน้า"
                    },
                    "aria": {
                        "sortAscending": ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                        "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
                    }
                }
            });
        }
    }
}

$('input').tooltip({
    position: { my: 'center bottom' , at: 'right right-100' },
    tooltipClass: "myclass",
    disabled: true,
    close: function( event, ui ) {
        $(this).tooltip('disable');
        /* instead of $(this) you could also use $(event.target) */
    }
});

$('#btnTextAllOK').on('click',function () {
    $("#tableFares").DataTable().destroy();
    var source ;
    var destination ;

    var sourceCode = $("#textAllFaresSource").val();
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                source = item.list.locationCode;
            }
        })
    }else{
        source = " ";
    }

    var destinationCode = $("#textAllFaresDestination").val();
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destination = item.list.locationCode;
            }
        })
    }else{
        destination = " ";
    }

    if($('#textAllFaresSource').val()!="" && $('#textAllFaresDestination').val()!=""  ){
        searchAll(source,destination);
    }else{

        if($('#textAllFaresSource').val()=="" && $('#textAllFaresDestination').val()==""  ){
            $('#textAllFaresSource').tooltip('enable').tooltip('open');
            $('#textAllFaresDestination').tooltip('enable').tooltip('open');
        }else if($('#textAllFaresSource').val()==""){
            $('#textAllFaresSource').tooltip('enable').tooltip('open');
        }else {
            $('#textAllFaresDestination').tooltip('enable').tooltip('open');
        }
    }
});
$('#btnFlightOk').on('click',function () {
    $("#tableFares").DataTable().destroy();
    var source ;
    var destination ;

    var sourceCode = $("#textFlightSource").val();
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                source = item.list.locationCode;
            }
        })
    }else{
        source = " ";
    }

    var destinationCode = $("#textFlightDestination").val();
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destination = item.list.locationCode;
            }
        })
    }else{
        destination = " ";
    }

    var trainCodes = "TT001";
    var busCodes = "TB001";

    if($('#textFlightSource').val()!="" && $('#textFlightDestination').val()!=""  ){
        searchFlightTransport(source,destination,trainCodes,busCodes);
    }else{

        if($('#textFlightSource').val()=="" && $('#textFlightDestination').val()==""  ){
            $('#textFlightSource').tooltip('enable').tooltip('open');
            $('#textFlightDestination').tooltip('enable').tooltip('open');
        }else if($('#textFlightSource').val()==""){
            $('#textFlightSource').tooltip('enable').tooltip('open');
        }else {
            $('#textFlightDestination').tooltip('enable').tooltip('open');
        }
    }
});
$('#btnTrainOk').on('click',function () {
    $("#tableFares").DataTable().destroy();
    var sourceT ;
    var destinationT ;

    var sourceCode = $("#textTrainSource").val();
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                sourceT = item.list.locationCode;
            }
        })
    }else{
        sourceT = " ";
    }

    var destinationCode = $("#textTrainDestination").val();
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destinationT = item.list.locationCode;
            }
        })
    }else{
        destinationT = " ";
    }

    var tranCode = "TT001";

    if($('#textTrainSource').val()!="" && $('#textTrainDestination').val()!=""  ){
        searchTransport(tranCode,sourceT,destinationT);
    }else{

        if($('#textTrainSource').val()=="" && $('#textTrainDestination').val()==""  ){
            $('#textTrainSource').tooltip('enable').tooltip('open');
            $('#textTrainDestination').tooltip('enable').tooltip('open');
        }else if($('#textTrainSource').val()==""){
            $('#textTrainSource').tooltip('enable').tooltip('open');
        }else {
            $('#textTrainDestination').tooltip('enable').tooltip('open');
        }
    }
});
$('#btnBusOk').on('click',function () {
    $("#tableFares").DataTable().destroy();
    var sourceB ;
    var destinationB ;

    var sourceCode = $("#textBusSource").val()
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                sourceB = item.list.locationCode;
            }
        })
    }else{
        sourceB = " ";
    }

    var destinationCode = $("#textBusDestination").val()
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destinationB = item.list.locationCode;
            }
        })
    }else{
        destinationB = " ";
    }

    var tranCode = "TB001";

    if($('#textBusSource').val()!="" && $('#textBusDestination').val()!=""  ){
        searchTransport(tranCode,sourceB,destinationB);
    }else{

        if($('#textBusSource').val()=="" && $('#textBusDestination').val()==""  ){
            $('#textBusSource').tooltip('enable').tooltip('open');
            $('#textBusDestination').tooltip('enable').tooltip('open');
        }else if($('#textBusSource').val()==""){
            $('#textBusSource').tooltip('enable').tooltip('open');
        }else {
            $('#textBusDestination').tooltip('enable').tooltip('open');
        }
    }
});


