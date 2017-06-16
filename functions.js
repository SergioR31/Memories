function go(liga){
    window.location.assign(liga + '.html');
}

function validar(){
	var user = document.getElementById('userName');
	var pass = document.getElementById('userPass');
	var check = document.getElementById('check');

	if (user.value === "Sergio" && pass.value === "SergioR31") {
		go('home');
	}else{
		check.innerHTML = 'User or password incorrect!';
		setTimeout(function(){
			check.innerHTML = "";
		},2500);
	}
}

function nav(tab){
	var aside = document.getElementById('aside');

	if (aside.className === "aside") {
		document.querySelector('.body').classList.add('ocultar-body');
		document.querySelector('.aside').classList.add('ver');
		document.getElementById('aside').style.transition=".5s all";
		document.getElementById('body').style.transition=".5s all";

	}else{
		document.querySelector('.aside').classList.remove('ver');
		document.querySelector('.body').classList.remove('ocultar-body');
		setTimeout(function(){
			go(tab);
		},500);

	}
}

function select(tab){
	var name = '.li-' + tab;

	document.querySelector(name).classList.add('selected');

}

function showNewBtns() {
    var btnPlus = document.getElementById('btn-plus');
    var buttons = document.getElementsByClassName('btn-new');

    if(btnPlus.value === "1"){
        buttons = [].slice.call(buttons); /*Delete after chrome 50*/
        buttons.forEach(function (element) {
            element.classList.remove('hide-new-btns');
            element.classList.add('show-new-btns');
        });
        // document.getElementById('new-photo').style.transition = "2s all";
        document.getElementById('new-place').style.transition = "1.5s all";
        // document.getElementById('new-event').style.transition = "1s all";
        document.getElementById('new-note').style.transition = ".5s all";

        document.querySelector('.btn-plus').classList.remove('plus-image');
        document.querySelector('.btn-plus').classList.add('cancel-image');
        // document.getElementById('btn-plus').style.transition = ".5s all";
        btnPlus.value = "0";
    }else {
        buttons = [].slice.call(buttons); /*Delete after chrome 50*/
        buttons.forEach(function (element) {
            element.classList.remove('show-new-btns');
            element.classList.add('hide-new-btns');
        });
        // document.getElementById('new-photo').style.transition = ".5s all";
        document.getElementById('new-place').style.transition = "1s all";
        // document.getElementById('new-event').style.transition = "1.5s all";
        document.getElementById('new-note').style.transition = "2s all";

        document.querySelector('.btn-plus').classList.remove('cancel-image');
        document.querySelector('.btn-plus').classList.add('plus-image');
        // document.getElementById('btn-plus').style.transition = ".5s all";

        btnPlus.value = "1";
    }
}

function myMap(location) {

    if(!document.getElementById('map') || location == 'new'){
        if (!document.getElementById('map')) {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
    
                    var map1 = new google.maps.Map(document.getElementById('map1'), {
                        center: pos,
                        zoom: 17
                    });
    
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map1,
                    });
    
                    marker.setMap(map1);
                    map1.setCenter(pos);
                });
            } 

        }else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var map1 = new google.maps.Map(document.getElementById('map1'), {
                        center: pos,
                        zoom: 16
                    });

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map1,
                    });
                });
            }
        }


    }else{
        addMarkes();
        addPlaces();
    }
}

function addMarkes(){
    var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 20.70, lng: -100.44},
            zoom: 5
        });

        var number = localStorage.getItem('placeCount');
        var placeKey;

        for (var i in localStorage) {
            for (var j = 1; j < number; j++) {
                placeKey = 'place' + j;

            if (i != 'noteCount' && i != 'placeCount' && i == placeKey) {

                var getMarker = JSON.parse(localStorage.getItem(i));

                var pos = {
                    lat: getMarker.Lat,
                    lng: getMarker.Lng
                };

                var loadMarker = new google.maps.Marker({
                    position: pos,
                    map: map
                });

                loadMarker.setMap(map);
            }
        }
        }

}

function addPlaces() {
    // body...
    var placeList = document.getElementById('place-list');

        placeList.innerHTML = "";

        var number = localStorage.getItem('placeCount');
        var placeKey;

        for (var i in localStorage) {
            for (var j = 1; j < number; j++) {
                placeKey = 'place' + j;

            if (i != 'noteCount' && i != 'placeCount' && i == placeKey) {

                var getMarker = JSON.parse(localStorage.getItem(i));
                var place = i.toString();
                var optionBtnsPlace = "optionBtnsPlace('"+place+"')";
                var editPlace = "loadPlace('"+place+"')";
                var confirmDeletePlace = "confirmDeletePlace('"+place+"')";

                var image = '"pin.png"';

                var pos = {
                    lat: getMarker.Lat,
                    lng: getMarker.Lng
                };

                placeList.innerHTML += 

                "<div float:right;' class='object' id='" + i + "'> "  +
                    "<div class='memory-icon' style='background-image:url("+image+");'></div>"+
                        "<div class='object-name' style='width: calc(90% - 165px);' id='name-" + i + "'> " + getMarker.namePlace +
                        "</div>" +
                        "<div class='object-date' id='date-" + i + "'> " + getMarker.date +
                        "</div>" +
                        "<div class='object-menu'>" +
                            "<button id='btn-menu-"+ i +"' value='1' onclick="+ optionBtnsPlace+ "></button>" +
                        "</div>" +
                        "<div class='place-memory' style='width: calc(90% - 10px);' id='memory-" + i + "'> " + getMarker.memory +
                        "</div>" +
                        "<div class='options' id='options-"+ i +"' >" +
                            "<button class='btn-edit' id='edit-" + i + "' onclick="+ editPlace + "></button>" +
                            "<button class='btn-delete' id='delete-" + i + "' onclick="+ confirmDeletePlace + "></button>" +
                        "</div>" +
                    "</div>";
            }
        }
    }
}

function savePlaceMemory(place) {

    var newDate = document.getElementById('place-date');
    var newName = document.getElementById('place-name').value;
    var newMemory = document.getElementById('memory').value;
    var btnAccept = document.getElementById('btn-accept');

    if (place == undefined) {

    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var marker = new google.maps.Marker({
            position: pos,
        });

        var storeMarker = {
            Lat: marker.position.lat(),
            Lng: marker.position.lng(),
            namePlace: newName,
            memory: newMemory,
            date: newDate.textContent
        };

        if (localStorage.getItem('placeCount')){
            placeCount = localStorage.getItem('placeCount');

            localStorage.setItem('place'+placeCount,JSON.stringify(storeMarker));

            placeCount++;
            localStorage.setItem('placeCount',placeCount);
        }else {
            placeCount = 1;

            localStorage.setItem('place'+placeCount,JSON.stringify(storeMarker));

            placeCount++;
            localStorage.setItem('placeCount',placeCount);
        }

    });

    if (document.getElementById('memories')) {
        addMemories();
    }

    }else{

        var oldPlace = JSON.parse(localStorage.getItem(place));

        var uptadePlace = {
            Lat: oldPlace.Lat,
            Lng: oldPlace.Lng,
            namePlace: newName,
            memory: newMemory,
            date: oldPlace.date
        };

        localStorage.setItem(place,JSON.stringify(uptadePlace));

        if (document.getElementById('memories')) {
            addMemories();
        }
    }

    closePlace();
    setTimeout(function(){
        if (document.getElementById('memories')) {
            addMemories();
        }
        myMap();
    },4500);

}

function loadPlace(place) {

    var btnAccept = document.getElementById('btn-accept');

    var addPlaceScreen = document.querySelector('.modal');
    addPlaceScreen.style.display = "block";

    if (place == undefined) {

    var currentDate = new Date();
    var day = currentDate.getDay();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    if (minutes < 10){
        minutes = "0"+minutes;
    }

    if(day < 10){
        day = "0"+day;
    }

    if (month < 10){
        month = "0"+month;
    }

    var fullDate;

    if (hours === 12){
        fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" PM";
    }else if (hours === 0){
        fullDate = day +"/"+ month +"/"+ year+" 12:"+minutes+" AM";
    }else if (hours < 12){
        if (hours < 10) {
            fullDate = day +"/"+ month +"/"+ year+" 0"+hours+":"+minutes+" AM";
        }else{
            fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" AM";
        }
    }else {
        hours = hours - 12;
        if (hours > 13 || hours < 21) {
            fullDate = day +"/"+ month +"/"+ year+" 0"+hours+":"+minutes+" PM";
        }else{
            fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" PM";
        }
    }

    btnAccept.textContent = "+";
    document.getElementById('place-date').innerHTML = fullDate;
    btnAccept.setAttribute("onclick","javascript: savePlaceMemory();");
    myMap('new');
    }else{

        var date = document.getElementById('place-date');
        var name = document.getElementById('place-name');
        var memory = document.getElementById('memory');

        var oldPlace = JSON.parse(localStorage.getItem(place));

        pos = {
                        lat: oldPlace.Lat,
                        lng: oldPlace.Lng
                    };

        var map1 = new google.maps.Map(document.getElementById('map1'), {
                        center: pos,
                        zoom: 17
                    });

        var marker = new google.maps.Marker({
                        position: pos,
                        map: map1,
                    });

        marker.setMap(map1);

        date.innerHTML = oldPlace.date;
        name.value = oldPlace.namePlace;
        memory.value = oldPlace.memory;

        btnAccept.textContent = "Save";
        btnAccept.setAttribute("onclick","javascript: savePlaceMemory('"+place+"');");
    }
}

function closePlace(location) {
    var placeScreen = document.getElementById('add-place');
    var placeScreen1 = document.getElementById('confirmDelete');
    var name = document.getElementById('place-name');
    var memory = document.getElementById('memory');

    placeScreen.style.display = "none";
    placeScreen1.style.display = "none";
    memory.value ="";
    name.value = "";
    if (document.getElementById('memories')) {
            addMemories();
        }

    myMap();
}

function confirmDeletePlace(place){

    var confirmScreen = document.getElementById('confirmDelete');
    var confirmWindow = document.getElementById('modal-window1');
    var divMessage = document.getElementById('message');
    var btnConfirm = document.getElementById('btn-confirm');

    confirmScreen.style.display = "block";
    vibrate([500, 250, 500, 250]);

    divMessage.style.marginTop = "50px";

    confirmWindow.style.margin = "50% auto";
    confirmWindow.style.height = "200px";

    btnConfirm.style.backgroundColor = "red"

    btnConfirm.setAttribute("onclick","javascript: deletePlace('"+place+"');");

}

function deletePlace(place){

    localStorage.removeItem(place);

    closePlace();
    myMap();
}

function optionBtnsPlace(id){

    var idMemory = 'memory-'+id;
    var idBtn = 'btn-menu-'+id;
    var idOptions = 'options-'+id;

    var placeMemory = document.getElementById(idMemory);
    var editBtn = document.getElementById(idBtn);
    var options = document.getElementById(idOptions);

    if (editBtn.value == 1) {
        placeMemory.style.width = "calc(90% - 35px)";

        editBtn.style.backgroundImage = "url(close.png)";

        options.style.visibility = "block";

        options.style.width = "25px";

        editBtn.value = 0;
    }else{
        placeMemory.style.width = "calc(90% - 10px)";

        editBtn.style.backgroundImage = "url(menu2.png)";

        options.style.visibility = "none";

        options.style.width = "0";

        editBtn.value = 1;
    }
}

function loadNote(note){

    var addNoteScreen = document.getElementById('add-note');
    var noteWindow = document.getElementById('modal-window');
    var noteContent = document.getElementById('div-content');
    var date = document.getElementById('note-date');
    var name = document.getElementById('note-name');
    var content = document.getElementById('content');

    var btnSave = document.getElementById('btn-save');

    date.style.marginTop = "25px"
    noteWindow.style.height = "40%";

    noteContent.style.height = "60%";

    addNoteScreen.style.display = "block";

    if (note == undefined) {

        name.value = "";
        content.value = "";

        var currentDate = new Date();
        var day = currentDate.getDay();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();

        if (minutes < 10){
            minutes = "0"+minutes;
        }

        if(day < 10){
            day = "0"+day;
        }

        if (month < 10){
            month = "0"+month;
        }

        var fullDate;

        if (hours === 12){
            fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" PM";
        }else if (hours === 0){
            fullDate = day +"/"+ month +"/"+ year+" 12:"+minutes+" AM";
        }else if (hours < 12){
            if (hours < 10) {
                fullDate = day +"/"+ month +"/"+ year+" 0"+hours+":"+minutes+" AM";
            }else{
                fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" AM";
            }
        }else {
            hours = hours - 12;
            if (hours > 13 || hours < 21) {
                fullDate = day +"/"+ month +"/"+ year+" 0"+hours+":"+minutes+" PM";
            }else{
                fullDate = day +"/"+ month +"/"+ year+" "+hours+":"+minutes+" PM";
            }
        }

        btnSave.textContent = "+";
        document.getElementById('note-date').innerHTML = fullDate;
        btnSave.setAttribute("onclick","javascript: saveNote();");
    }else{

        var oldNote = JSON.parse(localStorage.getItem(note));

        date.innerHTML = oldNote.date;
        name.value = oldNote.nameNote;
        content.value = oldNote.content;

        btnSave.textContent = "Save";
        btnSave.setAttribute("onclick","javascript: saveNote('"+note+"');");        
    }
}

function saveNote(note){

    var newDate = document.getElementById('note-date');
    var newName = document.getElementById('note-name').value;
    var newContent = document.getElementById('content').value;

    if (note == undefined) {

        var storeNote = {
            nameNote: newName,
            content: newContent,
            date: newDate.textContent
        };

        if (localStorage.getItem('noteCount')){
            noteCount = localStorage.getItem('noteCount');

            localStorage.setItem('note'+noteCount,JSON.stringify(storeNote));

            noteCount++;
            localStorage.setItem('noteCount',noteCount);
        }else {
            noteCount = 1;

            localStorage.setItem('note'+noteCount,JSON.stringify(storeNote));

            noteCount++;
            localStorage.setItem('noteCount',noteCount);
        }

    }else{
        var oldNote = JSON.parse(localStorage.getItem(note));

        var updateNote = {
            nameNote: newName,
            content: newContent,
            date: oldNote.date
        };

        localStorage.setItem(note,JSON.stringify(updateNote));
    }
    closeNote();
    addNotes();
}

function addNotes(){

    if (document.getElementById('note-list')) {

    var noteList = document.getElementById('note-list');

        noteList.innerHTML = "";

        var number = localStorage.getItem('noteCount');
        var noteKey;

        for (var i in localStorage) {
            for (var j = 1; j < number; j++) {
                noteKey = 'note' + j;

            if (i != 'noteCount' && i != 'placeCount'  && i == noteKey) {

                var getNote = JSON.parse(localStorage.getItem(i));
                var note = i.toString();
                var optionBtnsNote = "optionBtnsNote('"+note+"')";
                var editNote = "loadNote('"+note+"')";
                var confirmDeleteNote = "confirmDeleteNote('"+note+"')";

                var image = '"stick.png"';

                noteList.innerHTML += 

                "<div style='height:15%; float:right;' class='object' id='" + i + "'> "  +
                        "<div class='memory-icon' style='background-image:url("+image+");'></div>"+
                        "<div class='object-name' style='width: calc(90% - 165px);' id='name-" + i + "'> " + getNote.nameNote +
                        "</div>" +
                        "<div class='object-date' id='date-" + i + "'> " + getNote.date +
                        "</div>" +
                        "<div class='object-menu'>" +
                            "<button id='btn-menu-"+ i +"' value='1' onclick="+ optionBtnsNote+ "></button>" +
                        "</div>" +
                        "<div class='place-memory' style='width: calc(90% - 10px);' id='content-" + i + "'> " + getNote.content +
                        "</div>" +
                        "<div class='options' id='options-"+ i +"' >" +
                            "<button class='btn-edit' id='edit-" + i + "' onclick="+ editNote + "></button>" +
                            "<button class='btn-delete' id='delete-" + i + "' onclick="+ confirmDeleteNote + "></button>" +
                        "</div>" +
                    "</div>";
            }
        }
    }
}else{
    addMemories();
}
}

function closeNote(note){

    var newName = document.getElementById('note-name').value;
    var newContent = document.getElementById('content').value;
    var noteScreen = document.getElementById('add-note');
    var confirmScreen = document.getElementById('confirmDelete');

    noteScreen.style.display = "none";
    confirmScreen.style.display = "none";

    newName = "";
    newContent = "";

    addNotes();
}

function confirmDeleteNote(note){

    var confirmScreen = document.getElementById('confirmDelete');
    var confirmWindow = document.getElementById('modal-window1');
    var divMessage = document.getElementById('message');
    var btnConfirm = document.getElementById('btn-confirm');

    confirmScreen.style.display = "block";

    divMessage.style.marginTop = "50px";

    confirmWindow.style.margin = "50% auto";
    confirmWindow.style.height = "200px";

    btnConfirm.style.backgroundColor = "red"

    btnConfirm.setAttribute("onclick","javascript: deleteNote('"+note+"');");

}

function deleteNote(note){

    localStorage.removeItem(note);

    closeNote();
    addNotes();

}

function optionBtnsNote(id){

    var idContent = 'content-'+id;
    var idBtn = 'btn-menu-'+id;
    var idOptions = 'options-'+id;

    var noteContent = document.getElementById(idContent);
    var editBtn = document.getElementById(idBtn);
    var options = document.getElementById(idOptions);

    if (editBtn.value == 1) {
        noteContent.style.width = "calc(90% - 35px)";

        editBtn.style.backgroundImage = "url(close.png)";

        options.style.visibility = "block";

        options.style.width = "25px";

        editBtn.value = 0;
    }else{
        noteContent.style.width = "calc(90% - 10px)";

        editBtn.style.backgroundImage = "url(menu2.png)";

        options.style.visibility = "none";

        options.style.width = "0";

        editBtn.value = 1;
    }
}



function addMemories(){
    var memoriesList = document.getElementById('memories');

    memoriesList.innerHTML = "";

        var noteCount = localStorage.getItem('noteCount');
        var placeCount = localStorage.getItem('placeCount');

        var valMax = Math.max(noteCount, placeCount); 
        var placeKey;
        var noteKey;

        for (var i in localStorage) {
            for (var j = 1; j < valMax; j++) {
                noteKey = 'note' + j;
                placeKey = 'place' + j;

                if (i != 'noteCount' && i != 'placeCount' || i == noteKey || i == placeKey) {

                    if (i == noteKey) {
    
                    var getNote = JSON.parse(localStorage.getItem(i));
                    var note = i.toString();
                    var optionBtnsNote = "optionBtnsNote('"+note+"')";
                    var editNote = "loadNote('"+note+"')";
                    var confirmDeleteNote = "confirmDeleteNote('"+note+"')";

                    var image = '"stick.png"';
    
                    memoriesList.innerHTML += 
    
                    "<div style='height:15%; float:right;' class='object' id='" + i + "'> "  +
                        "<div class='memory-icon' style='background-image:url("+image+")'></div>"+
                        "<div class='object-name' style='width: calc(90% - 165px);' id='name-" + i + "'> " + getNote.nameNote +
                        "</div>" +
                        "<div class='object-date' id='date-" + i + "'> " + getNote.date +
                        "</div>" +
                        "<div class='object-menu'>" +
                            "<button id='btn-menu-"+ i +"' value='1' onclick="+ optionBtnsNote+ "></button>" +
                        "</div>" +
                        "<div class='place-memory' style='width: calc(90% - 10px);' id='content-" + i + "'> " + getNote.content +
                        "</div>" +
                        "<div class='options' id='options-"+ i +"' >" +
                            "<button class='btn-edit' id='edit-" + i + "' onclick="+ editNote + "></button>" +
                            "<button class='btn-delete' id='delete-" + i + "' onclick="+ confirmDeleteNote + "></button>" +
                        "</div>" +
                    "</div>";
                    }

                    if (i == placeKey) {
                        var getPlace = JSON.parse(localStorage.getItem(i));

                        var place = i.toString();
                        var optionBtnsPlace = "optionBtnsPlace('"+place+"')";
                        var editPlace = "loadPlace('"+place+"')";
                        var confirmDeletePlace = "confirmDeletePlace('"+place+"')";

                        var image = '"pin.png"';

                        memoriesList.innerHTML += 
    
                    "<div style='height:10%; float:right;' class='object' id='" + i + "'> "  +
                    "<div class='memory-icon' style='background-image: url("+image+")'></div>"+
                        "<div class='object-name' style='width: calc(90% - 165px);' id='name-" + i + "'> " + getPlace.namePlace +
                        "</div>" +
                        "<div class='object-date' id='date-" + i + "'> " + getPlace.date +
                        "</div>" +
                        "<div class='object-menu'>" +
                            "<button id='btn-menu-"+ i +"' value='1' onclick="+ optionBtnsPlace+ "></button>" +
                        "</div>" +
                        "<div class='place-memory' style='width: calc(90% - 10px);' id='memory-" + i + "'> " + getPlace.memory +
                        "</div>" +
                        "<div class='options' id='options-"+ i +"' >" +
                            "<button class='btn-edit' id='edit-" + i + "' onclick="+ editPlace + "></button>" +
                            "<button class='btn-delete' id='delete-" + i + "' onclick="+ confirmDeletePlace + "></button>" +
                        "</div>" +
                    "</div>";
                    }
                }
        }
    }
}

function vibrate(time){
        if (navigator.vibrate){
            navigator.vibrate(tiempo);
        }
    }