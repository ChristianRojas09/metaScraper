(function(_win, $){

    'use strict';


    var utils = {};

    //init the applcation
    utils.init = function(){
        
        $(document).ready(function () {
            utils.start();
        });
    };

    //start application
    utils.start = function(){
        utils.bindScrapeButton();
    };

    utils.setupHandlers = function () {
        utils.bindScrapeButton();
    };

    //onclick button instructions
    utils.bindScrapeButton = function () {
        $('#submit').on('click', function () {

            //if the text box is empty throw error
            if (!$('#urlText').val() || $('#urlText').val() === ''){
                $('#submit').text('Please enter a URL!');
                $('#submit').addClass('error');

                //re-set the button
                setTimeout(function () {
                    $('#submit').text('Scrape Page');
                    $('#submit').removeClass('error');
                }, 2000);

                return;
            }

            $('#return-container').html('');
            $('#ajax-loader-container').show();

            $.ajax({
                url:  '/scrape',
                type: 'POST',
                data: {url:  $('#urlText').val() },
                success (jsonData) {
                    $('#ajax-loader-container').hide();

                    console.warn('HERE SUCCESS: ');
                    console.dir(jsonData);

                    $('#return-container').JSONView(jsonData);
                },
                error (err) {
                    console.error('HERE error: ' + err);
                }
            });

        });
    };

    //initialize the applcation
    utils.init();
})(window, window.jQuery);