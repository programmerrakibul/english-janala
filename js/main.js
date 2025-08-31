// Getting elements
const getEl = (name) => {
  const el = document.querySelector(name);
  return el;
};

const lessonNameURL = "https://openapi.programming-hero.com/api/levels/all";
const lessonURL = "https://openapi.programming-hero.com/api/words/all";

const btnContainer = getEl("#lesson-btn-container");
const lessonCardContainer = getEl("#lesson-card-container");

function makeLessonButton(lessonNameArray) {
  lessonNameArray.forEach((lesson, i) => {
    const { lessonName } = lesson;

    const button = document.createElement("button");
    button.className = `btn font-semibold text-sm bg-transparent hover:bg-navy hover:text-white border-navy text-navy lesson-btn lesson-btn-${
      i + 1
    }`;
    button.type = "button";
    button.innerHTML = `
              <i class="fa-solid fa-book-open"></i>
              <span>${lessonName}</span>
    `;

    btnContainer.append(button);
  });
}

function makeLessonCards(lessonArray) {
  lessonArray.forEach((lesson) => {
    const { meaning, pronunciation, word } = lesson;
    const div = document.createElement("div");
    div.className = "bg-white p-7 rounded-lg shadow-sm";
    div.innerHTML = `
              <div class="space-y-4 md:space-y-6 text-center font-inter">
                <h5 class="font-bold text-xl sm:text-2xl">${word}</h5>
                <p class="font-medium sm:text-lg md:text-xl">
                  Meaning /Pronounciation
                </p>
                <span
                  class="font-siliguri font-semibold text-xl sm:text-2xl text-dark-brown opacity-80"
                  >"${meaning} / ${pronunciation}"</span
                >
              </div>
              <div class="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  aria-label="Info Button"
                  class="btn bg-vivid border-none rounded-lg text-[#374957] text-sm sm:text-lg md:text-xl p-0 size-9 md:size-12"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button
                  type="button"
                  aria-label="Speaker Button"
                  class="btn bg-vivid border-none rounded-lg text-[#374957] text-sm sm:text-lg md:text-xl p-0 size-9 md:size-12"
                >
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
    `;

    lessonCardContainer.append(div);
  });
}

(async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  const lessons = data.data;

  makeLessonButton(lessons);
  return lessons;
})(lessonNameURL);

(async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  const lessons = data.data;

  makeLessonCards(lessons);
})(lessonURL);

function addColors(btn) {
  const btns = document.querySelectorAll(".lesson-btn");

  btns.forEach((btn) => {
    btn.classList.replace("text-white", "text-navy");
    btn.classList.replace("bg-navy", "bg-transparent");
  });
  btn.classList.replace("text-navy", "text-white");
  btn.classList.replace("bg-transparent", "bg-navy");
}

btnContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".lesson-btn");
  if (button) {
    addColors(button);
  }
});
