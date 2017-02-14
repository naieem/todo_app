var Model = Model || (function() {
    'use strict';

    return {
        list: getInitialData,
        showData: showData,
        addData: addData,
        editData: editData
    }

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
            } else if (data.filterVal == '' && !data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
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
            } else if (data.filterVal == '' && data[i].done) {
                data[i].titleCls = titleCls;
                data[i].status = status;
                temp.push(data[i]);
            } else {
                // text += "";
            }
        }
        return temp;
    }

    function addData(oldData, newData) {
        oldData.push(newData);
        var newList = oldData;
        localStorage.setItem("list", JSON.stringify(newList));
        var data = JSON.parse(localStorage.getItem("list"));
        return data;
    }

    function editData(data, id, newData) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].title = newData.title;
                data[i].description = newData.description;
            }
        }
        localStorage.setItem("list", JSON.stringify(data));
    }


})();
