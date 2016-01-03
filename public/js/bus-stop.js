$(document).ready(function() {
   $('#requestBus').click(function(){
       console.log('hey');
       requestBusMenu();
   });
});
var currentStop = '1666';

function requestBus(stopId) {
    showLoading();

    $.post( 'api/riderAtStop/' + stopId, function(data) {
        if (data.success) {
            // Added a little delay to show the sweet bus animated gif
            setTimeout(function() {
                $('#bus-requested').show();
                $('#bus-loading').hide();
            }, 500);

            setTimeout(gotoHome, 5000);
        } else {
            gotoHome();
        }
    });
}

function requestBusMenu() {
    showLoading();

    $.get('api/busRoutes', function(busStops) {
        var passedCurrentStop = false;
        $('#stops').append( '<h3>Where would you like to go?</h3>' +
                            '<p>These are the stops available on this bus line.</p>');
        busStops.forEach(function(stop){
            console.log(stop.stopId);
            if (stop.stopId === currentStop) {
                passedCurrentStop = true;
            } else if (passedCurrentStop){
                $('#stops').append( '<button type="button" ' +
                                    'class="btn btn-primary btn-lg stop-btn" ' +
                                    'onclick="requestBus(' + stop.stopId + ')">' +
                                    stop.stopName + '</button>');
                if (stop.stopId !== busStops[busStops.length-1].stopId) {
                    $('#stops').append('<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>');
                }

                // Added a little delay to show the sweet bus animated gif
                setTimeout(function() {
                    $('#bus-loading').hide();
                    $('#stops').show();
                }, 500);
            }
        });
    });
}

function showLoading() {
    $('.sub-page').hide();
    $('#bus-loading').show();
}

function gotoHome() {
    $('.sub-page').hide();
    $('#home').show();
}