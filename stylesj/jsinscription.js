// Fonction pour soumettre le formulaire de connexion
function submitLoginForm() {
    var username = sanitizeInput(document.getElementById('username').value);
    var password = sanitizeInput(document.getElementById('password').value);

    if (!username || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

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

// Fonction pour soumettre le formulaire d'inscription
function submitSignupForm() {
    var fullName = sanitizeInput(document.getElementById('fullName').value);
    var username = sanitizeInput(document.getElementById('newUsername').value);
    var password = sanitizeInput(document.getElementById('newPassword').value);
    var email = sanitizeInput(document.getElementById('email').value);
    var contact = sanitizeInput(document.getElementById('contact').value);
    var address = sanitizeInput(document.getElementById('address').value);
    var city = sanitizeInput(document.getElementById('city').value);

    if (!fullName || !username || !password || !email || !contact || !address || !city) {
        alert('Veuillez remplir tous les champs.');
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
}

