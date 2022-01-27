(() => {
    const app = {

        initialize() {
            this.cacheElements();
            this.programmeApi();
            this.categoryApi();
            this.addEventListener();




            this.dataProgramme = null;
            this.dataCategory = null;
            this.dataId = null;

        },

        cacheElements() {
            this.$activities = document.querySelector('.cards_activitiesRaster');
            this.$category = document.querySelector('.category_links');
            this.$detailPage = document.querySelector('.detail_page');
            this.$randomActivity = document.querySelector('.randomActivity');


        },

        async programmeApi() {
            try {
                const programme_api = ' https://www.pgm.gent/data/gentsefeesten/events.json';
                const response = await fetch(programme_api);
                this.dataProgramme = await response.json();

                this.getHtmlForProgramme();
                this.getHtmlForRandomActivity();

                return this.dataProgramme;

            } catch (error) {
                console.error(error);
            }
        },

        async categoryApi() {
            try {
                const category_api = 'https://www.pgm.gent/data/gentsefeesten/categories.json'
                const response = await fetch(category_api);
                this.dataCategory = await response.json();

                this.getHtmlForCategory();

                return this.dataCategory;

            } catch (error) {
                console.error(error);
            }
        },

        getHtmlForProgramme() {

            const dataActivity = this.dataProgramme;
            const dataCategory = this.dataCategory;

            const params = new URLSearchParams(window.location.search);
            const days = params.get('day');
            

            const html = dataCategory.map((category) => {
                const filterDay = dataActivity.filter((day) => day.day === days);
                const activity = filterDay.filter((activity) => activity.category[0] === category).map((activity) => {

                    return `

                    
                    <li class="cards" data-id="${activity.id}" >

                    
                    <a href="evenementen/detail.html?activity=${activity.slug}">
                    
                    
                    <img src="${activity.image ? activity.image.thumb : 'static/img/placeholderBig.png'}"
                                                                alt="${activity.title}">
                                                                
                                                                
                                                            <div class="innerContent">
                                                                <div class="date">
                                                                    <p>
                                                                        ${activity.start}
                                                                    </p>
                                                                </div>
                                                                <h2>${activity.title}</h2>
                                                                <p>${activity.location}</p>
                
                
                    </div>
                    </a>
                </li>
                `


                }).join("");

                return ` 
                <div class=title>
                <h2 id="${category}">${category}</h2>
                <button class="goToTop">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>arrow-up</title>
                    <path
                        d="M13.682 11.791l-6.617 6.296-3.065-2.916 11.74-11.171 12.26 11.665-2.935 2.793-7.113-6.768v16.311h-4.269z">
                    </path>
                </svg>
            </button>
            </div>
                <ul>
                ${activity}
                </ul>
                `

            }).join("");

            

            this.$activities.innerHTML = html;

            this.addEventListener()

            
        },

        getHtmlForRandomActivity() {
            const activity = this.dataProgramme;

            const params = new URLSearchParams(window.location.search);
            const days = params.get('day');

            const dataFiltered = activity.filter((day) => day.day === days);

            for(let i = 0; i<3; i++) {
                const randomNumber = Math.floor(Math.random() *dataFiltered.length);

                const activity = dataFiltered[randomNumber];
                const html = `
                <li class="cards" data-id="${activity.id}" >

                    
                    <a href="evenementen/detail.html?activity=${activity.slug}">
                    
                    
                    <img src="${activity.image ? activity.image.thumb : 'static/img/placeholderBig.png'}"
                                                                alt="${activity.title}">
                                                                
                                                                
                                                            <div class="innerContent">
                                                                <div class="date">
                                                                    <p>
                                                                        ${activity.start}
                                                                    </p>
                                                                </div>
                                                                <h2>${activity.title}</h2>
                                                                <p>${activity.location}</p>
                
                
                    </div>
                    </a>
                </li>
                `;

                this.$randomActivity.innerHTML +=  html;


                
            
            }

        },

        getHtmlForCategory() {
            const category = this.dataCategory;

            const params = window.location.search;

            let html = "<ul>"


            html += category.map((category) => {
                return `
                <li><a href="evenementen/dag.html${params}#${category}">${category}</a></li>
                `
            }).join("");

            html += "</ul>"

            this.$category.innerHTML = html;

        },

        addEventListener() {

            // switch to list
            this.$list = document.querySelector('.list');

            this.$list.addEventListener('click', () => {
                const $switchClassName = document.querySelectorAll('.cards');
                const $section = document.querySelector('.cards_activitiesRaster');

                for(const $switch of $switchClassName) {
                    $switch.classList.replace('cards','cardsToggle');
                }

                
                $section.classList.replace('cards_activitiesRaster','cards_activitiesList');
            }, false);



            // switch to raster
            this.$raster = document.querySelector('.raster');

            this.$raster.addEventListener('click', () => {

                const $switchClassName = document.querySelectorAll('.cardsToggle');
                const $section = document.querySelector('.cards_activitiesList');

                for(const $switch of $switchClassName) {
                    $switch.classList.replace('cardsToggle', 'cards');
                }

                $section.classList.add('cards_activitiesList', 'cards_activitiesRaster');

            },false);




            // go to top

            const $goToTop = document.querySelectorAll('.goToTop');


        

            for(const $top of $goToTop) {
                $top.addEventListener('click', () => {
                document.documentElement.scrollTop = 0; 

        }, false);

    }


        },





    }

    app.initialize();

})();