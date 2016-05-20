/**
 * Created by tanaphatdev on 1/5/2559.
 */
$(document).ready(function () {
// alert('I love ....');
//     findAllFares();
});

function findAllFares(){
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllFares',
        async: false
    }).responseJSON;
}

function findFares(){
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllFares',
        async: false
    }).responseJSON;
}

