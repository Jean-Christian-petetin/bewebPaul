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

$(function() {
    $('#generatePassword').click(function(e){
        e.preventDefault();

        $.get(api_url + "/?" + api_key + "/Tools/GeneratePassword/", function(r) {
            $("#password").val(r.message).attr("type", "text");
        });
    });

    $('#user_add form').submit(function(e) {
        e.preventDefault();

        $.post(api_url + "/?" + api_key + "/User/Register",  $(this).serialize(), function(r) {
            alert(r.message);
        });
    });
});