import { testData } from "./test-data.js";
import * as markupService from "./markup-service.js";

const questionsForTest = testData.prepareRandomQuestions();

const startInput = document.getElementById("startInput");

// let startInputFio = document.getElementById('startInput1');
// let startInputGroup = document.getElementById('startInput2');

const startBtn = document.getElementById('startBtn');
const testBtn = document.getElementById('testBtn');
const resultBtn = document.getElementById('endBtn');

const startBlock = document.getElementsByClassName('start_block');
const testBlock = document.getElementsByClassName('test_block');
const resultBlock = document.getElementsByClassName('result_block')

const testForm = document.getElementsByClassName('test_form');

let student = {};
let resultObj = {};

const resultAnswers = [];

function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}

const createTestBlock = (arr) => {
    let questionNum = 1;
    return arr.map((el) => {
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

        insertBefore(child, testForm[0].firstElementChild);
        questionNum++;
    });
};

// class User{

//     constructor(FirstName, SecondName){
//         this.FirstName = FirstName;
//         this.SecondName = SecondName
//     }   

// }

// class Student{


//     constructor(Group, Speciality){
//         this.Group = Group;
//         this.Speciality = Speciality
//     }   

// }

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
        surname: arr[1] || "",
        name: arr[2] || "",
    }

    createTestBlock(questionsArr);

    startBlock[0].style.display = 'none';
    testBlock[0].style.display = 'flex';    
});


let results = [];
let points = 0;

testBtn.addEventListener('click', (e) => {
    e.preventDefault();

    questionsArr.map((el, index) => {
        let form = document.getElementById(`${index + 1}`);
        let formData = new FormData(form);

        results.push({
            question: el.question,
            answers: [],
        })

        for(let [question, answer] of formData) {
            results[index].answers.push(answer);
        }
    })


    for(let i = 0; i < results.length; i++) {
        let correctSort = questionsForTest[i].correctAnswers.sort();
        let resSort = results[i].answers.sort();
        console.log(i)
        console.log(correctSort)
        console.log(resSort)
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
    xhr.setRequestHeader("score", resultObj.points);
    xhr.setRequestHeader(
      "author",
      `${encodeURIComponent(resultObj.group)} ${encodeURIComponent(
        resultObj.surname
      )} ${encodeURIComponent(resultObj.name)}`
    );  
    console.dir(xhr);
    xhr.send();


    testBlock[0].style.display = 'none';
    resultBlock[0].style.display = 'flex';
})

resultBtn.addEventListener('click', () => {
    location.reload();
})