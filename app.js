var vue = new Vue({
    el: '#app',
    data: {
        appId: '',
        editable: false,
        info: null,
        city: 'London',
        error: null,
    },
    methods: {
        saveAppId: function() {
            if (this.editable) {
                localStorage.setItem('APP_ID', this.appId);
            } 
            this.editable = !this.editable;
        },
        loadWeatherByCity: function() {
            /*fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.city +'&appid=' + localStorage.getItem('APP_ID'))
                .then((response) => {
                    return response.json();
                }).then((response) => {
                    console.log("response:", JSON.stringify(response));
                    this.info = response;
                })*/
            this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.city +'&appid=' + localStorage.getItem('APP_ID'))
                .then(response => {
                    this.error = null;
                    console.log(response.body);
                    this.info = response.body;
                }, response => {
                    this.error = response.body.message;
                    console.log("response:", response);
                });
            this.$http.post('url....', {city: this.city})
        },
        ktoc: function(k) {
            return (k - 273.15).toFixed(1);
        }
    },
    created: function() {
        this.appId = localStorage.getItem('APP_ID');
        if (this.appId) {
            this.loadWeatherByCity();
        }
    }
})