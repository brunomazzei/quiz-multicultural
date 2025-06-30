// highscoreForm.addEventListener('submit', saveHighScore); // Removido: deve ser adicionado após a definição de highscoreForm
// Lógica do Quiz Multicultural extraída do index.html
// Inclui banco de traduções, manipulação de DOM, lógica de jogo e efeitos sonoros

// --- BANCO DE TRADUÇÕES COM URLs DE IMAGENS ---
const translations = {
    'pt': {
        mainTitle: "Quiz Multicultural",
        mainSubtitle: "Teste seus conhecimentos contra o tempo!",
        mainDescription: "Um projeto para a Semana Acadêmica: A Internacionalização da Educação Superior",
        startBtn: "Começar a Jogar!",
        progressText: (current, total) => `Pergunta ${current} de ${total}`,
        scoreText: (score) => `Pontos: ${score}`,
        endTitle: "Fim de Jogo!",
        finalScore: (score) => `Sua pontuação final foi de ${score} pontos.`,
        highscorePrompt: "Parabéns! Você entrou para o ranking. Digite seu nome:",
        usernamePlaceholder: "Seu nome",
        saveScoreBtn: "Salvar Pontuação",
        playAgainBtn: "Jogar Novamente",
        rankingTitle: "🏆 Ranking de Melhores Pontuações",
        noScores: "Nenhuma pontuação registrada ainda. Seja o primeiro!",
        timeoutMessage: "Tempo esgotado! A resposta correta foi destacada.",
        questions: [
            { question: "Em qual país o 'Carnaval' é um festival anual massivo, famoso por seus desfiles de samba?", answers: [{ text: 'Espanha', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Brasil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Japão', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "O Carnaval do Brasil, especialmente no Rio de Janeiro e em Salvador, é mundialmente famoso por sua energia contagiante e desfiles espetaculares." },
            { question: "O 'Coliseu', um antigo anfiteatro, é um marco famoso em qual país?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'EUA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Itália', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Espanha', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "O Coliseu, em Roma, é um símbolo icônico do Império Romano e uma das maravilhas arquitetônicas do mundo antigo." },
            { question: "'Flamenco', um estilo apaixonado de música e dança, originou-se em qual país?", answers: [{ text: 'Espanha', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japão', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "O Flamenco é uma forma de arte complexa da região da Andaluzia, na Espanha, que combina canto, dança e guitarra." },
            { question: "A forma de arte de 'Anime' e 'Mangá' é uma exportação cultural significativa de qual nação?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'EUA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Japão', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "O Japão é o berço do Anime (animação) e do Mangá (quadrinhos), que conquistaram uma enorme popularidade global." },
            { question: "A 'Grande Muralha', uma das mais impressionantes proezas arquitetônicas do mundo, está localizada em qual país?", answers: [{ text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Espanha', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'EUA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "A Grande Muralha da China é uma série de fortificações construídas ao longo de séculos para proteger os impérios chineses." },
            { question: "'Hollywood', o centro da indústria cinematográfica global, está localizado em qual país?", answers: [{ text: 'EUA', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japão', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "Hollywood, um distrito de Los Angeles, Califórnia, é sinônimo da indústria do entretenimento americana." },
            { question: "Qual é o nome do prato de arroz tradicional, muitas vezes considerado um símbolo nacional da Espanha?", answers: [{ text: 'Risoto', correct: false }, { text: 'Paella', correct: true }, { text: 'Sushi', correct: false }, { text: 'Arroz Frito', correct: false }], explanation: "A Paella, originária de Valência, é um prato de arroz vibrante e saboroso, icônico da culinária espanhola." },
            { question: "O 'Samba' é um famoso gênero musical e estilo de dança que se originou em qual país?", answers: [{ text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Espanha', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'EUA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "O Samba tem suas raízes na cultura afro-brasileira e é reconhecido mundialmente como um símbolo da identidade nacional do Brasil." },
            { question: "O conceito filosófico de 'Wabi-Sabi', que encontra beleza na imperfeição, é central para a cultura de qual país?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japão', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Itália', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Espanha', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "Wabi-sabi é uma visão de mundo japonesa centrada na aceitação da transitoriedade e da imperfeição." },
            { question: "Em qual país é tradição celebrar o Ano Novo com enormes queimas de fogos e comendo bolinhos (dumplings)?", answers: [{ text: 'EUA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japão', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "O Ano Novo Chinês é a celebração mais importante, marcada por reuniões familiares, fogos de artifício para afastar os maus espíritos e comidas simbólicas como os dumplings." }
        ]
    },
    'en': {
        mainTitle: "Multicultural Quiz",
        mainSubtitle: "Test your knowledge against the clock!",
        mainDescription: "A project for the Academic Week: The Internationalization of Higher Education",
        startBtn: "Start Playing!",
        progressText: (current, total) => `Question ${current} of ${total}`,
        scoreText: (score) => `Score: ${score}`,
        endTitle: "Game Over!",
        finalScore: (score) => `Your final score was ${score} points.`,
        highscorePrompt: "Congratulations! You made the leaderboard. Enter your name:",
        usernamePlaceholder: "Your name",
        saveScoreBtn: "Save Score",
        playAgainBtn: "Play Again",
        rankingTitle: "🏆 Top Scores Ranking",
        noScores: "No scores recorded yet. Be the first!",
        timeoutMessage: "Time's up! The correct answer has been highlighted.",
        questions: [
            { question: "In which country is 'Carnaval' a massive annual festival, famous for its samba parades?", answers: [{ text: 'Spain', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Brazil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Japan', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "Brazil's Carnival, especially in Rio de Janeiro and Salvador, is world-famous for its infectious energy and spectacular parades." },
            { question: "The 'Colosseum,' an ancient amphitheater, is a famous landmark in which country?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italy', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spain', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "The Colosseum in Rome is an iconic symbol of the Roman Empire and one of the architectural wonders of the ancient world." },
            { question: "'Flamenco,' a passionate style of music and dance, originated in which country?", answers: [{ text: 'Spain', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brazil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japan', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "Flamenco is a complex art form from the Andalusia region of Spain, combining song, dance, and guitar." },
            { question: "The art form of 'Anime' and 'Manga' is a significant cultural export from which nation?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Japan', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Brazil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "Japan is the birthplace of Anime (animation) and Manga (comics), which have gained immense global popularity." },
            { question: "The 'Great Wall,' one of the world's most impressive architectural feats, is located in which country?", answers: [{ text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spain', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "The Great Wall of China is a series of fortifications built over centuries to protect Chinese empires." },
            { question: "'Hollywood,' the center of the global film industry, is located in which country?", answers: [{ text: 'USA', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japan', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "Hollywood, a district of Los Angeles, California, is synonymous with the American entertainment industry." },
            { question: "What is the name of the traditional rice dish, often considered a national symbol of Spain?", answers: [{ text: 'Risotto', correct: false }, { text: 'Paella', correct: true }, { text: 'Sushi', correct: false }, { text: 'Fried Rice', correct: false }], explanation: "Paella, originally from Valencia, is a vibrant and flavorful rice dish, iconic to Spanish cuisine." },
            { question: "'Samba' is a famous musical genre and dance style that originated in which country?", answers: [{ text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spain', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brazil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "Samba has its roots in Afro-Brazilian culture and is recognized worldwide as a symbol of Brazil's national identity." },
            { question: "The philosophical concept of 'Wabi-Sabi,' which finds beauty in imperfection, is central to the culture of which country?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japan', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Italy', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spain', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "Wabi-sabi is a Japanese worldview centered on the acceptance of transience and imperfection." },
            { question: "In which country is it a tradition to celebrate the New Year with massive firework displays and eating dumplings?", answers: [{ text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Brazil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japan', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "The Chinese New Year is the most important celebration, marked by family reunions, fireworks to ward off evil spirits, and symbolic foods like dumplings." }
        ]
    },
    'es': {
        mainTitle: "Quiz Multicultural",
        mainSubtitle: "¡Pon a prueba tus conocimientos contra el reloj!",
        mainDescription: "Un proyecto para la Semana Académica: La Internacionalización de la Educación Superior",
        startBtn: "¡Empezar a Jugar!",
        progressText: (current, total) => `Pregunta ${current} de ${total}`,
        scoreText: (score) => `Puntos: ${score}`,
        endTitle: "¡Fin del Juego!",
        finalScore: (score) => `Tu puntuación final fue de ${score} puntos.`,
        highscorePrompt: "¡Felicidades! Entraste en el ranking. Escribe tu nombre:",
        usernamePlaceholder: "Tu nombre",
        saveScoreBtn: "Guardar Puntuación",
        playAgainBtn: "Jugar de Nuevo",
        rankingTitle: "🏆 Ranking de Mejores Puntuaciones",
        noScores: "Aún no hay puntuaciones registradas. ¡Sé el primero!",
        timeoutMessage: "¡Se acabó el tiempo! La respuesta correcta ha sido destacada.",
        questions: [
            { question: "¿En qué país el 'Carnaval' es un festival anual masivo, famoso por sus desfiles de samba?", answers: [{ text: 'España', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Brasil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Japón', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "El Carnaval de Brasil, especialmente en Río de Janeiro y Salvador, es mundialmente famoso por su energía contagiosa y sus desfiles espectaculares." },
            { question: "El 'Coliseo', un antiguo anfiteatro, es un monumento famoso en ¿qué país?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'EE.UU.', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italia', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'España', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "El Coliseo de Roma es un símbolo icónico del Imperio Romano y una de las maravillas arquitectónicas del mundo antiguo." },
            { question: "El 'Flamenco', un estilo apasionado de música y baile, se originó en ¿qué país?", answers: [{ text: 'España', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japón', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "El Flamenco es una forma de arte compleja de la región de Andalucía, en España, que combina cante, baile y guitarra." },
            { question: "La forma de arte del 'Anime' y el 'Manga' es una exportación cultural significativa de ¿qué nación?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'EE.UU.', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Japón', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "Japón es la cuna del Anime (animación) y el Manga (cómics), que han alcanzado una inmensa popularidad mundial." },
            { question: "La 'Gran Muralla', una de las hazañas arquitectónicas más impresionantes del mundo, se encuentra en ¿qué país?", answers: [{ text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'España', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'EE.UU.', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "La Gran Muralla China es una serie de fortificaciones construidas a lo largo de siglos para proteger los imperios chinos." },
            { question: "'Hollywood', el centro de la industria cinematográfica mundial, se encuentra en ¿qué país?", answers: [{ text: 'EE.UU.', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Japón', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "Hollywood, un distrito de Los Ángeles, California, es sinónimo de la industria del entretenimiento estadounidense." },
            { question: "¿Cuál es el nombre del plato de arroz tradicional, a menudo considerado un símbolo nacional de España?", answers: [{ text: 'Risotto', correct: false }, { text: 'Paella', correct: true }, { text: 'Sushi', correct: false }, { text: 'Arroz Frito', correct: false }], explanation: "La Paella, originaria de Valencia, es un plato de arroz vibrante y sabroso, icónico de la cocina española." },
            { question: "La 'Samba' es un famoso género musical y estilo de baile que se originó en ¿qué país?", answers: [{ text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'España', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasil', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'EE.UU.', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "La Samba tiene sus raíces en la cultura afrobrasileña y es reconocida mundialmente como un símbolo de la identidad nacional de Brasil." },
            { question: "El concepto filosófico de 'Wabi-Sabi', que encuentra belleza en la imperfección, es central en la cultura de ¿qué país?", answers: [{ text: 'China', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japón', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'España', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "Wabi-sabi es una visión del mundo japonesa centrada en la aceptación de la fugacidad y la imperfección." },
            { question: "¿En qué país es tradición celebrar el Año Nuevo con enormes fuegos artificiales y comiendo empanadillas (dumplings)?", answers: [{ text: 'EE.UU.', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Brasil', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'China', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Japón', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "El Año Nuevo Chino es la celebración más importante, marcada por reuniones familiares, fuegos artificiales para ahuyentar a los malos espíritus y comidas simbólicas como las empanadillas." }
        ]
    },
    'it': {
        mainTitle: "Quiz Multiculturale",
        mainSubtitle: "Metti alla prova le tue conoscenze contro il tempo!",
        mainDescription: "Un progetto per la Settimana Accademica: L'Internazionalizzazione dell'Istruzione Superiore",
        startBtn: "Inizia a Giocare!",
        progressText: (current, total) => `Domanda ${current} di ${total}`,
        scoreText: (score) => `Punti: ${score}`,
        endTitle: "Fine del Gioco!",
        finalScore: (score) => `Il tuo punteggio finale è di ${score} punti.`,
        highscorePrompt: "Congratulazioni! Sei entrato in classifica. Inserisci il tuo nome:",
        usernamePlaceholder: "Il tuo nome",
        saveScoreBtn: "Salva Punteggio",
        playAgainBtn: "Gioca di Nuovo",
        rankingTitle: "🏆 Classifica dei Migliori Punteggi",
        noScores: "Nessun punteggio ancora registrato. Sii il primo!",
        timeoutMessage: "Tempo scaduto! La risposta corretta è stata evidenziata.",
        questions: [
            { question: "In quale paese il 'Carnevale' è un enorme festival annuale, famoso per le sue sfilate di samba?", answers: [{ text: 'Spagna', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Brasile', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Giappone', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "Il Carnevale del Brasile, specialmente a Rio de Janeiro e Salvador, è famoso in tutto il mondo per la sua energia contagiosa e le sfilate spettacolari." },
            { question: "Il 'Colosseo', un antico anfiteatro, è un famoso monumento in quale paese?", answers: [{ text: 'Cina', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italia', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spagna', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "Il Colosseo a Roma è un simbolo iconico dell'Impero Romano e una delle meraviglie architettoniche del mondo antico." },
            { question: "Il 'Flamenco', uno stile appassionato di musica e danza, ha avuto origine in quale paese?", answers: [{ text: 'Spagna', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasile', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Giappone', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "Il Flamenco è una forma d'arte complessa della regione dell'Andalusia in Spagna, che combina canto, danza e chitarra." },
            { question: "La forma d'arte di 'Anime' e 'Manga' è una significativa esportazione culturale di quale nazione?", answers: [{ text: 'Cina', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Giappone', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Brasile', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "Il Giappone è il luogo di nascita di Anime (animazione) e Manga (fumetti), che hanno guadagnato un'immensa popolarità globale." },
            { question: "La 'Grande Muraglia', una delle più imponenti imprese architettoniche del mondo, si trova in quale paese?", answers: [{ text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spagna', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Cina', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "La Grande Muraglia Cinese è una serie di fortificazioni costruite nel corso dei secoli per proteggere gli imperi cinesi." },
            { question: "'Hollywood', il centro dell'industria cinematografica globale, si trova in quale paese?", answers: [{ text: 'USA', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Giappone', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Cina', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "Hollywood, un distretto di Los Angeles, California, è sinonimo dell'industria dell'intrattenimento americana." },
            { question: "Qual è il nome del piatto di riso tradizionale, spesso considerato un simbolo nazionale della Spagna?", answers: [{ text: 'Risotto', correct: false }, { text: 'Paella', correct: true }, { text: 'Sushi', correct: false }, { text: 'Riso Fritto', correct: false }], explanation: "La Paella, originaria di Valencia, è un piatto di riso vivace e saporito, iconico della cucina spagnola." },
            { question: "La 'Samba' è un famoso genere musicale e stile di danza che ha avuto origine in quale paese?", answers: [{ text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spagna', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'Brasile', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "La Samba ha le sue radici nella cultura afro-brasiliana ed è riconosciuta in tutto il mondo come un simbolo dell'identità nazionale del Brasile." },
            { question: "Il concetto filosofico di 'Wabi-Sabi', che trova la bellezza nell'imperfezione, è centrale nella cultura di quale paese?", answers: [{ text: 'Cina', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Giappone', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'Italia', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'Spagna', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "Wabi-sabi è una visione del mondo giapponese incentrata sull'accettazione della transitorietà e dell'imperfezione." },
            { question: "In quale paese è tradizione festeggiare il Capodanno con enormi fuochi d'artificio e mangiando ravioli (dumplings)?", answers: [{ text: 'USA', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'Brasile', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'Cina', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'Giappone', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "Il Capodanno Cinese è la celebrazione più importante, segnata da riunioni familiari, fuochi d'artificio per allontanare gli spiriti maligni e cibi simbolici come i ravioli." }
        ]
    },
    'ja': {
        mainTitle: "多文化クイズ",
        mainSubtitle: "時間と競争して知識を試そう！",
        mainDescription: "学術週間のためのプロジェクト：高等教育の国際化",
        startBtn: "ゲーム開始！",
        progressText: (current, total) => `問題 ${current} / ${total}`,
        scoreText: (score) => `スコア: ${score}`,
        endTitle: "ゲーム終了！",
        finalScore: (score) => `最終スコアは${score}点でした。`,
        highscorePrompt: "おめでとうございます！ランキングに入りました。名前を入力してください：",
        usernamePlaceholder: "あなたの名前",
        saveScoreBtn: "スコアを保存",
        playAgainBtn: "もう一度プレイ",
        rankingTitle: "🏆 トップスコアランキング",
        noScores: "まだスコアが記録されていません。一番乗りになろう！",
        timeoutMessage: "時間切れです！正解がハイライトされました。",
        questions: [
            { question: "サンバパレードで有名な大規模な年間祭り「カーニバル」はどの国で行われますか？", answers: [{ text: 'スペイン', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'ブラジル', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "ブラジルのカーニバル、特にリオデジャネイロとサルヴァドールは、その伝染するようなエネルギーと壮大なパレードで世界的に有名です。" },
            { question: "古代の円形劇場「コロッセオ」は、どの国の有名なランドマークですか？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'アメリカ', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'イタリア', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'スペイン', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "ローマのコロッセオは、ローマ帝国の象徴的なシンボルであり、古代世界の建築の驚異の一つです。" },
            { question: "情熱的な音楽とダンスのスタイル「フラメンコ」は、どの国で生まれましたか？", answers: [{ text: 'スペイン', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'ブラジル', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "フラメンコは、スペインのアンダルシア地方の複雑な芸術形式で、歌、踊り、ギターを組み合わせたものです。" },
            { question: "「アニメ」と「マンガ」という芸術形式は、どの国からの重要な文化輸出ですか？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: 'アメリカ', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '日本', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'ブラジル', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "日本はアニメ（アニメーション）とマンガ（コミック）の発祥地であり、世界的に絶大な人気を博しています。" },
            { question: "世界で最も印象的な建築物の一つである「万里の長城」は、どの国にありますか？", answers: [{ text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'スペイン', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'アメリカ', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '中国', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "中国の万里の長城は、中国の帝国を守るために何世紀にもわたって建設された一連の要塞です。" },
            { question: "世界の映画産業の中心地「ハリウッド」は、どの国にありますか？", answers: [{ text: 'アメリカ', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "カリフォルニア州ロサンゼルスの一地区であるハリウッドは、アメリカのエンターテイメント産業の代名詞です。" },
            { question: "スペインの国民的シンボルと見なされることが多い伝統的な米料理の名前は何ですか？", answers: [{ text: 'リゾット', correct: false }, { text: 'パエリア', correct: true }, { text: '寿司', correct: false }, { text: 'チャーハン', correct: false }], explanation: "バレンシア発祥のパエリアは、スペイン料理を象徴する、鮮やかで風味豊かな米料理です。" },
            { question: "「サンバ」は、どの国で生まれた有名な音楽ジャンルおよびダンススタイルですか？", answers: [{ text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'スペイン', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: 'ブラジル', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: 'アメリカ', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "サンバはアフロブラジル文化にルーツを持ち、ブラジルの国民的アイデンティティのシンボルとして世界的に認識されています。" },
            { question: "不完全さの中に美を見出す哲学的概念「わびさび」は、どの国の文化の中心ですか？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '日本', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: 'イタリア', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: 'スペイン', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "わびさびは、はかなさと不完全さを受け入れることを中心とした日本の世界観です。" },
            { question: "大規模な花火大会と餃子を食べて新年を祝う伝統があるのはどの国ですか？", answers: [{ text: 'アメリカ', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: 'ブラジル', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: '中国', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "中国の新年は最も重要な祝祭であり、家族の再会、悪霊を追い払うための花火、そして餃子のような象徴的な食べ物が特徴です。" }
        ]
    },
    'zh': {
        mainTitle: "多元文化测验",
        mainSubtitle: "与时间赛跑，测试您的知识！",
        mainDescription: "学术周项目：高等教育的国际化",
        startBtn: "开始游戏！",
        progressText: (current, total) => `第 ${current} 题 / 共 ${total} 题`,
        scoreText: (score) => `得分: ${score}`,
        endTitle: "游戏结束！",
        finalScore: (score) => `您的最终得分是 ${score} 分。`,
        highscorePrompt: "恭喜！您已进入排行榜。请输入您的名字：",
        usernamePlaceholder: "你的名字",
        saveScoreBtn: "保存分数",
        playAgainBtn: "再玩一次",
        rankingTitle: "🏆 最高分排行榜",
        noScores: "尚无记录。成为第一人！",
        timeoutMessage: "时间到！正确答案已高亮显示。",
        questions: [
            { question: "在哪个国家，“狂欢节”是一个以桑巴舞游行而闻名的大型年度节日？", answers: [{ text: '西班牙', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '巴西', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "巴西的狂欢节，尤其是在里约热内卢和萨尔瓦多，以其富有感染力的活力和壮观的游行而闻名于世。" },
            { question: "“罗马斗兽场”，一个古老的圆形剧场，是哪个国家的著名地标？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '美国', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '意大利', correct: true, flag: 'https://flagcdn.com/w40/it.png' }, { text: '西班牙', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "罗马的斗兽场是罗马帝国的标志性象征，也是古代世界的建筑奇迹之一。" },
            { question: "“弗拉明戈”，一种充满激情的音乐和舞蹈风格，起源于哪个国家？", answers: [{ text: '西班牙', correct: true, flag: 'https://flagcdn.com/w40/es.png' }, { text: '巴西', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "弗拉明戈是西班牙安达卢西亚地区一种复杂的艺术形式，结合了歌唱、舞蹈和吉他。" },
            { question: "“动漫”和“漫画”的艺术形式是哪个国家的重要文化输出？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '美国', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '日本', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: '巴西', correct: false, flag: 'https://flagcdn.com/w40/br.png' }], explanation: "日本是动漫（动画）和漫画（连环画）的发源地，它们在全球范围内广受欢迎。" },
            { question: "“长城”，世界上最令人印象深刻的建筑壮举之一，位于哪个国家？", answers: [{ text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '西班牙', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: '美国', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '中国', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "中国的长城是为保护中华帝国而历经数百年修建的一系列防御工事。" },
            { question: "“好莱坞”，全球电影业的中心，位于哪个国家？", answers: [{ text: '美国', correct: true, flag: 'https://flagcdn.com/w40/us.png' }, { text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }, { text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }], explanation: "好莱坞是加利福尼亚州洛杉矶的一个区，是美国娱乐业的代名词。" },
            { question: "通常被认为是西班牙国家象征的传统米饭菜肴叫什么名字？", answers: [{ text: '意大利调味饭', correct: false }, { text: '西班牙海鲜饭', correct: true }, { text: '寿司', correct: false }, { text: '炒饭', correct: false }], explanation: "西班牙海鲜饭（Paella）起源于瓦伦西亚，是一道色彩鲜艳、风味浓郁的米饭菜肴，是西班牙美食的标志。" },
            { question: "“桑巴”是起源于哪个国家的著名音乐流派和舞蹈风格？", answers: [{ text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '西班牙', correct: false, flag: 'https://flagcdn.com/w40/es.png' }, { text: '巴西', correct: true, flag: 'https://flagcdn.com/w40/br.png' }, { text: '美国', correct: false, flag: 'https://flagcdn.com/w40/us.png' }], explanation: "桑巴舞源于非洲裔巴西文化，被世界公认为巴西民族认同的象征。" },
            { question: "在不完美中发现美的哲学概念“侘寂”（Wabi-Sabi），是哪个国家文化的核心？", answers: [{ text: '中国', correct: false, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '日本', correct: true, flag: 'https://flagcdn.com/w40/jp.png' }, { text: '意大利', correct: false, flag: 'https://flagcdn.com/w40/it.png' }, { text: '西班牙', correct: false, flag: 'https://flagcdn.com/w40/es.png' }], explanation: "侘寂是一种以接受短暂和不完美为核心的日本世界观。" },
            { question: "在哪个国家，传统上会以大规模的烟花表演和吃饺子来庆祝新年？", answers: [{ text: '美国', correct: false, flag: 'https://flagcdn.com/w40/us.png' }, { text: '巴西', correct: false, flag: 'https://flagcdn.com/w40/br.png' }, { text: '中国', correct: true, flag: 'https://flagcdn.com/w40/cn.png' }, { text: '日本', correct: false, flag: 'https://flagcdn.com/w40/jp.png' }], explanation: "中国新年是最重要的庆祝活动，以家庭团聚、燃放烟花驱邪以及吃饺子等象征性食物为标志。" }
        ]
    }
};

// --- ELEMENTOS DO DOM ---
const langSelector = document.getElementById('lang-selector');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackContainer = document.getElementById('feedback-container');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const finalScoreElement = document.getElementById('final-score');
const highscoreForm = document.getElementById('highscore-form');
const highscoreFormContainer = document.getElementById('highscore-form-container');
const usernameInput = document.getElementById('username');
const highscoreList = document.getElementById('highscore-list');
const timerElement = document.getElementById('timer');

// --- ESTADO DO JOGO ---
let currentLanguage = 'pt';
let questions = [];
let shuffledQuestions, currentQuestionIndex;
let score = 0;
let highScores = JSON.parse(localStorage.getItem('multiculturalQuizHighScores')) || [];
let timerInterval;
let timeLeft = 30;

// --- EFEITOS SONOROS (Tone.js) ---
let correctSound, errorSound, clickSound, timerAlertSound;
let isAudioReady = false;

function setupSounds() {
    correctSound = new Tone.PolySynth(Tone.Synth, { volume: -10, oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 }, }).toDestination();
    errorSound = new Tone.MonoSynth({ volume: -8, oscillator: { type: "square" }, envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.2 }, filterEnvelope: { attack: 0.05, decay: 0.1, sustain: 0, release: 0.2, baseFrequency: 200, octaves: 2 } }).toDestination();
    clickSound = new Tone.MembraneSynth({ volume: -15, octaves: 5, pitchDecay: 0.1 }).toDestination();
    timerAlertSound = new Tone.Synth({ volume: -12, oscillator: { type: "sine" }, envelope: { attack: 0.001, decay: 0.1, sustain: 0.01, release: 0.1 } }).toDestination();
}

// --- LÓGICA DE IDIOMA ---
function setLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    // Adiciona tradução do botão Próxima Pergunta e prompt de overwrite se não existir
    if (!t.nextBtn) t.nextBtn = {
        'pt': 'Próxima',
        'en': 'Next',
        'es': 'Siguiente',
        'it': 'Avanti',
        'ja': '次へ',
        'zh': '下一题'
    }[lang];
    if (!t.overwritePrompt) t.overwritePrompt = {
        'pt': 'Nome já existe. Deseja sobrescrever a pontuação?',
        'en': 'Name already exists. Overwrite the score?',
        'es': 'El nombre ya existe. ¿Desea sobrescribir la puntuación?',
        'it': 'Il nome esiste già. Sovrascrivere il punteggio?',
        'ja': 'この名前は既に存在します。スコアを上書きしますか？',
        'zh': '名字已存在。要覆盖分数吗？'
    }[lang];
    questions = t.questions;

    // Atualiza textos da UI
    document.documentElement.lang = lang;
    document.getElementById('main-title').innerText = t.mainTitle;
    document.getElementById('main-subtitle').innerText = t.mainSubtitle;
    document.getElementById('main-description').innerText = t.mainDescription;
    startBtn.innerText = t.startBtn;
    document.getElementById('end-title').innerText = t.endTitle;
    usernameInput.placeholder = t.usernamePlaceholder;
    document.getElementById('save-score-btn').innerText = t.saveScoreBtn;
    playAgainBtn.innerText = t.playAgainBtn;
    document.getElementById('ranking-title').innerText = t.rankingTitle;
    document.getElementById('highscore-prompt').innerText = t.highscorePrompt;

    // Atualiza o botão de idioma selecionado
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.lang === lang);
    });

    displayHighScores(); // Re-exibe o ranking com o idioma correto
}

// --- FUNÇÕES DO JOGO ---
function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    langSelector.classList.add('hidden'); // Esconde o seletor durante o jogo

    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    scoreText.innerText = translations[currentLanguage].scoreText(score);
    setNextQuestion();
}

function startTimer() {
    timeLeft = 30;
    timerElement.innerText = timeLeft;
    timerElement.classList.remove('timer-warning');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 5 && timeLeft > 0) {
            timerElement.classList.add('timer-warning');
            if (isAudioReady) timerAlertSound.triggerAttackRelease("G5", "32n");
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    if (isAudioReady) errorSound.triggerAttackRelease("F#2", "8n");
    feedbackContainer.innerHTML = `<div>${translations[currentLanguage].timeoutMessage}</div>`;
    feedbackContainer.classList.remove('hidden');

    const allButtons = Array.from(answerButtonsElement.children);
    allButtons.forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
        setStatusClass(button, true);
        }
    });

    // Cria botão Próxima Pergunta em uma nova linha
    let nextBtn = document.createElement('button');
    nextBtn.id = 'next-question-btn';
    nextBtn.innerText = translations[currentLanguage].nextBtn || 'Próxima';
    nextBtn.className = 'mt-4 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-2 px-8 rounded-full text-lg transition-transform transform hover:scale-105';
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    // Adiciona o botão em uma nova linha
    let btnWrapper = document.createElement('div');
    btnWrapper.className = 'w-full flex justify-center';
    btnWrapper.appendChild(nextBtn);
    feedbackContainer.appendChild(btnWrapper);
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        progressText.innerText = translations[currentLanguage].progressText(currentQuestionIndex + 1, shuffledQuestions.length);
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    } else {
        endGame();
    }
}

function showQuestion(questionData) {
    questionElement.innerText = questionData.question;
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        // Adiciona a imagem da bandeira se ela existir
        if (answer.flag) {
            button.innerHTML = `<img src="${answer.flag}" alt="Bandeira" class="h-6 mr-3 rounded"> <span>${answer.text}</span>`;
        } else {
            button.innerText = answer.text;
        }
        button.classList.add('w-full', 'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-semibold', 'py-4', 'px-4', 'rounded-lg', 'transition-all', 'text-lg', 'flex', 'items-center', 'justify-center');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearInterval(timerInterval);
    timerElement.classList.remove('timer-warning');
    feedbackContainer.innerText = '';
    feedbackContainer.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    if (isAudioReady) clickSound.triggerAttackRelease("C2", "8n");

    const selectedButton = e.currentTarget; // Use currentTarget para garantir que pegamos o botão
    const correct = selectedButton.dataset.correct === 'true';

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            setStatusClass(button, true);
        }
    });

    setStatusClass(selectedButton, correct);

    if (correct) {
        score += 10;
        scoreText.innerText = translations[currentLanguage].scoreText(score);
        if (isAudioReady) correctSound.triggerAttackRelease(["C4", "E4", "G4"], "16n", Tone.now());
    } else {
        if (isAudioReady) errorSound.triggerAttackRelease("F#2", "8n");
    }

    feedbackContainer.innerHTML = `<div>${shuffledQuestions[currentQuestionIndex].explanation}</div>`;
    feedbackContainer.classList.remove('hidden');

    // Cria botão Próxima Pergunta em uma nova linha
    let nextBtn = document.createElement('button');
    nextBtn.id = 'next-question-btn';
    nextBtn.innerText = translations[currentLanguage].nextBtn || 'Próxima';
    nextBtn.className = 'mt-4 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-2 px-8 rounded-full text-lg transition-transform transform hover:scale-105';
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    // Adiciona o botão em uma nova linha
    let btnWrapper = document.createElement('div');
    btnWrapper.className = 'w-full flex justify-center';
    btnWrapper.appendChild(nextBtn);
    feedbackContainer.appendChild(btnWrapper);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.remove('bg-gray-700', 'hover:bg-gray-600');
        element.classList.add('bg-green-600', 'border-2', 'border-green-400');
    } else {
        element.classList.remove('bg-gray-700', 'hover:bg-gray-600');
        element.classList.add('bg-red-600', 'border-2', 'border-red-400');
    }
}

function clearStatusClass(element) {
    element.classList.remove('bg-green-600', 'border-green-400', 'bg-red-600', 'border-red-400');
}

function endGame() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    langSelector.classList.remove('hidden'); // Mostra o seletor novamente
    finalScoreElement.innerText = translations[currentLanguage].finalScore(score);

    const lowestScore = highScores.length < 5 ? 0 : highScores[highScores.length - 1].score;
    if (score > lowestScore) {
        highscoreFormContainer.classList.remove('hidden');
    } else {
        highscoreFormContainer.classList.add('hidden');
    }
}

function saveHighScore(e) {
    e.preventDefault();
    if (isAudioReady) clickSound.triggerAttackRelease("C3", "8n");
    const name = usernameInput.value.trim();
    if (!name) return;
    const existingIndex = highScores.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingIndex !== -1) {
        // Pergunta se deseja sobrescrever
        let overwrite = confirm(translations[currentLanguage].overwritePrompt || 'Nome já existe. Deseja sobrescrever a pontuação?');
        if (overwrite) {
            highScores[existingIndex].score = score;
        } else {
            usernameInput.value = '';
            usernameInput.focus();
            return;
        }
    } else {
        highScores.push({ score: score, name: name });
    }
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('multiculturalQuizHighScores', JSON.stringify(highScores));
    highscoreFormContainer.classList.add('hidden');
    usernameInput.value = '';
    displayHighScores();
}

function displayHighScores() {
    highscoreList.innerHTML = highScores
        .map(item => `<li class="bg-gray-700 p-3 rounded-lg flex justify-between text-lg"><span>${item.name}</span><strong>${item.score} pts</strong></li>`)
        .join('');

    if (highScores.length === 0) {
        highscoreList.innerHTML = `<li class="text-gray-400">${translations[currentLanguage].noScores}</li>`;
    }
}

// --- EVENT LISTENERS ---
langSelector.addEventListener('click', (e) => {
    const lang = e.target.closest('.lang-btn')?.dataset.lang;
    if (lang) {
        setLanguage(lang);
    }
});

async function initializeAudioAndGame(event) {
    if (isAudioReady) {
        clickSound.triggerAttackRelease("C2", "8n", Tone.now());
    } else {
        try {
            await Tone.start();
            setupSounds();
            isAudioReady = true;
            clickSound.triggerAttackRelease("C2", "8n", Tone.now());
        } catch (e) {
            console.error("Erro ao iniciar o contexto de áudio:", e);
        }
    }
    if (event.target.id === 'start-btn' || event.target.id === 'play-again-btn') {
        startGame();
    }
}

startBtn.addEventListener('click', initializeAudioAndGame);
playAgainBtn.addEventListener('click', initializeAudioAndGame);
highscoreForm.addEventListener('submit', saveHighScore);

// --- INICIALIZAÇÃO ---
setLanguage('pt');
