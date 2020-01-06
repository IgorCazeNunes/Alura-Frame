var ConnectionFactory = (function () {
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = function (e) {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = function (e) {
                    if (!connection) {
                        connection = e.target.result;

                        close = connection.close;

                        connection.close = function () {
                            throw new Error('Você não pode fechar diretamente a conexão.')
                        };
                    }

                    resolve(connection);
                };

                openRequest.onerror = function (e) {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store)

                connection.createObjectStore(store, {
                    autoIncrement: true
                });
            })
        }

        static closeConnection() {
            if(connection) {
                Reflect.apply(close, connection, [])
                connection = null;
            }
        }

    }
})();