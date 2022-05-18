// const rickrollURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
const rickrollID = "dQw4w9WgXcQ"
let alertMessage = "⚠ You are about to get Rickroll. ⚠\n\nExit ?"
let defaultEscapeLink = "https://youtube.com"


window.addEventListener('load', () => {
    if(window.location.href.includes(rickrollID) ){ // Check if a loading tab is the rickroll
        document.querySelectorAll('audio, video').forEach(item => { // mute and pause all video
            item.muted = true;
            item.pause();
        });
        // ask if user want to escape
        if(want2Escape() === false){
            return;
        }
        if(confirm(alertMessage) === true){ // user want to escape
            if(chrome.storage.sync.get(['escape-link']).value === null){ // check if there is no stored url
                chrome.storage.sync.set({"escape-link": defaultEscapeLink}) // change it to default
            }
            let escapeLink = chrome.storage.sync.get(['escape-link']) // retrieve escape url
            console.log("Rickroll denied");
            open(escapeLink, '_self', ''); // vent to escape page
        }
        else { // user want to stay on the page
            console.log("Rickroll accepted");
            document.querySelectorAll('audio, video').forEach(item => { // unmute and unpause all item
                item.muted = false;
                item.play();
            });
        }
    }
});

// Check if URL is valid (stolen on stackoverflow)
function isURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

// Save escape preference
function updateEscapePreference() {
    const choice = document.getElementById("allow-escape").value;
    if(choice === "true"){ // == Current : True and want to disable it
        chrome.storage.sync.set({"allow-escape": false});
        document.getElementById("allow-escape").value = "false";
    } else if(choice === "false") { // Current : False and want to enable it
        chrome.storage.sync.set({"allow-escape": true});
        document.getElementById("allow-escape").value = "true";
    }
}

// Assign the input link as the escape link
function newEscapeLink() {
    const newLink = document.getElementById("escape-link").value;
    const errorMessage = document.getElementsByClassName("error-msg")[1]
    if(isURL(newLink)){
        chrome.storage.sync.set({"escape-link": newLink}, () => {
            console.log("New URL : " + newLink );
            errorMessage.style.display = "none"
        })
    } else {
        console.log("Invalid URL");
        errorMessage.style.display = "block";
    }
}

function want2Escape() {
    if(chrome.storage.sync.get(['escape']).value === null){
        chrome.storage.sync.set({"escape": true}); // set want2escape to true
    } else if(chrome.storage.sync.get(["escape"]) === false){ // user dont want to escape
        return false;
    }
}

function newEscapeWish(){
    const preference = document.getElementById("allow-escape");
    if(preference.checked){
        chrome.storage.sync.set({"escape": true});
    } else{
        chrome.storage.sync.set({"escape": false});
    }

}
