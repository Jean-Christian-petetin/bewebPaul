/**
 * API BeWeb
 * Client
 *
 * @package     BeWebApi
 * @author      Corin ALEXANDRU <corin.alex@gmail.com>
 * @author      Daniel GIBARU <daniel.gibaru.34@gmail.com>
 * @copyright   2017 - FondespierreRH
 * @license     All rights reserved
 *
 */

$().ready(function() {
    /*
     * Affichage de la dernière actualité
     */
    $.get(api_url + "/?" + api_key + "/Actualites/View/", {id: 1},  function(response) {
        var article = "<article><h2>"+ response.titre + "</h2>" +
                    '<img src="' + response.image + '">' +
                    "<p>" + response.article + "</p>" +
                    "<p>" + response.auteur + "</p>" +
                    "<p>" + response.date + "</p>" +
                    "<a href='" + response.etiquettes + "'>" + response.etiquettes + "</a></article>";
        $("#last_news").html(article);
    });

    /*
     * Formulaire contact
     */
    $("#contact").submit(function(e) {
        e.preventDefault();
        $.post(api_url + "/?" + api_key + "/Contact/Send/", $(this).serialize(), function(response) {
            $("#alert-msg").html(response.message);
            $("#alert-box").fadeIn();
        });
    });
});