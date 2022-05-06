const rickrollURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
let alertMessage = "⚠ You are about to get Rickroll. ⚠\n\nExit ?"

window.addEventListener("load", () => {
    if(window.location.href === rickrollURL){
        document.querySelectorAll('audio, video').forEach(item => {
            item.muted = true;
            item.pause();
        });
        if(confirm(alertMessage) === true){
            open('https://www.youtube.com/', '_self', '');
        }
        else {
            document.querySelectorAll('audio, video').forEach(item => {
                item.muted = false;
                item.play();
            });
        }
    }
});
