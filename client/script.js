$("#registrationForm").submit(function (e) {

  e.preventDefault();

  const data = {
    name: $("#name").val(),
    email: $("#email").val(),
    event: $("#event").val()
  };

  $.ajax({

    url: "http://localhost:5000/register",

    type: "POST",

    contentType: "application/json",

    data: JSON.stringify(data),

    success: function (response) {

      $("#message").text(response.message);

      $("#registrationForm")[0].reset();
    },

    error: function () {

      $("#message").text("Registration Failed");
    }

  });

});