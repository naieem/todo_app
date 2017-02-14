var hagu = (function() {
    'use strict';

    var obj = {
        hi: hello
    }
    return obj;
    // var t="dfsd";
    // console.log(t);
    // setTimeout(function() {
    //     console.log(t);
    // }, 1000)

    function hello() {
        if (window.Promise) {
        	// console.log(window);
            console.log('Promise found');
            return new Promise(function(resolve, reject) {
                resolve("resolve");
                // var request = new XMLHttpRequest();
                // console.log(window);
                // request.open('GET', 'http://api.icndb.com/jokes/random');
                // request.onload = function() {
                //     if (request.status == 200) {
                //         // window.data = request.response;
                //         resolve(request.response); // we got data here, so resolve the Promise
                //     } else {
                //         reject(Error(request.statusText)); // status is not 200 OK, so reject
                //     }
                // };

                // request.onerror = function() {
                //     reject(Error('Error fetching data.')); // error occurred, reject the  Promise
                // };

                // request.send(); //send the request
            });

            console.log('Asynchronous request made.');

        } else {
            console.log('Promise not available');
        }
    }

})();

var h = (function() {
	'use strict';
    
    var t = "";
    console.log(this); 
    hagu.hi().then(function(data) {
        console.log('Got data! Promise fulfilled.');
        // t=JSON.parse(data).value.joke;
        t = data;
        document.getElementsByTagName('body')[0].textContent = t;
    }, function(error) {
        console.log('Promise rejected.');
        console.log(error.message);
    });
    setTimeout(function() {
        console.log(t);
    }, 1000);

})();
