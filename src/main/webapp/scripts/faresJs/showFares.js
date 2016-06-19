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
    if (screen.width < 1200) {
        $("#check768").removeClass("col-sm-3");
        $("#check768").addClass("col-sm-6");
        // $('#wellCustom').removeClass('well');
        $('#wellCustom').addClass('changeWell');

    }
    else {

        $("#check768").removeClass("col-sm-6");
        $("#check768").addClass("col-sm-3");
        $('#wellCustom').removeClass('changeWell');
        // $('#wellCustom').addClass('well');
    }

    if (screen.width > 980) {
        $('#wellCustom').addClass('wellWidth8000');
        $('#wellCustom').removeClass('wellWidth720');
    }
    else {
        $('#wellCustom').addClass('wellWidth720');
        $('#wellCustom').removeClass('wellWidth8000');

    }

    if (screen.width < 767) {
        $('#wellCustom').removeClass('wellWidth8000');
        $('#wellCustom').removeClass('wellWidth720');
        $('.btn-primary').addClass('btn270');
        $('.btn-primary').removeClass('btn160');
    }
    else {
        $('.btn-primary').addClass('btn160');
        $('.btn-primary').removeClass('btn270');
        // $('#wellCustom').addClass('wellWidth720');
        // $('#wellCustom').addClass('wellWidth8000');

    }

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
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllSource',
        async: false
    }).done(function (){
    }).responseText;

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
    console.log(dataCheck);
}


function findAllFares(){
//     var data = $.ajax({
//         type: "GET", headers: { Accept: 'application/json' },
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         url: session['context']+'/service/findAllFares',
//         async: false
//     }).responseJSON;
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
            '<td><center>'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</center></td>' +
            '<td><center>'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</center></td>' +
            '<td><center>'+(item.promote.promotePrice==null?'':parseFloat(item.promote.promotePrice).toFixed(2))+'</center></td>' +
            '<td><center>'+(balance==null?'':parseFloat(balance).toFixed(2))+'</center></td>' +
            '</tr>');
        //
        // faresPrototype[item.id]=item;
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


