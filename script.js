let amount = +prompt('Введіть кількість студентів.');
		let result = [];

		function setRaiting () {
		  let i = 0;
		  let numberEstimates;
		  let raiting = [];
		  while (i < Math.round(Math.random() * (10 - 5) + 5)) {
		    raiting.push(Math.round(Math.random() * (12 - 1) + 1));
		    i++;
		  }
		  return raiting;
		}

		function setStudents () {
		  let i = 0;
		  if (isNaN(amount) || amount > 10) {
		    console.log('Не вірне значення (кількість студентів має бути від 1 до 10)');
		    return;
		  } else {
		    while (i < amount) { 
		    let obj = {};
		    obj.name = prompt('Введіть імʼя студента:');
		    obj.rating = setRaiting ();
		    result.push(obj);
		    i++;
		  }
		  
		  console.log('Початковий список студентів');
		  console.log(result);
		  getOperation ();
		  return result;
		  }
		};

		setStudents();

		function getOperation () {
			let operation;
			do {
			  	operation = +prompt(`Виповніть необхідну операцію:
				1. Найкращий студент
				2. Список успішності
				3. Середня оцінка
				4. Список боржників                     
				5. Додати нового студента
				6. Повтор операції`);
			} while (operation < 1 || operation > 6);

			if (operation == 1) {
		      	bestStudent();
		    } else if (operation == 2) {
		        gradeList(avrRating());
		    } else if (operation == 3) {
		        avrRating();
			    console.log('Середня оцінка');
			    console.log(result);
		    } else if (operation == 4) {
		        console.log('Список боржників');
		        debtList(avrRating());
	    	} else if (operation == 5) {
			    amount = 1;
			    setStudents();
		    } else if (operation == 6) {
			    amount = +prompt('Введіть кількість студентів.');
			    result = [];
			    setStudents();
			} else {
			    console.log('Не вірна операція!');
			}
		}

		function bestStudent() {
			let maxSum = 0;
		    let average = 0;
		    let nameStudent;

		    result.forEach(element => {
		        let sum = 0;
		      	element.rating.forEach((elementRating, index, arr) => {
			       	sum += elementRating;
			       	average = sum / arr.length;
			       	if (maxSum < average) {
			           	maxSum = average;
			           	nameStudent = element.name;
			        }
		        })
		    })

		    console.log(`Кращий студент ${nameStudent} з середнім балом ${maxSum}`);
		}

		function avrRating() {
			let maxSum = 0;
		    let average = 0;
		    let nameStudent;

		    result.forEach(element => {
		    	let sum = 0;
		      	element.rating.forEach((elementRating, index, arr) => {
			     	sum += elementRating;
			       	average = sum / arr.length;
		        })

		        for (let value of Object.entries(element)) {
		        	element.avr = average;
				}
		    })
		    return result;
		}

		function gradeList(arr) {
		    console.log('Список успішності');
			console.log(arr.sort((a, b) => a.avr < b.avr ? 1 : -1));
			return arr.sort((a, b) => a.avr < b.avr ? 1 : -1);
		}

		function debtList(arr) {
			let debtArr = [];
			arr.forEach((element, index, arr) => {
				if (element.avr < 5) {
					debtArr.push(element);
				}
			})
			console.log(debtArr);
			return debtArr;
		}