function calculator() {
    
    function getSelector(selector) {
        return document.querySelector(selector);
    }

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
            getSelector('.girl__clicker').classList.add('calculating__choose-item_active');
            getSelector('.man__clicker').classList.remove('calculating__choose-item_active');
        }

        if (triger === 'man') {
            getSelector('.man__clicker').classList.add('calculating__choose-item_active');
            getSelector('.girl__clicker').classList.remove('calculating__choose-item_active');
        }

        if (triger === 'activity' && eTarget.getAttribute('data-ratio') === 'activeGreen') {
            let statusActivity = [getSelector('#low'), getSelector('#small'), getSelector('#medium'), getSelector('#high')];
            statusActivity.forEach(status => status.classList.remove('calculating__choose-item_active'));
            return eTarget.classList.add('calculating__choose-item_active');
        }
    }

    function displayResult(gender) {
        getSelector('.calculating__choose_big').addEventListener('click', (e) => {
            greenPoint('activity', e.target);

            let res = calculator(gender, getSelector('#weight').value,
                getSelector('#height').value,
                getSelector('#age').value, e.target.id);

            getSelector('.calculating__result span').innerHTML = `${res}`;
        });
    } 
    
    getSelector('.girl__clicker').addEventListener('click', ( ) => {
        greenPoint('girl');
        displayResult('girl');
    });

    getSelector('.man__clicker').addEventListener('click', () => {
        greenPoint('man');
        displayResult('man');
    });
}

export default calculator;