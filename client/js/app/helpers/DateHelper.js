class DateHelper {

    constructor() { throw new Error('DateHelper não pode ser instanciado.') }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error('Deve estar no formato aaaa-mm-dd');
            
        return new Date(...texto.split('-').map((item, index) => (index == 1) ? (item - 1) : item));
    }

}