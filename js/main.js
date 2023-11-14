$(document).ready(function() {
    jQuery.validator.addMethod('validaCPF', function(value, element) {
        return this.optional(element) || validaCPF(value);
    }, 'Por favor, insira um CPF válido.');

    jQuery.validator.addMethod('nomeCompleto', function(value, element) {
        return this.optional(element) || value.trim().indexOf(' ') !== -1;
    }, 'Por favor, insira o nome completo.');

    jQuery.validator.addMethod('enderecoCompleto', function(value, element) {
        return this.optional(element) || value.trim().indexOf(' ') !== -1;
    }, 'Por favor, insira o endereço completo.');

    jQuery.validator.addMethod('mascaraCompleta', function(value, element, params) {

    return value.replace(/[^\d]/g, '').length === params;
}, 'Por favor, insira todos os números.');

    $('#telefone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00000-000');

    $('form').validate({
        rules: {
            nome: {
                required: true,
                nomeCompleto: true
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true,
                mascaraCompleta: 11
            },
            cpf: {
                required: true,
                validaCPF: true
            },
            endereco: {
                required: true,
                enderecoCompleto: true
            },
            cep: {
                required: true,
                mascaraCompleta: 8
            }
        }
    });


    function validaCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); 

        if (cpf.length !== 11) {
            return false;
        }
    
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = sum % 11;
        let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
        if (parseInt(cpf.charAt(9)) !== digit1) {
            return false;
        }
    
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = sum % 11;
        let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
        return parseInt(cpf.charAt(10)) === digit2;
        return true;
    }

    $('form').submit(function(e){
        
        if ($('form').valid()) {
            alert('Olá, vamos proseguir para sua nova aventura!');
        } else {
            e.preventDefault();
        }

    })
});







