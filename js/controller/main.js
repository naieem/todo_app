(function() {
    'use strict';

    var list = Model.list();

    var lang = document.getElementById(Config.language);
    var modal = document.getElementById(Config.add_modal_id);
    var modal = document.getElementById(Config.add_modal_id);
    var editmodal = document.getElementById(Config.edit_modal_id);
    var containerID = document.getElementById(Config.containerID);
    var frm = document.getElementById(Config.add_frm_id);
    var add_form_error_log = document.getElementById(Config.add_form_error_log);
    var edit_form_error_log = document.getElementById(Config.edit_form_error_log);
    var filter_text_id = document.getElementById(Config.filter_id);

    var APP = {
        list: list,
        init: init,
        setList: setList,
        addItem: addItem,
        delete: del,
        openModal: openModal,
        hideModal: hideModal,
        statusChange: statusChange,
        showDone: showDone,
        showUndone: showUndone,
        showAll: showAll,
        dynamicSort: dynamicSort,
        editModal: editModal,
        edit: edit,
        hideEditModal: hideEditModal,
        validation: validation,
        ChangeLang: ChangeLang,
        resetForm: resetForm,
        clearErrorLog: clearErrorLog
    };


    window.APP = APP;
    APP.init();

    function init() {
        this.setList();
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                resetForm(frm);
                clearErrorLog(add_form_error_log);
            }
            if (event.target == editmodal) {
                editmodal.style.display = "none";
                clearErrorLog(edit_form_error_log);
            }
        }
    }

    function setList() {
        this.list.sort(this.dynamicSort("title"));
        var statusVal = document.querySelector('input[name="' + Config.itemStatus + '"]:checked').value;
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
        if (frm.style.display == 'none' || frm.style.display == '') {
            frm.style.display = 'block';
        } else {
            frm.style.display = 'none';
        }
    }

    function addItem() {
        var frm_name = Config.add_form_name;
        var title = Config.add_item_title;
        var description = Config.add_item_description;
        var formName = document.forms[frm_name];
        var title_val = formName[title].value;
        var desc_val = formName[description].value;
        var language = lang.value;
        var rtn = '';
        var err = false;
        if (title_val == '') {
            formName[title].style.border = "1px solid red";
            rtn += Message.title_error[language] + "<br>";
            err = true;
        } else {
            formName[title].style.border = "1px solid gray";
        }
        if (desc_val == '') {
            formName[description].style.border = "1px solid red";
            rtn += Message.desc_error[language] + "<br>";
            err = true;
        } else {
            formName[description].style.border = "1px solid gray";
        }
        if (err) {
            add_form_error_log.style.display = 'block';
            add_form_error_log.innerHTML = rtn;
            err = false;
        } else {
            add_form_error_log.innerHTML = "";
            add_form_error_log.style.display = 'none';
            formName[title].style.border = "1px solid gray";
            formName[description].style.border = "1px solid gray";
            var data = {
                id: Math.floor(Math.random() * 500),
                title: title_val,
                description: desc_val,
                done: false
            }
            Model.addData(this.list, data);
            this.setList();
            frm.reset();
            this.hideModal('add');
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
        View.AddModal(modal);
    }

    function hideModal() {
        this.resetForm(frm);
        this.clearErrorLog(add_form_error_log);
        View.HideModal('add');
    }

    function resetForm(frm) {
        frm.reset();
    }

    function clearErrorLog(add_form_error_log) {
        add_form_error_log.innerHTML = "";
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
        var data = this.list;
        data.filterVal = filter_val;
        var result = Model.showData(data, "done");
        View.render(result, containerID);
    }

    function showUndone() {
        var filter_val = filter_text_id.value;
        var data = this.list;
        data.filterVal = filter_val;
        var result = Model.showData(data, "undone");
        View.render(result, containerID);
    }

    function showAll() {
        var filter_val = filter_text_id.value;
        var data = this.list;
        data.filterVal = filter_val;
        var result = Model.showData(this.list, "all");
        View.render(result, containerID);
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

    function editModal(id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                document.querySelector('#' + Config.editTitle).value = this.list[i].title;
                document.querySelector('#' + Config.editDescription).value = this.list[i].description;
                document.querySelector('#' + Config.editId).value = id;
            }
        }
        editmodal.style.display = "block";
    }

    function edit() {
        var titleField = document.getElementById(Config.editTitle);
        var descriptionField = document.getElementById(Config.editDescription);
        var itemId = document.querySelector('#' + Config.editId).value;
        var title = document.querySelector('#' + Config.editTitle).value;
        var description = document.querySelector('#' + Config.editDescription).value;
        var language = lang.value;

        var rtn = '';
        var err = false;
        if (title == '') {
            titleField.style.border = "1px solid red";
            rtn += Message.title_error[language] + "<br>";
            err = true;
        } else {
            titleField.style.border = "1px solid gray";
        }
        if (description == '') {
            descriptionField.style.border = "1px solid red";
            rtn += Message.desc_error[language] + "<br>";
            err = true;
        } else {
            descriptionField.style.border = "1px solid gray";
        }
        if (err) {
            edit_form_error_log.style.display = 'block';
            edit_form_error_log.innerHTML = rtn;
            err = false;
        } else {
            edit_form_error_log.innerHTML = "";
            edit_form_error_log.style.display = 'none';
            titleField.style.border = "1px solid gray";
            descriptionField.style.border = "1px solid gray";
            var data = {
                title: title,
                description: description
            }
            Model.editData(this.list, itemId, data);
            this.hideEditModal();
            this.init();
        }
    }

    function hideEditModal() {
        this.clearErrorLog(edit_form_error_log);
        View.HideModal('edit');
    }

    function validation(input) {
        var val = input.value;
        if (val == '') {
            input.style.border = "1px solid red";
        } else {
            input.style.border = "1px solid gray";
        }
        console.log(input.value);
    }

    function ChangeLang(elm) {
        var lng = elm.value;
        var selector = document.querySelectorAll(".lang");
        for (var i = 0; i < selector.length; i++) {
            var model = selector[i].getAttribute("data-model");
            if (selector[i].tagName == "TEXTAREA") {
                selector[i].placeholder = Lang[model][lng];
            } else if (selector[i].tagName == "INPUT") {
                if (selector[i].getAttribute("type") == "submit") {
                    selector[i].value = Lang[model][lng];
                } else {
                    selector[i].placeholder = Lang[model][lng];
                }
            } else selector[i].innerHTML = Lang[model][lng];
        }
    }

})(Model, View, Config, Message);
