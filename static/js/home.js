(() => {

    const app = {
        initialize() {
            this.cacheElements();
            this.changeHeaderImg();


        },

        cacheElements() {
            this.$headerImg = document.querySelector('.headerImage');
        },

        changeHeaderImg() {
            const headerImg = ["app/static/img/Gentse-feesten-01header.jpg", "app/static/img/Gentse-feesten-02header.jpg", "app/static/img/Gentse-feesten-03header.jpg", "app/static/img/Gentse-feesten-04header.jpg", "app/static/img/Gentse-feesten-05header.jpg", "app/static/img/Gentse-feesten-07header.jpg", "app/static/img/Gentse-feesten-08header.jpg", "app/static/img/Gentse-feesten-09header.jpg"];

            const index = Math.floor(Math.random() * headerImg.length);
            this.$headerImg.style.background


            this.$headerImg.style.background = `url('${headerImg[index]}') 35% / cover no-repeat`;
            console.log(headerImg[index]);

        }





    }

    app.initialize();

})();