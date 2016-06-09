$(document).ready(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    // Watch for a forms submission:
    $("#form-submit-btn").click(function(event) {
        // Prevent default submit action from occuring as we want to overide default action
        event.preventDefault();
        // Stops the user clicking submit again and potentially processing multiple payments
        $('input[type=submit]').prop('disabled', true);
        var error = false;
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        if (!error) {
            // Get the Stripe token:
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        return false;
    }); // form submission
    
    function stripeResponseHandler(status, response) {
        // Get a reference to the form:
        var f = $("#new_user");
        
        // Get the token from the response:
        var token = response.id;
        
        // Add the token to the form:
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        //Submit the form:
        f.get(0).submit();
    }
});