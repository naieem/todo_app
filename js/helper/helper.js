var Helper = Helper || (function() {
    'use strict';
    return {
        element: elem,
        prepend: prepend,
        append:append,
        promise: promise
    };

    function elem(val) {
        return document.querySelector(val);
    }

    function prepend(elm, data) {
        return this.element(elm).insertAdjacentHTML('beforebegin', data);
    }
    function append(elem,data){
        return this.element(elem).insertAdjacentHTML('afterend', data);
    }

    function promise(type, val) {
        if (type == true) {
            return new Promise(function(resolve, reject) {
                resolve(val);
            });
        } else {
            return new Promise(function(resolve, reject) {
                reject("failed");
            });
        }
    }
})();
