document.getElementById('btn-confirmation').addEventListener('click', function(event) {
    event.preventDefault();  // Empêche la soumission traditionnelle du formulaire

    var nom = document.forms['rentalForm']['nom'].value;
    var prenom = document.forms['rentalForm']['prenom'].value;
    var email = document.forms['rentalForm']['email'].value;
    var tel = document.forms['rentalForm']['tel'].value;
    var dateDebut = document.forms['rentalForm']['date_debut'].value;
    var duree = document.forms['rentalForm']['duree'].value;
    var idVoiture = document.forms['rentalForm']['id_voiture'].value;

    if (nom && prenom && email && tel && dateDebut && duree && idVoiture) {
        alert('Merci ' + prenom + ' ' + nom + ' !\n' +
              'Votre réservation est confirmée\n' +
              'pour la voiture ID: ' + idVoiture);
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

let prix_audi_r8 = 500;
let prix_bmw_m4 = 700;
let prix_bmw_M8coupé = 900;
let prix_bmw_serie4 = 800;
let prix_VW_gti = 600;