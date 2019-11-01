class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
	}

	adiciona(event) {
		event.preventDefault();

		let data = new Date(
			...this._inputData.value.split('-')
									.map((item, index) => (index == 1) ? (item - 1) : item)
		);

		let negociacao = new Negociacao(
			data,
			this._inputQuantidade.value,
			this._inputValor.value
		);

		console.log(negociacao);
	}
	
}