(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.newsApi();


        },

        cacheElements() {
            this.$newsItems = document.querySelector('.container_Cards_News');
            this.$newsItemsHome = document.querySelector('container_Cards_News');
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

            function getDate(date) {
                const publishedAt = new Date(date);
                const day = publishedAt.getDay();
                const month = publishedAt.getMonth();
                return `${day}/${month}`
            }

            const newsItems = data.map((item) => {
                return `
            <div class="cards__News">
            <div class="img_news">
                <img src="https://www.pgm.gent/data/gentsefeesten/${item.picture.large}" alt="${item.title}">
                    <p>${getDate(item.publishedAt)}</p>
                </div>
                <div class="text_news">
                <h3>${item.title}</h3>
                <p>${item.synopsis}</p>
                <div class="arrow_right"></div>
                </div>
            </div>

            `
            }).join("");

            this.$newsItems.innerHTML = newsItems;
            this.$newsItemsHome.innerHTML = newsItems;
        },

    };

    app.initialize();
})();