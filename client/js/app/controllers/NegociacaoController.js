class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
		this._listaNegociacoes = new ListaNegociacoes();
	}

	adiciona(event) {
		event.preventDefault();

		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._limpaForm();

		console.log(this._listaNegociacoes.negociacoes);
	}

	_limpaForm() {
		this._inputData.focus();
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0
	}
	
	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);
	}

}