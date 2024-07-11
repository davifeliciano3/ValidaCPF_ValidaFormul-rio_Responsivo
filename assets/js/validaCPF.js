//705.484.450-52 
class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this,'cpfLimpo',{
            writable:false,
            enumerable:false,
            configurable:false,
            value:cpfEnviado.replace(/\D+/g,'')
        });
    }

    sequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }
    geraDigito(cpfSemdigitos){//pode ser estatico pois não usa a instacia (this)
        let total = 0;
        let reverso = cpfSemdigitos.length + 1;

        for (let i of cpfSemdigitos){
            total += reverso * Number(i);
            reverso--;
        }

        const digito = 11 - (total%11);
        return digito <= 9 ? String(digito):'0';
    }
    geraNovoCpf(){
        const cpfSemdigitos = this.cpfLimpo.slice(0,-2);
        const digito1 = this.geraDigito(cpfSemdigitos);
        const digito2 = this.geraDigito(cpfSemdigitos + digito1);
        this.novoCPF = cpfSemdigitos + digito1 + digito2;
    }
    valida(){
        if(!this.cpfLimpo)return false;
        if(typeof this.cpfLimpo !=='string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.sequencia()) return false;
        this.geraNovoCpf()
        return this.novoCPF === this.cpfLimpo;
    }
}

