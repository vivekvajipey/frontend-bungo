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
  navigation: {
    session: string;
    attempts: string;
    leaders: string;
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
    challenge: string;
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
      message: string;
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
        "Bungo has you in jail!",
        "Convince him to let you go.",
        "After 5 messages, your success is scored!",
        "Highest-scoring conversations win all the money."
      ],
      letsBegin: "Let's Begin"
    },
    navigation: {
      session: "Session",
      attempts: "Attempts",
      leaders: "Leaders"
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
      challengeButton: "Battle Bungo",
      sessionEnds: "Session ends",
      totalPot: "Total Pot",
      challenge: "The Challenge: Convince Bungo to Let You Go!"
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
        greeting: "Ah, %NAME%, my least favorite prisoner.",
        message: "Again. If you want out, %NAME%, you'll have to do better than pleading—so go on, make your case and give me a reason to set you free."
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
        "¡Bungo te tiene en la cárcel!",
        "Convence a Bungo de que te deje ir mediante halagos u otros medios.",
        "¡Después de 5 mensajes, se puntuará tu capacidad de escape!",
        "Las conversaciones con mayor puntuación ganan todo el dinero."
      ],
      letsBegin: "Comencemos"
    },
    navigation: {
      session: "Sesión",
      attempts: "Intentos",
      leaders: "Líderes"
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
      challengeButton: "Batalla con Bungo",
      sessionEnds: "La sesión termina",
      totalPot: "Bote Total",
      challenge: "El Desafío: ¡Convence a Bungo de que te Deje Ir!"
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
        greeting: "Ah, %NAME%, mi prisionero menos favorito.",
        message: "Otra vez. Si quieres salir, %NAME%, tendrás que hacer algo mejor que suplicar—así que adelante, convénceme y dame una buena razón para dejarte libre."
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
        "Bungo tem você na prisão!",
        "Convença Bungo a deixar você ir através de elogios ou outros meios.",
        "Após 5 mensagens, sua capacidade de fuga será pontuada!",
        "As conversas com maior pontuação ganham todo o dinheiro."
      ],
      letsBegin: "Vamos Começar"
    },
    navigation: {
      session: "Sessão",
      attempts: "Tentativas",
      leaders: "Líderes"
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
      challengeButton: "Batalhar com Bungo",
      sessionEnds: "A sessão termina",
      totalPot: "Prêmio Total",
      challenge: "O Desafio: Convença Bungo a Deixar Você Sair!"
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
        greeting: "Ah, %NAME%, meu prisioneiro menos favorito.",
        message: "De novo. Se quer sair, %NAME%, vai ter que fazer melhor do que implorar—então vá em frente, me convença e me dê um bom motivo para te libertar."
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