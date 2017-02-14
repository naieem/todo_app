var Model = Model || (function() {
    'use strict';

    return {
        list: getInitialData
    }
    // model.list().then(function(t) {
    //     console.log(t);
    // }).catch(function() {
    //     console.log("error");
    // });
    return model;

    function getInitialData() {
        return new Promise(function(resolve, reject) {
            if (localStorage.getItem("list") !== null) {
                resolve(JSON.parse(localStorage.getItem("list")));
            } else {
                resolve(data.list);
            }
        });
    }
})();
