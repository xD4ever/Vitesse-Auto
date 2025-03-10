fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIP = data.ip;
    console.log('User IP:', userIP);
    
    return fetch(`https://ipapi.co/${userIP}/json/`);
  })
  .then(response => response.json())
  .then(jsonData => {
    console.log('Location Data:', jsonData);

    const currency = jsonData.currency;
    console.log('Currency:', currency);

    return fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_ikQtRU8hewDkQaGUgfLs1zf1YSZubte7TIuovCll&currencies=${currency}&base_currency=EUR`);
  })
  .then(response => response.json())
  .then(exchangeData => {
    console.log('taux echange:', exchangeData);
  })
  .catch(error => {
    console.error('Error:', error);
  });