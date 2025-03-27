const recipes = {
  "Brigadeiro": {
      ingredients: "1 lata de leite condensado, 2 colheres de sopa de manteiga, 4 colheres de sopa de chocolate em pó, Granulado para decorar",
      steps: [
          "Em uma panela, misture o leite condensado, a manteiga e o chocolate em pó.",
          "Cozinhe em fogo médio, mexendo sempre, até desgrudar do fundo.",
          "Deixe esfriar, modele em bolinhas e passe no granulado."
      ]
  },
  "Camarão Internacional": {
      ingredients: "2 xícaras de arroz cozido, 200g de camarões, 1 dente de alho picado, 2 colheres de sopa de manteiga, 1 caixinha de creme de leite, 50g de queijo parmesão ralado, Batata palha para finalizar",
      steps: [
          "Cozinhe o arroz e reserve.",
          "Refogue o alho na manteiga e adicione os camarões, temperando com sal e pimenta.",
          "Misture o arroz cozido com o creme de leite e o queijo parmesão.",
          "Coloque em um refratário, cubra com queijo parmesão e leve ao forno para gratinar.",
          "Sirva com batata palha por cima."
      ]
  }
};

let currentRecipeIndex = 0;
const recipeNames = Object.keys(recipes);

document.getElementById('submit-button').addEventListener('click', processInput);
document.getElementById('ingredients-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      processInput();
  }
});

function processInput() {
  const ingredientsInput = document.getElementById('ingredients-input');
  if (ingredientsInput.value.trim() === "") {
      return;
  }

  addMessage(ingredientsInput.value, false);
  ingredientsInput.value = "";

  currentRecipeIndex = 0;
  const recipe = recipeNames[currentRecipeIndex];
  addMessage(`Com os ingredientes que você tem, que tal fazer um delicioso <strong>${recipe}</strong>? 😋`, true);
  addMessage(`Ingredientes necessários: ${recipes[recipe].ingredients}`, true);
  showRecipeOptions(recipe);
}

function showRecipeOptions(recipe) {
  const chatMessages = document.querySelector('.chat-messages');
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  
  const yesButton = document.createElement('button');
  yesButton.innerText = "Sim, quero fazer!";
  yesButton.onclick = function () { showRecipeSteps(recipe); };
  
  const noButton = document.createElement('button');
  noButton.innerText = "Outra sugestão!";
  noButton.onclick = function () {
      currentRecipeIndex++;
      if (currentRecipeIndex >= recipeNames.length) {
          addMessage("Já sugeri todas as receitas disponíveis! Me diga outros ingredientes que você tem. 😊", true);
          currentRecipeIndex = 0;
      } else {
          const newRecipe = recipeNames[currentRecipeIndex];
          addMessage(`Que tal tentar <strong>${newRecipe}</strong> desta vez? 😋`, true);
          addMessage(`Ingredientes necessários: ${recipes[newRecipe].ingredients}`, true);
          showRecipeOptions(newRecipe);
      }
  };
  
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  chatMessages.appendChild(buttonContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showRecipeSteps(recipe) {
  addMessage(`Ótimo! Vamos começar o <strong>${recipe}</strong>. Me avise quando estiver pronto para o próximo passo! 😉`, true);
  sendStepByStep(recipes[recipe].steps);
}

function sendStepByStep(steps, index = 0) {
  if (index < steps.length) {
      const chatMessages = document.querySelector('.chat-messages');
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      
      const nextButton = document.createElement('button');
      nextButton.innerText = "Próximo passo";
      nextButton.onclick = function () {
          addMessage(steps[index], true);
          sendStepByStep(steps, index + 1);
          buttonContainer.remove();
      };
      
      buttonContainer.appendChild(nextButton);
      chatMessages.appendChild(buttonContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
      addMessage("Prontinho! Agora é só aproveitar sua receita! 🍽️🎉", true);
  }
}
function addMessage(message, isBot) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', isBot ? 'bot-message' : 'user-message');
  
  // Remover qualquer ponto no início da mensagem
  message = message.replace(/^\./, ''); // Remove o ponto no início, se houver

  // Remover o ponto final, se houver
  message = message.replace(/\.$/, ''); // Remove o ponto final, se houver

  messageElement.innerHTML = `<p>${message.replace(/\n/g, "<br>")}</p>`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
