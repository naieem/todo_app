(function(window) {
    'use strict';
    var APP = {
        data: window.data.list,
        list: JSON.parse(localStorage.getItem("list")),
        init: init,
        setList: setList,
        toggleAddFrm: toggleAddFrm,
        addItem: addItem,
        delete: del,
        filter: filter
    };
    window.APP = APP;
    APP.init();

    function init() {
        this.setList();
    }

    function setList() {
        var text = '';
        var status = '';
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
                '<input type="checkbox" name="done" ' + status + ' value="0">' +
                '<a href="#" onclick="APP.delete(' + this.list[i].id + ');return false;">Delete</a>' +
                '</div>' +
                '</li>';
        }
        document.getElementById(config.containerID).innerHTML = text;
        //console.log(this.data);
    }

    function toggleAddFrm() {
        var frm = document.getElementById(config.add_frm_id);
        //console.log(frm.style);
        if (frm.style.display == 'none' || frm.style.display == '') {
            frm.style.display = 'block';
        } else {
            frm.style.display = 'none';
        }
    }

    function addItem() {
        var frm = config.add_form_name;
        var title = config.add_item_title;
        var description = config.add_item_description;
        var title_val = document.forms[frm][title].value;
        var desc_val = document.forms[frm][description].value;
        var rtn = '';
        var err = false;
        if (title_val == '') {
            rtn += message.title_error + "<br>";
            err = true;
        }
        if (desc_val == '') {
            rtn += message.desc_error + "<br>";
            err = true;
        }
        if (err) {
            document.getElementById(config.add_form_error_log).innerHTML = rtn;
            err = false;
        } else {
            document.getElementById(config.add_form_error_log).innerHTML = "";
            var data = {
                id: Math.floor(Math.random() * 10),
                title: title_val,
                description: desc_val,
                done: false
            }
            this.list.push(data);
            localStorage.setItem("list", JSON.stringify(this.list));
            var dt = JSON.parse(localStorage.getItem("list"));
            console.log(dt);
            this.setList();
            document.getElementById(config.add_item_form_id).reset();
        }
    }

    function del(id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                this.list.splice(i, 1);
            }
            this.setList();
        }
    }

    function filter() {
        var filter = document.getElementById(config.filter_id).value;
        var text = '';
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].done) {
                status = "checked='checked'";
            } else {
                status = "";
            }
            var title = this.list[i].title;
            var description = this.list[i].description;
            var pattern = new RegExp(filter, "gi");
            var title_match = title.match(pattern);
            var description_match = description.match(pattern);
            if (title_match != null || description_match != null) {
                text += '<li>' +
                    '<div class="text-content">' +
                    '<p class="title">' + this.list[i].title + '</p>' +
                    '<p class="description">' + this.list[i].description + '</p>' +
                    '</div>' +
                    '<div class="actions">' +
                    '<input type="checkbox" name="done" ' + status + ' value="0">' +
                    '<a href="#" onclick="APP.delete(' + this.list[i].id + ');return false;">Delete</a>' +
                    '</div>' +
                    '</li>';
            } else {
                text += "";
            }

            document.getElementById(config.containerID).innerHTML = text;
        }
    }
})(window);
