(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.changeHeaderImg();
            this.programmeApi();
            this.eventListener()

            this.dataProgramme = null;


        },

        cacheElements() {
            this.$headerImg = document.querySelector('.headerImage');
            this.$randomActivity = document.querySelector(".activity");
        },

        eventListener() {

            const $showHeader = document.querySelector('.nav-toggle');

            $showHeader.addEventListener('click', () => {
                const $nav = document.querySelector('.nav');

                $nav.classList.toggle('show');


            

            },false);


        },

        changeHeaderImg() {
            const headerImg = ["app/static/img/Gentse-feesten-01header.jpg", "app/static/img/Gentse-feesten-02header.jpg", "app/static/img/Gentse-feesten-03header.jpg", "app/static/img/Gentse-feesten-04header.jpg", "app/static/img/Gentse-feesten-05header.jpg", "app/static/img/Gentse-feesten-07header.jpg", "app/static/img/Gentse-feesten-08header.jpg", "app/static/img/Gentse-feesten-09header.jpg"];

            const index = Math.floor(Math.random() * headerImg.length);
            this.$headerImg.style.background


            this.$headerImg.style.background = `url('${headerImg[index]}') 35% / cover no-repeat`;
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
                <img src="${randomEvent.image ? randomEvent.image.thumb : 'app/static/img/placeholder.png'}"
                    alt="${randomEvent.title}">
                <div class="innerContent">
                    <div class="date">
                        <p> 
                            ${randomEvent.day_of_week}  ${randomEvent.day} jul  ${randomEvent.start}
                        </p>
                    </div>
                    <h2>${randomEvent.title}</h2>
                    <p>${randomEvent.location}</p>
                </div>
            </li>`;


                this.$randomActivity.innerHTML += activity;
                
            }




        }





    }

    app.initialize();

})();