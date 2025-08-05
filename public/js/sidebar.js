document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `
    <aside style="
      background: #ffffff;
      border-left: 4px solid #2563eb;
      padding: 1.5rem;
      margin-top: 3rem;
      max-width: 300px;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-radius: 12px;
    ">
      <h2 style="margin-top: 0; color: #1f2937;">📚 Explore More</h2>
      <ul style="list-style: none; padding: 0;">
        <li><a href="/bible-studies" style="text-decoration: none; color: #2563eb;">📖 Bible Studies</a></li>
        <li><a href="/devotionals" style="text-decoration: none; color: #2563eb;">🕊️ Daily Devotionals</a></li>
        <li><a href="/commentaries" style="text-decoration: none; color: #2563eb;">📘 Commentaries</a></li>
        <li><a href="/theology" style="text-decoration: none; color: #2563eb;">🧭 Theology</a></li>
        <li><a href="/vault.html" style="text-decoration: none; color: #2563eb;">💼 Creator Vault</a></li>
        <li><a href="/about" style="text-decoration: none; color: #2563eb;">📌 About AnchorStack</a></li>
      </ul>
    </aside>
  `;
});

