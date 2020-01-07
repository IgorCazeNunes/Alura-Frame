class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoesView')),
			'adiciona', 'esvaziar'
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto'
		);

		ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes =>
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adiciona(negociacao)))
			.catch(error => this._mensagem.texto = error);

	}

	adiciona(event) {
		event.preventDefault();

		ConnectionFactory
			.getConnection()
			.then(connection => {
				let negociacao = this._criaNegociacao();

				new NegociacaoDao(connection)
					.adiciona(negociacao)
					.then(() => {
						this._listaNegociacoes.adiciona(negociacao);
						this._mensagem.texto = 'Negociação adicionada com sucesso';
						this._limpaForm();
					})
					.catch(error => this._mensagem.texto = error);
			});

	}

	limpar() {
		ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvaziar();
			});
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		Promise.all([
				service.obterNegociacoesDaSemana(),
				service.obterNegociacoesDaSemanaRetrasada(),
				service.obterNegociacoesDaSemanaAnterior()
			])
			.then(negociacoes => {
				negociacoes
					.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
					.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

				this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
			})
			.catch(erro => this._mensagem.texto = erro);;
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
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	}

}