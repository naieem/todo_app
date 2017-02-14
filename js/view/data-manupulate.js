var View = View || (function() {
    'use strict';

    return {
        render: render
    }

    function render(data,view){
        var text="";
        for (var i = 0; i < data.length; i++) {
            text += '<li>' +
                    '<div class="text-content">' +
                    '<p ' + data[i].titleCls + '>' + data[i].title + '</p>' +
                    '<p class="description">' + data[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + data[i].status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                    '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                    '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                    '</div>' +
                    '</li>';
        }
        view.innerHTML = text;
    }


})();
