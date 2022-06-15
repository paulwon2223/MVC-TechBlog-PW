const loginFormHandler = async (event) => {
  console.log('asdf');
  event.preventDefault();

  const email = document.getElementById("typeEmailX").value
  const password = document.getElementById("typePasswordX").value

  console.log(email, password);
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/blogs");
    } else {
      alert("Failed to log in");
    }
  }

  // document.location.replace('/login');
};

document
  .getElementById("signinbttn")
  ?.addEventListener("click", loginFormHandler);


const loginPage = async (event) => {
  event.preventDefault();

  document.location.replace("/login");
};

document.getElementById("launchbttn")?.addEventListener("click", loginPage);


const signupPage = async (event) => {
    event.preventDefault();

    document.location.replace("/signup");
};

document.getElementById("signupbttn")?.addEventListener("click", signupPage);