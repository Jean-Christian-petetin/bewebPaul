/**
 * Site BeWeb
 *
 * @package     Beweb
 * @author      Corin ALEXANDRU <corin.alex@gmail.com>
 * @author      Daniel GIBARU <daniel.gibaru.34@gmail.com>
 * @copyright   2017 - FondespierreRH
 * @license     All rights reserved
 *
 */
var api_url = "http://api.beweb.local";

$().ready(function() {
    var api_key = $("#api_key").val();
    $.ajax({
        type: "GET",
        url: api_url + "/?" + api_key + "/Actualites/List/",
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $("#news-list").append('<tr><td>' + response[i].id + '</td>' +
                    '<td>' + response[i].titre + '</td>' +
                    '<td>' + response[i].auteur + '</td>' +
                    '<td>' + response[i].date + '</td>' +
                    '<td class="text-center"><a href="#" id="show" onclick="show("' + response[i].id + '");value="' +
                    response[i].id + '" return false; ><i class="fa fa-pencil"></i></a> | ' +
                    '<a href="#" onclick="deleteActu('+response[i].id+')"value="' +
                    response[i].id +'" return false;><i class="fa fa-trash"></i></a></td></tr>');
            }
        },
        error: function(xhr) {
            //var response =  JSON.parse(xhr.responseText);
            alert(xhr.responseText);
        }
    });
    $("#news-add-forms button").click(function() {
        $.ajax({
            type: "POST",
            url: api_url + "/?" + api_key + "/Actualites/Add/",
            dataType: "json",
            data: {
                titre: $("#add-title").val(),
                article: $("#add-editor").val(),
                auteur: $("#add-auteur").val(),
                etiquettes: $("#add-etiquettes").val()
            },
            success: function(response) {
                // alert("gg");
                $("#messagePageAdd").html('<div class="alert alert-success" role="alert">' + response.message + '</div>');
            },
            error: function(xhr) {
                var response = JSON.parse(xhr.responseText);
                $("#messagePageAdd").html('<div class="alert alert-danger" role="alert">' + response.error + '</div>');
            }
        });
    });
});

function deleteActu(id) {
    $.ajax({
        type: "POST",
        url: api_url + "/?" + api_key + "/Actualites/Delete",
        dataType: "json",
        data: {
            id: id,
        },
        success: function(response) {
            $("#messageDelete").html('<div class="alert alert-success" role="alert">' + response.message + '</div>');

            $.ajax({
                type: "GET",
                url: api_url + "/?" + api_key + "/Actualites/List/",
                dataType: "json",
                success: function(response) {
                    for (var i = 0; i < response.length; i++) {
                        $("#news-list").html("");
                        $("#news-list").append('<tr><td>' + response[i].id + '</td>' +
                            '<td>' + response[i].titre + '</td>' +
                            '<td>' + response[i].auteur + '</td>' +
                            '<td>' + response[i].date + '</td>' +
                            '<td class="text-center"><a href="#" id="show" onclick="show(' + response[i].id + ');value="' +
                            response[i].id + '" return false; ><i class="fa fa-pencil"></i></a> | ' +
                            '<a href="#" onclick="deleteActu('+response[i].id+')"><i class="fa fa-trash"></i></a></td></tr>');
                    }
                },
            });
        },

    });
}
