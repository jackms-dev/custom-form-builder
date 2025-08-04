import { isValidString, normalizeToArray } from "./helper.js";

// Custom form builder

// Form is a collection of questions
class Form {
  constructor(name, questions = []) {
    this.name = isValidString(name) ? name : "New Form";
    this.questions = normalizeToArray(questions);
  }
  addQuestions(questions) {
    normalizeToArray(questions).forEach((e) => {
      if (e instanceof FormQuestion) this.questions.push(e);
    });
  }
  removeQuestions(questions) {
    normalizeToArray(questions).forEach((e) => {
      const hasQuestion = this.questions.find((q) => q == e);
      if (hasQuestion)
        this.questions.splice(this.indexOfQuestion(hasQuestion), 1);
    });
  }
  questionAtIndex(index) {
    if (typeof index === "number") return this.questions.at(index);
  }
  indexOfQuestion(question) {
    return this.questions.indexOf(question);
  }
  toJSON() {}
}

// Use this to define accepted form question types
function isValidType(type) {
  const formQuestionTypes = [
    "text",
    "select",
    "single-select",
    "multiple-select",
  ];
  return formQuestionTypes.some((e) => e == type);
}

class FormQuestion {
  constructor({ question, value = null, type, required }) {
    this.question = isValidString(question) ? question : "Untitled";
    this.value = value;
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

// Subclasses should decide what the value for FormQuestion.value can be and how to set it.
class FormQuestionText extends FormQuestion {
  constructor(props) {
    super({ ...props, type: "text" });
    this.value = props?.value ? props.value : "";
  }
  setValue(value) {
    if (isValidString(value)) this.value = value;
  }
  clearValue() {
    this.value = "";
  }
}

class FormQuestionOptions {
  constructor({ options = [], multiple }) {
    this.options = options.filter((opt) => isValidString(opt));
    // this.multiple = typeof multiple === "boolean" ? multiple : false;
  }
  addOptions(options) {
    normalizeToArray(options)
      .filter((opt) => isValidString(opt))
      .forEach((opt) => {
        if (!this.hasOption(opt)) {
          this.options.push(opt);
        }
      });
  }
  removeOptions(option) {
    normalizeToArray(option)
      .filter((opt) => isValidString(opt))
      .forEach((opt) => {
        for (const j of this.options) {
          if (j == opt) {
            this.options.splice(this.options.indexOf(j), 1);
          }
        }
      });
  }
  getOption(option) {
    return this.options.find((e) => e == option);
  }
  hasOption(option) {
    return this.options.some((e) => e == option);
  }
  clearOptions() {
    for (const j of this.options) {
      this.options.splice(this.options.indexOf(j), 1);
    }
  }
}

class FormQuestionSelect extends FormQuestion {
  constructor(props) {
    super({ ...props, type: "select" });
    this.type = "select";
    this.options =
      props?.options instanceof FormQuestionOptions
        ? props.options
        : new FormQuestionOptions({
            options: props?.options || [],
            multiple: props?.multiple || false,
          });
    this.value = Array.isArray(props?.value)
      ? props.value.filter((element) =>
          this.options.find((opt) => element == opt)
        )
      : [];
    this.multiple = props?.multiple ?? false;
  }
  setValues(value) {
    normalizeToArray(value).forEach((e) => {
      if (this.options.find((opt) => e == opt))
        multiple ? this.value.push(value) : this.value.splice(0, 1, value);
    });
  }
  removeValues(value) {
    normalizeToArray(value).forEach((e) => {
      if (e == value) this.value.splice(this.value.indexOf(j), 1);
    });
  }
  clearValues() {
    for (const j of this.value) {
      this.value.splice(this.value.indexOf(j), 1);
    }
  }
}

const form = new Form("My form", []);

form.addQuestions([
  new FormQuestionText({
    question: "What is your name?",
    value: null,
    type: "text",
    required: true,
  }),
  new FormQuestionSelect({
    question: "What are your favorite colors? Select multiple.",
    value: null,
    type: "select",
    required: true,
    options: new FormQuestionOptions({
      options: ["red", "orange", "yellow", "green", "blue", "purple"],
      multiple: true,
    }),
  }),
  new FormQuestionSelect({
    question: "What is your favorite animal?",
    value: null,
    type: "select",
    required: false,
    options: new FormQuestionOptions({
      options: ["dog", "cat", "fish"],
      multiple: false,
    }),
  }),
]);

console.log(form.questions[2].options);
