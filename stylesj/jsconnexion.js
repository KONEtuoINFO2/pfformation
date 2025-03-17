// Fonction pour valider l'email
function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Fonction pour valider le numéro de téléphone
function validatePhoneNumber(phone) {
    var phonePattern = /^225(07|01|05)\d{7}$/;
    return phonePattern.test(phone);
}

// Fonction pour valider le format et la taille de la photo
function validatePhoto(photo) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    var maxSize = 5 * 1024 * 1024; // 5MB
    if (photo && allowedExtensions.test(photo.name) && photo.size <= maxSize) {
        return true;
    }
    return false;
}

// Fonction pour assainir les entrées
function sanitizeInput(input) {
    return input.replace(/<|>/g, function(match) {
        return {
            '<': '&lt;',
            '>': '&gt;'
        }[match];
    });
}

// Fonction de soumission du formulaire de connexion
function submitLoginForm() {
    var username = sanitizeInput(document.getElementById('username').value);
    var password = sanitizeInput(document.getElementById('password').value);

    if (!username || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
     // Simulez l'envoi du formulaire de connexion
     alert('Formulaire de connexion soumis');
     document.getElementById('loginPopup').style.display = 'none';
     document.getElementById('overlay').style.display = 'none';

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Connexion réussie');
        } else if (response.status === 401) {
            alert('Mot de passe incorrect');
        } else if (response.status === 404) {
            alert('Utilisateur non trouvé');
        }
    })
    .catch(error => console.error('Erreur :', error));
}
// Ouverture du popup de connexion
document.getElementById('openLoginPopup').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

// Fermeture du popup de connexion
document.getElementById('closeLoginPopup').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('closeLoginForm').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

// Affichage du popup d'inscription
document.getElementById('openSignupPopup').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('signupPopup').style.display = 'block';
});

// Fermeture du popup d'inscription
document.getElementById('closeSignupPopup').addEventListener('click', function() {
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('closeSignupForm').addEventListener('click', function() {
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

// Fonction de soumission du formulaire d'inscription
function submitSignupForm() {
    var fullName = sanitizeInput(document.getElementById('fullName').value);
    var username = sanitizeInput(document.getElementById('newUsername').value);
    var password = sanitizeInput(document.getElementById('newPassword').value);
    var email = sanitizeInput(document.getElementById('email').value);
    var contact = sanitizeInput(document.getElementById('contact').value);
    var address = sanitizeInput(document.getElementById('address').value);
    var city = sanitizeInput(document.getElementById('city').value);
    var photo = document.getElementById('photo').files[0];

    if (!fullName || !newUsername || !newPassword || !email || !contact || !address || !city || !photo) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    if (!validatePhoneNumber(contact)) {
        alert('Veuillez entrer un numéro de téléphone valide (2250700000000, 2250100000000, 2250500000000).');
        return;
    }

    if (!validatePhoto(photo)) {
        alert('Veuillez télécharger une photo au format JPG, PNG ou PDF, et de taille inférieure à 5 Mo.');
        return;
    }
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password, email, contact, address, city })
    })
    .then(response => {
        if (response.ok) {
            alert('Inscription réussie');
        } else {
            response.text().then(message => alert(message));
        }
    })
    .catch(error => console.error('Erreur :', error));

    // Simulez l'envoi du formulaire d'inscription
    alert('Formulaire d\'inscription soumis');
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

