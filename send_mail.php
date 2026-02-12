<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "contact@iwan.fr";
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    // On définit le texte une seule fois pour éviter les répétitions
    $label = 'Non précisé';

    if (isset($_POST['org'])) {
        // Formulaire DÉMO
        $type = "DÉMO";
        $name = htmlspecialchars($_POST['org']);
        $subject = "Demande de Démo RESAWAN - " . $name;
        $phone = htmlspecialchars($_POST['phone'] ?? $label);
        $profil = htmlspecialchars($_POST['profil'] ?? $label);
        $message = htmlspecialchars($_POST['need']);
    } else {
        // Formulaire CONTACT
        $type = "CONTACT";
        $name = htmlspecialchars($_POST['name']);
        $subject = "Nouveau message Contact RESAWAN - " . $name;
        $message = htmlspecialchars($_POST['message']);
    }

    $body = "Type de demande : $type\n";
    $body .= "Nom/Organisation : $name\n";
    $body .= "Email : $email\n";

    if (isset($phone) && $phone !== $label) {
        $body .= "Tel : $phone\n";
    }
    if (isset($profil) && $profil !== $label) {
        $body .= "Profil : $profil\n";
    }

    $body .= "\nMessage :\n$message";
    $headers = "From: " . $email;

    if (mail($to, $subject, $body, $headers)) {
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?success=1");
    } else {
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?error=Erreur technique");
    }
    exit;
}
