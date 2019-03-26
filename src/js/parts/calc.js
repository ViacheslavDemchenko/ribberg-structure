/* Calculator */

(function (){

    let square = document.getElementById('square'),
        lamps = document.getElementById('lamps'),
        checkboxes = document.querySelectorAll('.calc-checkbox__item'),
        calcBtn = document.querySelector('.calc__btn'),
        calcTotal = document.getElementById('total'),
        squareWarning = document.querySelector('.square-warning'),
        lampsWarning = document.querySelector('.lamps-warning'),
        checkboxValue,
        lampsPrice = 50,
        total = 0,
        result = 0,
        squareValue = 0,
        lampsValue = 0;

    function inputCheck(id, regex) {
        let element = document.getElementById(id);
            if (element) {
                let lastValue = element.value;
            if (!regex.test(lastValue)) {
                lastValue = '';
            }   
            setInterval( () => {
              let value = element.value;
              if (value != lastValue) {
                if (regex.test(value)) {
                  lastValue = value;
                } else {
                  element.value = lastValue;
                }
              }
            }, 10);
        }
    };

    inputCheck('square', /^[0-9]+[.]?[0-9]*$/); // Дробные числа с одной точкой 
    inputCheck('lamps', /^[0-9]?[0-9]*$/); // Только целые числа

    square.addEventListener('keyup', () => {
	    squareValue = square.value;
	    squareWarning.style.display = '';
	    lampsWarning.style.display = '';
	    calcTotal.textContent = 0;
        total = checkboxValue * squareValue + (lampsValue * lampsPrice);
	});

	lamps.addEventListener('keyup', () => {
		lampsValue = lamps.value;
		squareWarning.style.display = '';
	    lampsWarning.style.display = '';
        calcTotal.textContent = 0;
        total = checkboxValue * squareValue + (lampsValue * lampsPrice);
	});

    function checkboxesCheck() { 	
	   for (let i = 0; i < checkboxes.length; i++) {
	   	    if (checkboxes[i].checked) {
               checkboxValue = checkboxes[i].value;
	   	    }
	   	 
	   	    checkboxes[i].addEventListener('change', () => {
                calcTotal.textContent = 0;
               	checkboxValue = checkboxes[i].value;
                total = checkboxValue * squareValue + (lampsValue * lampsPrice);
	   	   });  
	    }
	};
    checkboxesCheck();
	
    calcBtn.addEventListener('click', () => {
    	if (squareValue == '' && lampsValue == '') {
    		total = 0;
    		squareWarning.style.display = 'block';
    		lampsWarning.style.display = 'block';
    	} else if (squareValue == 0 && lampsValue == 0) {
    		total = 0;
    		squareWarning.style.display = 'block';
    		lampsWarning.style.display = 'block';
    	} else if (squareValue == '' || squareValue == 0) {
    		total = 0;
    		squareWarning.style.display = 'block';
    	} else if (lampsValue == '' || lampsValue == 0) {
    		total = 0;
    		lampsWarning.style.display = 'block';
    	} else {
    	    squareWarning.style.display = '';
	        lampsWarning.style.display = '';
            animateValue('total', 0, total, 3000);
    	}   
	});

	function animateValue(id, start, end, duration) {
        let range = end - start,
            current = start,
            increment = 50,
            stepTime = Math.abs(Math.floor(duration / range)),
            element = document.getElementById(id); 
    
        let timer = setInterval( () => {
            current += increment; 
            element.textContent  = current; 

        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
  }

})();

  