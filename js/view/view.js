var View = View || (function() {
    'use strict';
    return {
        render: render,
        AddModal: AddModal,
        HideModal: HideModal,
        loadFile: loadFile
    }

    function render(data, view) {
        var text = "";
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

    function AddModal(modal) {
        modal.style.display = "block";
    }

    function HideModal(type) {
        if (type == 'add') {
            var modal = document.getElementById(Config.add_modal_id);
        }
        if (type == 'edit') {
            var modal = document.getElementById(Config.edit_modal_id);
        }
        modal.style.display = "none";
    }

    function loadFile(name) {
        if (window.Promise) {
            console.log('Promise found');
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', 'template/' + name + '.html');
                request.onload = function() {
                    if (request.status == 200) {
                        resolve(request.response); // we got data here, so resolve the Promise
                    } else {
                        reject(Error(request.statusText)); // status is not 200 OK, so reject
                    }
                };

                request.onerror = function() {
                    reject(Error('Error fetching data.')); // error occurred, reject the  Promise
                };
                request.send(); //send the request
            });

            console.log('Asynchronous request made.');
        } else {
            console.log('Promise not available');
        }
    }

})(Config);
