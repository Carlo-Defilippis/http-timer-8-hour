window.addEventListener("DOMContentLoaded", () => {


    let hours = document.getElementById("pause-hours");
    let minutes = document.getElementById("pause-minutes");
    let seconds = document.getElementById("pause-seconds");

    let pauseMessage = document.getElementById("pause-message");
    let timerText = document.getElementById("timer-text")

    const pauseBtn = document.getElementById("pause");
    


    let isPaused = false;
    
    pauseMessage.style.display = "none";
    pauseBtn.disabled = true
    pauseBtn.addEventListener("click", () => {
      pauseBtn.classList.toggle("active");
      if (pauseBtn.classList.contains("active")) {
        pauseBtn.innerHTML = "Resume";
        isPaused = true;
        pauseMessage.style.display = "block";
      } else {
        pauseBtn.innerHTML = "Pause";
        isPaused = false;
        pauseMessage.style.display = "none";
      }
    }
    );

    let currentTime
    setInterval(function() {
        let resetTime
        if (!isPaused) {
            axios.get('/timer')
                .then(result => { currentTime = result.data.match(/(?<=<div id="timer">).*?(?=<\/div>)/g)})
                .then(() => {
                    timerText.innerText = currentTime
                    resetTime = currentTime
                    pauseBtn.disabled = false
                })
        } else {
            if(currentTime.length > 0) {
                let splitTime = currentTime[0].split(":")
                hours.value = Number(splitTime[0])
                minutes.value = Number(splitTime[1])
                seconds.value = 30
                document.getElementById("pause-form").submit();
            }
            // resetTime = timerText.innerText.split(":")
            // hours.value = resetTime[0]
            // minutes.value = resetTime[1]
            // seconds.value = resetTime[2]
            // console.log(resetTime)
        }
    }
    , 5000);
   

}
)