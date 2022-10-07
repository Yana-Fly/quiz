(function () {
    const Check = {
        userData: JSON.parse(sessionStorage.getItem('userData')),
        testId: null,
        questionsElement: null,
        quizRight: null,
        quiz: null,
        init() {
            if (this.userData) {
                this.testId = this.userData.id;
                if (this.testId) {
                    this.getResponse('https://testologia.site/get-quiz?id=', 'quiz');
                    this.getResponse('https://testologia.site/get-quiz-right?id=', 'quiz-right');
                    this.startCheck();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        getResponse(url, flag) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url + this.testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    if (flag === 'quiz') {
                        this.quiz = JSON.parse(xhr.responseText);
                    } else {
                        this.quizRight = JSON.parse(xhr.responseText);
                    }
                } catch (e) {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        startCheck() {
            this.questionsElement = document.getElementById('check-questions');
            document.getElementById('test-name').innerText = this.userData.quizName;
            document.getElementById('user-info').innerText = this.userData.name + ' ' + this.userData.lastName + ', ' + this.userData.email;
            this.showQuestions();
        },
        showQuestions() {
            this.questionsElement.innerHTML = '';
            const questions = this.quiz.questions;

            questions.forEach((item, index) => {
                const userAnswer = this.userData.results[index];
                const rightAnswer = this.quizRight[index];

                const questionElement = document.createElement('div');
                questionElement.className = 'check__question';

                const questionTitleElement = document.createElement('div');
                questionTitleElement.className = 'question-title common-title';
                questionTitleElement.innerHTML = '<span>Вопрос ' + (index + 1) + ':</span> ' + item.question;

                const questionOptionsElement = document.createElement('div');
                questionOptionsElement.className = 'check__question-options';

                item.answers.forEach(answer => {
                    const questionOptionElement = document.createElement('div');
                    questionOptionElement.className = 'question-option';

                    const inputId = 'answer-' + answer.id;
                    const inputElement = document.createElement('input');
                    inputElement.className = 'option-answer';
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('value', answer.id);

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;

                    questionOptionElement.appendChild(inputElement);
                    questionOptionElement.appendChild(labelElement);

                    if (userAnswer && userAnswer === answer.id) {
                        if (userAnswer === rightAnswer) {
                            questionOptionElement.classList.add('success');
                        } else {
                            questionOptionElement.classList.add('error');
                        }
                    }

                    questionOptionsElement.appendChild(questionOptionElement);
                });

                questionElement.appendChild(questionTitleElement);
                questionElement.appendChild(questionOptionsElement);
                this.questionsElement.appendChild(questionElement);
            })
        }
    };

    Check.init();
})();
