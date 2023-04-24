let dollars = [200, 400, 600, 800, 1000]

const data = [
  {
    category: "test",
    questions: ["test 1", "test 2", "test 3"],
  },
  {
    category: "foo",
    questions: ["foo A", "foo B", "foo C", "foo D"],
  },
  {
    category: "bar",
    questions: ["bar i", "bar ii", "bar iii", "bar iv", "bar v"],
  },
  {
    category: "baz",
    questions: ["baz one", "baz two", "baz three", "baz four", "baz five"],
  },
]

function setQuestion(question) {
  console.log("set question", question)
  let questionBox = document.getElementById("question")
  questionBox.style.display = "block"
  questionBox.textContent = question
}

function clearQuestion() {
  let questionBox = document.getElementById("question")
  questionBox.style.display = "none"
}

function createGrid() {
  // we created this empty table in the html document and gave it the id "grid"
  let grid = document.getElementById("grid")

  // create the header row for the categories
  let categoryRow = document.createElement("tr")
  // create one grid row for each dollar amount
  let questionRows = dollars.map(() => document.createElement("tr"))
  // add all the new rows to the table
  grid.append(categoryRow, ...questionRows)

  data.forEach(({ category, questions }) => {
    // create a box for the category title and add it to the first row
    let categoryBox = document.createElement("th")
    categoryBox.textContent = category
    categoryRow.appendChild(categoryBox)

    // create boxes for each of the category questions and add them to the appropriate row
    dollars.forEach((amount, i) => {
      let questionBox = document.createElement("td")
      let question = questions[i]
      if (!question) {
        console.error(`no $${amount} question found for category ${category}`)
      }
      questionBox.textContent = "$" + amount
      questionBox.setAttribute("onClick", `setQuestion("${question}")`)
      questionRows[i].appendChild(questionBox)
    })
  })
}

document.addEventListener("DOMContentLoaded", createGrid)