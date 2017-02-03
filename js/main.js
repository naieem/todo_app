(function(window) {
    'use strict';

    if (localStorage.getItem("list") !== null) {
        var list = JSON.parse(localStorage.getItem("list"));
    } else {
        var list = window.data.list;
    }
    var modal = document.getElementById('myModal');
    var containerID = document.getElementById(config.containerID);
    var frm = document.getElementById(config.add_frm_id);
    var add_form_error_log = document.getElementById(config.add_form_error_log);
    var filter_text_id = document.getElementById(config.filter_id);

    var APP = {
        list: list,
        init: init,
        setList: setList,
        //toggleAddFrm: toggleAddFrm,
        addItem: addItem,
        delete: del,
        // filter: filter,
        openModal: openModal,
        hideModal: hideModal,
        statusChange: statusChange,
        showDone: showDone,
        showUndone: showUndone,
        showAll: showAll,
        dynamicSort:dynamicSort
    };
    window.APP=APP;
    APP.init();

    function init() {
        this.setList();

        var span = document.getElementsByClassName("close")[0];
        window.onclick = function(event) {

            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function setList() {
        console.log(this.list);
        this.list.sort(this.dynamicSort("title"));
        console.log(this.list);
        var statusVal = document.querySelector('input[name="' + config.itemStatus + '"]:checked').value;
        switch (statusVal) {
            case 'all':
                this.showAll();
                break;
            case 'done':
                this.showDone();
                break;
            case 'undone':
                this.showUndone();
                break;
        }
    }

    function toggleAddFrm() {

        //console.log(frm.style);
        if (frm.style.display == 'none' || frm.style.display == '') {
            frm.style.display = 'block';
        } else {
            frm.style.display = 'none';
        }
    }

    function addItem() {
        var frm_name = config.add_form_name;
        var title = config.add_item_title;
        var description = config.add_item_description;
        var title_val = document.forms[frm_name][title].value;
        var desc_val = document.forms[frm_name][description].value;
        var rtn = '';
        var err = false;
        if (title_val == '') {
            document.forms[frm_name][title].style.border = "1px solid red";
            rtn += message.title_error + "<br>";
            err = true;
        } else {
            document.forms[frm_name][title].style.border = "1px solid gray";
        }
        if (desc_val == '') {
            document.forms[frm_name][description].style.border = "1px solid red";
            rtn += message.desc_error + "<br>";
            err = true;
        } else {
            document.forms[frm_name][description].style.border = "1px solid gray";
        }
        if (err) {
            add_form_error_log.style.display = 'block';
            add_form_error_log.innerHTML = rtn;
            err = false;
        } else {
            add_form_error_log.innerHTML = "";
            add_form_error_log.style.display = 'none';
            document.forms[frm_name][title].style.border = "1px solid gray";
            document.forms[frm_name][description].style.border = "1px solid gray";
            var data = {
                id: Math.floor(Math.random() * 500),
                title: title_val,
                description: desc_val,
                done: false
            }
            this.list.push(data);
            localStorage.setItem("list", JSON.stringify(this.list));
            var dt = JSON.parse(localStorage.getItem("list"));
            console.log(dt);
            this.setList();
            frm.reset();
            this.hideModal();
        }

    }

    function del(id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                this.list.splice(i, 1);
            }
            localStorage.setItem("list", JSON.stringify(this.list));
            this.init();
        }
    }

    function openModal() {
        modal.style.display = "block";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    function statusChange(checkbox, id) {
        if (checkbox.checked) {
            console.log(id);
        } else {
            console.log('unchecked');
        }
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                if (checkbox.checked) {
                    this.list[i].done = true;
                } else {
                    this.list[i].done = false;
                }
            }
        }
        localStorage.setItem("list", JSON.stringify(this.list));
        this.init();
    }

    function showDone() {
        var filter_val = filter_text_id.value;
        var text = '';
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].done) {
                status = "checked='checked'";
            } else {
                status = "";
            }
            var title = this.list[i].title;
            var description = this.list[i].description;
            var pattern = new RegExp(filter_val, "gi");
            var title_match = title.match(pattern);
            var description_match = description.match(pattern);
            if (filter_val != '' && (title_match != null || description_match != null) && this.list[i].done) {
                text += '<li>' +
                    '<div class="text-content">' +
                    '<p class="title">' + this.list[i].title + '</p>' +
                    '<p class="description">' + this.list[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                    '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                    '</div>' +
                    '</li>';
            } else if (filter_val == '' && this.list[i].done) {
                text += '<li>' +
                    '<div class="text-content">' +
                    '<p class="title">' + this.list[i].title + '</p>' +
                    '<p class="description">' + this.list[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                    '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                    '</div>' +
                    '</li>';
            } else {
                text += "";
            }
        }
        containerID.innerHTML = text;
    }

    function showUndone() {
        var filter_val = filter_text_id.value;
        var text = '';
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].done) {
                status = "checked='checked'";
            } else {
                status = "";
            }
            var title = this.list[i].title;
            var description = this.list[i].description;
            var pattern = new RegExp(filter_val, "gi");
            var title_match = title.match(pattern);
            var description_match = description.match(pattern);
            if (filter_val != '' && (title_match != null || description_match != null) && !this.list[i].done) {
                text += '<li>' +
                    '<div class="text-content">' +
                    '<p class="title">' + this.list[i].title + '</p>' +
                    '<p class="description">' + this.list[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                    '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                    '</div>' +
                    '</li>';
            } else if (filter_val == '' && !this.list[i].done) {
                text += '<li>' +
                    '<div class="text-content">' +
                    '<p class="title">' + this.list[i].title + '</p>' +
                    '<p class="description">' + this.list[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                    '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                    '</div>' +
                    '</li>';
            } else {
                text += "";
            }
        }
        containerID.innerHTML = text;
    }

    function showAll() {
        var filter_val = filter_text_id.value;
        var text = '';
        var status = '';
        if (this.list != null || this.list.length > 0) {
            if (filter_val != '') {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].done) {
                        status = "checked='checked'";
                    } else {
                        status = "";
                    }
                    var title = this.list[i].title;
                    var description = this.list[i].description;
                    var pattern = new RegExp(filter_val, "gi");
                    var title_match = title.match(pattern);
                    var description_match = description.match(pattern);
                    if (title_match != null || description_match != null) {
                        text += '<li>' +
                            '<div class="text-content">' +
                            '<p class="title">' + this.list[i].title + '</p>' +
                            '<p class="description">' + this.list[i].description + '</p>' +
                            '</div>' +
                            '<div class="actions">' +
                            '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                            '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                            '</div>' +
                            '</li>';
                    } else {
                        text += '';
                    }

                }
            } else {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].done) {
                        status = "checked='checked'";
                    } else {
                        status = "";
                    }
                    text += '<li>' +
                        '<div class="text-content">' +
                        '<p class="title">' + this.list[i].title + '</p>' +
                        '<p class="description">' + this.list[i].description + '</p>' +
                        '</div>' +
                        '<div class="actions">' +
                        '<input type="checkbox" name="done" ' + status + ' value="0" onchange="APP.statusChange(this,' + this.list[i].id + ');"><label><span></span></label>' +
                        '<a href="#" class="delete buttons" onclick="APP.delete(' + this.list[i].id + ');return false;" title="Delete"></a>' +
                        '</div>' +
                        '</li>';
                }
            }
        } else {
            text += "No results Found";
        }
        containerID.innerHTML = text;
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

})(window);
