/**
 * Created by tanaphatdev on 1/5/2559.
 */
$(document).ready(function () {
    findAllFares();
    sourceAutoComplate();
    clearAll();
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

function clearAll() {

    $("#textAllFaresSource").val("");

    $("#textAllFaresDestination").val("");

    $("#textFlightSource").val("");

    $("#textFlightDestination").val("");

    $("#textTrainSource").val("");

    $("#textTrainDestination").val("");

    $("#textBusSource").val("");

    $("#textBusDestination").val("");
    
}

var dataCheck =[];
var listdata =[];
var discription = []
function sourceAutoComplate() {
    var checkStatus = "online" ;
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllSource',
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==500){
                    checkStatus = "offline" ;

                }else{
                    checkStatus = "online" ;
                }
            }else{
                // checkStatus = 0 ;
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
    if(checkStatus=="online"){
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

function findAllFares(){
    $("#tableFares").DataTable().destroy();
    var checkStatus = "online";

    var faresData = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllFares',
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==500){
                    checkStatus = "offline" ;
                    alert("Server Offline.");

                }else{
                    checkStatus = "online" ;
                }
            }else{
                // checkStatus = 0 ;
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;

    $('#tbodyFares').empty();
    if(checkStatus == "online"){
        $.each(JSON.parse(faresData),function(index,item){

            var date = new Date(item.promote.dateFares.dateFared).toISOString().split("T")[0];
            var dates = date.split("-");
            var dateOrigin = dates[2];
            var monthOrigin = dates[1];
            var yeaOrigin = dates[0];
            var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

            if(checkDateDuplicate == "10/10/2010"){
                checkDateDuplicate = "----------"
            }
            var priceFares = item.price ;
            var pricePromotion = item.promote.promotePrice;
            var balance= parseInt(priceFares - pricePromotion);


            $('#tbodyFares').append('<tr>' +
                '<td><center>'+(item.travel.locationSourName==null?'':item.travel.locationSourName)+'</center></td>' +
                '<td><center>'+(item.travel.locationDisName==null?'':item.travel.locationDisName)+'</center></td>' +
                '<td><center>'+(item.price==null?'':parseFloat(item.price).toFixed(2))+'</center></td>' +
                '<td><center>'+(item.travel.transport.transportName==null?'':item.travel.transport.transportName)+'</center></td>' +
                '<td><center>'+(item.travel.transport.transportBusiness==null?'':item.travel.transport.transportBusiness)+'</center></td>' +
                '<td><center>'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</center></td>' +
                '<td><center>'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</center></td>' +
                '<td><center>'+(item.promote.promotePrice==null?'':parseFloat(item.promote.promotePrice).toFixed(2))+'</center></td>' +
                '<td><center>'+(balance==null?'':parseFloat(balance).toFixed(2))+'</center></td>' +
                '</tr>');
            //
            // faresPrototype[item.id]=item;
        });
        $('#tableFares').DataTable({
            "sDom": 'T<"clear">lfrtip',
            "oTableTools": {
                "sSwfPath": "/Fares/scripts/TableTools/swf/copy_csv_xls_pdf.swf",
                // "sSwfPath": "https://cdn.datatables.net/tabletools/2.2.2/swf/copy_csv_xls_pdf.swf",
                // "aButtons": [ 'copy', 'csv','pdf', 'print']
                // "aButtons": [ 'copy', 'csv', 'print']

                "aButtons": [
                    'copy', 'csv','pdf', 'print' ,
                    {
                        "sExtends": "xls",
                        "sButtonText": "xls.",
                        "sFileName": "*.xls"
                    },

                ]
            },
            "scrollY":"200px",
            "bLengthChange" : false,
            "bSort": false,
            "language": {
                "lengthMenu": "แสดง _MENU_ รายการ",
                "zeroRecords": "ไม่พบข้อมูล",
                "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                "infoEmpty": "ไม่พบเรคคอร์ด",
                "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
                "decimal":        "",
                "emptyTable":     "ไม่มีข้อมูลในตาราง",
                "infoPostFix":    "",
                "thousands":      ",",
                "loadingRecords": "โหลด...",
                "processing":     "กำลังดำเนินการ...",
                "search":         "ค้นหา:",
                "paginate": {
                    "first":      "หน้าแรก",
                    "last":       "หน้าสุดท้าย",
                    "next":       "ถัดไป",
                    "previous":   "ก่อนหน้า"
                },
                "aria": {
                    "sortAscending":  ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                    "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
                }
            }
        });

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
                    async: false
                    }).done(function (){
                        //close loader
                        $('.dv-background').hide();
                    }).responseText;
    
    $('#tbodyFares').empty();
    $.each(JSON.parse(faresData),function(index,item){

        var date = new Date(item.promote.dateFares.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }
        var priceFares = item.price ;
        var pricePromotion = item.promote.promotePrice;
        var balance= parseInt(priceFares - pricePromotion);


        $('#tbodyFares').append('<tr>' +
            '<td><center>'+(item.travel.locationSourName==null?'':item.travel.locationSourName)+'</center></td>' +
            '<td><center>'+(item.travel.locationDisName==null?'':item.travel.locationDisName)+'</center></td>' +
            '<td><center>'+(item.price==null?'':parseFloat(item.price).toFixed(2))+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportName==null?'':item.travel.transport.transportName)+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportBusiness==null?'':item.travel.transport.transportBusiness)+'</center></td>' +
            '<td><center>'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</center></td>' +
            '<td><center>'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</center></td>' +
            '<td><center>'+(item.promote.promotePrice==null?'':parseFloat(item.promote.promotePrice).toFixed(2))+'</center></td>' +
            '<td><center>'+(balance==null?'':parseFloat(balance).toFixed(2))+'</center></td>' +
            '</tr>');
        //
        // faresPrototype[item.id]=item;
    });
    $('#tableFares').DataTable({
        "bLengthChange" : false,
        "bSort": false,
        "language": {
            "lengthMenu": "แสดง _MENU_ รายการ",
            "zeroRecords": "ไม่พบข้อมูล",
            "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "infoEmpty": "ไม่พบเรคคอร์ด",
            "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
            "decimal":        "",
            "emptyTable":     "ไม่มีข้อมูลในตาราง",
            "infoPostFix":    "",
            "thousands":      ",",
            "loadingRecords": "โหลด...",
            "processing":     "กำลังดำเนินการ...",
            "search":         "ค้นหา:",
            "paginate": {
                "first":      "หน้าแรก",
                "last":       "หน้าสุดท้าย",
                "next":       "ถัดไป",
                "previous":   "ก่อนหน้า"
            },
            "aria": {
                "sortAscending":  ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
            }
        }
    });
}
// search Trian and Bus
function searchTransport(tranCode,source,destination) {
    var source = source ;
    var destination =  destination;
    var tranCodes = tranCode;
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
                            async: false
                        }).done(function (){
                            //close loader
                            $('.dv-background').hide();
                        }).responseText;
    $('#tbodyFares').empty();
    $.each(JSON.parse(faresData),function(index,item){

        var date = new Date(item.promote.dateFares.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }
        var priceFares = item.price ;
        var pricePromotion = item.promote.promotePrice;
        var balance= parseInt(priceFares - pricePromotion);


        $('#tbodyFares').append('<tr>' +
            '<td><center>'+(item.travel.locationSourName==null?'':item.travel.locationSourName)+'</center></td>' +
            '<td><center>'+(item.travel.locationDisName==null?'':item.travel.locationDisName)+'</center></td>' +
            '<td><center>'+(item.price==null?'':parseFloat(item.price).toFixed(2))+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportName==null?'':item.travel.transport.transportName)+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportBusiness==null?'':item.travel.transport.transportBusiness)+'</center></td>' +
            '<td><center>'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</center></td>' +
            '<td><center>'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</center></td>' +
            '<td><center>'+(item.promote.promotePrice==null?'':parseFloat(item.promote.promotePrice).toFixed(2))+'</center></td>' +
            '<td><center>'+(balance==null?'':parseFloat(balance).toFixed(2))+'</center></td>' +
            '</tr>');
        //
        // faresPrototype[item.id]=item;
    });
    $('#tableFares').DataTable({
        "bLengthChange" : false,
        "bSort": false,
        "language": {
            "lengthMenu": "แสดง _MENU_ รายการ",
            "zeroRecords": "ไม่พบข้อมูล",
            "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "infoEmpty": "ไม่พบเรคคอร์ด",
            "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
            "decimal":        "",
            "emptyTable":     "ไม่มีข้อมูลในตาราง",
            "infoPostFix":    "",
            "thousands":      ",",
            "loadingRecords": "โหลด...",
            "processing":     "กำลังดำเนินการ...",
            "search":         "ค้นหา:",
            "paginate": {
                "first":      "หน้าแรก",
                "last":       "หน้าสุดท้าย",
                "next":       "ถัดไป",
                "previous":   "ก่อนหน้า"
            },
            "aria": {
                "sortAscending":  ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
            }
        }
    });

}

// searchFlight
function searchFlightTransport(source,destination,trainCode,busCode) {
    var source = source ;
    var destination =  destination;
    var trainCodes = trainCode;
    var busCodes = busCode;
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
                            $('.dv-background').hide();
                        }).responseText;
    $('#tbodyFares').empty();
    $.each(JSON.parse(faresData),function(index,item){

        var date = new Date(item.promote.dateFares.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }
        var priceFares = item.price ;
        var pricePromotion = item.promote.promotePrice;
        var balance= parseInt(priceFares - pricePromotion);


        $('#tbodyFares').append('<tr>' +
            '<td><center>'+(item.travel.locationSourName==null?'':item.travel.locationSourName)+'</center></td>' +
            '<td><center>'+(item.travel.locationDisName==null?'':item.travel.locationDisName)+'</center></td>' +
            '<td><center>'+(item.price==null?'':parseFloat(item.price).toFixed(2))+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportName==null?'':item.travel.transport.transportName)+'</center></td>' +
            '<td><center>'+(item.travel.transport.transportBusiness==null?'':item.travel.transport.transportBusiness)+'</center></td>' +
            '<td><center>'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</center></td>' +
            '<td><center>'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</center></td>' +
            '<td><center>'+(item.promote.promotePrice==null?'':parseFloat(item.promote.promotePrice).toFixed(2))+'</center></td>' +
            '<td><center>'+(balance==null?'':parseFloat(balance).toFixed(2))+'</center></td>' +
            '</tr>');
        //
        // faresPrototype[item.id]=item;
    });
    $('#tableFares').DataTable({
        "bLengthChange" : false,
        "bSort": false,
        "language": {
            "lengthMenu": "แสดง _MENU_ รายการ",
            "zeroRecords": "ไม่พบข้อมูล",
            "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "infoEmpty": "ไม่พบเรคคอร์ด",
            "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
            "decimal":        "",
            "emptyTable":     "ไม่มีข้อมูลในตาราง",
            "infoPostFix":    "",
            "thousands":      ",",
            "loadingRecords": "โหลด...",
            "processing":     "กำลังดำเนินการ...",
            "search":         "ค้นหา:",
            "paginate": {
                "first":      "หน้าแรก",
                "last":       "หน้าสุดท้าย",
                "next":       "ถัดไป",
                "previous":   "ก่อนหน้า"
            },
            "aria": {
                "sortAscending":  ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
            }
        }
    });
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

    var trainCodes = "T001";
    var busCodes = "T002";

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
    var source ;
    var destination ;

    var sourceCode = $("#textTrainSource").val();
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                source = item.list.locationCode;
            }
        })
    }else{
        source = " ";
    }

    var destinationCode = $("#textTrainDestination").val();
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destination = item.list.locationCode;
            }
        })
    }else{
        destination = " ";
    }

    var code = "T001";

    if($('#textTrainSource').val()!="" && $('#textTrainDestination').val()!=""  ){
        searchTransport(code,source,destination);
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
    var source ;
    var destination ;

    var sourceCode = $("#textBusSource").val()
    if(sourceCode != "") {
        $.each(dataCheck, function (index, item) {
            if (sourceCode == item.list.description) {
                source = item.list.locationCode;
            }
        })
    }else{
        source = " ";
    }

    var destinationCode = $("#textBusDestination").val()
    if(destinationCode != "") {
        $.each(dataCheck, function (index, item) {
            if (destinationCode == item.list.description) {
                destination = item.list.locationCode;
            }
        })
    }else{
        destination = " ";
    }

    var code = "T002";

    if($('#textBusSource').val()!="" && $('#textBusDestination').val()!=""  ){
        searchTransport(code,source,destination);
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


