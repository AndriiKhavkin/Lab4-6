const makeCheckboxElement = (question, answers) => {
    let markupString = `<h2 class="test_title">${question}</h2>
          <fieldset class="variantes">`;
  
    answers.forEach((element) => {
      markupString =
        markupString +
        `<label class="variant">
                  <input id="var1" name="${question}" value="${element}" type="checkbox" />
                  ${element}
              </label>`;
    });
  
    return markupString + "</fieldset>";
  };
  
  const makeSelectElement = (question, answers) => {
    let markupString = `
      <h2 class="test_title">${question}</h2>
          <select name="${question}">`;
  
    answers.forEach((element) => {
      markupString =
        markupString + `<option value="${element}">${element}</option>`;
    });
    return markupString + "</select>";
  };
  
  const makeRadioElement = (question, answers) => {
    let markupString = `<h2 class="test_title">${question}</h2>
          <fieldset class="variantes">`;
  
    answers.forEach((element) => {
      markupString =
        markupString +
        `<label class="variant">
                  <input type="radio" name="${question}" value="${answers[0]}" />
                  ${element}
              </label>`;
    });
  
    markupString = markupString + "</fieldset>";
  
    return markupString;
  };
  
  const makeInputElement = (question) => {
    return `
          <h2 class="test_title">${question}</h2>
          <input type="text" placeholder="Answer..." name="${question}" required />
      `;
  };
  
  export {
    makeCheckboxElement,
    makeSelectElement,
    makeRadioElement,
    makeInputElement,
  };
  