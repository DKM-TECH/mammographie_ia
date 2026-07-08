document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    const fakeUser = {
        email: "doctor@gmail.com",
        password: "1234",
        name: "Dr. Yvette KANKU",
        role: "doctor"
    };

    if (email === fakeUser.email && password === fakeUser.password) {

        // 🔥 stocke uniquement les infos médecin (optionnel)
        localStorage.setItem("doctor", JSON.stringify(fakeUser));

        message.innerHTML = `
            <div class="alert alert-success">
                Connexion réussie
            </div>
        `;

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);

    } else {
        message.innerHTML = `
            <div class="alert alert-danger">
                Email ou mot de passe incorrect
            </div>
        `;
    }
});