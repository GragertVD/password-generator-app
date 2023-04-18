var lenghtNum = document.querySelector('.gen-setting__lenght-num');
var mySlider = document.getElementById('slider');
const maxLenght = 16;

noUiSlider.create(mySlider, {
  start: 0,
  connect: [true, false],
  step: 1,
  range: {
    'min': 0,
    'max': maxLenght
  }

});
//Ждем загрузки страницы
document.addEventListener("DOMContentLoaded", () => { 

  const checkboxUppercase = document.getElementById('c_1');
  const checkboxLowercase = document.getElementById('c_2');
  const checkboxNumber = document.getElementById('c_3');
  const checkboxSymbol = document.getElementById('c_4');

  let includeUppercase = 0;
  let includeLowercase = 0;
  let includeNumber = 0;
  let includeSymbol = 0;

//В зависимости от чекбокса выбираем символы для генерации
  checkboxUppercase.addEventListener('change', (el) => {
    includeUppercase = Number(el.target.checked);
    UpdateActivePasGen();
    UpdateIndicateLevel();
  });
  checkboxLowercase.addEventListener('change', (el) => {
    includeLowercase = Number(el.target.checked);
    UpdateActivePasGen();
    UpdateIndicateLevel();
  });
  checkboxNumber.addEventListener('change', (el) => {
    includeNumber = Number(el.target.checked);
    UpdateActivePasGen();
    UpdateIndicateLevel();
  });
  checkboxSymbol.addEventListener('change', (el) => {
    includeSymbol = Number(el.target.checked);
    UpdateActivePasGen();
    UpdateIndicateLevel();
  });

//генерируем пароль по нажатию кнопки
  const buttonGen = document.querySelector('.gen-setting__btn');
  buttonGen.addEventListener('click', () => {
    let password = "";
    const symbolsUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbolsLovercase = "abcdefghijklmnopqrstuvwxyz";
    const symbolsNumber = "0123456789";
    const symbolsSymbols = "!№;%:?*()_+=$&#";
    let symbols = "";
    let lenght = Math.round(mySlider.noUiSlider.get());

    if (includeUppercase) {
      symbols += symbolsUppercase;
    }
    if (includeLowercase) {
      symbols += symbolsLovercase;
    }
    if (includeNumber) {
      symbols += symbolsNumber;
    }
    if (includeSymbol) {
      symbols += symbolsSymbols;
    }
    symbols = Array.from(symbols);
    symbols.sort(() => Math.random() - 0.5);
    symbols = symbols.join('');

    for (let i = 0; i < lenght; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    const elOutput = document.querySelector('.pas-gen__output');
    elOutput.innerHTML = password;
  });

//функция обновления индикации уровня сложности пароля
  function UpdateIndicateLevel() {
    const elIndicateLevel = document.querySelector('.indicate-blok');
    const mySlider = document.getElementById('slider');

    let lenght = Math.round(mySlider.noUiSlider.get());
    let lvl = Math.round(lenght * 4 / maxLenght) + includeUppercase + includeLowercase + includeNumber + includeSymbol - 3;

    if (lvl < 1 || lenght < 4) lvl = 1;
    if (lvl > 4) lvl = 4;


    elIndicateLevel.classList.remove(`lvl-1`);
    elIndicateLevel.classList.remove(`lvl-2`);
    elIndicateLevel.classList.remove(`lvl-3`);
    elIndicateLevel.classList.remove(`lvl-4`);


    elIndicateLevel.classList.add(`lvl-${lvl}`);
  };

  // событие обновления слайдера 
  mySlider.noUiSlider.on('update', function () {
    let result = Math.round(mySlider.noUiSlider.get());
    lenghtNum.innerHTML = result;
    UpdateActivePasGen();
  });

//Обновление состояние формы активная/не актичная 
  function UpdateActivePasGen() {
    let result = Math.round(mySlider.noUiSlider.get());
    const elPasGen = document.querySelector('.pas-gen');
    if (result && (includeUppercase || includeLowercase || includeNumber || includeSymbol)) {
      elPasGen.classList.add("pas-gen_active");
    } else {
      elPasGen.classList.remove("pas-gen_active");
    }
    UpdateIndicateLevel();
  };

//Копирование пароля
  const elOutput = document.querySelector('.pas-gen__output-container');
  elOutput.addEventListener('click', function () {
    navigator.clipboard.writeText(elOutput.querySelector('.pas-gen__output').innerHTML)
    elOutput.classList.add('copied');
    setTimeout(() => { elOutput.classList.remove("copied"); }, 600);
  });

});


