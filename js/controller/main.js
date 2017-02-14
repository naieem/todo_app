(function() {
    'use strict';

    var list = Model.list();

    var modal = document.getElementById(config.add_modal_id);
    var editmodal = document.getElementById(config.edit_modal_id);
    var containerID = document.getElementById(config.containerID);
    var frm = document.getElementById(config.add_frm_id);
    var add_form_error_log = document.getElementById(config.add_form_error_log);
    var edit_form_error_log = document.getElementById(config.edit_form_error_log);
    var filter_text_id = document.getElementById(config.filter_id);

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
        validation: validation
    };

    // function getUserDetail(username) {

    //     // Use the fetch API to get the information
    //     // fetch returns a promise
    //     return fetch('users/' + username + '.json')
    //         .then(function(result) {
    //             userCache[username] = result;
    //             return result;
    //         })
    //         .catch(function() {
    //             throw new Error('Could not find user: ' + username);
    //         });
    // }


    window.APP = APP;
    APP.init();

    function init() {
        this.setList();
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            if (event.target == editmodal) {
                editmodal.style.display = "none";
            }
        }
    }

    function setList() {
        // console.log(this.list);
        this.list.sort(this.dynamicSort("title"));
        // console.log(this.list);
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
        var formName=document.forms[frm_name];
        var title_val = formName[title].value;
        var desc_val = formName[description].value;
        var rtn = '';
        var err = false;
        if (title_val == '') {
            formName[title].style.border = "1px solid red";
            rtn += message.title_error + "<br>";
            err = true;
        } else {
            formName[title].style.border = "1px solid gray";
        }
        if (desc_val == '') {
            formName[description].style.border = "1px solid red";
            rtn += message.desc_error + "<br>";
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
            this.list.push(data);
            var dcsn=Model.addData(this.list,data);
            console.log(dcsn);
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
        View.AddModal(modal);
    }

    function hideModal() {
        View.HideModal('add');
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
        // console.log(result);
        View.render(result,containerID);
        // containerID.innerHTML = text;
    }

    function showUndone() {
        var filter_val = filter_text_id.value;
        var data = this.list;
        data.filterVal = filter_val;
        var result = Model.showData(data, "undone");
        // console.log(result);
        // containerID.innerHTML = text;
        View.render(result,containerID);
    }

    function showAll() {
        var filter_val = filter_text_id.value;
        var data = this.list;
        data.filterVal = filter_val;
        var result = Model.showData(this.list, "all");
        // console.log(result);
        View.render(result,containerID);
        // containerID.innerHTML = text;
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
                document.querySelector('#' + config.editTitle).value = this.list[i].title;
                document.querySelector('#' + config.editDescription).value = this.list[i].description;
                document.querySelector('#' + config.editId).value = id;
            }
        }
        editmodal.style.display = "block";
    }

    function edit() {
        var titleField = document.getElementById(config.editTitle);
        var descriptionField = document.getElementById(config.editDescription);
        var itemId = document.querySelector('#' + config.editId).value;
        var title = document.querySelector('#' + config.editTitle).value;
        var description = document.querySelector('#' + config.editDescription).value;
        var rtn = '';
        var err = false;
        if (title == '') {
            titleField.style.border = "1px solid red";
            rtn += message.title_error + "<br>";
            err = true;
        } else {
            titleField.style.border = "1px solid gray";
        }
        if (description == '') {
            descriptionField.style.border = "1px solid red";
            rtn += message.desc_error + "<br>";
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
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == itemId) {
                    this.list[i].title = title;
                    this.list[i].description = description;
                }
            }
            localStorage.setItem("list", JSON.stringify(this.list));
            this.hideEditModal();
            this.init();
        }
    }

    function hideEditModal() {
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

})(Model,View);
