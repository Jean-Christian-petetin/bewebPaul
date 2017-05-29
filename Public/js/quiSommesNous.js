var api_url = "http://api.beweb.local";
var api_key = "4DECDA07CEE9";


var sections = [
    {
        titre: 'qui sommes nous ?',
        contenu: 'je suis aussi con que moi'
    },
    {
        titre: 'qui sommes nous ? 2 ',
        contenu: 'je suis aussi con que moi et toi'
    }
]


$().ready(function () {

    // View message
    $.ajax({
        type: "GET",
        url: api_url + "/?" + api_key + "/Page/Infos/",
        dataType: "json",
        success: function (response) {

        },
        error: function (response) {
            affichageSections(sections);
        }
    });
});


function affichageSections(liste) {
    for (var i = 0; i < liste.length; i++) {
        $("#quiSommesNous").append("<div class='row'><h3>"
                + liste[i].titre + "</h3><div><p>" + liste[i].contenu + "</p></div></div>");
    }
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


