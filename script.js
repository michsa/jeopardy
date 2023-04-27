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

/**
 * A helper function to set a bunch of properties on an HTML element at the
 * same time.
 */
function setProperties(element, properties) {
  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value === "object") setProperties(element[key], value)
    else element[key] = value
  })
}

/**
 * A helper function to create an HTML element and add properties to it at the
 * same time.
 */
function createElement(type, properties) {
  let element = document.createElement(type)
  // setProperties(element, properties)
  Object.entries(properties).forEach(([key, value]) => {
    element[key] = value
  })
  return element
}

/**
 * Displays the "active" screen and sets it to show a particular question,
 * identified by the column (category) and row (dollar value).
 * This is triggered by clicking on a question cell.
 *
 * The active screen is a div element that overlays the grid.  We make it
 * invisible by setting all of its edges to the center of the screen, so that
 * it has 0 width and height.  This lets us use the CSS `transition` property
 * to animate expanding it back to the screen size.
 */
function setActive(column, row) {
  // get the question and answer for the cell we just clicked on
  const { q, a } = data[column].questions[row]

  // we created this empty element in the html document and gave it the id "active"
  let active = document.getElementById("active")
  // update the element's properties to make it visible.
  // in style.css we have it set to animate style changes over 0.5 seconds,
  // so it will appear to expand from the center while fading in.
  setProperties(active, {
    style: { opacity: 1.0, left: 0, right: 0, top: 0, bottom: 0 },
    hidden: false,
    cursor: "pointer",
  })

  let question = createElement("div", {
    className: "question",
    textContent: q,
  })
  let showAnswer = () => {
    let answer = createElement("div", { className: "answer", textContent: a })
    active.appendChild(answer)
    // add a new click handler to return to the grid
    active.addEventListener("click", clearActive, { once: true })
  }

  // wait 0.5 seconds for the animation to finish, and then add the question
  // and the click handler to show the answer.
  setTimeout(() => {
    active.appendChild(question)
    active.addEventListener("click", showAnswer, { once: true })
  }, 500)

  // update state for this question to mark it as completed, so that when we go
  // back to the board it will show the answer and no longer be clickable
  setCompleted(column, row)
}

/**
 *
 */
function clearActive() {
  // 1. update state and refresh the grid
  updateGrid()

  // 2. hide the active question screen
  let active = document.getElementById("active")
  setProperties(active, {
    style: { opacity: 0, left: "50%", right: "50%", top: "50%", bottom: "50%" },
    hidden: true,
    cursor: "default",
  })

  // 3. clear the active question screen (remove the current question & answer)
  active.replaceChildren()
}

/**
 * Sets up the given question cell with the correct dollar value and an event
 * handler that will activate the cell's question when it is clicked.
 */
function initCell(column, row) {
  let cell = document.getElementById(`${column}_${row}`)
  // There are two ways to make things clickable in javascript: setting the
  // `onclick` property, or adding an event listener.  We use `onclick` here
  // because
  cell.onclick = () => setActive(column, row)
  cell.style.cursor = "pointer"

  // add the question and answer
  cell.replaceChildren(
    createElement("div", {
      textContent: `$` + dollars[row],
      className: "value",
    })
  )
}

/**
 * Mark a cell as complete
 */
function completeCell(column, row) {
  let cell = document.getElementById(`${column}_${row}`)

  // remove the click event and change the cursor back to normal
  cell.onclick = null
  cell.style.cursor = "default"

  let { q, a } = data[column].questions[row]
  const [question, answer] = [
    createElement("div", { textContent: q, className: "question" }),
    createElement("div", { textContent: a, className: "answer" }),
  ]
  cell.replaceChildren(question, answer)
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
    questions.forEach(({ q, a }, row) => {
      console.log(
        `updateGrid (${column},${row}), completed ${isCompleted(column, row)}`
      )
      let completed = isCompleted(column, row)

      let handleCell = completed ? completeCell : initCell
      handleCell(column, row)
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

  // figure out how many columns we need, and configure the grid with that amount
  const columns = data.length
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`

  // We store questions by category then row (top-down then left-right), but CSS
  // grids run left-right then top-down.  To make sure we add cells in the right
  // order, we need to add them to temporary "rows" as we go through categories,
  // then dump all the rows into the grid afterward.
  let questionRows = dollars.map(() => [])

  data.forEach(({ category, questions }, column) => {
    if (questions.length != dollars.length) {
      throw Error(
        `Invalid number of questions in category ${category}: expected ${dollars.length} but found ${questions.length}`
      )
    }
    // create a header cell for the category title and add it to grid
    let categoryTitle = createElement("div", {
      className: "category screen",
      // since categories won't change, we can just set the text now
      textContent: category,
    })
    grid.appendChild(categoryTitle)

    questions.forEach(({ q, a }, row) => {
      if (!q || !a) {
        throw Error(
          `Missing question or answer for question ${row + 1} ($${
            dollars[row]
          }) in category ${category}`
        )
      }
      let questionCell = createElement("div", {
        id: `${column}_${row}`,
        className: "screen",
      })
      // identify the cell so we can update its contents later
      questionRows[row].push(questionCell)
    })
  })
  questionRows.forEach((row) => grid.append(...row))

  updateGrid()
}

document.addEventListener("DOMContentLoaded", init)
