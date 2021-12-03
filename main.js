let score;
let changeBgBtn = document.querySelector("#changeBg");
let getResult = document.querySelector("#getResult");
let inputs = document.querySelectorAll("input");
let result = document.querySelector("#result");
let info = document.querySelector(".info");

let questionsInfo = [
  {
    id: "q1",
    correctAnswer: "What's Going On",
    infoText: `This protest anthem was a powerful and groundbreaking song at the time of its release in 1971, but fast forward 50 years later and it is sadly still just as relevant for the world in 2021.`,
  },
  {
    id: "q2",
    correctAnswer: "Cher",
    infoText: `Do you 'Believe' in life after Auto-Tune? The modern sound of the 1998 hit has shaped the music industry today. Since Believe's release, countless songs and artists have relied on Auto-Tune - for better or worse.`,
  },
  {
    id: "q3",
    correctAnswer:
      "Well, you can tell by the way I use my walk, I'm a woman's man",
    infoText: `"...no time to talk"`,
  },
  {
    id: "q4",
    correctAnswer: "False",
    infoText: `Bowie's eyes were blue. A fight in his childhood resulted in one pupil to become permanently dilated. Because the pupil in his left eye was so large, it appeared black and made it look as though his eyes were different colors.`,
  },
  {
    id: "q5",
    correctAnswer: "True",
    infoText: "Wow. Just wow.",
  },
  {
    id: "q6",
    correctAnswer: "False",
    infoText: `The genius was called 'The Genius' and began to lose his sight at the age of 5. By the age of 7 he was completely blind.`,
  },
  {
    id: "q7",
    correctAnswer: "Lauryn Hill, Pras, Wyclef Jean",
    infoText: `Ready or not, Fugees will reunite for a 2021 reunion to celebrate the 25th anniversary of their Grammy-winning album 'The Score'.`,
  },
];

changeBgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let body = document.querySelector("body");
  body.classList.toggle("dark-mode");
});

let controlAllChecked = () => {
  let checkedBoxes = 0;
  let checkedButtons = 0;
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox" && inputs[i].checked) {
      checkedBoxes += 1;
    } else if (inputs[i].type == "radio" && inputs[i].checked) {
      checkedButtons += 1;
    }
  }
  if ((checkedButtons < 6 && checkedBoxes !== 3) || checkedBoxes !== 3) {
    alert("Please answer all questions. Last question requires three answers!");
    return false;
  } else if (checkedButtons < 6) {
    alert("Please answer all questions!");
    return false;
  } else {
    return true;
  }
};

let getAllChecked = () => {
  if (controlAllChecked()) {
    score = 0;
    let correctBoxes = 3;
    let checkedBoxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    let checkedRadios = document.querySelectorAll(
      "input[type='radio']:checked"
    );
    let filteredBoxes = Array.from(checkedBoxes).filter(
      (input) => input.value === "correct"
    );
    if (
      checkedBoxes.length === correctBoxes &&
      filteredBoxes.length === correctBoxes
    ) {
      score++;
    }
    checkedRadios.forEach((checked) => {
      if (checked.value === "correct") {
        score++;
      }
    });
    return score;
  }
};

getResult.addEventListener("click", (e) => {
  e.preventDefault();
  getAllChecked();
  let resultContainer = document.querySelector(".resultContainer");
  result.innerText = "";
  if (score !== undefined) {
    resultContainer.style.display = "block";
    result.textContent = `Your final score is ${score} out of 7`;
    addInfo();
    inputs.forEach((checked) => {
      if (checked.value === "correct") {
        checked.parentElement.style.background = "green";
      } else if (checked.checked) {
        checked.parentElement.style.background = "red";
      }
    });
    inputs.forEach((checked) => {
      if (checked.value === "correct" && checked.checked) {
        checked.parentElement.style.background = "green";
      } else if (checked.checked) {
        checked.parentElement.style.background = "red";
      }
    });
  }
  if (score === 7) {
    result.style.color = "green";
  } else if (score >= 4) {
    result.style.color = "orange";
  } else if (score > 0) {
    result.style.color = "red";
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

let addInfo = () => {
  let questions = document.querySelectorAll("legend");
  for (i = 0; i < questionsInfo.length; i++) {
    questions[i].innerText += `\n \n ${questionsInfo[i].infoText}`;
  }
};
