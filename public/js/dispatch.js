 function isEq( x, y ) {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! isEq( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}

   var lastData;
    $(document).ready(function() {
        $('#awesomebutton').on('click', function() {
        getStopData();
        });
        setInterval(function(){ getStopData(); }, 3000);
        getStopData();
    });

    function getStopData () {

     jQuery.ajax({
         type: "GET",
         url: "http://159.203.212.140:3000/v1/ericsson/route",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {

             console.log('my data is: ');
             console.log(data);
             if (isEq(data, lastData)) {
                console.log('data wuz same: ');
             }
             else {
                drawTable(data, lastData == null);
                if (lastData != null) {
                  console.log('data wuz NU: ');
                 // alert('SOMETHING CHANGED');
                }

                lastData = data;

             }

         },

         error: function (jqXHR, status) {
             //alert('couldnt got data');
             console.log('couldnt get data');
         }
      })
     };

     function drawTable(data, initial) {
        for (var i = 0; i < data.length; i++) {
            drawRow(data[i], initial);
        }
     }

    function drawRow(rowData,initial) {
//        var idx = ['4020','1646','1666'].indexOf(rowData.stopId);
//        if (idx < 0) {
//          return;
//        }

        var idx = 0;
        if (initial) {
//        if ($('#stopgrid tr').length < 4) {

            var row = $('<tr id="stopid-'+rowData.stopId+'"/>');
            $("#stopgrid").append(row);

            row.append($('<td class="text-left">' + rowData.stopName + '</td>'));
            row.append($('<td class="text-left">' + rowData.stopId + '</td>'));
            row.append($('<td class="text-center load">' + rowData.load + '</td>'));
        }
        else {
//          var oldVal = $('#stopgrid tr').eq(idx+1).find('td').eq(2).html();
          //var oldVal = $('#stopgrid tr:eq(' + idx+1 + ') td:eq(' + 2 + ')').html();
          var oldVal = $('#stopid-'+rowData.stopId+' .load').html();
          console.log("oldval: ");
          console.log(oldVal);
          if (rowData.load != oldVal && !initial) {
            console.log("Is not new but data is new!! "+ rowData.stopId);
            //$('#stopgrid tr').eq(idx+1).find('td').eq(2).html('<b>'+rowData.load+'</b>');
            $('#stopid-'+rowData.stopId+' .load').addClass('success');
            $('#stopid-'+rowData.stopId+' .load').html(rowData.load);
            setTimeout(function() {$('#stopid-'+rowData.stopId+' .load').removeClass('success');}, 10000);
          } else {
            console.log("Is new and data is new so removing!! "+ rowData.stopId);

            $('#stopid-'+rowData.stopId+' .load').removeClass('success');
            $('#stopid-'+rowData.stopId+' .load').html(rowData.load);
            //$('#stopgrid tr').eq(idx+1).find('td').eq(2).html(rowData.load);
          }
          console.log("the len wuz "+$('#stopgrid tr').length + " and idx "+idx);
        }
    }