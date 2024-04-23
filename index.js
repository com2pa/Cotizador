const form = document.querySelector('#coin-form')
const coin = document.querySelector('#coin')
const crypto = document.querySelector('#crypto')
const amount = document.querySelector('#amount')
const coinInfo = document.querySelector('#coin-info')



form.addEventListener('submit',async e =>{
    e.preventDefault()
    const coinSelected = [... coin.children].find(option => option.selected).value;
    const cryptoSelected = [... crypto.children].find(option => option.selected).value;
    const amountValue= amount.value;
    // console.log(coinSelected, cryptoSelected,amountValue);
    try {

        const response = await(await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const prince = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const princeHIGH = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const PrinceLOW = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const varation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        if(amountValue !== ''){
           coinInfo.innerHTML=`
            <div class="loader"></div>

           `
            const resolut= Number(amountValue) /response.RAW[cryptoSelected][coinSelected].PRICE;
            coinInfo.innerHTML = `
                <p class="info"> El precio es: <span class="price">${prince}</span></p>
                <p class="info"> El precio mas Alto es : <span class="price">${princeHIGH}</span></p>
                <p class="info"> El precio mas bajo es: <span class="price">${PrinceLOW}</span></p>
                <p class="info"> Variacion 24hrs: <span class="price">${varation} %</span></p>
                <p class="info"> Puede comprar: <span class="price">${resolut.toFixed(4)} ${cryptoSelected}</span></p>
            `
        }else{
            coinInfo.innerHTML = `
                <p class="info"> El precio es: <span class="price">${prince}</span></p>
                <p class="info"> El precio mas Alto es : <span class="price">${princeHIGH}</span></p>
                <p class="info"> El precio mas bajo es: <span class="price">${PrinceLOW}</span></p>
                <p class="info"> Variacion 24hrs: <span class="price">${varation} %</span></p>
                
            `    

        }
        

    } catch (error) {
        console.log(error);
    }

})