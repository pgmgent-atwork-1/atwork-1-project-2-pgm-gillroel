(() => {

    const app = {
        initialize() {

            const params = new URLSearchParams();

            // voeg type toe
            params.append('day', '19');


            // omzetten naar query string
            const query = params.toString(); // type=medium&size=2

            // gebruiken in url -> zelf ? toevoegen!
            const url = '/dag.html?' + query;

            console.log("bla");
            console.log(url);


        }

    }

    app.initialize()








})();