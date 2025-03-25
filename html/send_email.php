<?php
// Configuration de la base de données
$host = 'localhost'; // Adresse du serveur
$dbname = 'votre_base_de_donnees'; // Nom de votre base de données
$username = 'votre_utilisateur'; // Utilisateur de la base
$password = 'votre_mot_de_passe'; // Mot de passe de la base

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupération des données du formulaire
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        // Enregistrement dans la base de données
        $sql = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
        ]);

        // Envoi de l'email
        $to = "votreadresse@email.com";
        $subject = "Nouveau message de $name";
        $body = "Nom : $name\nEmail : $email\nMessage :\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            // Redirection vers la page d'accueil après succès
            header("Location: ../INDEX.HTML");
            exit;
        } else {
            echo "Échec de l'envoi de l'email.";
        }
    }
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
