// Добавление слов

let dictionary = JSON.parse(localStorage.getItem("dictionary"));

if (!dictionary) {
    if (!dictionary) {
        dictionary = words.slice(); // ← Копируем внешний массив, чтобы не изменить оригинал
        dictionary.sort((a, b) => a.word.localeCompare(b.word)); // ← Сортируем по алфавиту
        localStorage.setItem("dictionary", JSON.stringify(dictionary)); // ← Сохраняем в localStorage
      }
}


function inputWords() {
    const addWords = document.getElementById("addWords")
    const word = document.getElementById("word")
    const translation = document.getElementById("translation")

    if (addWords) {
        addWords.addEventListener("click", (event) => {

            event.preventDefault();
    
            const wordInput = word.value.trim();
            const translationInput = translation.value.trim();

            const isWordExists = dictionary.some(item =>
                item.word.toLowerCase() === wordInput.toLowerCase())

            if (isWordExists) {
                alert ("Такое слово уже имеется")
                return
            }
    
            if (wordInput === "" || translationInput === "") {
                alert ("Введите слово")
                return
            }
    
            const item = {
                "word": wordInput,
                "translation": translationInput
            }
    
            let list = JSON.parse(localStorage.getItem("dictionary")) || [];
    
            list.push(item)
    
            list.sort((a,b) => a.word.localeCompare(b.word))
    
            localStorage.setItem("dictionary", JSON.stringify(list))
            dictionary = list;
    
            word.value = "";
            translation.value = "";
    
            dictionaryDisplay()
    
        })
    }

    

}

inputWords()



function dictionaryDisplay () {

    
    const displayForDictionary = document.getElementById("dictionary")
    displayForDictionary.innerHTML = "";

    dictionary.forEach((item, index) => {
        let word = document.createElement("div")
        let translate = document.createElement("div")
        let wordItem = document.createElement("div")
        let wordTranslate = document.createElement("div")
        let deletebtn = document.createElement("button")


        word.className = "word";
        translate.className = "translate";
        wordTranslate.className = "wordTranslate";
        wordItem.className = "word-item";
        deletebtn.className = "deletebtn"



        word.textContent = item.word
        translate.textContent = item.translation
        deletebtn.textContent = "Удалить"
        

        deletebtn.addEventListener("click", () => {
            dictionary.splice(index, 1)
            dictionary.sort((a,b) => a.word.localeCompare(b.word))
            localStorage.setItem("dictionary", JSON.stringify(dictionary))
            dictionaryDisplay()
        })
        
        wordItem.appendChild(wordTranslate)
        wordTranslate.appendChild(word)
        wordTranslate.appendChild(translate)
        wordTranslate.appendChild(deletebtn)

        


        
        displayForDictionary.appendChild(wordItem)

    })
}


dictionaryDisplay()

