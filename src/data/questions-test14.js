// CO Test 14 - Série 163
// 39 questions: Q1-4 image, Q5-9 audio-only, Q10-39 text-answers

const questionsTest14 = [
  // Section 1: Identifier une image (A1) - Q1-4
  {
    id: 1,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q01.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/1q14.jpg",
    options: null,
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q02.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/2q14.jpg",
    options: null,
    correctAnswer: 0
  },
  {
    id: 3,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q03.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/3q14.jpg",
    options: null,
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q04.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/4q14.jpg",
    options: null,
    correctAnswer: 2
  },
  // Section 2: Comprendre un extrait court (A2) - Q5-9
  {
    id: 5,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q05.mp3",
    image: null,
    options: null,
    correctAnswer: 2
  },
  {
    id: 6,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q06.mp3",
    image: null,
    options: null,
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q07.mp3",
    image: null,
    options: null,
    correctAnswer: 3
  },
  {
    id: 8,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q08.mp3",
    image: null,
    options: null,
    correctAnswer: 1
  },
  {
    id: 9,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q09.mp3",
    image: null,
    options: null,
    correctAnswer: 1
  },
  // Section 3: Comprendre une interaction (B1) - Q10-14
  {
    id: 10,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q10.mp3",
    image: null,
    options: ["Attendre la réponse.", "Compléter son dossier.", "Demander un passeport.", "Envoyer son inscription."],
    correctAnswer: 1
  },
  {
    id: 11,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q11.mp3",
    image: null,
    options: ["De cinéma.", "De lecture.", "De musique.", "De théâtre."],
    correctAnswer: 0
  },
  {
    id: 12,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q12.mp3",
    image: null,
    options: ["Il y a un service internet.", "Le placement est libre.", "On y propose des repas.", "Son personnel est bilingue."],
    correctAnswer: 0
  },
  {
    id: 13,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q13.mp3",
    image: null,
    options: ["La date de départ.", "La durée du voyage.", "La situation de l'hôtel.", "Le prix du séjour."],
    correctAnswer: 3
  },
  {
    id: 14,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q14.mp3",
    image: null,
    options: ["II n'aime pas l'œuvre de ce peintre.", "La présentation des tableaux lui a déplu.", "Il a trouvé qu'il y avait trop de visiteurs.", "Il s'est ennuyé en faisant la queue."],
    correctAnswer: 2
  },
  // Section 3: Comprendre une interaction (B2) - Q15-20
  {
    id: 15,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q15.mp3",
    image: null,
    options: ["Pour lui présenter un produit.", "Pour organiser un voyage.", "Pour suivre une formation.", "Pour visiter Lyon avec lui."],
    correctAnswer: 0
  },
  {
    id: 16,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q16.mp3",
    image: null,
    options: ["Son caractère.", "Ses diplômes.", "Son expérience.", "Ses motivations."],
    correctAnswer: 0
  },
  {
    id: 17,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q17.mp3",
    image: null,
    options: ["Son âge.", "Sa motivation.", "Son expérience.", "Sa qualification."],
    correctAnswer: 3
  },
  {
    id: 18,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q18.mp3",
    image: null,
    options: ["Qu'elle l'avait oublié en vacances.", "Qu'un collègue l'avait consulté.", "Que son assistant l'avait perdu.", "Qu'on l'avait envoyé ailleurs."],
    correctAnswer: 2
  },
  {
    id: 19,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q19.mp3",
    image: null,
    options: ["Elle va appeler le locataire.", "Elle va attendre un petit peu.", "Elle va refuser le paiement.", "Elle va revenir une autre fois."],
    correctAnswer: 1
  },
  {
    id: 20,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q20.mp3",
    image: null,
    options: ["Il fait beau qu'hier.", "Il fait plus mauvais qu'hier.", "Il pleut plus qu'hier.", "Il y a moins de soleil qu'hier."],
    correctAnswer: 0
  },
  // Section 4: Comprendre un exposé (B2) - Q21-25
  {
    id: 21,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q21-new.mp3",
    image: null,
    options: ["Elle va repartir avec sa voiture.", "Elle va revenir dans dix minutes.", "Elle va revenir le lendemain.", "Elle va repartir sans sa voiture."],
    correctAnswer: 3
  },
  {
    id: 22,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q22.mp3",
    image: null,
    options: ["Ils affichaient des prix erronés.", "Ils annonçaient de fausses promotions.", "Ils soldaient des articles périmés.", "Ils vendaient des marchandises à perte."],
    correctAnswer: 1
  },
  {
    id: 23,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q23.mp3",
    image: null,
    options: ["II n'y a plus de place en seconde classe.", "II n'y a plus de place pour la voiture.", "Il n'y a plus de place pour quatre personnes.", "II n'y a plus de cabines pour quatre personnes."],
    correctAnswer: 1
  },
  {
    id: 24,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q24.mp3",
    image: null,
    options: ["Elle a changé de cursus universitaire.", "Elle a rencontré des gens étonnants.", "Elle a suivi des enseignements variés.", "Elle a trouvé le niveau des cours facile."],
    correctAnswer: 2
  },
  {
    id: 25,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/20Q24.mp3",
    image: null,
    options: ["Amener l'élève à participer à sa propre formation.", "Axer principalement l'apprentissage sur le jeu.", "Initier les élèves à des activités parascolaires.", "Responsabiliser les élèves encore immatures."],
    correctAnswer: 0
  },
  // Section 4: Comprendre un exposé (C1) - Q26-33
  {
    id: 26,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q26.mp3",
    image: null,
    options: ["Ils annulent leurs activités.", "Ils partent à la montagne.", "Ils préfèrent sortir la nuit.", "Ils restent au frais à l'intérieur."],
    correctAnswer: 1
  },
  {
    id: 27,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q27.mp3",
    image: null,
    options: ["De ses difficultés à se réveiller le matin.", "De son dernier salaire qui est insuffisant.", "De son emploi du temps professionnel.", "De son manque d'organisation habituel."],
    correctAnswer: 2
  },
  {
    id: 28,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q28.mp3",
    image: null,
    options: ["La répartition des tâches dans le service.", "Le manque d'expérience de l'équipe.", "Le retard pris dans la réalisation d'un projet.", "Les désaccords entre employeur et employés."],
    correctAnswer: 0
  },
  {
    id: 29,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/04/Test-2-%E2%80%93-Q29.mp3",
    image: null,
    options: ["D'apprendre à élaborer des itinéraires de visites.", "D'expérimenter une manière différente de voyager.", "De découvrir des adresses d'hôtel à l'étranger.", "De participer à des actions de solidarité internationale."],
    correctAnswer: 1
  },
  {
    id: 30,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q30.mp3",
    image: null,
    options: ["Il y a eu des problèmes de circulation automobile.", "Le réveille-matin n'a pas sonné.", "Il y a eu une panne d'électricité dans le métro.", "Le personnel du métro a fait grève."],
    correctAnswer: 2
  },
  {
    id: 31,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q31.mp3",
    image: null,
    options: ["Il annonce une réorganisation.", "Il encourage un collaborateur.", "Il négocie des délais de livraison.", "II rappelle à l'ordre un employé."],
    correctAnswer: 3
  },
  {
    id: 32,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q32.mp3",
    image: null,
    options: ["L'attribution d'aides financières.", "Les inégalités salariales.", "Les modes de consommation.", "L'essor du travail féminin."],
    correctAnswer: 3
  },
  {
    id: 33,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q33-new.mp3",
    image: null,
    options: ["Les jeunes diplômés privilégient le travail en milieu urbain.", "Les lauréats aux concours vétérinaires sont trop peu nombreux.", "Les soins aux animaux de ferme demandent une spécialisation.", "Les vétérinaires en activité refusent de former les nouveaux."],
    correctAnswer: 0
  },
  // Section 4: Comprendre un exposé (C2) - Q34-39
  {
    id: 34,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/WhatsApp-Audio-2024-06-05-a-14.13.40_f7b90a20.mp3",
    image: null,
    options: ["Faire découvrir des spécialités gastronomiques du terroir.", "Présenter aux visiteurs des spécimens d'animaux d'élevage.", "Promouvoir la campagne comme destination touristique.", "Sensibiliser le public à la protection de l'environnement."],
    correctAnswer: 0
  },
  {
    id: 35,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/WhatsApp-Audio-2024-06-05-a-14.13.40_6b8f6a12.mp3",
    image: null,
    options: ["Des enquêtes sondent la population sur la compréhensibilité des textes.", "Des juristes contrôlent la rédaction qui a été assurée par des médecins.", "Des professionnels de santé et des utilisateurs vérifient les notices.", "Des programmes informatiques garantissent la lisibilité des textes."],
    correctAnswer: 2
  },
  {
    id: 36,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q36_01.mp3",
    image: null,
    options: ["Il demande un délai supplémentaire de réflexion.", "Il doute de l'intérêt d'un diagnostic préalable.", "Il hésite sur la définition de son projet.", "II souhaite l'avis de consultants extérieurs."],
    correctAnswer: 1
  },
  {
    id: 37,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO14Q37-new.mp3",
    image: null,
    options: ["De la mise en vente libre de jouets sans contrôle sanitaire.", "De la tendance des adultes à s'approprier les jouets des enfants.", "De l'intérêt croissant suscité par les jouets tout au long de l'année.", "Du niveau de toxicité maximal toléré dans la fabrication des jouets."],
    correctAnswer: 0
  },
  {
    id: 38,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/14Q38.mp3",
    image: null,
    options: ["Sur l'étroite collaboration avec les équipes locales.", "Sur la formation des employés expatriés.", "Sur la prédominance de bénévoles dans chaque pays.", "Sur le montant élevé des bénéfices réalisés."],
    correctAnswer: 0
  },
  {
    id: 39,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/Test-2-%E2%80%93-Q39.mp3",
    image: null,
    options: ["L'absence de temps morts.", "L'ennui des distractions.", "L'insuffisance de repos.", "Le manque d'action."],
    correctAnswer: 0
  },
];

export { questionsTest14 };

export const sectionsTest14 = [
  { id: 1, title: 'Section 1 – Image', level: 'A1' },
  { id: 2, title: 'Section 2 – Écoute', level: 'A2' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B1' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B2' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C1' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C2' },
];
