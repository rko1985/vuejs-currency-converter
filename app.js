new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    mounted(){
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=3203da39401131f777d9')
            .then(response => {
                this.currencies = response.data.results;
            })
    }
})