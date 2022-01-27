(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.changeHeaderImg();
            this.programmeApi();
            this.newsApi();
            this.eventListener()

            this.dataProgramme = null;


        },

        cacheElements() {
            this.$headerImg = document.querySelector('.headerImage');
            this.$randomActivity = document.querySelector(".activity");
            this.$newsItemsHome = document.querySelector('.container_Cards_News');
        },

        eventListener() {

            const $showHeader = document.querySelector('.nav-toggle');

            $showHeader.addEventListener('click', () => {
                const $nav = document.querySelector('.nav');

                $nav.classList.toggle('show');
            },false);



            const $close = document.querySelector('.close');

            $close.addEventListener('click', () => {
                const $nav = document.querySelector('.nav');

                $nav.classList.toggle('show');
            },false);


            const $open = document.querySelector('.open');
            $open.addEventListener('click', () => {
                const $daysNav = document.querySelector('.daysNav');

                $daysNav.classList.toggle('openDaysNav');

            }, false)

            
            const $buttonSearch = document.querySelector('input[type="button"]');

            $buttonSearch.addEventListener('click' , () => {
                const $input = document.querySelector('input#search');
                const value = $input.value;
                
                document.location.href = `evenementen/search.html?search=${value}`

            },false)


        },

        changeHeaderImg() {
            const headerImg = ["static/img/Gentse-feesten-01header.jpg", "static/img/Gentse-feesten-02header.jpg", "static/img/Gentse-feesten-03header.jpg", "static/img/Gentse-feesten-04header.jpg", "static/img/Gentse-feesten-05header.jpg", "static/img/Gentse-feesten-07header.jpg", "static/img/Gentse-feesten-08header.jpg", "static/img/Gentse-feesten-09header.jpg"];

            const index = Math.floor(Math.random() * headerImg.length);
            
            this.$headerImg.style.background = `#000 url('${headerImg[index]}') -125% no-repeat`;
            console.log(headerImg[index]);

        },
        

        async programmeApi() {
            try {
                const programme_api = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
                const response = await fetch(programme_api);
                this.dataProgramme = await response.json();


                this.getHtmlForProgramme();

                return this.dataProgramme;

            } catch (error) {
                console.error(error);
            }
        },


        getHtmlForProgramme() {
            const data = this.dataProgramme;

            for (let i = 0; i < 3; i++) {
                const random = Math.floor(Math.random() * data.length);
                const randomEvent = data[random];

                const activity = `<li class="cards" data-id="${randomEvent.id}">
                <a href="evenementen/detail.html?activity=${randomEvent.slug}">
                <img src="${randomEvent.image ? randomEvent.image.thumb : 'static/img/placeholder.png'}"
                    alt="${randomEvent.title}">
                <div class="innerContent">
                    <div class="date">
                        <p> 
                            ${(randomEvent.day_of_week).slice(0,2)}  ${randomEvent.day} jul  ${randomEvent.start}
                        </p>
                    </div>
                    <h2>${randomEvent.title}</h2>
                    <p>${randomEvent.location}</p>
                </div>
                </a>
            </li>`;


                this.$randomActivity.innerHTML += activity;
                
            }
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

            console.log(data);
            function getDate(date) {
                const publishedAt = new Date(date);
                const day = publishedAt.getDay();
                const month = publishedAt.getMonth();
                return `${day}/${month}`
            }

            const news = data.slice(0, 3);
            console.log(news);
            this.$newsItemsHome.innerHTML = news.map((item) => {
                return `
            <div class="cards__News">
            <div class="img_news">
            <a href="evenementen/detailNews.html?news=${item.title}">
                <img src="https://www.pgm.gent/data/gentsefeesten/${item.picture.large}" alt="${item.title}">
                    <p>${getDate(item.publishedAt)}</p>
                </div>
                <div class="text_news">
                <h3>${item.title}</h3>
                <p>${item.synopsis}</p>
                <div class="arrow_right"></div>
                </a>
                </div>
            </div>

            `
            }).join("");

             
        }

        




    }

    app.initialize();

})();