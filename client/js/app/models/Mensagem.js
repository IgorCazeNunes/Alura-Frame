class Mensagem {

    constructor(texto='', funcAtualizaView) {
        this._texto = texto;
        this._funcAtualizaView = funcAtualizaView;
    }

    get texto() {
        return this._texto;
    }

    setTexto(texto) {
        this._texto = texto;
        this._funcAtualizaView(this);
    }
    
}