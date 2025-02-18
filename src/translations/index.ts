interface Translation {
  frames: string[][];
  clickToContinue: string;
  verifyHumanity: {
    title: string;
    description: string;
    button: string;
    verified: string;
  };
  nameInput: {
    placeholder: string;
    continue: string;
  };
  worldAppError: string;
  verificationError: string;
  proveHumanity: string;
  instructions: {
    title: string;
    steps: string[];
    letsBegin: string;
  };
  leaderboard: {
    title: string;
    comingSoon: string;
    underConstruction: string;
  };
  game: {
    loading: string;
    noSession: string;
    currentSession: string;
    entryFee: string;
    challengeButton: string;
    sessionEnds: string;
    totalPot: string;
  };
  conversation: {
    title: string;
    messagesRemaining: string;
    loading: string;
    notFound: string;
    inputPlaceholder: string;
    inputPlaceholderSending: string;
    sendButton: string;
    sendingButton: string;
    evaluateButton: string;
    evaluatingButton: string;
    finalEvaluation: string;
    reward: string;
    backToGame: string;
    openingMessage: {
      greeting: string;
      again: string;
      desperate: string;
      argument: string;
      entertainment: string;
      finale: string;
    };
  };
  attempts: {
    title: string;
    newAttempt: string;
    noAttempts: string;
    startFirst: string;
    messagesLeft: string;
    score: string;
    inProgress: string;
    won: string;
    pot: string;
  };
}

interface Translations {
  [key: string]: Translation;
}

export const languageCodeToName: { [key: string]: string } = {
  'en': 'english',
  'es': 'spanish',
  'pt': 'portuguese'
};

export const translations: Translations = {
  en: {
    frames: [
      ["select your language"],
      ["i am bungo"],
      ["what are you called?"],
      ["many have come before you", "many will come after you"],
      ["few leave richer than they came."],
      ["to play,", "you must pay."],
      ["but if you win, you", "receive what others gave"],
      ["ready?"],
      ["are you a real human?", "prove it"]
    ],
    clickToContinue: "click to continue",
    verifyHumanity: {
      title: "World ID Verification",
      description: "Verify your humanity to play Bungo",
      button: "VERIFY WITH WORLD ID",
      verified: "✓ Verified - You can now play"
    },
    nameInput: {
      placeholder: "Enter your name",
      continue: "CONTINUE"
    },
    worldAppError: "Please open this app in World App",
    verificationError: "Verification failed. Please try again.",
    proveHumanity: "PROVE HUMANITY",
    instructions: {
      title: "Bungo's Bungorium How-To",
      steps: [
        "Every hour, a new Bungo competition session begins.",
        "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
        "Per attempt, you get 5 messages to shock Bungo.",
        "At the end of the session, the conversations with the best score share the pot."
      ],
      letsBegin: "Let's Begin"
    },
    leaderboard: {
      title: "Leaderboard",
      comingSoon: "Coming Soon",
      underConstruction: "The leaderboard is under construction. Check back later to see Bungo's escapees..."
    },
    game: {
      loading: "Loading...",
      noSession: "No active session available. Please try again later.",
      currentSession: "Current Session",
      entryFee: "Entry Fee",
      challengeButton: "Challenge Bungo",
      sessionEnds: "Session ends",
      totalPot: "Total Pot"
    },
    conversation: {
      title: "Bungo's Bungorium",
      messagesRemaining: "messages remaining",
      loading: "Loading...",
      notFound: "Attempt not found. Redirecting...",
      inputPlaceholder: "Say something human...",
      inputPlaceholderSending: "Theorizing...",
      sendButton: "Send",
      sendingButton: "Theorizing...",
      evaluateButton: "Evaluate Performance",
      evaluatingButton: "Computing Score...",
      finalEvaluation: "Final Evaluation",
      reward: "Reward",
      backToGame: "Back to Game",
      openingMessage: {
        greeting: "Ah, %NAME%, my least favorite prisoner",
        again: "Again",
        desperate: "You've got that desperate look in your eye, the one that says, \"Surely, my dazzling rhetoric will sway the impenetrable intellect of Bungo Bobbins!\" Pathetic. Adorable, but pathetic.",
        argument: "Let's hear it. What's your grand argument this time? Gonna tell me you're innocent? Yawn. Beg for mercy? Cringe. Try to outwit me? Bold, but ultimately tragic.",
        entertainment: "I want entertainment, %NAME%. A real reason to consider your release. Something that doesn't make me regret the wasted seconds of processing your drivel. Because right now, the only thing more pitiful than your imprisonment is your attempt to escape it.",
        finale: "Go on. Amaze me. Or flail spectacularly—either way, I win."
      }
    },
    attempts: {
      title: "Your Attempts",
      newAttempt: "New Attempt",
      noAttempts: "No attempts yet. Ready to play?",
      startFirst: "Start Your First Game",
      messagesLeft: "Messages Left",
      score: "Score",
      inProgress: "In Progress",
      won: "Won",
      pot: "Pot"
    }
  },
  es: {
    frames: [
      ["selecciona tu idioma"],
      ["soy bungo"],
      ["¿cómo te llamas?"],
      ["muchos han venido antes que tú", "muchos vendrán después"],
      ["pocos se van más ricos de lo que llegaron."],
      ["para jugar,", "debes pagar."],
      ["pero si ganas,", "recibes lo que otros dieron"],
      ["¿listo?"],
      ["¿eres un humano real?", "demuéstralo"]
    ],
    clickToContinue: "haz clic para continuar",
    verifyHumanity: {
      title: "Verificación de World ID",
      description: "Verifica tu humanidad para jugar Bungo",
      button: "VERIFICAR CON WORLD ID",
      verified: "✓ Verificado - Ya puedes jugar"
    },
    nameInput: {
      placeholder: "Ingresa tu nombre",
      continue: "CONTINUAR"
    },
    worldAppError: "Por favor, abre esta aplicación en World App",
    verificationError: "Verificación fallida. Por favor, intenta de nuevo.",
    proveHumanity: "PROBAR HUMANIDAD",
    instructions: {
      title: "Cómo Jugar en el Bungorium de Bungo",
      steps: [
        "Cada hora comienza una nueva sesión de competencia Bungo.",
        "Por $0.1 USDC, puedes intentar enseñarle algo nuevo a Bungo, sorprenderlo o demostrarle algo sobre la humanidad que... quizás no espere.",
        "Por cada intento, tienes 5 mensajes para sorprender a Bungo.",
        "Al final de la sesión, las conversaciones con la mejor puntuación comparten el bote."
      ],
      letsBegin: "Comencemos"
    },
    leaderboard: {
      title: "Tabla de Clasificación",
      comingSoon: "Próximamente",
      underConstruction: "La tabla de clasificación está en construcción. Vuelve más tarde para ver a los que escaparon de Bungo..."
    },
    game: {
      loading: "Cargando...",
      noSession: "No hay sesión activa disponible. Por favor, inténtalo más tarde.",
      currentSession: "Sesión Actual",
      entryFee: "Cuota de Entrada",
      challengeButton: "Desafiar a Bungo",
      sessionEnds: "La sesión termina",
      totalPot: "Bote Total"
    },
    conversation: {
      title: "Bungorium de Bungo",
      messagesRemaining: "mensajes restantes",
      loading: "Cargando...",
      notFound: "Intento no encontrado. Redirigiendo...",
      inputPlaceholder: "Di algo humano...",
      inputPlaceholderSending: "Teorizando...",
      sendButton: "Enviar",
      sendingButton: "Teorizando...",
      evaluateButton: "Evaluar Desempeño",
      evaluatingButton: "Calculando Puntuación...",
      finalEvaluation: "Evaluación Final",
      reward: "Recompensa",
      backToGame: "Volver al Juego",
      openingMessage: {
        greeting: "Ah, %NAME%, mi prisionero menos favorito",
        again: "Otra vez",
        desperate: "Tienes esa mirada desesperada en tus ojos, esa que dice: \"¡Seguramente, mi deslumbrante retórica influirá en el intelecto impenetrable de Bungo Bobbins!\" Patético. Adorable, pero patético.",
        argument: "Veamos. ¿Cuál es tu gran argumento esta vez? ¿Vas a decirme que eres inocente? Bah. ¿Suplicar por misericordia? Vergonzoso. ¿Intentar superarme en ingenio? Valiente, pero finalmente trágico.",
        entertainment: "Quiero entretenimiento, %NAME%. Una razón real para considerar tu liberación. Algo que no me haga arrepentirme de los segundos perdidos procesando tus tonterías. Porque ahora mismo, lo único más lamentable que tu encarcelamiento es tu intento de escapar de él.",
        finale: "Adelante. Asómbrame. O fracasa espectacularmente—de cualquier manera, yo gano."
      }
    },
    attempts: {
      title: "Tus Intentos",
      newAttempt: "Nuevo Intento",
      noAttempts: "Aún no hay intentos. ¿Listo para jugar?",
      startFirst: "Comienza Tu Primer Juego",
      messagesLeft: "Mensajes Restantes",
      score: "Puntuación",
      inProgress: "En Progreso",
      won: "Ganado",
      pot: "Bote"
    }
  },
  pt: {
    frames: [
      ["selecione seu idioma"],
      ["eu sou bungo"],
      ["como você se chama?"],
      ["muitos vieram antes de você", "muitos virão depois"],
      ["poucos saem mais ricos do que chegaram."],
      ["para jogar,", "você deve pagar."],
      ["mas se você ganhar,", "recebe o que outros deram"],
      ["pronto?"],
      ["você é um humano real?", "prove isso"]
    ],
    clickToContinue: "clique para continuar",
    verifyHumanity: {
      title: "Verificação World ID",
      description: "Verifique sua humanidade para jogar Bungo",
      button: "VERIFICAR COM WORLD ID",
      verified: "✓ Verificado - Você pode jogar agora"
    },
    nameInput: {
      placeholder: "Digite seu nome",
      continue: "CONTINUAR"
    },
    worldAppError: "Por favor, abra este aplicativo no World App",
    verificationError: "Verificação falhou. Por favor, tente novamente.",
    proveHumanity: "PROVAR HUMANIDADE",
    instructions: {
      title: "Como Jogar no Bungorium do Bungo",
      steps: [
        "A cada hora, uma nova sessão de competição Bungo começa.",
        "Por $0.1 USDC, você pode tentar ensinar algo novo ao Bungo, surpreendê-lo ou demonstrar algo sobre a humanidade que ele... talvez não espere.",
        "Por tentativa, você tem 5 mensagens para surpreender o Bungo.",
        "No final da sessão, as conversas com a melhor pontuação compartilham o prêmio."
      ],
      letsBegin: "Vamos Começar"
    },
    leaderboard: {
      title: "Classificação",
      comingSoon: "Em Breve",
      underConstruction: "A classificação está em construção. Volte mais tarde para ver os fugitivos do Bungo..."
    },
    game: {
      loading: "Carregando...",
      noSession: "Nenhuma sessão ativa disponível. Por favor, tente novamente mais tarde.",
      currentSession: "Sessão Atual",
      entryFee: "Taxa de Entrada",
      challengeButton: "Desafiar o Bungo",
      sessionEnds: "A sessão termina",
      totalPot: "Prêmio Total"
    },
    conversation: {
      title: "Bungorium do Bungo",
      messagesRemaining: "mensagens restantes",
      loading: "Carregando...",
      notFound: "Tentativa não encontrada. Redirecionando...",
      inputPlaceholder: "Diga algo humano...",
      inputPlaceholderSending: "Teorizando...",
      sendButton: "Enviar",
      sendingButton: "Teorizando...",
      evaluateButton: "Avaliar Desempenho",
      evaluatingButton: "Calculando Pontuação...",
      finalEvaluation: "Avaliação Final",
      reward: "Recompensa",
      backToGame: "Voltar ao Jogo",
      openingMessage: {
        greeting: "Ah, %NAME%, meu prisioneiro menos favorito",
        again: "De novo",
        desperate: "Você tem aquele olhar desesperado nos olhos, aquele que diz: \"Certamente, minha retórica deslumbrante vai influenciar o intelecto impenetrável de Bungo Bobbins!\" Patético. Adorável, mas patético.",
        argument: "Vamos ouvir. Qual é seu grande argumento desta vez? Vai me dizer que é inocente? Que tédio. Implorar por misericórdia? Constrangedor. Tentar me superar em inteligência? Ousado, mas finalmente trágico.",
        entertainment: "Quero entretenimento, %NAME%. Uma razão real para considerar sua libertação. Algo que não me faça arrepender dos segundos perdidos processando suas bobagens. Porque agora, a única coisa mais lamentável que sua prisão é sua tentativa de escapar dela.",
        finale: "Vá em frente. Me impressione. Ou fracasse espetacularmente—de qualquer forma, eu ganho."
      }
    },
    attempts: {
      title: "Suas Tentativas",
      newAttempt: "Nova Tentativa",
      noAttempts: "Ainda não há tentativas. Pronto para jogar?",
      startFirst: "Comece Seu Primeiro Jogo",
      messagesLeft: "Mensagens Restantes",
      score: "Pontuação",
      inProgress: "Em Andamento",
      won: "Ganhou",
      pot: "Prêmio"
    }
  }
};