<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. DESTINATAIRE (Où le mail arrive)
    $to = "contact@iwan.fr";
    
    $email_client = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $label = 'Non précisé';

    // --- Logique de récupération des données (ton code actuel est bon) ---
    if (isset($_POST['org'])) {
        $type = "DÉMO";
        $name = htmlspecialchars($_POST['org']);
        $subject = "Demande de Démo RESAWAN - " . $name;
        $phone = htmlspecialchars($_POST['phone'] ?? $label);
        $profil = htmlspecialchars($_POST['profil'] ?? $label);
        $message = htmlspecialchars($_POST['need']);
    } else {
        $type = "CONTACT";
        $name = htmlspecialchars($_POST['name']);
        $subject = "Nouveau message Contact RESAWAN - " . $name;
        $message = htmlspecialchars($_POST['message']);
    }

    // --- Construction du corps du mail ---
    $body = "Type de demande : $type\n";
    $body .= "Nom/Organisation : $name\n";
    $body .= "Email du client : $email_client\n";
    if (isset($phone) && $phone !== $label) { $body .= "Tel : $phone\n"; }
    $body .= "\nMessage :\n$message";

    // 2. LES HEADERS (C'est là que ça bloquait)
    // On envoie DEPUIS une adresse du domaine (iwan.fr ou resawan.fr) pour éviter le blocage
    $headers = "From: contact@resawan.fr" . "\r\n";
    $headers .= "Reply-To: " . $email_client . "\r\n"; // Si tu réponds, ça ira au client
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 3. ENVOI ET REDIRECTION PROPRE
    // On nettoie l'URL pour éviter le bégaiement ?error=...
    $page_retour = strtok($_SERVER['HTTP_REFERER'], '?');

    if (mail($to, $subject, $body, $headers)) {
        header("Location: " . $page_retour . "?success=1");
    } else {
        header("Location: " . $page_retour . "?error=1");
    }
    exit;
}
