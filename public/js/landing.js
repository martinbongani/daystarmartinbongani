function animateText() {
    const text = document.querySelector('.fancy');
    const strText = text.textContent;
    const splitText = strText.split('');
    text.textContent = '';
    for (let i = 0; i < splitText.length; i++) {
        text.innerHTML += '<span class="fade-span" style="opacity: 0;">' + splitText[i] + '</span>';
    }

    let char = 0;
    let timer = setInterval(onTick, 50);

    function onTick(){
        const fadeSpan = text.querySelectorAll('.fade-span')[char];
        fadeSpan.style.opacity = 1;
        char++
        if(char === splitText.length){
            complete();
            return;
        }
    }

    function complete() {
        clearInterval(timer);
        timer = null;
    }
}

animateText();

setInterval(animateText, 10000);
