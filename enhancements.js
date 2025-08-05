// enhancements.js

// CONFIG: Update with your actual URLs
const CONFIG = {
  siteUrl: 'https://anchorstack.pro',
 substackUrl: 'https://rickyjarnagin.substack.com/subscribe'

  shareText: 'Transform your to-do list into a prayer list with Sacred Strategy from @rickyjarnagin'
};


// === Welcome Tour ===
if (!localStorage.getItem("seenWelcomeTour")) {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;">
      <div style="background:#fff;padding:2rem;max-width:600px;width:90%;border-radius:12px;text-align:center;">
        <h2>Welcome to Sacred Strategy</h2>
        <p>Discover the 5 Sacred Tokens and turn your to-do list into a prayer list.</p>
        <button id="startTour" style="margin-top:1rem;padding:0.5rem 1rem;background:#222;color:#fff;border:none;border-radius:6px;cursor:pointer;">Start Tour</button>
        <br/><br/><a href="#" id="dismissTour">Don’t show again</a>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  
  document.getElementById("startTour").onclick = () => {
    window.location.href = CONFIG.substackUrl;
  };

  document.getElementById("dismissTour").onclick = (e) => {
    e.preventDefault();
    localStorage.setItem("seenWelcomeTour", "true");
    popup.remove();
  };
}

// === Email Capture Popup ===
function showEmailPopup() {
  if (localStorage.getItem("emailCaptured")) return;
  const delayPopup = setTimeout(() => {
    const form = document.createElement("div");
    form.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">
        <div style="background:white;padding:2rem;border-radius:10px;max-width:500px;width:90%;text-align:center;">
          <h3>Download the Free Token Tracker</h3>
          <p>28 days of faith-driven clarity, courage, and consistency.</p>
          <a href="${CONFIG.substackUrl}" target="_blank" style="display:inline-block;margin-top:1rem;padding:0.75rem 1.5rem;background:#222;color:white;border-radius:6px;text-decoration:none;">Get It Now</a><br><br>
          <a href="#" id="dismissPopup">No thanks</a>
        </div>
      </div>
    `;
    document.body.appendChild(form);
    document.getElementById("dismissPopup").onclick = (e) => {
      e.preventDefault();
      localStorage.setItem("emailCaptured", "true");
      form.remove();
    };
  }, 45000); // Delay 45 sec
}

document.addEventListener("DOMContentLoaded", showEmailPopup);

// === Social Share Buttons ===
function addShareButton() {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.zIndex = "10000";
  div.innerHTML = `
    <div style="background:#fff;padding:0.5rem 1rem;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.2);">
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(CONFIG.shareText)}&url=${encodeURIComponent(CONFIG.siteUrl)}" target="_blank" style="margin-right:10px">Twitter</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CONFIG.siteUrl)}" target="_blank" style="margin-right:10px">Facebook</a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(CONFIG.siteUrl)}&title=${encodeURIComponent(CONFIG.shareText)}" target="_blank">LinkedIn</a>
    </div>
  `;
  document.body.appendChild(div);
}

addShareButton();
