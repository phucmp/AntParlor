// Contact JavaScript File

$("#submit").closest('form').on('submit', function(event) {
    event.preventDefault();
   	//$('#hiddenInput').val(someVariable); //perform some operations
    //this.submit(); //now submit the form
    alert("Your message has been sent! Thank you for your support.");
    $("#name").val('');
    $("#email").val('');
    $("#message").val('');
});