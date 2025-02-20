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
    loading: string;
    error: string;
    noSession: string;
    noEntries: string;
    free: string;
    paid: string;
    noPaidAttempts: string;
    freeDisclaimer: string;
  };
  game: {
    loading: string;
    noSession: string;
    currentSession: string;
    entryFee: string;
    challengeButton: string;
    challengeButtonFree: string;
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
  freeAttempt: {
    badge: string;
    tooltip: string;
  };
  info: {
    title: string;
    rules: string[];
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
      underConstruction: "The leaderboard is under construction. Check back later to see Bungo's escapees...",
      loading: "Loading leaderboard...",
      error: "Failed to load leaderboard",
      noSession: "No active session found",
      noEntries: "No attempts yet in this session",
      free: "Free",
      paid: "Paid",
      noPaidAttempts: "No paid attempts yet",
      freeDisclaimer: "Free users are not eligible to win money"
    },
    game: {
      loading: "Loading...",
      noSession: "No active session available. Please try again later.",
      currentSession: "Current Session",
      entryFee: "Entry Fee",
      challengeButton: "Battle Bungo",
      challengeButtonFree: "Enter Challenge (First Time Free)",
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
    },
    freeAttempt: {
      badge: "First Attempt Free!",
      tooltip: "Try Bungo for free - no payment needed for your first attempt, but no winnings either!"
    },
    info: {
      title: "How It Works",
      rules: [
        "Your first attempt is free (no winnings on first attempt)",
        "All subsequent attempts cost $0.10 USDC",
        "Winners are determined at the END of the 24-hour session",
        "The higher your score, the more you get paid from the pot"
      ]
    }
  },
  es: {
    frames: [
      ["selecciona tu idioma"],
      ["soy bungo"],
      ["¿cómo te llamas?"],
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
      underConstruction: "La tabla de clasificación está en construcción. Vuelve más tarde para ver a los que escaparon de Bungo...",
      loading: "Cargando tabla de clasificación...",
      error: "Error al cargar la tabla de clasificación",
      noSession: "No se encontró sesión activa",
      noEntries: "No hay intentos en esta sesión",
      free: "Gratis",
      paid: "Pagado",
      noPaidAttempts: "Aún no hay intentos pagados",
      freeDisclaimer: "Los usuarios gratuitos no pueden ganar dinero"
    },
    game: {
      loading: "Cargando...",
      noSession: "No hay sesión activa disponible. Por favor, inténtalo más tarde.",
      currentSession: "Sesión Actual",
      entryFee: "Cuota de Entrada",
      challengeButton: "Batalla con Bungo",
      challengeButtonFree: "Desafío Gratuito (Primera Vez)",
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
    },
    freeAttempt: {
      badge: "¡Primer Intento Gratis!",
      tooltip: "Prueba Bungo gratis - ¡no se necesita pago para tu primer intento, pero no hay ganancias!"
    },
    info: {
      title: "Cómo Funciona",
      rules: [
        "Tu primer intento es gratis (sin ganancias en el primer intento)",
        "Todos los intentos posteriores cuestan $0.10 USDC",
        "Los ganadores se determinan al FINAL de la sesión de 24 horas",
        "Cuanto más alta sea tu puntuación, más recibirás del bote"
      ]
    }
  },
  pt: {
    frames: [
      ["selecione seu idioma"],
      ["eu sou bungo"],
      ["como você se chama?"],
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
      underConstruction: "A classificação está em construção. Volte mais tarde para ver os fugitivos do Bungo...",
      loading: "Carregando classificação...",
      error: "Falha ao carregar classificação",
      noSession: "Nenhuma sessão ativa encontrada",
      noEntries: "Ainda não há tentativas",
      free: "Grátis",
      paid: "Pago",
      noPaidAttempts: "Ainda não há tentativas pagas",
      freeDisclaimer: "Usuários gratuitos não podem ganhar dinheiro"
    },
    game: {
      loading: "Carregando...",
      noSession: "Nenhuma sessão ativa disponível. Por favor, tente novamente mais tarde.",
      currentSession: "Sessão Atual",
      entryFee: "Taxa de Entrada",
      challengeButton: "Batalhar com Bungo",
      challengeButtonFree: "Entrar no Desafio (Primeira Vez Grátis)",
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
    },
    freeAttempt: {
      badge: "Primeira Tentativa Grátis!",
      tooltip: "Experimente Bungo gratuitamente - sem pagamento necessário para sua primeira tentativa!"
    },
    info: {
      title: "Como Funciona",
      rules: [
        "Sua primeira tentativa é grátis (sem ganhos na primeira tentativa)",
        "Todas as tentativas subsequentes custam $0.10 USDC",
        "Os vencedores são determinados no FIM da sessão de 24 horas",
        "Quanto maior sua pontuação, mais você recebe do prêmio"
      ]
    }
  }
};