var Model = Model || (function() {
    'use strict';

    return {
        list: getInitialData,
        showData: showData
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

    function showData(data, type) {
        if (data != null || data.length > 0) {
            if (type == 'done') {
                return showDone(data);
            } else if (type == 'undone') {
                return showUndone(data);
            } else {
                return showAll(data);
            }

        } else {
            // text += "No results Found";
        }
        // return temp;
    }

    function showAll(data) {
        var status = '';
        var titleCls = '';
        var temp = [];
        if (data.filterVal != '') {
            for (var i = 0; i < data.length; i++) {
                if (data[i].done) {
                    status = "checked='checked'";
                    titleCls = "class='title done'";
                } else {
                    status = "";
                    titleCls = "class='title'";
                }
                var title = data[i].title;
                var description = data[i].description;
                var pattern = new RegExp(data.filterVal, "gi");
                var title_match = title.match(pattern);
                var description_match = description.match(pattern);
                if (title_match != null || description_match != null) {
                    data[i].titleCls = titleCls;
                    data[i].status = status;
                    temp.push(data[i]);
                    // text += '<li>' +
                    //     '<div class="text-content">' +
                    //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                    //     '<p class="description">' + data[i].description + '</p>' +
                    //     '</div>' +
                    //     '<div class="actions">' +
                    //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                    //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                    //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                    //     '</div>' +
                    //     '</li>';
                } else {
                    //text += '';
                }
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                if (data[i].done) {
                    status = "checked='checked'";
                    titleCls = "class='title done'";
                } else {
                    status = "";
                    titleCls = "class='title'";
                }
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
                // text += '<li>' +
                //     '<div class="text-content">' +
                //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                //     '<p class="description">' + data[i].description + '</p>' +
                //     '</div>' +
                //     '<div class="actions">' +
                //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                //     '</div>' +
                //     '</li>';
            }
        }
        return temp;
    }

    function showUndone(data) {
        var status = '';
        var titleCls = '';
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].done) {
                status = "checked='checked'";
                titleCls = "class='title done'";
            } else {
                status = "";
                titleCls = "class='title'";
            }
            var title = data[i].title;
            var description = data[i].description;
            var pattern = new RegExp(data.filterVal, "gi");
            var title_match = title.match(pattern);
            var description_match = description.match(pattern);
            if (data.filterVal != '' && (title_match != null || description_match != null) && !data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
                // text += '<li>' +
                //     '<div class="text-content">' +
                //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                //     '<p class="description">' + data[i].description + '</p>' +
                //     '</div>' +
                //     '<div class="actions">' +
                //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                //     '</div>' +
                //     '</li>';
            } else if (data.filterVal == '' && !data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
                // text += '<li>' +
                //     '<div class="text-content">' +
                //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                //     '<p class="description">' + data[i].description + '</p>' +
                //     '</div>' +
                //     '<div class="actions">' +
                //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                //     '</div>' +
                //     '</li>';
            } else {
                // text += "";
            }
        }
        return temp;
    }

    function showDone(data) {
        var status = '';
        var titleCls = '';
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].done) {
                status = "checked='checked'";
                titleCls = "class='title done'";
            } else {
                status = "";
                titleCls = "class='title'";
            }
            var title = data[i].title;
            var description = data[i].description;
            var pattern = new RegExp(data.filterVal, "gi");
            var title_match = title.match(pattern);
            var description_match = description.match(pattern);
            if (data.filterVal != '' && (title_match != null || description_match != null) && data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
                // text += '<li>' +
                //     '<div class="text-content">' +
                //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                //     '<p class="description">' + data[i].description + '</p>' +
                //     '</div>' +
                //     '<div class="actions">' +
                //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                //     '</div>' +
                //     '</li>';
            } else if (data.filterVal == '' && data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
                // text += '<li>' +
                //     '<div class="text-content">' +
                //     '<p ' + titleCls + '>' + data[i].title + '</p>' +
                //     '<p class="description">' + data[i].description + '</p>' +
                //     '</div>' +
                //     '<div class="actions">' +
                //     '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + data[i].id + ');"><label><span></span></label>' +
                //     '<a href="#" class="delete buttons" onclick="APP.delete(' + data[i].id + ');return false;" title="Delete"></a>' +
                //     '<a href="#" class="edit buttons" onclick="APP.editModal(' + data[i].id + ');return false;" title="Edit"></a>' +
                //     '</div>' +
                //     '</li>';
            } else {
                // text += "";
            }
        }
        return temp;
    }


})();
