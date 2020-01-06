new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'EUR',
        to: 'USD'
    },
    computed: {
        formattedCurrencies(){
            return Object.values(this.currencies);
        }
    },
    methods: {
        getCurrencies(){
            const currencies = localStorage.getItem('currencies')

            if(currencies){
                this.currencies = JSON.parse(currencies);
                return;
            }

            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=3203da39401131f777d9')
            .then(response => {
                this.currencies = response.data.results;
                localStorage.setItem('currencies', JSON.stringify(response.data.results))
            });
        }
    },
    mounted(){
        this.getCurrencies();
    }
})