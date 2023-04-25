const dollars = [200, 400, 600, 800, 1000]

const data = [
  {
    category: `Authors`,
    questions: [
      {
        q: `Etiquette expert who wrote in 1928 "How to Behave Though a Debutante"`,
        a: `Emily Post`,
      },
      {
        q: `Tolstoy lived by his own commandments & was eventually excommunicated by this church`,
        a: `(Russian) Orthodox`,
      },
      {
        q: `Varina Davis, daughter of this famous man, wrote the 1895 novel "The Veiled Doctor"`,
        a: `Jefferson Davis`,
      },
      {
        q: `This Elizabethan courtier wrote the sonnet that's the preface to Spenser's "The Faerie Queene"`,
        a: `Sir Walter Raleigh`,
      },
      {
        q: `He was only 5 when the plague ravaged London; he wrote his "Journal of the Plague Year" 57 years later`,
        a: `Daniel Defoe`,
      },
    ],
  },
  {
    category: "U.S. History",
    questions: [
      {
        q: `A U.S. team that played this sport met with Chinese premier Chou-En-lai in 1971`,
        a: `ping-pong`,
      },
      {
        q: `When this Vice President was Grand Marshal of the Rose Parade in 1959, the theme was "Tall Tales and True"`,
        a: `Nixon`,
      },
      {
        q: `During WWI James Montgomery Flagg produced a series of about 45 posters for this purpose`,
        a: `recruiting for the military`,
      },
      {
        q: `It's estimated on May 11, 1934 the Great Plains lost 300 million tons of this`,
        a: `topsoil`,
      },
      {
        q: `Name given to the FDR administration's efforts to improve U.S.-Latin American relations`,
        a: `Good Neighbor Policy`,
      },
    ],
  },
  {
    category: "Africa",
    questions: [
      {
        q: `This ocean separates East Africa from Australia`,
        a: `Indian`,
      },
      {
        q: `This lake in East Central Africa is the largest source of the Nile River`,
        a: `Lake Victoria`,
      },
      {
        q: `Country in which you'd find the Booker T. Washington Institute`,
        a: `Liberia`,
      },
      {
        q: `Shaaban Robert of Tanzania was one of the best-known authors to write in this Bantu language`,
        a: `Swahili`,
      },
      {
        q: `Portuguese explorers who found gold in what's now this country dubbed it the Gold Coast`,
        a: `Ghana`,
      },
    ],
  },
  {
    category: "Theatre",
    questions: [
      {
        q: `A musical set during his final days was titled "Are You Lonesome Tonight?"`,
        a: `"the King", Elvis`,
      },
      {
        q: `In 1598 this playwright acted in Ben Jonson's 1st important play, "Every Man in His Humour"`,
        a: `Shakespeare`,
      },
      {
        q: `The leading characters in "the Lisbon Traviata" are obsessed with this Greek-American diva`,
        a: `Maria Callas`,
      },
      {
        q: `Jason Robards starred in the original 1960 production of her play "Toys in the Attic"`,
        a: `Lillian Hellman`,
      },
      {
        q: `The 2 characters in this Englishman's 1957 play "The Dumb Waiter" are hired killers`,
        a: `Harold Pinter`,
      },
    ],
  },
  {
    category: "Physical Science",
    questions: [
      {
        q: `While it makes up more of the earth's crust than iron, its ore, bauxite, is rarer than iron ore`,
        a: `aluminum`,
      },
      {
        q: `Surgeons now use them to "weld" a detached retina or to remove tattoos`,
        a: `lasers`,
      },
      {
        q: `Willard Libby won a Nobel Prize for showing you can date fossils by the amount of this isotope in them`,
        a: `carbon (carbon 14)`,
      },
      {
        q: `The sun produces its energy through nuclear-fusion, changing hydrogen to this gas`,
        a: `helium`,
      },
      {
        q: `Alberto Santos-Dumont in 1906 was the 1st to do this in Europe, 3 years after it was done in the U.S.`,
        a: `undergo powered flight`,
      },
    ],
  },
  {
    category: "Mythological Words & Phrases",
    questions: [
      {
        q: `"To cut" this "knot" means to solve a difficult problem in an easy, decisive way`,
        a: `Gordian Knot`,
      },
      {
        q: `The expression "hydra-headed" is derived from the many-headed Hydra fought by this hero`,
        a: `Hercules`,
      },
      {
        q: `If you stare at your own reflection constantly, this mythological word fits you perfectly`,
        a: `Narcissus`,
      },
      {
        q: `The name of this banquet hall has come to describe a final resting place for great men`,
        a: `Valhalla`,
      },
      {
        q: `The name of this rock on which a siren sat is now synonymous with "siren"`,
        a: `Lorelai`,
      },
    ],
  },
]

/**
 * A 2D array that stores which questions have already been completed.
 * The first index is the column (category), and the second is the row (dollar
 * amount).
 */
const state = []

// JS is forgiving about array lookups - if the index is out of bounds, it will
// not throw an error, only return `undefined`.  Undefined is "falsy" in JS,
// meaning it evaluates to false in boolean operations like `if` or `!`.
// `!!` (not not) turns a falsy value into `false`.
const isCompleted = (column, row) => !!state?.[column]?.[row]

// JS is also forgiving about setting array values by index even when the index
// is outside the array - it will update the array's length accordingly, making
// a "sparse" array.  We just have to make sure `state[column]` is an array
// before we attempt to look up `row` in it.
const setCompleted = (column, row) => {
  if (!state[column]) state[column] = []
  state[column][row] = true
}

function setActive(column, row) {
  const { q, a } = data[column].questions[row]
  console.log("setActive", { q, a })
  let active = document.getElementById("active")

  let question = document.createElement("div")
  question.className = "active question"
  question.textContent = q
  question.addEventListener("click", () => showAnswer(active, a), {
    once: true,
  })
  active.appendChild(question)
  active.addEventListener("click", () => clearActive(column, row), {
    once: true,
  })
}

function showAnswer(active, a) {
  let answer = document.createElement("div")
  answer.className = "answer"
  answer.textContent = a
  active.appendChild(answer)
}

function clearActive(column, row) {
  // 1. update state and refresh the grid
  setCompleted(column, row)
  updateGrid()

  let active = document.getElementById("active")
  // 2. hide the active question screen
  active.style.display = "none"
  // 3. wipe it clear
  active.replaceChildren()
}

/**
 * Updates each question cell in the grid (not including category titles) to
 * display the proper data:
 *
 * - if the question is incomplete (nothing in `state`), show the dollar value
 *   and add a click handler to select the question
 * - if the question is completed, make it blank i guess
 */
function updateGrid() {
  data.forEach(({ questions }, column) => {
    questions.forEach((_, row) => {
      console.log(`updateGrid (${column},${row}), completed ${isCompleted(column, row)}`)
      let cell = document.getElementById(`${column}_${row}`)
      // clear out the cell's contents
      cell.replaceChildren()

      if (!isCompleted(column, row)) {
        const value = document.createElement("div")
        value.textContent = `$` + dollars[row]
        value.className = "value"
        value.addEventListener("click", () => setActive(column, row), { once: true})
        cell.append(value)
      }
    })
  })
}

/**
 * Initialize the jeopardy grid.  This function creates the necessary rows and
 * cells, adds category titles to each column, and validates that question data
 * is formatted correctly.
 */
function init() {
  // we created this empty table in the html document and gave it the id "grid"
  let grid = document.getElementById("grid")

  // create the header row for the categories
  let categoryRow = document.createElement("tr") // stands for "table row"
  // create one grid row for each dollar amount
  let questionRows = dollars.map(() => document.createElement("tr"))
  // add all the new rows to the table
  grid.append(categoryRow, ...questionRows)

  data.forEach(({ category, questions }, column) => {
    if (questions.length != dollars.length) {
      throw Error(
        `Invalid number of questions in category ${category}: expected ${dollars.length} but found ${questions.length}`
      )
    }

    // create a header cell for the category title and add it to the category row
    let categoryTitle = document.createElement("th") // "table header"
    // since categories won't change, we can just set the text now
    categoryTitle.textContent = category
    categoryRow.appendChild(categoryTitle)

    questions.forEach(({ q, a }, row) => {
      if (!q || !a) {
        throw Error(
          `Missing question or answer for question ${row + 1} ($${
            dollars[row]
          }) in category ${category}`
        )
      }
      let cell = document.createElement("td")
      // identify the cell so we can update its contents later
      cell.id = `${column}_${row}`
      questionRows[row].appendChild(cell)
    })
  })

  updateGrid()
}

document.addEventListener("DOMContentLoaded", init)
