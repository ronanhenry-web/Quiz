//utiliser le fetch
//https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

fetch("quiz.json")
    .then(function(response) { return response.json(); })
    .then(function(donnée) {

        //Menu start ***
        const thème = document.querySelector(".theme");
        thème.innerHTML = donnée.theme;

        const questionTot = document.querySelector(".question-tot");
        questionTot.innerHTML = donnée.nombreQuestion;

        document.querySelector('.wrapper').addEventListener('click', () => {
            document.querySelector('.home-box').classList.add('hide');
            document.querySelector('.quiz-box').classList.remove('hide');
            document.querySelector('.result-box').classList.add('hide');
            start();
        }); 

        const nombreQts = document.querySelector(".nombre-question");
        nombreQts.innerHTML = donnée.nombreQuestion;

        const afRep = document.querySelector("answer-indicator");

        //Menu quiz ***
        let tab = []

        for (let i = 0; i < donnée.question.length; i++) {
            tab.push(donnée.question[i]);
        }

        let nombreQt = 0;
        let totalCorrect = 0;

        document.querySelector('.btn-next').addEventListener('click', () => {
            start();
        })

        function start() {
            //Random
            let min = 0;
            let max = tab.length;
            let random = Math.floor(Math.random() * (max - min) + min);

            document.querySelector(".btn-next").style.display = "none"; 

            //Compteur
            let containerQuestion = document.querySelector('.option-container');
            nombreQt = nombreQt + 1;
            document.querySelector('.numero-question').innerHTML = nombreQt;

            while (containerQuestion.firstChild) {
                containerQuestion.removeChild(containerQuestion.firstChild);
            }

            //Stop si toute les valeurs sont passées
            if (tab.length == 0) {
                return;
            } else {
                document.querySelector('.question-text').innerHTML = tab[random].q;

                //Création et gestion du bouton
                for (let i = 0; i < tab[random].option.length; i++) {
                    let button = document.createElement("button");
                    button.classList.add("option");
                    button.classList.add("option-" + i);
                    button.value = tab[random].option[i];
                    button.innerHTML = tab[random].option[i];
                    let reponse = tab[random].reponse;

                    button.addEventListener('click', () => {

                        //Bouton réponse
                        if (button.value == reponse) {
                            totalCorrect = totalCorrect + 1;
                            button.classList.add("correct");
                        } else {
                            button.classList.add("faux");

                            //Trouver la bonne réponse si la réponse sélectionné est mauvaise
                            for (let j = 0; j < tab[random].option.length; j++) {
                                let selectButton = document.querySelector(".option-" + j);

                                if (selectButton.value == reponse) {
                                    selectButton.classList.add("correct");
                                };
                            };
                        };

                        //Une réponse possible
                        for (let j = 0; j < tab[random].option.length; j++) {
                            document.querySelector(".option-" + j).disabled = true;
                        }

                        //Afficher ou pas le bouton
                        if (tab.length == 1) {
                            document.querySelector(".btn-score").style.display = "block";
                            document.querySelector(".btn-next").style.display = "none";
                        } else {
                            document.querySelector(".btn-next").style.display = "block";
                        }
                        tab.splice(random, 1);
                    });
                    document.querySelector('.option-container').appendChild(button);
                }
            }
        };

        //Menu résultat ***
        document.querySelector('.btn-score').addEventListener('click', () => {
            document.querySelector('.home-box').classList.add('hide');
            document.querySelector('.quiz-box').classList.add('hide');
            document.querySelector('.result-box').classList.remove('hide');

            const totalQts = document.querySelector(".total-question");
            totalQts.innerHTML = donnée.nombreQuestion;

            const totalBonneRep = document.querySelector(".total-correct");
            totalBonneRep.innerHTML = totalCorrect;

            const totalMauvaiseRep = document.querySelector(".total-false");
            totalMauvaiseRep.innerHTML = donnée.question.length - totalCorrect;

            const totalBonneRepScore = document.querySelector(".total-correct-score");
            totalBonneRepScore.innerHTML = Math.round((totalCorrect / donnée.question.length) * 100);
        });

        //Revenir au menu
        document.querySelector('.btn-menu').addEventListener('click', () => {
            document.querySelector('.home-box').classList.remove('hide');
            document.querySelector('.quiz-box').classList.add('hide');
            document.querySelector('.result-box').classList.add('hide');
        });
    });