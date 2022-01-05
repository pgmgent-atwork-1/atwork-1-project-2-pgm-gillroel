(() => {
    const app = {

        initialize() {
            this.cacheElements();
            this.programmeApi();
            this.categoryApi();
            
            


            this.dataProgramme = null;
            this.dataCategory = null;

        },

        cacheElements() {
            this.$activities = document.querySelector('.cards_activities');
            this.$category = document.querySelector('.category_links');
            

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

            console.log(dataCategory);

            const html = dataCategory.map((category) => {
                const activity = dataActivity.filter((activity) => activity.category[0] === category).map((activity) => {
                    return `<li class="cards" data-id="${activity.id}">
                    <img src="static/img/f295f30dd075ebb5eb4dc8d4a34748a1.PNG"
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
                </li>`
                }).join("");

                return ` <h2 id="${category}">${category}</h2> 
                <ul>
                ${activity}
                </ul>
                `

            }).join(""); 

            this.$activities.innerHTML = html;
            
            this.addEventListenerCards();
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

        addEventListenerCards() {
            const $cards = document.querySelectorAll('.cards');
            for (const $card of $cards) {
                $card.addEventListener('click', () => {
                    const id = $card.dataset.id;
                    console.log(id);

                },false)
            } 
        }

    }

    app.initialize();

})();