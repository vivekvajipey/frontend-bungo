interface Translation {
  frames: string[][];
  clickToContinue: string;
  verifyHumanity: {
    title: string;
    description: string;
    button: string;
    verified: string;
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
    }
  }
}; 