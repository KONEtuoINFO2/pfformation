document.addEventListener('DOMContentLoaded', () => {
    const productButtons = document.querySelectorAll('.product-button'); // Tous les boutons
    const nbpanier = document.querySelector('#nb-panier'); // Compteur du panier
    const panierContainer = document.getElementById('panier-items'); // Conteneur des articles du panier
    const openPanier = document.getElementById('open-panier'); // Lien pour ouvrir le popup
    const popup = document.getElementById('panier-popup'); // Popup du panier
    const closePopup = document.getElementById('close-popup'); // Bouton de fermeture
    const totalProducts = document.getElementById('total-products'); // Nombre total de produits
    const totalPrice = document.getElementById('total-price'); // Prix total
    const checkoutButton = document.getElementById('checkout-button'); // Bouton "Passer à la caisse"

    let panierCount = 0; // Nombre total de produits
    let prixTotal = 0; // Prix total des produits

    // Fonction pour ajouter un produit au panier
    productButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Récupérer l'élément parent du bouton (la div avec la classe "p")
            const produitElement = button.closest('.p');

            // Extraire les informations du produit (prix et description)
            const produitPrix = parseFloat(produitElement.querySelector('.product-price').textContent.replace(/[^0-9.]/g, '')); // Extraire le prix
            const produitDescription = produitElement.querySelector('.product-description').textContent;

            // Mettre à jour le compteur et le prix total
            panierCount++;
            prixTotal += produitPrix;

            // Mettre à jour l'affichage du compteur
            nbpanier.textContent = panierCount;

            // Créer un nouvel élément pour le produit dans le panier
            const produitItem = document.createElement('div');
            produitItem.className = 'produit-item'; // Classe pour styliser l'article
            produitItem.innerHTML = `
                <p><strong>Description :</strong> ${produitDescription}</p>
                <p><strong>Prix :</strong> ${produitPrix.toFixed(2)} FCFA</p>
            `;

            // Ajouter l'article dans le conteneur du panier
            panierContainer.appendChild(produitItem);

            // Mettre à jour le résumé
            totalProducts.textContent = panierCount; // Nombre total de produits
            totalPrice.textContent = prixTotal.toFixed(2); // Prix total avec 2 décimales

            // Afficher une alerte (facultatif)
            alert(`"${produitDescription}" a été ajouté au panier pour ${produitPrix.toFixed(2)} FCFA.`);
        });
    });

    // Ouvrir le popup au clic sur le lien
    openPanier.addEventListener('click', () => {
        popup.style.display = 'flex'; // Affiche le popup
    });

    // Fermer le popup au clic sur le bouton de fermeture
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none'; // Cache le popup
    });

    // Fermer le popup si clic en dehors du contenu
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Gestion du clic sur "Passer à la caisse"
    checkoutButton.addEventListener('click', () => {
        alert(`Total à payer : ${prixTotal.toFixed(2)} FCFA pour ${panierCount} produit(s).`);
    });
});

