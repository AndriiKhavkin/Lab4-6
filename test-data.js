export const testData = {
    questions: [
      {
        question:
          "Який тег відповідає за властивості сторінки (мова, заголовок, ключові слова)?",
        type: "select",
        answers: ["head", "body", "title", "html"],
        correctAnswers: ["head"],
      },
      {
        question: "Чи є HTML мовою програмування?",
        type: "select",
        answers: ["Так", "Ні"],
        correctAnswers: ["Ні"],
      },
      {
        question: "Назвіть парні теги",
        type: "checkbox",
        answers: ["br", "p", "b", "u"],
        correctAnswers: ["p", "b", "u"],
      },
      {
        question: "Теги (H1) ... (H6) використовують для:",
        type: "radio",
        answers: [
          "позначення заголовків різних рівнів",
          "позначення нового абзацу",
          "позначення заголовку таблиці",
          "визначення вигляду заголовка вікна, в якому відображатиметься документ",
        ],
        correctAnswers: ["позначення заголовків різних рівнів"],
      },
      {
        question: "За додавання списків відповідають теги:",
        type: "checkbox",
        answers: ["ul", "ol", "a", "li"],
        correctAnswers: ["ul", "ol", "li"],
      },
      {
        question: "За вирівнювання тексту в абзаці відповідає атрибут:",
        type: "radio",
        answers: ["align", "valign", "font", "h1"],
        correctAnswers: ["align"],
      },
      {
        question: "Які бувають теги?",
        type: "select",
        answers: ["одинарні", "тільки парні", "тільки непарні", "парні, непарні"],
        correctAnswers: ["парні, непарні"],
      },
      {
        question: "За колір фону сторінки відповідає атрибут:",
        type: "radio",
        answers: ["background-color", "color", "font", "body"],
        correctAnswers: ["background-color"],
      },
      {
        question:
          "За допомогою якого тега  можливо вставити малюнок? Напишіть свій варіант:",
        type: "input",
        answers: [],
        correctAnswers: ['img'],
      },
      {
        question:
          "За допомогою якої властивості можна зробити відступи всередені комірки таблиці або іношо обєекта. Напишіть свій варіант:",
        type: "input",
        answers: [],
        correctAnswers: ['padding'],
      },
      {
        question: "Як зробити спливаючу підказку при наведенні на посилання?",
        type: "radio",
        answers: [
          "(a title='Підсказка' href='#')Посилання(/a)",
          "(a caption='Підсказка' href='#')Посилання(/a)",
          "(a alt='Підсказка' href='#')Посилання(/a)",
          "(a caption='Підсказка')Посилання(/a)",
        ],
        correctAnswers: ["(a title='Підсказка' href='#')Посилання(/a)"],
      },
    ],
    randomize(source) {
      let curIndex = source.length,
        tempValue,
        randIndex;
      const destArray = source.slice();
  
      // console.log(source, destArray);
      const arrayLength = destArray.length;
  
      while (curIndex != 0) {
        //randIndex = Math.floor(Math.random() * (arrayLength - 1) + 1);
        randIndex = Math.floor(Math.random() * curIndex);
        curIndex -= 1;
  
        tempValue = destArray[curIndex];
        destArray[curIndex] = destArray[randIndex];
        destArray[randIndex] = tempValue;
      }
  
      console.log(`before =${source},after= ${destArray}`);
  
      return destArray;
    },
  
    prepareRandomQuestions() {
      const randArray = testData.randomize(testData.questions);
  
      randArray.forEach((value, index) => {
        if (value.type === "radio" || value.type === "select") {
          //  console.log(value.answers);
          const tmp = testData.randomize(value.answers);
          randArray[index].answers = tmp;
          // console.log(`index= ${index},
          //     ${value.question},
          //     before =${value.answers},
          //     after= ${tmp},
          //     randArray[index].answers=${randArray[index].answers}`);
          //   console.log(value.answers);
          //  console.log(randArray[index].answers);
        }
      });
  
      return randArray;
    },
  };