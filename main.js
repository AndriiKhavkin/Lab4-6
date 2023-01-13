let startInputFio = document.getElementById('startInput1');
let startInputGroup = document.getElementById('startInput2');

let startBtn = document.getElementById('startBtn');
let testBtn = document.getElementById('testBtn');
let resultBtn = document.getElementById('endBtn');

let startBlock = document.getElementsByClassName('start_block');
let testBlock = document.getElementsByClassName('test_block');
let resultBlock = document.getElementsByClassName('result_block')

let testForm = document.getElementsByClassName('test_form');

let resultAnswers = [];

function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}

const arrayShuffle = (arr) => {

    let currentIndex = arr.length, temporaryValue, randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

let questionsArr = [
    {
        question: 'Який тег відповідає за властивості сторінки (мова, заголовок, ключові слова)?',
        type: 'select',
        answers: ['head', 'body', 'title', 'html'],
        correctAnswers: ['head']
    },
    {
        question: 'Чи є HTML мовою програмування?',
        type: 'select',
        answers: ['Так', 'Ні'],
        correctAnswers: ['Ні']
    },
    {
        question: 'Назвіть парні теги',
        type: 'checkbox',
        answers: ['br', 'p', 'b', 'u'],
        correctAnswers: ['p', 'b', 'u']
    },
    {
        question: 'Теги (H1) ... (H6) використовують для:',
        type: 'radio',
        answers: ['позначення заголовків різних рівнів', 'позначення нового абзацу', 'позначення заголовку таблиці', 'визначення вигляду заголовка вікна, в якому відображатиметься документ'],
        correctAnswers: ['позначення заголовків різних рівнів']
    },
    {
        question: 'За додавання списків відповідають теги:',
        type: 'checkbox',
        answers: ['ul', 'ol', 'a', 'li'],
        correctAnswers: ['ul', 'ol', 'li']
    },
    {
        question: "За вирівнювання тексту в абзаці відповідає атрибут:",
        type: 'radio',
        answers: ['align', 'valign', 'font', 'h1'],
        correctAnswers: ['align']
    },
    {
        question: 'Які бувають теги?',
        type: 'select',
        answers: ['одинарні', 'тільки парні', 'тільки непарні', 'парні, непарні'],
        correctAnswers: ['парні, непарні']
    },
    {
        question: "За колір фону сторінки відповідає атрибут:",
        type: 'radio',
        answers: ['bgcolor', 'color', 'font', 'body'],
        correctAnswers: ['bgcolor']
    },
    {
        question: 'За допомогою якого тега  можливо вставити малюнок? Напишіть свій варіант:',
        type: 'input',
        answers: [],
        correctAnswers: ["'document.getElementById('img')"]
    },
    {
        question: 'За допомогою якої властивості можна зробити відступи всередені комірки таблиці або іношо обєекта. Напишіть свій варіант:',
        type: 'input',
        answers: [],
        correctAnswers: ["document.getElementById('padding')"]
    },
    {
        question: 'Як зробити спливаючу підказку при наведенні на посилання?',
        type: 'radio',
        answers: ['(a title="Підсказка" href="#")Посилання(/a)', '(a caption="Підсказка" href="#")Посилання(/a)', '(a alt="Підсказка" href="#")Посилання(/a)', '(a caption="Підсказка"  )Посилання(/a)'],
        correctAnswers: ['(a title="Підсказка" href="#")Посилання(/a)']
    },
];

const createCheckboxElement = (question, answers) => {
    return `
        <div class="test_title">${question}</div>
        <div class="variantes">
            <div class="variant">
                <input id="var1" name="${question}" value="${answers[0]}" type="checkbox" />
                <label for="${question}">${answers[0]}</label>
            </div>
            <div class="variant">
                <input id="var2" name="${question}" value="${answers[1]}" type="checkbox" />
                <label for="${question}">${answers[1]}</label>
            </div>
            <div class="variant">
                <input id="var3" name="${question}" value="${answers[2]}" type="checkbox" />
                <label for="${question}">${answers[2]}</label>
            </div>
            <div class="variant">
                <input id="var4" name="${question}" value="${answers[3]}" type="checkbox" />
                <label for="${question}">${answers[3]}</label>
            </div>
        </div>`
}

const createSelectElement = (question, answers) => {
    return `
    <div class="test_title">${question}</div>
        <select name="${question}">
            <option value="${answers[0]}">${answers[0]}</option>
            <option value="${answers[1]}">${answers[1]}</option>
            <option value="${answers[2]}">${answers[2]}</option>
            <option value="${answers[3]}">${answers[3]}</option>
        </select>
    </div>`
}

const createRadioElement = (question, answers) => {
    return `
        <div class="test_title">${question}</div>
        <div class="variantes">
            <div class="variant">
                <input type="radio" id="contact1" name="${question}" value="${answers[0]}" />
                <label for="${question}">${answers[0]}</label>
            </div>
            <div class="variant">
                <input type="radio" id="contact2" name="${question}" value="${answers[1]}" />
                <label for="${question}">${answers[1]}</label>
            </div>
            <div class="variant">
                <input type="radio" id="contact3" name="${question}" value="${answers[2]}" />
                <label for="${question}">${answers[2]}</label>
            </div>
            <div class="variant">
                <input type="radio" id="contact4" name="${question}" value="${answers[3]}" />
                <label for="${question}">${answers[3]}</label>
            </div>
        </div>`
}

const createInputElement = (question) => {
    return `
        <div class="test_title">${question}</div>
        <input type="text" placeholder="Answer..." name="${question}" required />
    `
}

const createTestBlock = (arr) => {
    let questionNum = 1;
    return arr.map(el => {
        let shuffledAnswers = arrayShuffle(el.answers);
        const child = document.createElement('form');
        child.className = 'test_item';
        child.id = questionNum;

        switch(el.type) {
            case 'checkbox':
                child.innerHTML = createCheckboxElement(el.question, shuffledAnswers);
                break;
            case 'select':
                child.innerHTML = createSelectElement(el.question, shuffledAnswers);
                break;
            case 'radio':
                child.innerHTML = createRadioElement(el.question, shuffledAnswers);
                break;
            case 'input':
                child.innerHTML = createInputElement(el.question, shuffledAnswers);
                break;
        }

        insertBefore(child, testForm[0].firstElementChild)
        questionNum++;
    })
}

class User{

    constructor(FirstName, SecondName){
        this.FirstName = FirstName;
        this.SecondName = SecondName
    }   

}

class Student{


    constructor(Group, Speciality){
        this.Group = Group;
        this.Speciality = Speciality
    }   



}

startBtn.addEventListener('click', (e) => {
    // e.preventDefault()
    // let name = startInputFio.value.trim();
    // let group = startInputGroup.value.trim();
    
    // if (name.length === 0 || group.length === 0){
    //     alert("Введені пусті значення!")
    //     return;
    // }

    // let arr = name.split(' ');
        
    // const user =  new User(arr[0],arr[1]);
    // const student =  new Student(group, 122);

    // student = {
    //     group: arr[0],
    //     surname: arr[1] || '',
    //     name: arr[2] || ''
    // }

    e.preventDefault()

    let name = startInputFio.value;
    let arr = name.split(' ');
    
    student = {
        group: arr[0],
        surname: arr[1],
        name: arr[2]
    }

    createTestBlock(questionsArr);

    startBlock[0].style.display = 'none';
    testBlock[0].style.display = 'flex';    
});



testBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let results = [];
    let points = 0;

    questionsArr.map((el, index) => {
        let form = document.getElementById(`${index + 1}`);
        let formData = new FormData(form);

        results.push({
            question: el.question,
            answers: []
        })

        for(let [question, answer] of formData) {
            results[index].answers.push(answer);
        }
    })


    for(let i = 0; i < results.length; i++) {
        let correctSort = questionsArr[i].correctAnswers.sort();
        let resSort = results[i].answers.sort();

        if(JSON.stringify(correctSort) === JSON.stringify(resSort))
            points += 1;
    }

    resultObj = {
        ...student,
        points
    }

    var madeBy = document.getElementsByClassName('result_score1');
    var score = document.getElementsByClassName('result_score2');
    madeBy[0].innerHTML = `Виконав: ${resultObj.group} ${resultObj.surname} ${resultObj.name}`
    score[0].innerHTML = `Оцінка: ${resultObj.points}/10`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/");

    console.dir(xhr);
    console.log(resultObj);
    xhr.setRequestHeader('score', resultObj.points);
    xhr.setRequestHeader('author', `${resultObj.group} ${resultObj.surname} ${resultObj.name}`);
    xhr.send();


    testBlock[0].style.display = 'none';
    resultBlock[0].style.display = 'flex';
})

resultBtn.addEventListener('click', () => {
    location.reload();
})