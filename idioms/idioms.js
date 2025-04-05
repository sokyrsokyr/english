function displayIdioms () { 
    const addIdiomsButton = document.getElementById("addIdiomsButton");
    if (addIdiomsButton) {
        addIdiomsButton.addEventListener("click", addIdioms);
    }


    function addIdioms(event) {
        event.preventDefault();

        const idiom = document.getElementById("idiom");
        const translate = document.getElementById("translate");
        const meaning = document.getElementById("meaning");
        const example = document.getElementById("example");
        const exampleTranslate = document.getElementById("exampleTranslate");

        let inputIdiom = idiom.value.trim();
        let inputTranslate = translate.value.trim();
        let inputMeaning = meaning.value.trim();
        let inputExample = example.value.trim();
        let inputExampleTranslate = exampleTranslate.value.trim();

        // Регулярное выражение для проверки допустимых символов
        const validText = /^[A-Za-zА-Яа-яЁё\s.,!?;:()\-'"“”]+$/;

        if (
            inputIdiom === "" ||
            inputTranslate === "" ||
            inputMeaning === "" ||
            inputExample === "" ||
            inputExampleTranslate === ""
        ) {
            alert("Введите информацию");
            return;
        }

        // Проверка всех полей
        if (
            !validText.test(inputIdiom) ||
            !validText.test(inputTranslate) ||
            !validText.test(inputMeaning) ||
            !validText.test(inputExample) ||
            !validText.test(inputExampleTranslate)
        ) {
            alert("Допустимы только буквы, пробелы и знаки препинания.");
            return;
        }

        let item = {
            idiom: inputIdiom,
            translate: inputTranslate,
            meaning: inputMeaning,
            example: inputExample,
            exampleTranslate: inputExampleTranslate,
        };

        console.log(item);

        let list = JSON.parse(localStorage.getItem("allidioms")) || [];
        list.push(item);
        localStorage.setItem("allidioms", JSON.stringify(list));

        idiom.value = "";
        translate.value = "";
        meaning.value = "";
        example.value = "";
        exampleTranslate.value = "";
    }
}

displayIdioms();
