class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');


		let self = this;
		this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if (['adiciona', 'esvaziar'].includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
						console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
			}
        });

		this._negociacoesView = new NegociacoesView($('#negociacoesView'));
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem('', model => {
			this._mensagemView.update(model);
		});

		this._mensagemView = new MensagemView($('#mensagemView'));
	}

	adiciona(event) {
		event.preventDefault();

		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.setTexto("Negociação adicionada com sucesso!");

		this._limpaForm();
	}

	limpar() {
		this._listaNegociacoes.esvaziar();
		this._mensagem.setTexto('Negociações apagadas com sucesso!');
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