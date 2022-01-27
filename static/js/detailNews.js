(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.newsApi();




        },

        cacheElements() {
            this.$news = document.querySelector('.detail_page');

        },

        async newsApi() {

            try {
                const news_api = "https://www.pgm.gent/data/gentsefeesten/news.json";
                const response = await fetch(news_api);
                const data = await response.json();
                this.generateHTMLForNews(data);
            } catch (error) {
                console.error(error);
            }
        },

        generateHTMLForNews(data) {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get('news');

            const news = data.filter((activity) => activity.title === slug);
            console.log(news);

            function date(published) {
                const date = new Date(published)
                const day = date.getDay();
                const month = date.getMonth();

                return `${day}/${month}`
            }

            const html = news.map((newsItem) => {
                return `
                <div class="newsItem">
                <div class="date"> <p>${date(newsItem.publishedAt)}</p> </div>
                <h1> ${newsItem.title}</h1>
        <div class="goToNewsPage">
            <a href="../news.html">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <title>arrow-left</title>
                        <path d="M6.44 15.438l5.999-5.999c0.271-0.271 0.645-0.439 1.058-0.439 0.001 0 0.002 0 0.003 0h-0c0.828 0.001 1.499 0.672 1.499 1.5 0 0.414-0.168 0.789-0.439 1.060v0l-3.439 3.44h14.379c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5h-14.379l3.439 3.439c0.283 0.273 0.458 0.656 0.458 1.079 0 0.828-0.672 1.5-1.5 1.5-0.423 0-0.806-0.175-1.079-0.457l-5.999-5.999c-0.14-0.14-0.25-0.307-0.327-0.491l-0.007-0.024c-0.067-0.162-0.105-0.349-0.106-0.546v-0c0-0.194 0.039-0.377 0.106-0.547l0.007-0.024c0.077-0.184 0.187-0.351 0.327-0.491z"></path>
                    </svg>
                <p>Nieuwsoverzicht</p>
            </a>
        </div>

        <img src="https://www.pgm.gent/data/gentsefeesten/${newsItem.picture.large}" alt="${newsItem.title}">
        ${newsItem.body}
        </div>
                `
            }).join("");

            this.$news.innerHTML = html;
            

        }


    }

    app.initialize();

})();