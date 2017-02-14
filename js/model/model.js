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
    // console.log(obj.list());
    function getInitialData() {
            if (localStorage.getItem("list") !== null) {
                return JSON.parse(localStorage.getItem("list"));
            } else {
                return data.list;
            }
    }
})();
