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


function deletePage(id) {
    $.get(api_url + "/?" + api_key + "/Page/Delete/", {'id': id}, function(response) {
        alert(response.message);
    });
    return false;
}

function show(id){
    $("#show").click(function(){
        $("#show-edit").fadeToggle();
        $("#page-add").hide();
        $("#edit-id").val(id);
    });
}

$(function() {
    $.get(api_url + "/?" + api_key + "/Page/List/", function(r) {
        for (var i in r) {
            $("#page-list tbody").append('<tr><td>' + r[i].id + '</td><td>' + r[i].title + '</td>' +
                                         '<td class="text-center">' +
                                         '<a id="show" onclick="show(' + r[i].id + '); return false;" href=""><i class="fa fa-pencil"></i></a> | ' +
                                         '<a href="#" onclick="deletePage(' +  r[i].id  +'); return false;"><i class="fa fa-trash"></i></a></td></tr>');
        }
    });

    $("#page-add-form button").click(function(){
        $.ajax({
            type: "POST",
            url: api_url + "/?" + api_key + "/Page/Add",
            dataType: "json",
            data: {
                title: $("#add-title").val(),
                content: $("#add-editor").val()
            },
            success: function(response) {
                $("#messagePageAdd").html('<div class="alert alert-success" role="alert">' + response.message + '</div>');
            },
            error: function(xhr) {
                var response = JSON.parse(xhr.responseText);
                $("#messagePageAdd").html('<div class="alert alert-danger" role="alert">' + response.error + '</div>');
            }
        });
    });
    $.ajax({
        type: "GET",
        url: api_url + "/?" + api_key + "/Page/View/",
        dataType: "json",
        data: {
            id: 1
        },
        success: function(response) {
            $("#edit-title").val(response.title);
            $("#edit-editor").val(response.content);
        }
    });

    $("#page-edit button").click(function() {
        $.ajax({
            type: "POST",
            url: api_url + "/?" + api_key + "/Page/Edit" ,
            dataType: "json",
            data: {
                id: $("#edit-id").val(),
                title: $("#edit-title").val(),
                content: $("#edit-editor").val()
            },
            success: function(response) {
                $("#edit-title").val(response.title);
                $("#edit-editor").val(response.content);

            }
        });
    });
});
