var Contact = function () {

    return {
        
        //Map
        initMap: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
				lat: 25.074968,
				lng:  55.239923
			  });
			   var marker = map.addMarker({
		            lat:  25.074968,
					lng:   55.239923,
		            title: 'MENAMark-ME HQ.'
				});
				

			});
        }

    };
}();