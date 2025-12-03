document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
        alert("Login successful!");
        // redirect if needed:
        // window.location.href = "/home.html";
    } else {
        alert(data.message);
    }
});
