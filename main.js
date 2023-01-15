import { testData } from "./test-data.js";
import * as markupService from "./markup-service.js";
import { Student, Progress } from "./classes.js";

const SPECIALITY = "Спеціальність";
const TEST = "HTML";


let questionsForTest = []; // testData.prepareRandomQuestions();

const startInput = document.getElementById("startInput");

const startBtn = document.getElementById("startBtn");
const testBtn = document.getElementById("testBtn");
const resultBtn = document.getElementById("endBtn");

const startBlock = document.querySelector(".start_block");
const testBlock = document.querySelector(".test_block");
const resultBlock = document.querySelector(".result_block");

const testForm = document.querySelector(".test_form");

let student = {};
let resultObj = {};
let results = [];
let points = 0;

const progress = new Progress({});

const resultAnswers = [];

function insertBefore(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode);
}

const createTestBlock = (arr) => {
  let questionNum = 1;
  return arr.map((el) => {
    const child = document.createElement("form");
    child.className = "test_item";
    child.id = questionNum;

    switch (el.type) {
      case "checkbox":
        child.innerHTML = markupService.makeCheckboxElement(
          el.question,
          el.answers
        );
        break;
      case "select":
        child.innerHTML = markupService.makeSelectElement(
          el.question,
          el.answers
        );
        break;
      case "radio":
        child.innerHTML = markupService.makeRadioElement(
          el.question,
          el.answers
        );
        break;
      case "input":
        child.innerHTML = markupService.makeInputElement(
          el.question,
          el.answers
        );
        break;
    }

    insertBefore(child, testForm.firstElementChild);
    questionNum++;
  });
};

const clearTestBlock = () => {
  [...testForm.getElementsByClassName("test_item")].forEach((element) => {
    console.log("remove:", element);
    element.remove();
  });
  //console.log("end of clearing");
};

startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  questionsForTest = testData.prepareRandomQuestions();

  let name = startInput.value;
  let arr = name.split(" ");

  student = {
    group: arr[0],
    surname: arr[1] || "",
    name: arr[2] || "",
  };

  createTestBlock(questionsForTest);

  startBlock.classList.add("is-hidden");
  testBlock.classList.remove("is-hidden");
});

testBtn.addEventListener("click", (e) => {
  e.preventDefault();

  results = [];
  points = 0;

  questionsForTest.map((el, index) => {
    let form = document.getElementById(`${index + 1}`);
    let formData = new FormData(form);

    results.push({
      question: el.question,
      answers: [],
    });

    for (let [question, answer] of formData) {
      results[index].answers.push(answer);
    }
  });

  for (let i = 0; i < results.length; i++) {
    let correctSort = questionsForTest[i].correctAnswers.sort();
    let resSort = results[i].answers.sort();

    console.log(JSON.stringify(correctSort), JSON.stringify(resSort));

    if (JSON.stringify(correctSort) === JSON.stringify(resSort)) points += 1;
  }

  resultObj = {
    ...student,
    points,
    count: questionsForTest.length,
  };

  const madeBy = document.querySelector(".result_score1");
  const score = document.querySelector(".result_score2");
  madeBy.innerHTML = `Виконав: ${resultObj.group} ${resultObj.surname} ${resultObj.name}`;
  score.innerHTML = `Оцінка: ${resultObj.points}/${resultObj.count}`;

  progress.addAttempt({
    fio: `${resultObj.surname} ${resultObj.name}`,
    group: student.group,
    score: resultObj.points,
    speciality: SPECIALITY,
    test: TEST,
  });

  progress.showInfo();

  const json = JSON.stringify(progress.getInfo());

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/");

  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

  xhr.setRequestHeader("score", resultObj.points);
  xhr.setRequestHeader("count", resultObj.count);

  xhr.setRequestHeader(
    "author",
    `${encodeURIComponent(resultObj.group)} ${encodeURIComponent(
      resultObj.surname
    )} ${encodeURIComponent(resultObj.name)}`
  );

  // console.dir(xhr);

  xhr.send(json);

  testBlock.classList.add("is-hidden");
  resultBlock.classList.remove("is-hidden");
});

resultBtn.addEventListener("click", () => {
  //location.reload();

  clearTestBlock();
  //console.log('show startblock';)
  startBlock.classList.remove("is-hidden");
  resultBlock.classList.add("is-hidden");
});
