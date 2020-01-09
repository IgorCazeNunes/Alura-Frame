class HttpService {

    _handleErrors(response) {
        if (!response.ok)
            throw new Error(response.statusText);

        return res;
    }

    get(url) {
        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());
    }

    post(url, dado) {
        return fetch(url, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(dado)
            })
            .then(response => this._handleErrors(response));
    }

}