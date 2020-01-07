new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
    },
    computed: {
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(2);
        },
        disabled(){
            return this.amount === 0 || !this.amount;
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
        },
        convertCurrency(){
            const key = `${this.from}_${this.to}`;

            axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&compact=ultra&apiKey=3203da39401131f777d9`)
                .then((response) => {
                    console.log(response.data[key]);
                    this.result = response.data[key];
                })
        }
    },
    mounted(){
        this.getCurrencies();
    }
})