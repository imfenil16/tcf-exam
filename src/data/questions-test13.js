// CO Test 13 - Série 176
// 39 questions: Q1-3 image, Q4-9 audio-only, Q10-39 text-answers

const questionsTest13 = [
  // Section 1: Identifier une image (A1) - Q1-3
  {
    id: 1,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q1..mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13q1.jpg",
    options: null,
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q2..mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13q2.jpg",
    options: null,
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q3..mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q3.jpg",
    options: null,
    correctAnswer: 0
  },
  // Section 2: Comprendre un extrait court (A2) - Q4-9
  {
    id: 4,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q4..mp3",
    image: null,
    options: null,
    correctAnswer: 2
  },
  {
    id: 5,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q5..mp3",
    image: null,
    options: null,
    correctAnswer: 3
  },
  {
    id: 6,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q6..mp3",
    image: null,
    options: null,
    correctAnswer: 0
  },
  {
    id: 7,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q7..mp3",
    image: null,
    options: null,
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q8..mp3",
    image: null,
    options: null,
    correctAnswer: 3
  },
  {
    id: 9,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/CO13Q9-new.mp3",
    image: null,
    options: null,
    correctAnswer: 3
  },
  // Section 3: Comprendre une interaction (B1) - Q10-16
  {
    id: 10,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/CO13Q10.mp3",
    image: null,
    options: ["Pour aller manger ensemble.", "Pour annuler leur rendez-vous.", "Pour faire une promenade.", "Pour prendre des nouvelles."],
    correctAnswer: 0
  },
  {
    id: 11,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q11.mp3",
    image: null,
    options: ["Acheter un plan.", "Prendre un train.", "Trouver un hôtel.", "Visiter un musée."],
    correctAnswer: 1
  },
  {
    id: 12,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q12.mp3",
    image: null,
    options: ["Ils causent de nouvelles maladies.", "Ils favorisent les prises de poids.", "Ils sont bénéfiques pour la santé.", "Ils sont indispensables aux sportifs."],
    correctAnswer: 2
  },
  {
    id: 13,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q13.mp3",
    image: null,
    options: ["D'apprendre une langue.", "D'arrêter des études.", "De partir à l'étranger.", "De rencontrer du monde."],
    correctAnswer: 2
  },
  {
    id: 14,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/CO13Q14-new.mp3",
    image: null,
    options: ["D'attendre la fin de la journée pour nager.", "De s'équiper avant de se mettre à l'eau.", "De se baigner dans les secteurs prévus.", "De faire attention aux surfeurs."],
    correctAnswer: 2
  },
  {
    id: 15,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q15.mp3",
    image: null,
    options: ["La date de départ", "La durée du voyage", "La situation de l'hôtel", "Le prix du séjour."],
    correctAnswer: 3
  },
  {
    id: 16,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q16.mp3",
    image: null,
    options: ["Une contribution financière.", "Une formation artistique.", "Une intervention télévisée.", "Une participation bénévole."],
    correctAnswer: 3
  },
  // Section 3: Comprendre une interaction (B2) - Q17-20
  {
    id: 17,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q17.mp3",
    image: null,
    options: ["Il correspond à ses attentes.", "Il dure six mois au total.", "Il est proche de son domicile.", "Il offre un très bon salaire."],
    correctAnswer: 0
  },
  {
    id: 18,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2024/09/33q18.ogg",
    image: null,
    options: ["Comment diminuer la consommation d'énergie.", "Comment il faut appliquer les conseils des experts.", "Comment la santé est influencée par le calendrier.", "Comment se protège des maladies contagieuses."],
    correctAnswer: 2
  },
  {
    id: 19,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q19.mp3",
    image: null,
    options: ["Les accidents sont importants.", "Les arrêts sont interdits.", "Les départs sont nombreux.", "Les embouteillages sont finis."],
    correctAnswer: 2
  },
  {
    id: 20,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/CO13Q20-new.mp3",
    image: null,
    options: ["Le nombre d'élèves est en baisse.", "Les frais de scolarité sont élevés.", "Leurs programmes sont inadaptés.", "Leurs financements sont fragilisés."],
    correctAnswer: 3
  },
  // Section 4: Comprendre un exposé (B2) - Q21-25
  {
    id: 21,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/CO13Q21-new.mp3",
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
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q22.mp3",
    image: null,
    options: ["La fréquence des compétitions sportives.", "Le contenu des programmes sportifs.", "Les contraintes liées aux pratiques sportives.", "L'insuffisance des résultats sportifs."],
    correctAnswer: 2
  },
  {
    id: 23,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q23.mp3",
    image: null,
    options: ["Il fait des compliments.", "Il formule une invitation.", "Il cherche à convaincre.", "Il donne des conseils."],
    correctAnswer: 2
  },
  {
    id: 24,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q24.mp3",
    image: null,
    options: ["La qualité de l'accueil des visiteurs et des familles.", "Le souci du bien-être des personnes hospitalisées.", "La capacité d'adaptation du personnel médical.", "La prise en charge personnalisée en fonction de l'Age."],
    correctAnswer: 1
  },
  {
    id: 25,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q25.mp3",
    image: null,
    options: ["Ecouter de la musique classique.", "Parler des plats que l'on savoure.", "Partager un repas en famille.", "Avoir une table bien décorée."],
    correctAnswer: 1
  },
  // Section 4: Comprendre un exposé (C1) - Q26-35
  {
    id: 26,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q26.mp3",
    image: null,
    options: ["Aller à l'essentiel.", "Faire des phrases courtes.", "Hiérarchiser ses idées.", "S'exprimer avec précision."],
    correctAnswer: 3
  },
  {
    id: 27,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q27.mp3",
    image: null,
    options: ["Ils espèrent obtenir une allocation de l'état.", "Ils voient leur futur de manière positive.", "Ils comptent sur le soutien de leurs proches.", "Ils refusent d'habiter chez leurs parents."],
    correctAnswer: 1
  },
  {
    id: 28,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q28_01.mp3",
    image: null,
    options: ["Les élèves manquent de temps pour prendre leurs repas.", "Les habitudes alimentaires des élèves sont difficiles à modifier.", "Les menus des cantines scolaires sont très mal équilibrés.", "Les restaurants scolaires coutent cher aux familles."],
    correctAnswer: 1
  },
  {
    id: 29,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q29.mp3",
    image: null,
    options: ["L'absence de formation à l'élaboration du budget.", "Le désintérêt des jeunes pour les questions financières.", "Le manque de cours d'économie à l'université.", "Le peu d'information des banques sur les crédits."],
    correctAnswer: 0
  },
  {
    id: 30,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q30.mp3",
    image: null,
    options: ["Un bijou d'artisanat local.", "Un guide touristique illustré.", "Un modèle réduit de bateau.", "Un album de souvenirs personnels."],
    correctAnswer: 3
  },
  {
    id: 31,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q31.mp3",
    image: null,
    options: ["L'inégalité dans la répartition des taches.", "La surabondance de sollicitations.", "Le manque de fonctionnalité des locaux.", "Les interventions des collègues."],
    correctAnswer: 1
  },
  {
    id: 32,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q32.mp3",
    image: null,
    options: ["Ils nagent en plein air dans la capitale.", "Ils s'amusent dans un parc d'attraction.", "Ils se retrouvent à la piscine municipale.", "Ils sont en vacances au bord de la mer."],
    correctAnswer: 0
  },
  {
    id: 33,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q33.mp3",
    image: null,
    options: ["Parce qu'elle admire l'orchestre du conservatoire et qu'elle espère y jouer.", "Parce qu'elle aspire à rencontrer tous les grands interprètes classiques du moment.", "Parce qu'elle connait la discipline dont il faut faire preuve pour bien jouer.", "Parce qu'elle est elle-même migrante et sait combien peut lui être utile."],
    correctAnswer: 2
  },
  {
    id: 34,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2024/09/CO33Q034-maj.mp3",
    image: null,
    options: ["Une optimisation du confort auditif par des sons personnalisables.", "Une suppression intégrale des bruits mécaniques internes.", "Une diversification ludique de signaux sans objectif ergonomique.", "Une limitation réglementaire des nuisances sonores urbaines."],
    correctAnswer: 0
  },
  {
    id: 35,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q35.mp3",
    image: null,
    options: ["La perte de sa liberté intellectuelle.", "Les nombreux voyages à l'étranger.", "Un manque de reconnaissance.", "Une rémunération insuffisante."],
    correctAnswer: 0
  },
  // Section 4: Comprendre un exposé (C2) - Q36-39
  {
    id: 36,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q36.mp3",
    image: null,
    options: ["Il conditionne l'humeur.", "Il dope l'énergie.", "Il minimise l'angoisse.", "Il stimule la créativité."],
    correctAnswer: 3
  },
  {
    id: 37,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q37.mp3",
    image: null,
    options: ["D'affiner l'écoute entre musiciens.", "D'exprimer l'originalité d'une interprétation.", "De faire varier le répertoire des concerts.", "De perfectionner la technique du violoniste."],
    correctAnswer: 0
  },
  {
    id: 38,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q38.mp3",
    image: null,
    options: ["Elles demandent un nouveau statut juridique.", "Elles exigent des garanties réelles et tangibles.", "Elles mettent en doute la viabilité du projet.", "Elles veulent que les terres restent intactes."],
    correctAnswer: 1
  },
  {
    id: 39,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/12/13Q39.mp3",
    image: null,
    options: ["Elles entrainent des dépendances maladives.", "Elles nuisent aux capacités d'apprentissage.", "Elles perturbent la perception de la réalité.", "Elles provoquent un isolement dangereux."],
    correctAnswer: 0
  },
];

export { questionsTest13 };

export const sectionsTest13 = [
  { id: 1, title: 'Section 1 – Image', level: 'A1' },
  { id: 2, title: 'Section 2 – Écoute', level: 'A2' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B1' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B2' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C1' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C2' },
];
