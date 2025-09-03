// Getting elements
const getEl = (name) => {
  const el = document.querySelector(name);
  return el;
};

const levelContainer = getEl("#lesson-btn-container");
const wordContainer = getEl("#lesson-card-container");

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => {
    btn.classList.add("bg-transparent", "text-navy");
    btn.classList.remove("bg-navy", "text-white");
  });
};

const loadLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const response = fetch(url).then((res) => res.json());
  response.then((response) => {
    const data = response.data;
    displayLevels(data);
  });
};

const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const response = fetch(url).then((res) => res.json());
  response.then((response) => {
    const data = response.data;

    removeActive();
    const activeBtn = getEl(`#lesson-${id}`);
    activeBtn.classList.remove("bg-transparent", "text-navy");
    activeBtn.classList.add("bg-navy", "text-white");

    displayWords(data);
  });
};

const displayLevels = (data) => {
  levelContainer.innerHTML = "";

  data.forEach((level) => {
    const levelDiv = document.createElement("div");

    levelDiv.innerHTML = `
            <button id="lesson-${level.level_no}" type="button" onclick="loadWords(${level.level_no})" class="btn font-semibold text-sm bg-transparent hover:bg-navy hover:text-white border-navy text-navy lesson-btn">
                  <i class="fa-solid fa-book-open"></i>
                  <span>Lesson - ${level.level_no}</span>
            </button>
    `;

    levelContainer.append(levelDiv);
  });
};

const displayWords = (words) => {
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
           <div class="font-siliguri text-center col-span-full py-7">
              <img src="./assets/alert-error.png" class="mx-auto mb-1.5"/>
              <span class="block text-[#79716B] font-normal text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</span>
              <p class="mt-1.5 font-medium text-xl sm:text-2xl md:text-4xl">
                নেক্সট Lesson এ যান
              </p>
            </div>
    `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white p-7 rounded-lg shadow-sm h-full">
              <div class="space-y-4 md:space-y-6 text-center font-inter">
                <h5 class="font-bold text-xl sm:text-2xl">${
                  word.word ? word.word : "Word Not Found"
                }</h5>
                <p class="font-medium sm:text-lg md:text-xl">
                  Meaning /Pronounciation
                </p>
                <span
                  class="font-siliguri font-semibold text-xl sm:text-2xl text-dark-brown opacity-80"
                  >"${
                    word.meaning ? word.meaning : "অর্থ খুজে পাওয়া যাইনি"
                  } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ খুজে পাওয়া যাইনি"
    }"</span>
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
        </div>
    `;

    wordContainer.append(card);
  });
};

// {
//     "id": 81,
//     "level": 1,
//     "word": "Ball",
//     "meaning": "বল",
//     "pronunciation": "বল"
// }

// {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }

loadLevels();
