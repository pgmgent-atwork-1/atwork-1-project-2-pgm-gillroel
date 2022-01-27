(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.programmeApi();

            this.dataActivity = null;
            this.organizer = null;


        },

        cacheElements() {

            this.$detailActivity = document.querySelector('.detail_page');
            this.$organization = document.querySelector('.events_organization');

        },


        async programmeApi() {
            try {
                const programme_api = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
                const response = await fetch(programme_api);
                this.dataActivity = await response.json();

                this.getHtmlForActivity();

                return this.dataProgramme;

            } catch (error) {
                console.error(error);
            }
        },


        getHtmlForActivity() {

            const params = new URLSearchParams(window.location.search);
            const slug = params.get('activity');


            const data = this.dataActivity;
            const filter = data.filter((activity) => activity.slug === slug);

            const activity = filter[0];

            this.organizer = activity.organizer;




            function categories(categories) {
                return categories.map((category) => {
                    return `
                    <div class="item"><a
                    href="https://gf20.qa.stad.gent/nl/day/17/category#${category}">
                    Concerten > ${category}</a></div>`;
                }).join("");
            }

            function website(url) {
                if(url === null) {
                    return "";

                }else {

                    return  `
                <div class="links">
                    <div class="label">Website:</div>
                    <div class="items">
                        <div class="item"><a href="${url}">${url}</a></div>
                    </div>
                </div>
                    `           

                }
            }
            const html = `

                <h1>${activity.title}</h1>
            <h3>${activity.day_of_week} ${activity.day} juli - ${activity.start} u.</h3>

            <div class="detailActivity">
            <img src="${activity.image ? activity.image.thumb : 'static/img/placeholderBig.png'}" alt="${activity.title}">
            <div class="detailContent">
            <p>
            ${activity.description ? activity.description : " "}
            </p>
            
            ${website(activity.url)}


            <div class="links">
            <div class="label">Organisator:</div>
            <div class="items">
                <div class="item"><a href="https://gf20.qa.stad.gent/nl/organizer/21">${activity.organizer}</a></div>
            </div>
        </div>

        <div class="links">
        <div class="label">Categorieën:</div>
        <div class="items">
            ${categories(activity.category)}
    </div>
    </div>

        `;


            this.$detailActivity.innerHTML = html;
            this.getHtmlForEventsOrganization();




        },

        getHtmlForEventsOrganization() {

            const data = this.dataActivity;
            const organizerActivity = this.organizer;

            const filter = data.filter((organizer) => organizer.organizer === organizerActivity);


            if (filter.length < 4) {
                let html = '<div class="cards_events"><ul>';
                for (let i = 0; i < filter.length; i++) {
                    const organizer = filter[i];
                    html += `                    
                    <li>
                        <a
                            href="evenementen/detail.html?activity=${organizer.slug}">
                            <p>${organizer.start}</p>
                            <h3>${organizer.title}</h3>
                            <p>${organizer.location}</p>
                        </a>
                    </li>`
                        }
        
                        html += `</ul>
                        </div>
                        <div class="link_News lay_out">
                            <p>Alle evenementen van deze organisator</p> 
                        </div>`
        
        
                        this.$organization.innerHTML = html;

            } else {

                let html = '<div class="cards_events"><ul>';
                for (let i = 0; i < 4; i++) {
                const organizer = filter[i];

                    html += `                    
            <li>
                <a
                    href="evenementen/detail.html?activity=${organizer.slug}">
                    <p>${organizer.start}</p>
                    <h3>${organizer.title}</h3>
                    <p>${organizer.location}</p>
                </a>
            </li>`
                }

                html += `</ul>
                </div>
                <div class="link_News lay_out">
                    <p>Alle evenementen van deze organisator</p> 
                </div>`


                this.$organization.innerHTML = html;
            }
        },


    }

    app.initialize();

})();