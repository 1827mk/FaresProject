/**
 * Created by Darksilver on 4/22/2016.
 */


findequipment()
function findequipment(){
    var data = $.ajax({
        type: "GET", headers: { Accept: 'application/json' },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/service/findAllEquipmenttype',
        async: false
    }).responseJSON;

    for(var i =0;i<data.length;i++) {
        console.log(data[i].id)

        $("#viewequipment").append('' +
            '<div class="col-sm-3" >' +
            '<div class="thumbnail" >' +
                '<a href="/ComputerSkill/service/service3" class="portfolio-box">'+
            '<img id="roomImages" src="/ComputerSkill/resources/images/Equipmenttype/'+data[i].equipmenttypename+'.jpg" class="img-rounded"  style="min-height:220px;height:220px;" />'+
            '<div class="caption">' +
            '<h3>'+data[i].equipmenttypename+'</h3>' +
            '<div align="right">' +
            //'<button id="roombtnAdd" type="button" class="btn btn-primary"  ></button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        )
    }
}
