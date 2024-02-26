# Jeopardy

![Jeopardy grid with some questions answered](img/grid.png)

<img src="img/question.png" width="50%" /><img src="img/answer.png" width="50%" />

A simple Jeopardy simulator, primarily meant as an educational tool for presentations (which is why finished questions and answers are shown on the grid, unlike in real Jeopardy).

To use, just download the files, replace the sample data with your own, and open `jeopardy.html` in your browser of choice.

Sample game data (from the first round of the real Jeopardy game that aired on Nov 26, 1991) is at the top of `script.js`. To use your own data, replace the stuff in the `data` array with your own categories, questions and answers in the same format. You can include however many categories you like, though each category should have exactly as many questions as there are values in the `dollars` array -- if there are more they will be ignored, and if there are fewer you'll end up with blank cells.

## Features

* Pure vanilla HTML/CSS/JS -- stupid fast, runs in all browsers, 100% portable (no compilation needed)
* Scales to any screen size and aspect ratio (landscape strongly recommended)
* Snazzy CSS animation
* Classic Jeopardy Look & Feel

#### Beginner-friendly source code

I wrote this app for my dad, who understands software but isn't familiar with HTML, CSS or JavaScript, and who always wants to know how things work. My secondary goal for this project was for him (and anyone in his shoes) to be able to understand the code just by reading it, so I stuffed it full of comments and generally tried to make it as clear as I could. I hope it's helpful!

### Non-features

Stuff that's outside the scope of this project:

* Any kind of scorekeeping
* Double jeopardy
* Multiple boards (you'll need to modify - or duplicate - the files if you want to play more than one round)
* Sound effects (actually would be pretty cool, but I doubt I'd ever get around to it, and they're probably not free anyway)

## Console commands

If for some reason you need to, you can run the following in the browser console:

* `init()` -- reset the whole grid
* `initCell(column, row)` -- reset a single cell. (Note: columns and rows are zero-indexed, so the $400 question (second row) of the leftmost column would be `(0, 1)`)
