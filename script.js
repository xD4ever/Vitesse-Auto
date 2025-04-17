const prixm4 = 259;
const prixm8 = 349;
const prixgti = 189;
const prixr8 = 389;
const prixserie4 = 229;

async function updatePrices() {
  try {
    const ipResponse = await fetch('https://api64.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;
    console.log('User IP:', userIP);

    const locationResponse = await fetch(`https://ipapi.co/${userIP}/json/?key=${key}`);
    const locationData = await locationResponse.json();
    console.log('Location Data:', locationData);

    const currency = locationData.currency;
    console.log('Currency:', currency);

    const exchangeResponse = await fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_ikQtRU8hewDkQaGUgfLs1zf1YSZubte7TIuovCll&currencies=${currency}&base_currency=EUR`);
    const exchangeData = await exchangeResponse.json();
    console.log('Taux de change:', exchangeData);

    const currencyCode = Object.keys(exchangeData.data)[0]; // Get the currency code
    const taux = exchangeData.data[currencyCode].value;

    // Now that all data is loaded, update the prices
    const prices = [
      { id: "prixm4", value: prixm4 },
      { id: "prixm8", value: prixm8 },
      { id: "prixgti", value: prixgti },
      { id: "prixr8", value: prixr8 },
      { id: "prixserie4", value: prixserie4 }
    ];

    prices.forEach(price => {
      const priceElement = document.getElementById(price.id);
      if (priceElement) {
        priceElement.textContent = `${(price.value * taux).toFixed(2)} ${currencyCode}`;
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

updatePrices();
