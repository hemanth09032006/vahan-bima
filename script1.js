const WHATSAPP_NUMBER = "917382795981"; // <-- REPLACE THIS with your real WhatsApp Business number

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded;
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

document.querySelectorAll("[data-wa-generic]").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    openWhatsApp("Hi Vahan Bima, I would like help with my vehicle insurance.");
  });
});

const quickMobileEl = document.getElementById("quickMobile");
const quickVehicleEl = document.getElementById("quickVehicle");
const plateNote = document.getElementById("plateNote");

quickMobileEl.addEventListener("input", function () {
  quickMobileEl.value = quickMobileEl.value.replace(/\D/g, "").slice(0, 10);
});
quickVehicleEl.addEventListener("input", function () {
  quickVehicleEl.value = quickVehicleEl.value.toUpperCase();
});

document.querySelectorAll(".plate-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const mobile = quickMobileEl.value.trim();
    const vehicle = quickVehicleEl.value.trim();
    const action = btn.getAttribute("data-action");

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
    plateNote.textContent = "We will open WhatsApp with these details filled in - you just hit send.";

    let reasonText = "";
    if (action === "quote") {
      reasonText = "I would like an insurance quote for my vehicle.";
    } else if (action === "challan") {
      reasonText = "Please check challan status for my vehicle.";
    } else if (action === "renewal") {
      reasonText = "Please check my insurance renewal or validity date.";
    }

    const message = "Hi Vahan Bima,\n" + reasonText + "\n\nMobile: " + mobile + "\nVehicle number: " + vehicle;

    openWhatsApp(message);
  });
});

const pillState = {};
document.querySelectorAll(".pill-group").forEach(function (group) {
  const name = group.getAttribute("data-name");
  group.querySelectorAll(".pill").forEach(function (pill) {
    pill.addEventListener("click", function () {
      group.querySelectorAll(".pill").forEach(function (p) {
        p.classList.remove("active");
      });
      pill.classList.add("active");
      pillState[name] = pill.getAttribute("data-value");
    });
  });
});

const quoteForm = document.getElementById("quoteForm");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const regInput = document.getElementById("regNo");
const cityInput = document.getElementById("city");
const mobileError = document.getElementById("mobileError");
const emailError = document.getElementById("emailError");

mobileInput.addEventListener("input", function () {
  mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);
});
regInput.addEventListener("input", function () {
  regInput.value = regInput.value.toUpperCase();
});

quoteForm.addEventListener("submit", function (e) {
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
    "Hi Vahan Bima, I would like an insurance quote.\n\n" +
    "Vehicle type: " + pillState.vehicleType + "\n" +
    "Policy type: " + pillState.policyType + "\n" +
    "Registration number: " + (regInput.value.trim() || "Not provided") + "\n" +
    "City/District: " + cityInput.value.trim() + "\n" +
    "Mobile: " + mobileInput.value.trim() + "\n" +
    "Email: " + emailInput.value.trim();

  openWhatsApp(message);
});
