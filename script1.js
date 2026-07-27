// ============================================================
// Vahan Bima — script.js
//
// IMPORTANT: replace WHATSAPP_NUMBER below with Hemanth's actual
// WhatsApp Business number in international format, no + or spaces.
// Example: "919876543210" for an Indian number starting 98765 43210.
// ============================================================
const WHATSAPP_NUMBER = "917382795981"; // <-- REPLACE THIS

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function openWhatsApp(message) {
  window.open(buildWhatsAppLink(message), "_blank", "noopener");
}

function isValidMobile(value) {
  return /^[6-9]\d{9}$/.test(value.trim());
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ---------- Generic WhatsApp links (nav, footer, floating button) ----------
document.querySelectorAll("[data-wa-generic]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp(
      "Hi Vahan Bima, I'd like help with my vehicle insurance."
    );
  });
});

// ---------- Signature plate widget: quote / challan / renewal ----------
const quickMobileEl = document.getElementById("quickMobile");
const quickVehicleEl = document.getElementById("quickVehicle");
const plateNote = document.getElementById("plateNote");

quickMobileEl.addEventListener("input", () => {
  quickMobileEl.value = quickMobileEl.value.replace(/\D/g, "").slice(0, 10);
});
quickVehicleEl.addEventListener("input", () => {
  quickVehicleEl.value = quickVehicleEl.value.toUpperCase();
});

document.querySelectorAll(".plate-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mobile = quickMobileEl.value.trim();
    const vehicle = quickVehicleEl.value.trim();
    const action = btn.dataset.action;

    if (!isValidMobile(mobile)) {
      plateNote.textContent = "Please enter a valid 10-digit mobile number first.";
      plateNote.style.color = "#C0392B";
      quickMobileEl.focus();
      return;
    }
    if (!vehicle) {
      plateNote.textContent = "Please enter your vehicle registration number.";
      plateNote.style.color = "#C0392B";
      quickVehicleEl.focus();
      return;
    }

    plateNote.style.color = "";
    plateNote.textContent = "We'll open WhatsApp with these details filled in — you just hit send.";

    const reasonText = {
      quote: `I'd like an insurance quote for my vehicle.`,
      challan: `Please check challan status for my vehicle.`,
      renewal: `Please check my insurance renewal / validity date.`,
    }[action];

    const message =
      `Hi Vahan Bima,\n${reasonText}\n\n` +
      `Mobile: ${mobile}\n` +
      `Vehicle number: ${vehicle}`;

    openWhatsApp(message);
  });
});

// ---------- Pill selectors (vehicle type / policy type) ----------
const pillState = {};
document.querySelectorAll(".pill-group").forEach((group) => {
  const name = group.dataset.name;
  group.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      group.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      pillState[name] = pill.dataset.value;
    });
  });
});

// ---------- Full quote form ----------
const quoteForm = document.getElementById("quoteForm");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const regInput = document.getElementById("regNo");
const cityInput = document.getElementById("city");
const mobileError = document.getElementById("mobileError");
const emailError = document.getElementById("emailError");

mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);
});
regInput.addEventListener("input", () => {
  regInput.value = regInput.value.toUpperCase();
});

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  mobileError.textContent = "";
  emailError.textContent = "";

  let valid = true;

  if (!isValidMobile(mobileInput.value)) {
    mobileError.textContent = "Enter a valid 10-digit mobile number.";
    valid = false;
  }
  if (!isValidEmail(emailInput.value)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }
  if (!cityInput.value.trim()) {
    cityInput.focus();
    valid = false;
  }
  if (!pillState.vehicleType) {
    valid = false;
    alert("Please select a vehicle type (Bike or Car).");
  }
  if (!pillState.policyType) {
    valid = false;
    alert("Please select a policy type (New or Renewal).");
  }

  if (!valid) return;

  const message =
    `Hi Vahan Bima, I'd like an insurance quote.\n\n` +
    `Vehicle type: ${pillState.vehicleType}\n` +
    `Policy type: ${pillState.policyType}\n` +
    `Registration number: ${regInput.value.trim() || "Not provided"}\n` +
    `City/District: ${cityInput.value.trim()}\n` +
    `Mobile: ${mobileInput.value.trim()}\n` +
    `Email: ${emailInput.value.trim()}`;

  openWhatsApp(message);
});
