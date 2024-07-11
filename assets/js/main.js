class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');

        this.eventos();
    }
    eventos(){
        this.formulario.addEventListener('submit', e=>{
            this.handleSubmit(e);
        });
    }
    isValid(){
        let valid = true;
      
        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro(campo,`campo "${label}" não pode estar em branco`);
                valid = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }
            if(campo.classList.contains('usuario')){
                if(!this.validaUSUARIO(campo)) valid = false;
            }
        }
        return valid;
    }
    validaUSUARIO(campo) {
        const usuario = campo.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo,'Usuário precisa ter entre 3 e 12 caracteres');
            return false; 
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo,'Nome de usuário precisa conter apenas letras e/ou números');
            return false; 
        }

        return valid;
    }
    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErro(campo,'CPF inválido');
            return false;
        }
        return true
    }
    handleSubmit(e){
        e.preventDefault();
        const camposValidos =  this.isValid();
        const senhasValidas = this.senhaIsValid();

        if(camposValidos && senhasValidas) {
            alert('Formulário foi enviado');
            this.formulario.submit();
        }
    }
    senhaIsValid(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');
        
        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha,'Campos senha e repetir senha precisam ser iguais');
            this.criaErro(repetirSenha,'Campos senha e repetir senha precisam ser iguais');
        }

        if(senha.value.length < 6 ||senha.value.length >12){
            valid = false;

            this.criaErro(senha,'Senha precisa estar entre 6 e 12 caracters')
        }
        return valid;
    }

    criaErro(campo,msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend',div);
        
    }
}
function abreMenu(){
    let menuMobile = document.querySelector('.mobile-menu');

    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "img/menu_white_36dp.svg";
    }else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "img/close_white_36dp.svg";


    }
}
const valida = new ValidaFormulario();
