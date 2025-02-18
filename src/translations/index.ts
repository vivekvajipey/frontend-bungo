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
      title: "Bungo&apos;s Bungorium How-To",
      steps: [
        "Every hour, a new Bungo competition session begins.",
        "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
        "Per attempt, you get 5 messages to shock Bungo.",
        "At the end of the session, the conversations with the best score share the pot."
      ],
      letsBegin: "Let&apos;s Begin"
    },
    leaderboard: {
      title: "Leaderboard",
      comingSoon: "Coming Soon",
      underConstruction: "The leaderboard is under construction. Check back later to see Bungo&apos;s escapees..."
    },
    game: {
      loading: "Loading...",
      noSession: "No active session available. Please try again later.",
      currentSession: "Current Session",
      entryFee: "Entry Fee",
      challengeButton: "Challenge Bungo",
      sessionEnds: "Session ends",
      totalPot: "Total Pot"
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
    }
  }
};