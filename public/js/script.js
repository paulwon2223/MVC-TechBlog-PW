// ------- LOGIN FUNCTION ------- //
const loginFormHandler = async (event) => {
  console.log("asdf");
  event.preventDefault();

  const email = document.getElementById("typeEmailX").value;
  const password = document.getElementById("typePasswordX").value;

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
};

document.getElementById("signinbttn")?.addEventListener("click", loginFormHandler);



// ------- DIRECTS USERS TO LOGIN PAGE ------- //
const loginPage = async (event) => {
  event.preventDefault();

  document.location.replace("/login");
};

document.getElementById("launchbttn")?.addEventListener("click", loginPage);



// ------- DIRECTS USERS TO SIGNUP PAGE ------- //
const signupPage = async (event) => {
  event.preventDefault();

  document.location.replace("/signup");
};

document.getElementById("signupbttn")?.addEventListener("click", signupPage);




// ------- DIRECTS USERS TO HOME PAGE ------- //
const homePage = async (event) => {
  event.preventDefault();

  document.location.replace("/");
};

document.getElementById("homepage")?.addEventListener("click", homePage);



// ------- SIGNUP FUNCTION ------- //
const signup = async (event) => {
  event.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("newemail").value.trim();
  const password = document.getElementById("newpassword").value.trim();

  if (email && password && fname && lname) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, lname, fname }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/blogs");
    } else {
      alert("Failed to log in");
    }
  }
};

document.getElementById("newsignupbttn")?.addEventListener("click", signup);



// ------- CREATES NEW BLOG POST ------- //
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById("posttitle").value;
  const post = document.getElementById("postinput").value;

  if (title && post) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ post, title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(post, title);

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create project");
    }
  }
};

document.getElementById("finishblogbttn")?.addEventListener("click", newFormHandler);



// ------- LOG OUT USER ------- //
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#signoutbttn")?.addEventListener("click", logout);




// ------- DELETES BLOG ------- //
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete project');
    }
  }
};

document.querySelectorAll('button[data-id]')?.forEach((btn) => btn.addEventListener('click', delButtonHandler));