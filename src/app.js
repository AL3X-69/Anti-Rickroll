// const rickrollURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
const rickrollID = "dQw4w9WgXcQ"
let alertMessage = "⚠ You are about to get Rickroll. ⚠\n\nExit ?"

window.addEventListener('load', () => {
    console.log(window.location.href)
    let option = document.querySelector("input")
    if(window.location.href.includes(rickrollID) && option[0].checked){
        document.querySelectorAll('audio, video').forEach(item => {
            item.muted = true;
            item.pause();
        });
        if(confirm(alertMessage) === true){
            console.log("Rickroll denied");
            open('https://gabhas.fr', '_self', '');
        }
        else {
            console.log("Rickroll accepted");
            document.querySelectorAll('audio, video').forEach(item => {
                item.muted = false;
                item.play();
            });
        }
    }
});


