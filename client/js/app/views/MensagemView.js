class MensagemView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        return model.texto ? `<p class="alert alert-success">${model.texto}</p>` : '<p></p>';
    }

}