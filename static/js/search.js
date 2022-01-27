(() => {
    const app = {

        initialize() {
            this.cacheElements();
            this.searchActivity();



            this.dataActivity = null


        },

        cacheElements() {
            this.$activity = document.querySelector('.cards_activities');

        },

        async programmeApi() {
            try {
                const programme_api = 'https://www.pgm.gent/data/gentsefeesten/events.json';
                const response = await fetch(programme_api);
                const data = await response.json();

                return data;

            } catch (error) {
                console.error(error);
            }
        },

        async searchActivity() {

            
            this.dataActivity = await this.programmeApi();

            const params = new URLSearchParams(window.location.search);
            this.search = params.get('search');

            if(this.search === null) {
                
            const $searchButton = document.querySelector('#btnSearch');

            $searchButton.addEventListener('click', () => {
                
                const $search = document.querySelector('#valueSearch');
                this.value = $search.value;

                
                const search = this.dataActivity.filter((activity) => ((activity.description !== undefined ? activity.description.toLowerCase().includes(this.value.toLowerCase()) : false) || (activity.title.toLowerCase().includes(this.value.toLowerCase()))));

                this.getHTMLForActivity(search, this.value);
            },false)
                
            }else {
                console.log(this.search)
                const search = this.dataActivity.filter((activity) => ((activity.description !== undefined ? activity.description.toLowerCase().includes(this.search.toLowerCase()) : false) || (activity.title.toLowerCase().includes(this.search.toLowerCase()))));
 
                this.getHTMLForActivity(search, this.search);
            }



            // const $searchButton = document.querySelector('#btnSearch');

            // $searchButton.addEventListener('click', () => {
            //     const $search = document.querySelector('#valueSearch');
            //     this.value = $search.value;
            //     console.log($search.value);


            //     const search = this.dataActivity.filter((activity) => (  (activity.description !== undefined ? activity.description.toLowerCase().includes(this.value.toLowerCase()) : false) || (activity.title.toLowerCase().includes(this.value.toLowerCase()))));

            //     this.getHTMLForActivity(search);

                


            // }, false)

        },

        getHTMLForActivity(activity, value) {



            console.log(activity);

            const html = activity.map((activity) => {

                this.title = activity.title
                return `
                
                <li class="cards" data-id="${activity.id}" >
    
                    
                    <a href="evenementen/detail.html?activity=${activity.slug}">
                    
                    
                    <img src="${activity.image ? activity.image.thumb : 'static/img/placeholderBig.png'}"
                                                                alt="${activity.title}">
                                                                
                                                                
                                                            <div class="innerContent">
                                                                <div class="date">
                                                                    <p>
                                                                        ${(activity.day_of_week).slice(0,2)}  ${activity.day} jul  ${activity.start}
                                                                    </p>
                                                                </div>
                                                                <h2>${activity.title}</h2>
                                                                <p>${activity.location}</p>
                    </div>
                    </a>
                </li>
                `

            }).join("");

            this.$activity.innerHTML = `

            <h2>${activity.length} resultaten voor "${value}"</h2>

            <div class="buttons_switch lay_out">


            <ul>
                <li>
                    <button type="button" class="raster activeButton">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
                            <title>Shape</title>
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                                <g id="grid" fill-rule="nonzero">
                                    <path d="M5,5 L0,5 L0,0 L5,0 L5,5 Z M12.5,0 L7.5,0 L7.5,5 L12.5,5 L12.5,0 Z M20,0 L15,0 L15,5 L20,5 L20,0 Z M5,7.5 L0,7.5 L0,12.5 L5,12.5 L5,7.5 Z M12.5,7.5 L7.5,7.5 L7.5,12.5 L12.5,12.5 L12.5,7.5 Z M20,7.5 L15,7.5 L15,12.5 L20,12.5 L20,7.5 Z M5,15 L0,15 L0,20 L5,20 L5,15 Z M12.5,15 L7.5,15 L7.5,20 L12.5,20 L12.5,15 Z M20,15 L15,15 L15,20 L20,20 L20,15 Z" id="Shape"></path>
                                </g>
                            </g>
                        </svg>

                    </button>
                </li>
                <li>
                    <button type="button" class="list">
                        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
                            <title>list (1)</title>
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                                <g id="list-(1)" fill-rule="nonzero">
                                    <path d="M4,20 L0,20 L0,16 L4,16 L4,20 Z M4,8 L0,8 L0,12 L4,12 L4,8 Z M4,0 L0,0 L0,4 L4,4 L4,0 Z M7,0 L7,4 L24,4 L24,0 L7,0 Z M7,12 L24,12 L24,8 L7,8 L7,12 Z M7,20 L24,20 L24,16 L7,16 L7,20 Z" id="Shape"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </li>
            </ul>

        </div>

        <div class="cards_activitiesRaster">
            <ul> ${html} </ul> 
        </div>`;

            this.addEventListener();

        },

        addEventListener() {

            // switch to list
            const $list = document.querySelector('.list');

            $list.addEventListener('click', () => {
                const $switchClassName = document.querySelectorAll('.cards');
                const $section = document.querySelector('.cards_activitiesRaster');

                for (const $switch of $switchClassName) {
                    $switch.classList.replace('cards', 'cardsToggle');
                }

                $section.classList.replace('cards_activitiesRaster', 'cards_activitiesList');
            }, false);



            // switch to raster
            const $raster = document.querySelector('.raster');

            $raster.addEventListener('click', () => {

                const $switchClassName = document.querySelectorAll('.cardsToggle');
                const $section = document.querySelector('.cards_activitiesList');

                for (const $switch of $switchClassName) {
                    $switch.classList.replace('cardsToggle', 'cards');
                }

                $section.classList.add('cards_activitiesList', 'cards_activitiesRaster');

            }, false);

        },


    }

    app.initialize();

})();