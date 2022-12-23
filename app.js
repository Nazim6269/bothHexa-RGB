window.onload = () => {
    div = null;
    main();
}

function main() {
    const cpButton = document.querySelector('#copyButton');
    const cpButton2 = document.querySelector('#copyButton2');
    const chButton = document.querySelector('#changeButton');
    const body = document.querySelector('body');
    const input = document.querySelector('#inp');
    const inputTwo = document.querySelector('#inpTwo');

    chButton.addEventListener('click', function(){
        const decColor = generateColorDecimal();
        const hexColor = generateHexColor(decColor);
        const RGBColor = generateRGBColor(decColor);
        input.value = hexColor.substring(1);
        body.style.backgroundColor = hexColor;
        inputTwo.value = RGBColor;
        
    });

    cpButton.addEventListener('click', function(){
        navigator.clipboard.writeText(`#${input.value}`);
        if (div != null) {
            div.remove();
            div = null;
        }
        if (isHexValid(input.value)) {
            generateToastMessage(input.value);
        }else{alert(`invalid hex Code`)}      
    })




    input.addEventListener('keyup', function(e){
        const color = e.target.value;
        if (color){
            input.value = color.toUpperCase();
        }
        if (isHexValid(color)){
            body.style.backgroundColor = `#${color}`;
        }
    })
}



function generateColorDecimal(){
    const red = Math.round(Math.random()*255);
    const green = Math.round(Math.random()*255);
    const blue = Math.round(Math.random()*255);
    return {red,green,blue};
}



function generateHexColor({red,green,blue}){
    const getTwoCode = (value) => {
        const hexCode = value.toString(16);
        return hexCode.length === 1 ? `0${hexCode}` : hexCode;
    }
    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}



function generateRGBColor({red,green,blue}){
    return `rgb(${red},${green},${blue})`;
}




function isHexValid (color){
    if (color.length != 6) return false;
    return /^[0-9A-fa-f]{6}$/i.test(color);
}



function generateToastMessage(msg){
    div = document.createElement('div');
    div.innerHTML = `#${msg} copied`;
    div.className = 'toast-message toast-message-slide-in';
    div.addEventListener('click', function(){
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');
        div.addEventListener('animationend',function (){
            div.remove();
            div = null;
        })
    })
    document.body.appendChild(div);
}