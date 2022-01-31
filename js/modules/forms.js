import {closeModal, openModal} from "./modal";
import {postData} from "../servises/servises";

function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thank you',
        failure: 'wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMsg);
            const formData = new FormData(form);

            const obj = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', obj)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });        
    }

    function showThanksModal(msg) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div calss="modal__title">${msg}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}
export default forms;
