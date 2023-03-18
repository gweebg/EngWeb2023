let editButtons = document.querySelectorAll("button.edit");
let modals = document.querySelectorAll(".modal");
let spans = document.getElementsByClassName("close");


for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].onclick = function() {
        let modal = document.getElementById(editButtons[i].getAttribute("href").substring(1));
        modal.style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        for (let index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        for (let index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}


let modal = document.getElementById("add-modal");

let btn = document.getElementById("add-new");

btn.onclick = function () {
    modal.style.display = "block";
}
