const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Permet de parser les requêtes JSON

// Votre logique d'envoi d'e-mail ira ici

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// Configurez les informations de votre compte
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true pour le port 465, false pour les autres ports
  auth: {
    user: "test.clients.vizir@outlook.com", // votre nouvelle adresse Hotmail
    pass: "Test.client.78370", // le mot de passe de votre compte Hotmail
  },
  tls: {
    ciphers: "SSLv3",
  },
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: '"Test" <test.clients.vizir@outlook.com>', // expéditeur
    to: "charles.langlois.dev@gmail.com", // destinataire
    subject: "Nouveau message depuis votre portfolio", // sujet
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`, // corps du message en texte brut
    html: `<p><strong>Nom:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`, // corps du message en HTML
  };

  // Envoyez l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send("Une erreur est survenue lors de l'envoi du message.");
    } else {
      console.log("Email envoyé: " + info.response);
      res.status(200).send("Message envoyé avec succès !");
    }
  });
});
