const rickrollURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
let alertMessage = "⚠ You are about to get Rickroll. ⚠\n\nExit ?"

window.onload = function (){
    console.log(window.location.href)
    if(window.location.href === rickrollURL){
        document.querySelectorAll('audio, video').forEach(item => {
            item.muted = true;
            item.pause();
        });
        if(confirm(alertMessage) === true){
            console.log("Rickroll denied");
            open('https://www.youtube.com/', '_self', '');
        }
        else {
            console.log("Rickroll accepted");
            document.querySelectorAll('audio, video').forEach(item => {
                item.muted = false;
                item.play();
            });
        }
    }
}