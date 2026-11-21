const words = ["BSAI Student", "Aspiring Developer", "Tech Enthusiast", "Problem Solver"];
const typingNode = document.getElementById("typingText");
let wordIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const word = words[wordIndex];
  typingNode.textContent = word.substring(0, charIndex);
  let delay = deleting ? 55 : 95;
  if (!deleting && charIndex < word.length) charIndex++;
  else if (deleting && charIndex > 0) charIndex--;
  else if (!deleting) { deleting = true; delay = 1200; }
  else { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 300; }
  window.setTimeout(typeLoop, delay);
}
typeLoop();

document.getElementById("year").textContent = new Date().getFullYear();
const nav = document.querySelector(".navbar");
const backTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  backTop.classList.toggle("show", window.scrollY > 450);
});
backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-item").forEach(card => {
      card.classList.toggle("d-none", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const projectDetails = {
  student: {title:"Student Registration & Record Management System", description:"A university web project concept where a user can enter student information, save records in a MySQL database, and view/manage saved records. Add screenshots and a live demo link when your implementation is ready.", tech:["HTML","CSS","PHP","MySQL"]},
  restaurant: {title:"C++ Restaurant Management System", description:"A console-based learning project planned around displaying a restaurant menu, accepting customer orders, calculating bills, and showing order summaries using C++ fundamentals.", tech:["C++","Loops","Functions","Switch statements"]},
  errorwatch: {title:"Error Watch — Error Management Website", description:"A website project focused on managing and reviewing reported errors. This portfolio entry is a summary; add the final feature list, screenshots, repository, and live deployment details for the version you completed.", tech:["ASP.NET","Database","Web Development"]},
  futureai: {title:"Future AI Projects", description:"A placeholder collection for future artificial intelligence coursework and experiments. Replace this entry with individual projects as you build them during your BSAI journey.", tech:["Artificial Intelligence","Future learning"]}
};
const modal = new bootstrap.Modal(document.getElementById("projectModal"));
document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    document.getElementById("projectModalTitle").textContent = project.title;
    document.getElementById("projectModalDescription").textContent = project.description;
    document.getElementById("projectModalTech").replaceChildren(...project.tech.map(tech => {
      const tag = document.createElement("span"); tag.textContent = tech; return tag;
    }));
    modal.show();
  });
});

document.querySelectorAll(".placeholder-link").forEach(link => {
  link.addEventListener("click", event => {
   // event.preventDefault();
    alert(`Add your ${link.dataset.platform} `);
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const feedback = document.getElementById("formFeedback");
  // No personal email was supplied, so the form prepares a draft for the user to copy.
  navigator.clipboard?.writeText(`Subject: ${subject}\n\n${body}`).then(() => {
    feedback.textContent = "Message copied. Add your email address to enable direct sending.";
  }).catch(() => {
    feedback.textContent = "Form checked. Copy your message and send it using your email app.";
  });
});