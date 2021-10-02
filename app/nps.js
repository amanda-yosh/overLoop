window.addEventListener('load', () => {

    let form = document.getElementById('form')
    let nomeInput = document.getElementById('nome')
    let emailInput = document.getElementById('email')
    let btnEnviar = document.querySelector('.botaoenviar')

    let btnListRecomenda = document.querySelectorAll('.recomenda button')
    let btnListFacil = document.querySelectorAll('.facil button')
    let btnListUtil = document.querySelectorAll('.util button')

    let btnListRecomendaValue
    let btnListFacilValue
    let btnListUtilValue
    let emailInputValue
    let nomeInputValue

    // target -> pega quem foi o responsável por disparar o evento

    btnListRecomenda.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()

            btnListRecomendaValue = event.target.value
        })
    })

    btnListFacil.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()

            btnListFacilValue = event.target.value
        })
    })

    btnListUtil.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()

            btnListUtilValue = event.target.value
        })
    })

    btnEnviar.addEventListener('click', (event) => {
        event.preventDefault()
        if (nomeInput.value.length < 2) {

            let erro = document.createElement('p');
            let msg = document.createTextNode('Preencha um nome válido')
            erro.appendChild(msg);
            nomeInput.innerHTML='';
            nomeInput.insertAdjacentElement("afterend", erro);  
        }
        if (emailInput.value.length < 10 || emailInput.value.length > 180 || !emailInput.value.includes('.') || !emailInput.value.includes('@')) {

            let erro = document.createElement('p');
            let msg = document.createTextNode('Preencha o email de forma correta, < 10, > 180, incluindo . e @')
            erro.appendChild(msg);
            emailInput.innerHTML='';
            emailInput.insertAdjacentElement("afterend", erro);   
        }
        else if (!btnListRecomendaValue || !btnListFacilValue || !btnListUtilValue) {

            let erro = document.createElement('p');
            let msg = document.createTextNode('Marque uma nota para cada uma das perguntas')
            erro.appendChild(msg);
            let mensagem = document.querySelector('.util')
            mensagem.insertAdjacentElement("afterend", erro);   

        }
        else {
            let tagp = document.querySelector('#form p');
            tagp.innerHTML='';
        }
        emailInputValue = emailInput.value
        nomeInputValue = nomeInput.value

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify({
                nome: nomeInputValue,
                email: emailInputValue,
                notaRecomenda: btnListRecomendaValue,
                notaUtil: btnListUtilValue,
                notaFacil: btnListFacilValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    })
})           
           