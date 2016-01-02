function riderAtStop() {
    $.post( "api/riderAtStop", function(data) {
        console.log(data);
    });
}