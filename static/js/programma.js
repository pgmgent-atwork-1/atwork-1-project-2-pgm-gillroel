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
            this.$activities = document.querySelector('.cards_activities');
            this.$category = document.querySelector('.category_links');
            this.$detailPage = document.querySelector('.detail_page');


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


            console.log(dataActivity);

            const params = new URLSearchParams(window.location.search);
            const days = params.get('day');
            console.log(days);

            const html = dataCategory.map((category) => {
                const filterday = dataActivity.filter((day) => day.day === days);
                const activity = filterday.filter((activity) => activity.category[0] === category).map((activity) => {
                    return `

                    
                    <li class="cards" data-id="${activity.id} >

                    <a href="evenementen/detail.html?activity=${activity.slug}"></a>
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

                return ` <h2 id="${category}">${category}</h2> 
                <ul>
                ${activity}
                </ul>
                `

            }).join("");

            this.$activities.innerHTML = html;

            
        },

        getHtmlForCategory() {
            const category = this.dataCategory;

            let html = "<ul>"

            html += category.map((category) => {
                return `
                <li><a href="evenementen/dag.html#${category}">${category}</a></li>
                `
            }).join("");

            html += "</ul>"

            this.$category.innerHTML = html;

        },

        addEventListener() {

            const $raster = document.querySelector('.raster');

            $raster.addEventListener('click', () => {
                const $switchClassName = document.querySelector('.cards_activities');

                $switchClassName.classList.toggle('cards_events');

            }, false);
        },



    }

    app.initialize();

})();