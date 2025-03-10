fetch('https://api64.ipify.org?format=json') // Get the user's IP address
  .then(response => response.json())
  .then(data => {
    const userIP = data.ip; // Extract the IP address
    console.log('User IP:', userIP);
    
    // Fetch location details using the IP
    return fetch(`https://ipapi.co/${userIP}/json/`);
  })
  .then(response => response.json())
  .then(jsonData => {
    console.log('Location Data:', jsonData);
  })
  .catch(error => {
    console.error('Error:', error);
  });