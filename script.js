let currentQuestionIndex = 0;
let selectedLang = "";

// Objeto para almacenar los filtros seleccionados
const filters = {}; 

const questions = [
    {
        es: {
            question: "¿Como de grande es tu casa?",
            answers: ["Pequeña", "Mediana", "Grande"],
          },
        en: {
            question: "How big is your house?",
            answers: ["Small", "Medium", "Large"],
          },
        value: ["small", "medium", "large"]
    },
    {
        es: {
            question: "¿Cuánto tiempo puedes dedicar a paseos diarios?",
            answers: ["Menos de 30'", "Entre 30' y 1h", "Más de 1h"],
          },
        en: {
            question: "How much time can you dedicate to taking out the dog?",
            answers: ["Less than 30'", "Between 30' and 1h", "More than 1h"],
          },
        value: ["low","medium","high"]
    },
    {
        es: {
            question: "¿Eres o hay niños en casa?",
            answers: ["Sí", "No"],
          },
        en: {
            question: "Are you or are there kids in the house?",
            answers: ["Yes", "No"],
          },
        value: ["yes", "no"]
    }
];

// Define the content for different languages
const content = {
    es: {
      title: 'Encuentra tu perro ideal',
      start_button: 'Empieza el Quizz',
      restart_button: 'Volver',
      start_message: "Empieza el quizz y encuentra tu perro ideal!",
      end_message: "¡Hemos encontrado los perros ideales para ti!"
    },
    en: {
      title: 'Find your perfect dog',
      start_button: 'Start the Quizz',
      restart_button: 'Return',
      start_message: "Start the Quizz and find your ideal dog!",
      end_message: "These are your ideal dogs!"
    }
  };

// Array de razas de perros con sus características
const dogBreeds = [
    { name: "Chihuahua", size: "small", energy: "low", goodWithKids: "no", image: "assets/css/images/Chihuahua.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Golden Retriever", size: "large", energy: "high", goodWithKids: "yes", image: "assets/css/images/Golden Retriever.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Beagle", size: "medium", energy: "medium", goodWithKids: "yes", image: "assets/css/images/Beagle.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Labrador Retriever", size: "large", energy: "high", goodWithKids: "yes", image: "assets/css/images/Labrador Retriever.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Bulldog", size: "medium", energy: "low", goodWithKids: "yes", image: "assets/css/images/Bulldog.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Poodle", size: "medium", energy: "high", goodWithKids: "yes", image: "assets/css/images/Poodle.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Dachshund", size: "small", energy: "medium", goodWithKids: "no", image: "assets/css/images/Dachshund.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Boxer", size: "large", energy: "high", goodWithKids: "yes", image: "assets/css/images/Boxer.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Siberian Husky", size: "large", energy: "high", goodWithKids: "yes", image: "assets/css/images/Siberian Husky.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Yorkshire Terrier", size: "small", energy: "medium", goodWithKids: "no", image: "assets/css/images/Yorkshire Terrier.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "French Bulldog", size: "medium", energy: "low", goodWithKids: "yes", image: "assets/css/images/French Bulldog.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Cocker Spaniel", size: "medium", energy: "medium", goodWithKids: "yes", image: "assets/css/images/Cocker Spaniel.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Shih Tzu", size: "small", energy: "low", goodWithKids: "yes", image: "assets/css/images/Shih Tzu.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Rottweiler", size: "large", energy: "high", goodWithKids: "yes", image: "assets/css/images/Rottweiler.png", es: {text: "texto"}, en: {text: "text"}},
    { name: "Pug", size: "small", energy: "low", goodWithKids: "yes", image: "assets/css/images/Pug.png", es: {text: "texto"}, en: {text: "text"}}
];

setInitState()
setDogCards()

// Cargar la primera pregunta
function loadQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('quizz-question').innerText = currentQuestion[selectedLang].question;

    const buttons = document.querySelectorAll('#questions-panel button');

    buttons.forEach((button, index) => {
        if (currentQuestion[selectedLang].answers[index]) {
            button.innerText = currentQuestion[selectedLang].answers[index];
            button.style.display = 'inline';
            button.onclick = () => answerQuestion(currentQuestion.value[index]);
        } else {
            button.style.display = 'none';
        }
    });
}

function changeQuestionsPanelLanguage() {

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('quizz-question').innerText = currentQuestion[selectedLang].question;

    const buttons = document.querySelectorAll('#questions-panel button');

    buttons.forEach((button, index) => {
            button.innerText = currentQuestion[selectedLang].answers[index];
    });
}

function answerQuestion(value) {
    // Almacena la respuesta seleccionada
    if (currentQuestionIndex === 0) {
        filters.size = value.toLowerCase();
    } else if (currentQuestionIndex === 1) {
        filters.energy = value.toLowerCase();
    } else if (currentQuestionIndex === 2) {
        filters.goodWithKids = value.toLowerCase() ;
    }

    // Filtra los perros según las respuestas acumuladas
    filterDogs();

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) 
        {
        loadQuestion(); // Carga la siguiente pregunta
        } 
    else {
        document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
        document.getElementById('restart-button').style.display = 'inline'; // Muestra el botón de reinicio
        document.getElementById('end-message').style.display = 'inline'; // Muestra el botón de reinicio
        }
}

function setInitState()
{
    const userLang = navigator.language || navigator.userLanguage;
    currentQuestionIndex = 0

    // set initial Language
    if (userLang.startsWith('es') && selectedLang == "") 
        {
            setLanguage('es');
        } 
    if (userLang.startsWith('en') && selectedLang == "") 
        {
        setLanguage('en');
        }

    // Elements to be shown at the start
    document.getElementById('start-message').style.display = 'inline';
    document.getElementById('start-button').style.display = 'inline';
    document.getElementById('questions-panel').style.display = 'inline';

    // Elements to be hidden at the start
    document.getElementById('quizz-question').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('end-message').style.display = 'none';

    let quizzAnswers = document.querySelectorAll('#questions-panel button');
    quizzAnswers.forEach(answer => {answer.style.display = 'none';});


}

function startQuizz()
{
    document.getElementById('quizz-question').style.display = 'inline';
    document.getElementById('quizz-answer').style.display = 'inline';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-message').style.display = 'none';
    loadQuestion()
}

function setDogCards() {
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dogImage = card.querySelector('.dog-image');
        const dogNameElement = card.querySelector('.dog-name');
        const dogDescriptionElement = card.querySelector('.dog-description');

        const dog = dogBreeds.find(dog => dog.name === dogName);

        dogNameElement.textContent = dog.name;
        dogDescriptionElement.textContent =  dog[selectedLang].text;
        dogImage.src = dog.image;
    });
}

function filterDogs() {
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dog = dogBreeds.find(dog => dog.name === dogName);

        let matches = true;

        // Verifica los filtros acumulados
        if (filters.size && dog.size.toLowerCase() !== filters.size.toLowerCase()) {
            matches = false;
        }
        if (filters.energy && dog.energy.toLowerCase() !== filters.energy.toLowerCase()) {
            matches = false;
        }
        if (filters.goodWithKids && dog.goodWithKids.toLowerCase() !== filters.goodWithKids.toLowerCase()) {
            matches = false;
        }

        // Muestra u oculta la tarjeta del perro según el filtro
        if (matches)
        {
            card.classList.remove('hidden'); // Show matching dogs
            card.style.display = 'block'; // Ensure it is displayed
        }
        else
        {
            card.classList.add('hidden'); // Hide non-matching dogs
            card.style.display = 'none'; // Remove it from the layout flow      
        }
        /*card.style.display = matches ? 'block' : 'none';*/
    });
}

function resetFilters() {
    // Clear all the filters
    filters.size = null;
    filters.energy = null;
    filters.goodWithKids = null;

    // Make sure all dog cards are visible
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        card.classList.remove('hidden'); // Remove the hidden class
        card.style.display = 'block'; // Make sure it's visible
    });
}

function restartQuiz() {
    // location.reload();
    setInitState();
    resetFilters();
}

function setLanguage(lang) 
    {
        // Optionally, update the lang attribute of the document
        document.documentElement.lang = lang;
        selectedLang = lang;

        const titleElement = document.getElementById('title');
        const startButtonElement = document.getElementById('start-button');
        const restartButtonElement = document.getElementById('restart-button');
        const startmessageElement = document.getElementById('start-message');
        const endmessageElement = document.getElementById('end-message');
        
        // Update the title and description based on the selected language
        titleElement.textContent = content[selectedLang].title;
        startButtonElement.textContent = content[selectedLang].start_button;
        restartButtonElement.textContent = content[selectedLang].restart_button;
        startmessageElement.textContent = content[selectedLang].start_message;
        endmessageElement.textContent = content[selectedLang].end_message;

        changeQuestionsPanelLanguage()
        setDogCards()
}








/*const questions = [
    {
        question: "¿Cuánto espacio tienes disponible para tu perro?",
        answers: ["Apartamento pequeño", "Casa con jardín pequeño", "Casa con jardín grande"],
        value: ["pequeño", "mediano", "grande"]
    },
    {
        question: "¿Tienes acceso a espacio exterior (parque o jardín)?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Cuánto tiempo puedes dedicar al ejercicio diario de tu perro?",
        answers: ["Menos de 30 minutos", "30 minutos a 1 hora", "Más de 1 hora"],
        value: ["low", "medium", "high"]
    },
    {
        question: "¿Cuánto tiempo pasas fuera de casa diariamente?",
        answers: ["En casa la mayor parte del día", "Fuera parte del día (4-6 horas)", "Fuera la mayor parte del día (8+ horas)"],
        value: ["home", "partial", "away"]
    },
    {
        question: "¿Qué tan activo es tu estilo de vida?",
        answers: ["Sedentario", "Moderadamente activo", "Muy activo"],
        value: ["sedentario", "moderado", "activo"]
    },
    {
        question: "¿Tienes hijos en casa?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Tienes otras mascotas en casa?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Con qué frecuencia viajarás o harás excursiones con tu perro?",
        answers: ["Frecuentemente", "Ocasionalmente", "Raramente"],
        value: ["frecuente", "ocasional", "raro"]
    },
    {
        question: "¿Cuál es tu principal objetivo al tener un perro?",
        answers: ["Compañía", "Guardia o protección", "Terapia o apoyo emocional", "Actividades al aire libre"],
        value: ["compañía", "protección", "terapia", "deportes"]
    },
    {
        question: "¿Cuál es tu presupuesto para gastos relacionados con el perro (comida, veterinario, etc.)?",
        answers: ["Bajo", "Medio", "Alto"],
        value: ["bajo", "medio", "alto"]
    },
    {
        question: "¿Estás dispuesto a tener una raza que requiera cuidados especiales o grooming regular?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Qué nivel de experiencia tienes con perros?",
        answers: ["Primera vez con un perro", "Algo de experiencia", "Mucha experiencia"],
        value: ["principiante", "moderado", "experimentado"]
    }
];*/

/*
const traits = [
    {
        trait: "Size",
        options: ["Small", "Medium", "Large", "Giant"],
        value: ["small", "medium", "large", "giant"]
    },
    {
        trait: "Coat Type",
        options: ["Short-haired", "Medium-haired", "Long-haired", "Curly-haired", "Wire-haired"],
        value: ["short", "medium", "long", "curly", "wire"]
    },
    {
        trait: "Coat Color",
        options: ["Single color", "Multi-color", "Spotted or Patterned"],
        value: ["single", "multi", "spotted"]
    },
    {
        trait: "Shedding Level",
        options: ["Low", "Medium", "High", "Hypoallergenic"],
        value: ["low", "medium", "high", "hypoallergenic"]
    },
    {
        trait: "Activity Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Trainability",
        options: ["Easy to train", "Moderately trainable", "Difficult to train"],
        value: ["easy", "moderate", "difficult"]
    },
    {
        trait: "Temperament",
        options: ["Calm", "Playful", "Protective", "Independent", "Friendly", "Reserved"],
        value: ["calm", "playful", "protective", "independent", "friendly", "reserved"]
    },
    {
        trait: "Aggressiveness",
        options: ["Low", "Moderate", "High"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Barking Level",
        options: ["Rarely barks", "Occasionally barks", "Frequently barks"],
        value: ["rare", "occasional", "frequent"]
    },
    {
        trait: "Energy Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Good with Children",
        options: ["Yes", "No", "Depends"],
        value: ["yes", "no", "depends"]
    },
    {
        trait: "Good with Other Pets",
        options: ["Yes", "No"],
        value: ["yes", "no"]
    },
    {
        trait: "Guarding Ability",
        options: ["Excellent", "Moderate", "Not suitable"],
        value: ["excellent", "moderate", "not suitable"]
    },
    {
        trait: "Drooling Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Adaptability to Apartment Living",
        options: ["Excellent", "Moderate", "Poor"],
        value: ["excellent", "moderate", "poor"]
    },
    {
        trait: "Exercise Needs",
        options: ["Minimal", "Moderate", "High"],
        value: ["minimal", "moderate", "high"]
    },
    {
        trait: "Life Expectancy",
        options: ["Short (less than 10 years)", "Average (10-12 years)", "Long (12+ years)"],
        value: ["short", "average", "long"]
    },
    {
        trait: "Dietary Needs",
        options: ["Standard diet", "Special dietary needs", "High caloric intake"],
        value: ["standard", "special", "high"]
    },
    {
        trait: "Grooming Requirements",
        options: ["Low maintenance", "Moderate", "High maintenance"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Health Issues Predisposition",
        options: ["Healthy breed", "Prone to specific conditions"],
        value: ["healthy", "prone"]
    },
    {
        trait: "Noise Sensitivity",
        options: ["High", "Low"],
        value: ["high", "low"]
    },
    {
        trait: "Space Needs",
        options: ["Minimal", "Moderate", "Requires large space"],
        value: ["minimal", "moderate", "large"]
    },
    {
        trait: "Behavior with Strangers",
        options: ["Friendly", "Reserved", "Protective"],
        value: ["friendly", "reserved", "protective"]
    },
    {
        trait: "Compatibility with Cold Weather",
        options: ["Good", "Sensitive to cold"],
        value: ["good", "sensitive"]
    },
    {
        trait: "Compatibility with Hot Weather",
        options: ["Good", "Sensitive to heat"],
        value: ["good", "sensitive"]
    },
    {
        trait: "Working Ability",
        options: ["Excellent", "Moderate", "Companion"],
        value: ["excellent", "moderate", "companion"]
    },
    {
        trait: "Playfulness Level",
        options: ["Very playful", "Moderately playful", "Not playful"],
        value: ["very playful", "moderate", "calm"]
    },
    {
        trait: "Social Needs",
        options: ["Enjoys company", "Independent", "Requires constant attention"],
        value: ["social", "independent", "constant attention"]
    },
    {
        trait: "Aggression Towards Other Dogs",
        options: ["Low", "Moderate", "High"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Suitability for First-Time Owners",
        options: ["Very suitable", "Moderately suitable", "Not recommended"],
        value: ["very suitable", "moderate", "not recommended"]
    }
];
*/