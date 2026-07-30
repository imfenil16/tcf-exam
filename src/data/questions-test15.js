// CO Test 15 - Série 178
// 39 questions: Q1-2 image, Q3-7 audio-only, Q8-39 text-answers

const questionsTest15 = [
  // Section 1: Identifier une image (A1) - Q1-2
  {
    id: 1,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO15Q01.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16q1.jpg",
    options: null,
    correctAnswer: 3
  },
  {
    id: 2,
    type: 'image',
    section: 1,
    sectionTitle: "Identifier une image",
    level: "A1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/CO15Q02.mp3",
    image: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16q2.jpg",
    options: null,
    correctAnswer: 2
  },
  // Section 2: Comprendre un extrait court (A2) - Q3-7
  {
    id: 3,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q3.mp3",
    image: null,
    options: null,
    correctAnswer: 2
  },
  {
    id: 4,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q4.mp3",
    image: null,
    options: null,
    correctAnswer: 1
  },
  {
    id: 5,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q5.mp3",
    image: null,
    options: null,
    correctAnswer: 0
  },
  {
    id: 6,
    type: 'audio-only',
    section: 2,
    sectionTitle: "Comprendre un extrait court",
    level: "A2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q6.mp3",
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
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q7.mp3",
    image: null,
    options: null,
    correctAnswer: 0
  },
  // Section 3: Comprendre une interaction (B1) - Q8-13
  {
    id: 8,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q8.mp3",
    image: null,
    options: ["Elle doit quitter son logement.", "Il y a des travaux chez elle.", "Le loyer est devenu trop cher.", "Sa colocataire est partie."],
    correctAnswer: 0
  },
  {
    id: 9,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q9.mp3",
    image: null,
    options: ["Chercher un travail en France.", "Obtenir une bourse d'études.", "Suivre des cours à l'université.", "Trouver un appartement à Marseille."],
    correctAnswer: 2
  },
  {
    id: 10,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q10.mp3",
    image: null,
    options: ["Elle est pressée.", "Elle est végétarienne.", "Elle fait le régime.", "Elle manque d'appétit."],
    correctAnswer: 3
  },
  {
    id: 11,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q11.mp3",
    image: null,
    options: ["Changer de propriétaire.", "Louer un appartement.", "Partager un logement.", "Partir vivre à l'étranger."],
    correctAnswer: 1
  },
  {
    id: 12,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q12.mp3",
    image: null,
    options: ["De leur voyage en Angleterre.", "Des résultats des examens.", "Du cout de la vie en ville.", "D'un séjour linguistique."],
    correctAnswer: 3
  },
  {
    id: 13,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2022/11/11Q13.mp3",
    image: null,
    options: ["D'aller dans un bar.", "De faire les courses.", "De préparer un voyage.", "De travailler ensemble."],
    correctAnswer: 0
  },
  // Section 3: Comprendre une interaction (B2) - Q14-19
  {
    id: 14,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q14.mp3",
    image: null,
    options: ["L'enfant est malade à cause des chats.", "La famille a déjà eu un chien.", "Le père déteste les animaux.", "Les parents ont beaucoup de travail."],
    correctAnswer: 0
  },
  {
    id: 15,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q15.mp3",
    image: null,
    options: ["Une chambre d'hôtel.", "Une maison individuelle.", "Un grand appartement.", "Un studio en ville."],
    correctAnswer: 3
  },
  {
    id: 16,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q16.mp3",
    image: null,
    options: ["À quel moment il pourra poser des congés.", "Dans quelle ville il devra partir en mission.", "Qui sera de permanence au mois d'aout.", "S'il sera autorisé à suivre un stage en été."],
    correctAnswer: 0
  },
  {
    id: 17,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q17.mp3",
    image: null,
    options: ["Confirmer la date d'un entretien d'embauche.", "Se renseigner sur les conditions de travail.", "S'informer sur une formation professionnelle.", "Vérifier si un courrier est bien arrivé."],
    correctAnswer: 3
  },
  {
    id: 18,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q18.mp3",
    image: null,
    options: ["Elle accueille une main-d'œuvre ciblée.", "Elle bénéficie d'une situation géographique privilégiée.", "Elle est la destination d'une population migrante jeune.", "Elle pratique une politique nataliste très attractive."],
    correctAnswer: 2
  },
  {
    id: 19,
    type: 'text-answers',
    section: 3,
    sectionTitle: "Comprendre une interaction",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q19.mp3",
    image: null,
    options: ["D'une négociation par visioconférence.", "De l'urgence des dossiers à traité.", "Des avantages du travail à distance.", "Des problèmes fréquents de transports."],
    correctAnswer: 2
  },
  // Section 4: Comprendre un exposé (B2) - Q20-25
  {
    id: 20,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q20.mp3",
    image: null,
    options: ["Interviewer un réalisateur.", "Participer à un festival.", "Tourner un film.", "Visiter des studios de cinéma."],
    correctAnswer: 2
  },
  {
    id: 21,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q21.mp3",
    image: null,
    options: ["C'est un artiste oublié par le public.", "Il a travaillé avec des couleurs claires.", "On lui a demandé de décorer un bâtiment.", "Son œuvre est présentée en France."],
    correctAnswer: 3
  },
  {
    id: 22,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q22.mp3",
    image: null,
    options: ["Parce qu'ils ont été scolarisés dans des lycées plurilingues.", "Parce qu'ils ont été adoptés dans des pays différents.", "Parce qu'ils ont vécu dans de diverses zones de la France.", "Parce qu'ils parlent plusieurs langues à la maison."],
    correctAnswer: 1
  },
  {
    id: 23,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q23.mp3",
    image: null,
    options: ["D'attribuer à la lecture le statut de loisir.", "De favoriser la lecture en automne.", "De limiter la lecture d'histoires illustrées.", "De sélectionner des lectures classiques."],
    correctAnswer: 0
  },
  {
    id: 24,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q24.mp3",
    image: null,
    options: ["Elle a beaucoup d'expérience.", "Elle a vite appris son métier.", "Elle aime prendre des risques.", "Elle sait diriger ses collègues."],
    correctAnswer: 1
  },
  {
    id: 25,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "B2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q25.mp3",
    image: null,
    options: ["Le nombre d'étudiants inscrits a augmenté.", "Les cursus sur l'environnement se sont multipliés.", "Les enseignants font des carrières prestigieuses.", "Les formations sont devenues plus concrètes."],
    correctAnswer: 1
  },
  // Section 4: Comprendre un exposé (C1) - Q26-33
  {
    id: 26,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q26.mp3",
    image: null,
    options: ["Elle construit des maisons pour les personnes âgées.", "Elle organise des évènements rassemblant les générations.", "Elle permet à des jeunes d'habiter chez des personnes âgées.", "Elle valorise les professions d'assistance aux personnes âgées."],
    correctAnswer: 2
  },
  {
    id: 27,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q27.mp3",
    image: null,
    options: ["Il est caractérisé par son rythme.", "Il est protégé par des apports lexicaux varies.", "Il est protégé par les académiciens.", "Il est utilisé par une minorité de locuteurs."],
    correctAnswer: 1
  },
  {
    id: 28,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q28.mp3",
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
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q29.mp3",
    image: null,
    options: ["D'un outil qui facilite l'apprentissage, quel que soit la discipline étudiée.", "De la bonne méthode de révision d'un cours quand on est pris par le temps.", "De la difficulté a rédigé des cours motivants pour les jeunes étudiants.", "Des limites de l'enseignement à distance pour certaines disciplines."],
    correctAnswer: 0
  },
  {
    id: 30,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q30.mp3",
    image: null,
    options: ["D'un appel à un projets imaginaires.", "D'un examen de fin d'études.", "D'un nouveau plan d'urbanisme.", "D'une rénovation d'un monument."],
    correctAnswer: 0
  },
  {
    id: 31,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q31.mp3",
    image: null,
    options: ["Elle annonce de futures découvertes.", "Elle confirme une théorie ancienne.", "Elle illustre les progrès du matériel scientifiques.", "Elle permet la poursuite des travaux d'Einstein."],
    correctAnswer: 1
  },
  {
    id: 32,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q32.mp3",
    image: null,
    options: ["La conférence qui a eu lieu est uniquement symbolique.", "La secrétaire d'État a fait part de son pessimisme.", "Les discussions s'annoncent longues et difficiles.", "Tous les points de l'accord ont déjà été traités sans succès."],
    correctAnswer: 2
  },
  {
    id: 33,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C1",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q33.mp3",
    image: null,
    options: ["C'est la reproduction d'un café du siècle dernier.", "Il contient un dépôt-vente de meubles design.", "C'est à la fois un restaurant et une galerie d'art.", "Il y organise un festival de musique électronique."],
    correctAnswer: 2
  },
  // Section 4: Comprendre un exposé (C2) - Q34-39
  {
    id: 34,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q34.mp3",
    image: null,
    options: ["Une littérature axée sur les débats avec le public.", "Une littérature expérimentée à travers le jeu.", "Une littérature interprétée par les comédiens.", "Une littérature portée sur l'interdisciplinarité."],
    correctAnswer: 3
  },
  {
    id: 35,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q35.mp3",
    image: null,
    options: ["Allonger la durée de vie des smartphones.", "Evaluer la consommation téléphonique.", "Gérer le temps de connexion à internet.", "Optimiser l'utilisation des appareils."],
    correctAnswer: 3
  },
  {
    id: 36,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q36.mp3",
    image: null,
    options: ["Des partitions musicales ponctuent les chapitres.", "Elle réunit des textes de musiciens sur le thème de la peur.", "L'éditeur a choisi d'accompagner le livre d'un DVD.", "Sa mise en page est comparable à celle du livret d'un disque."],
    correctAnswer: 3
  },
  {
    id: 37,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q37.mp3",
    image: null,
    options: ["De consulter un médecin psychothérapeute.", "Pour limiter la naissance des automobiles.", "De prescrire un traitement médicamenteux.", "D'informer les utilisateurs sur leurs dangers."],
    correctAnswer: 3
  },
  {
    id: 38,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q38.mp3",
    image: null,
    options: ["Un durcissement des politiques relatives à la consommation.", "Un renforcement des pouvoirs de la Commission européenne.", "Une homogénéisation des règlementations internationales.", "Une législation dans le respect de la singularité des États."],
    correctAnswer: 3
  },
  {
    id: 39,
    type: 'text-answers',
    section: 4,
    sectionTitle: "Comprendre un exposé",
    level: "C2",
    audio: "https://examens.preptcfcanada.com/wp-content/uploads/2023/01/16Q39.mp3",
    image: null,
    options: ["Le processus d'attractivité des cellules femelles.", "Les différences avec la reproduction des plantes terrestres.", "La constitution de certains organismes aquatiques.", "L'influence de la météorologie sur leur fécondation."],
    correctAnswer: 0
  },
];

export { questionsTest15 };

export const sectionsTest15 = [
  { id: 1, title: 'Section 1 – Image', level: 'A1' },
  { id: 2, title: 'Section 2 – Écoute', level: 'A2' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B1' },
  { id: 3, title: 'Section 3 – Compréhension', level: 'B2' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C1' },
  { id: 4, title: 'Section 4 – Compréhension avancée', level: 'C2' },
];
