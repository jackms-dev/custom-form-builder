import { isValidString, normalizeToArray } from "./helper.js";

// Custom form builder

// Form is a collection of questions
class Form {
  constructor(name, questions = []) {
    this.name = isValidString(name) ? name : "New Form";
    this.questions = normalizeToArray(questions);
  }
  addQuestion(question) {}
  removeQuestion(question) {}
  hasQuestion(question) {}
  findQuestion(question) {}
  toJSON() {}
}

// Use this to define accepted form question types
function isValidType(type) {
  const formQuestionTypes = ["text", "single select", "multiple select"];
  return formQuestionTypes.some((e) => e == type);
}

class FormQuestion {
  constructor({ question, type, required }) {
    this.question = isValidString(question) ? question : "Untitled";
    this.type = isValidType(type) ? type : null;
    this.required = typeof required === "boolean" ? required : false;
  }
  setQuestion(question) {
    if (isValidString(question) && question != this.question)
      this.question = question;
  }
  setType(type) {
    if (isValidType(type)) this.type = type;
  }
  setRequired(required) {
    if (typeof required === "boolean") this.required = required;
  }
  toggleRequired() {
    this.required = !this.required;
  }
  reset() {
    this.question = "Untitled";
    this.type = null;
    this.required = false;
  }
}

class FormQuestionText extends FormQuestion {
  constructor(props) {
    super({ ...props, type: "text" });
    if (isValidString(props?.text)) this.text = props.text;
    if (isValidString(props?.value)) this.value = props.value;
  }
  setText(text) {}
  setValue(value) {}
}

class FormQuestionOptions {
  constructor({ options = [], value = [], multiple }) {
    this.multiple = typeof multiple === "boolean" ? multiple : false;
    this.options = options.filter((e) => isValidString(e));
    if (this.multiple) {
    }
  }
}

// Figure out how to extend FormQuestionOptions in addition to FormQuestion here
// https://medium.com/@thevirtuoid/extending-multiple-classes-in-javascript-2f4752574e65
class FormQuestionSingleSelect extends FormQuestion {
  constructor(props) {
    super({ ...props, type: "single select" });
    if (Array.isArray(props?.options))
      this.options = options.filter((e) => isValidString(e));
    if (this.options.some((e) => props?.value == e)) this.value = props.value;
  }
  addOption(option) {}
  removeOption(option) {}
}

class FormQuestionMultipleSelect extends FormQuestion {
  constructor(props) {
    super({ ...props, type: "multiple select" });
    this.options = options.filter((e) => isValidString(e));
  }
}
