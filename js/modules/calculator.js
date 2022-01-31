function calculator() {
    //calculator calories
    const manClicker = document.querySelector('.man__clicker'),
        girlClicker = document.querySelector('.girl__clicker'),
        
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),

        input = document.querySelector('.calculating__choose_big'),

        lowActivity = document.querySelector('#low'), 
        smallActivity = document.querySelector('#small'),
        mediumActivity = document.querySelector('#medium'),
        highActivity = document.querySelector('#high'),

        resultCalculate = document.querySelector('.calculating__result span');

    function calculator(gender, weight, growth, age, activity) {
        let result = 0;

        let objActive = {
            low: 1.2,
            small: 1.375,
            medium: 1.55,
            high: 1.725
        };

        if (gender === 'man') {
            result =  88.36 + (13.4 * Number(weight)) + (4.8 * Number(growth)) - (5.7 * Number(age));
        }

        if (gender === 'girl') {
            result =  447.6 + (9.2 * Number(weight)) + (3.1 * Number(growth)) - (4.3 * Number(age));
        }

        for (const i in objActive) {
            if (activity == i) {
                return Math.round(result * objActive[i]);
            }
        }
    }

    function greenPoint(triger, eTarget) {
        if (triger === 'girl') {
            girlClicker.classList.add('calculating__choose-item_active');
            manClicker.classList.remove('calculating__choose-item_active');
        }

        if (triger === 'man') {
            manClicker.classList.add('calculating__choose-item_active');
            girlClicker.classList.remove('calculating__choose-item_active');
        }

        if (triger === 'activity' && eTarget.getAttribute('data-ratio') === 'activeGreen') {
            let statusActivity = [lowActivity, smallActivity, mediumActivity, highActivity];
            statusActivity.forEach(status => status.classList.remove('calculating__choose-item_active'));
            return eTarget.classList.add('calculating__choose-item_active');
        }
    }

    function displayResult(gender) {
        input.addEventListener('click', (e) => {
            greenPoint('activity', e.target);
            let res = calculator(gender, weight.value, height.value, age.value, e.target.id);
            resultCalculate.innerHTML = `${res} kkal`;
        });
    } 
    
    girlClicker.addEventListener('click', ( ) => {
        greenPoint('girl');
        displayResult('girl');
    });

    manClicker.addEventListener('click', () => {
        greenPoint('man');
        displayResult('man');
    });
}

export default calculator;