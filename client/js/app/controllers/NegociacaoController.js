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

		this._init();
	}

	_init() {
		new NegociacaoService()
			.lista()
			.then(negociacoes =>
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adiciona(negociacao)))
			.catch(erro => this._mensagem.texto = erro);

		setInterval(() => {
			this.importaNegociacoes();
		}, 5000);
	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = this._criaNegociacao();

		new NegociacaoService()
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limpaFormulario();
			}).catch(erro => this._mensagem.texto = erro);
	}

	limpar() {
		new NegociacaoService()
			.limpar()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvaziar();
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		service
			.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes => negociacoes.forEach(negociacao => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = 'Negociações do período importadas'
			}))
			.catch(erro => this._mensagem.texto = erro);
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