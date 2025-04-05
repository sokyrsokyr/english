

// Получить случайное слово из массива dictionary
function loadWords() {
    let dictionary = JSON.parse(localStorage.getItem("dictionary")) || []
    let index = Math.floor(Math.random() * dictionary.length);
    return dictionary[index];
}

// Загружаем голос

function speakWord(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Показ слов при нажатии на кнопку
function displayWords() {
    const sentences = document.getElementById("sentences");
    const placeForText = document.getElementById("placeForSentence");
    let numbers = +prompt("Введите количество слов:");
    let dictionary = JSON.parse(localStorage.getItem("dictionary")) || []

    

    // Проверка на корректность
    if (isNaN(numbers) || numbers <= 0) {
        alert("Введите корректное положительное число!");
        return;
    }

    if (numbers > 7) {
        alert("Введите число от 1 до 7");
        return;
    }

    if (numbers > dictionary.length) {
        alert (`У вас только ${dictionary.length} слов в словаре!`)
        return
    }

    // Найти или создать блок отображения
    let displayForSentence = document.getElementById("displayForSentence");

    if (!displayForSentence) {
        displayForSentence = document.createElement("div");
        displayForSentence.id = "displayForSentence";
        displayForSentence.classList.add("frame");
        sentences.insertBefore(displayForSentence, placeForText);
    } else {
        displayForSentence.innerHTML = "";
    }

    let randomWords = [];

    // Отобразить слова
    for (let i = 1; i <= numbers; i++) {

        const result = loadWords();
        randomWords.push(result);

    }

    // Функция проверки ответов 

    

    function random () {
        randomWords.forEach(word => {
        const itemOfWords = document.createElement("div")
        itemOfWords.classList.add("itemOfWords-default")
        
        const button = document.createElement("button");
        button.textContent = "🔊"
        button.classList.add("voiceBtn")

        const text = document.createElement("p");
        text.textContent = word.word;
        text.title = word.translation;
        text.classList.add("word");

        const translate = document.createElement("input")
        translate.placeholder = "Перевод"
        translate.classList.add("translate")

        function triggerAnimation(element, className) {
            element.classList.remove(className);
            void element.offsetWidth; // Принудительный reflow
            element.classList.add(className);
        }

        function correctAnswer () {
            triggerAnimation(translate, "correctly");
            const correctAnswer = document.createElement("p")
            correctAnswer.classList.add("answer");
            correctAnswer.textContent = word.translation;
    
            itemOfWords.removeChild(translate)
            itemOfWords.appendChild(correctAnswer)
    
            itemOfWords.classList.toggle("itemOfWords-correct")
            itemOfWords.classList.toggle("itemOfWords-default")
        }

        // Обработчик событий нажатия вне input

        translate.addEventListener("blur", (value) => {

            if (translate.value.trim() === "") {
                return;
            }
            
            if (translate.value.trim() === word.translation) {
                correctAnswer()
            } else {
                triggerAnimation(translate, "wrong")
            }
            
        })

        // Обработчик событий нажатия на enter

        translate.addEventListener("keydown", (event) => {
            
            if (event.key === "Enter") {

                if (translate.value.trim() === "") {
                    return;
                }

                if (translate.value.trim() === word.translation) {correctAnswer() 
                } else {
                    triggerAnimation(translate, "wrong")
                }}
                
        })

        button.addEventListener("click", () => {
            speakWord(word.word)
        })

        displayForSentence.appendChild(itemOfWords)
        itemOfWords.appendChild(button);        
        itemOfWords.appendChild(text);
        itemOfWords.appendChild(translate)
    })
}

random()




// Кнопка обновления
let button = document.getElementById("buttonUpdateWords");

if (!button) {
    button = document.createElement("button");
    button.textContent = "Обновить слова";
    button.id = "buttonUpdateWords";
    sentences.appendChild(button);

    // Обработчик кнопки
    button.addEventListener("click", () => {
        displayForSentence.innerHTML = "";
        randomWords = [];
        for (let i = 1; i <= numbers; i++) {
            const result = loadWords();
            randomWords.push(result);
        }
        random()
    });
}

// Кнопка очистки textarea

let cleanWords = document.getElementById("cleanWords")

if (!cleanWords) {
    cleanWords = document.createElement("button")
    cleanWords.textContent = "Очистить"
    cleanWords.id = "cleanWords"
    cleanWords.classList.add("cleanButtons")
    cleanWords.addEventListener("click", () => {
        document.getElementById("inputText").value = "";
    })
    sentences.appendChild(cleanWords)
}}

// Загрузка фразеологизмов

function loadIdioms () {
    let idioms = JSON.parse(localStorage.getItem("allidioms"))
    let index = Math.floor(Math.random() * idioms.length)
    return idioms[index];
}


// Отображение фразеологизмов

function displayIdiom() {

    const button = document.getElementById("showIdiom");
    if (!button) return
    
    const displayForIdiom = document.getElementById("displayForIdiom")
    const placeForIdiom = document.getElementById("placeForIdiom")

    button.addEventListener("click", () => {
        let displayForIdiom = document.getElementById("displayForIdiom")

        if (!displayForIdiom) {
            displayForIdiom = document.createElement("div")
            displayForIdiom.id = "displayForIdiom"
            idiom.insertBefore(displayForIdiom, placeForIdiom)
        } else {
            displayForIdiom.innerHTML = ""
        }

        const result = loadIdioms();
        

        const itemIdiom = document.createElement("p")
        itemIdiom.innerHTML = `<strong>Идиома:</strong> ${result.idiom}`

        const itemTranslate = document.createElement("p")
        itemTranslate.innerHTML = `<strong>Перевод:</strong> ${result.translate}`

        const itemMeaning = document.createElement("p")
        itemMeaning.innerHTML = `<strong>Значение:</strong> ${result.meaning}`

        const itemExample = document.createElement("p")
        itemExample.innerHTML = `<strong>Пример:</strong> ${result.example}`

        const itemExampleTranslate = document.createElement("p")
        itemExampleTranslate.innerHTML = `<strong>Перевод примера:</strong> ${result.exampleTranslate}` 


        // Кнопка очистки textarea

        let cleanIdioms = document.getElementById("cleanIdioms")
        if (!cleanIdioms) {
            cleanIdioms = document.createElement("button")
            cleanIdioms.textContent = "Очистить"
            cleanIdioms.classList.add("cleanButtons")
            cleanIdioms.id = "cleanIdioms"
            cleanIdioms.addEventListener("click", () => {
                document.getElementById("inputText2").value = "";
            })
            document.getElementById("idiom").appendChild(cleanIdioms)
        }
        


        displayForIdiom.appendChild(itemIdiom)
        displayForIdiom.appendChild(itemTranslate)
        displayForIdiom.appendChild(itemMeaning)
        displayForIdiom.appendChild(itemExample)
        displayForIdiom.appendChild(itemExampleTranslate)
        

        })
    }

displayIdiom()


// Обработчки событый на кнопку Ввести количество слов

const showWords = document.getElementById("showWords")

if (showWords) {
    showWords.addEventListener("click", displayWords)
}

// Обработчик кнопки гамбургер меню
document.getElementById("showHide").addEventListener("click", () => {
    document.body.classList.toggle("body-hide");
    document.body.classList.toggle("body-show");
    document.getElementById("aside").classList.toggle("aside-hide");
    document.getElementById("aside").classList.toggle("aside-show");
});



