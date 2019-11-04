class ListaNegociacoes {

    constructor(funcAtualizaView) {
        this._negociacoes = [];
        this._funcAtualizaView = funcAtualizaView;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._funcAtualizaView(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvaziar() {
        this._negociacoes = [];
        this._funcAtualizaView(this);
    }
    
}