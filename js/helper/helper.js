var Helper = Helper || (function() {
    'use strict';
    return {
        element: elem,
        prepend:prepend
    };
    function elem(val){
        return document.querySelector(val);
    }
    function prepend(elm,data){
        return this.element(elm).insertAdjacentHTML('beforebegin', data);
    }
})();
