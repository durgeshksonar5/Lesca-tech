/**
 * Lesca Tech - Lead Integration and Floating Action Buttons
 * Written by Senior Full-Stack Developer
 */

(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    whatsappNumber: "919665790016", // Country code (91) + 10-digit number
    callNumber: "+919665790016",
    apiEndpoint: "https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/e2e86e63-58a3-418c-aa66-e86c870a71cc",
    leadSource: "Website",
    floatingLeadSource: "Website Floating Button"
  };

  // Helper: Get Page Metadata
  const getPageMetadata = () => ({
    page_url: window.location.href,
    page_title: document.title || "Lesca Tech",
    submitted_at: new Date().toISOString()
  });

  // Helper: Validate Email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Helper: Validate Phone (10 digits, optionally preceeded by country code 91)
  function validatePhone(phone) {
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'));
  }

  // Helper: Dispatch Custom Analytics Events
  function trackEvent(eventName, eventData = {}) {
    console.log(`[Analytics Event]: ${eventName}`, eventData);
    const event = new CustomEvent(eventName, { detail: eventData });
    document.dispatchEvent(event);
  }

  // Helper: Safe HTML Injection
  function injectHTML() {
    // 1. Inject Floating Action Buttons
    if (!document.getElementById("ltFloatingButtons")) {
      const fabHTML = `
        <div class="floating-action-buttons" id="ltFloatingButtons">
          <button class="fab-btn whatsapp-btn" id="fabWhatsApp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
            <span class="fab-tooltip">Chat on WhatsApp</span>
          </button>
          <button class="fab-btn call-btn" id="fabCall" aria-label="Call Us" title="Call Us">
            <i class="fa-solid fa-phone"></i>
            <span class="fab-tooltip">Request a Call</span>
          </button>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", fabHTML);
    }

    // 2. Inject Reusable Modal
    if (!document.getElementById("ltEnquiryModal")) {
      const modalHTML = `
        <div class="lt-modal-backdrop" id="ltEnquiryModal" role="dialog" aria-modal="true" aria-hidden="true" tabindex="-1">
          <div class="lt-modal-content">
            <button class="lt-modal-close-btn" id="ltModalClose" aria-label="Close modal" type="button">&times;</button>
            <div class="lt-modal-header">
              <h3 id="ltModalTitle">Request a Call</h3>
              <p id="ltModalSub">Enter your details to connect with our team.</p>
            </div>
            <form id="ltModalForm" novalidate>
              <div class="lt-form-group">
                <label for="ltModalName">Full Name *</label>
                <input type="text" id="ltModalName" class="lt-form-control" placeholder="Enter Full Name" required autocomplete="name">
                <div class="lt-error-message">Full Name is required.</div>
              </div>
              <div class="lt-form-group">
                <label for="ltModalPhone">Contact Number *</label>
                <input type="tel" id="ltModalPhone" class="lt-form-control" placeholder="Enter 10-Digit Mobile Number" required autocomplete="tel">
                <div class="lt-error-message">A valid 10-digit mobile number is required.</div>
              </div>
              <button type="submit" class="lt-modal-submit-btn" id="ltModalSubmit">
                <span class="lt-spinner"></span>
                <span class="lt-btn-text">Submit Request</span>
              </button>
              <div class="lt-form-feedback" id="ltFormFeedback"></div>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }
  }

  // Initialize Elements
  injectHTML();

  // DOM Elements References
  const modal = document.getElementById("ltEnquiryModal");
  const modalForm = document.getElementById("ltModalForm");
  const modalTitle = document.getElementById("ltModalTitle");
  const modalSub = document.getElementById("ltModalSub");
  const modalClose = document.getElementById("ltModalClose");
  const modalSubmit = document.getElementById("ltModalSubmit");
  const modalSubmitText = modalSubmit.querySelector(".lt-btn-text");
  const modalFeedback = document.getElementById("ltFormFeedback");
  const inputName = document.getElementById("ltModalName");
  const inputPhone = document.getElementById("ltModalPhone");
  const fabWhatsApp = document.getElementById("fabWhatsApp");
  const fabCall = document.getElementById("fabCall");

  let currentType = ""; // "WhatsApp" or "Call"
  let previouslyFocusedElement = null;

  // Reusable Focus Trapping
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([-1])';
  
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      const focusables = Array.from(modal.querySelectorAll(focusableSelector)).filter(
        el => !el.disabled && el.offsetParent !== null
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }

  // Modal Open and Close Handlers
  function openModal(type) {
    currentType = type;
    previouslyFocusedElement = document.activeElement;
    
    // Set text dynamically
    if (type === "WhatsApp") {
      modalTitle.innerText = "Continue to WhatsApp";
      modalSub.innerText = "Enter your details to continue to WhatsApp.";
      modalSubmitText.innerText = "Continue to WhatsApp";
      trackEvent("floating_whatsapp_clicked");
    } else {
      modalTitle.innerText = "Request a Call";
      modalSub.innerText = "Enter your details to connect with our team.";
      modalSubmitText.innerText = "Request a Call";
      trackEvent("floating_call_clicked");
    }

    // Reset Form fields
    modalForm.reset();
    clearValidationError(inputName);
    clearValidationError(inputPhone);
    modalFeedback.className = "lt-form-feedback";
    modalFeedback.innerText = "";
    modalFeedback.style.display = "none";
    modalSubmit.disabled = false;
    modalSubmit.classList.remove("loading");

    // Display Modal
    document.body.classList.add("lt-modal-open");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    
    // Accessibility: Set focus inside modal
    setTimeout(() => inputName.focus(), 100);

    // Bind accessibility listeners
    document.addEventListener("keydown", handleKeyDown);
  }

  function closeModal() {
    document.body.classList.remove("lt-modal-open");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", handleKeyDown);

    // Restore focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Form Field Validation Visual Feedbacks
  function showValidationError(input, message) {
    const group = input.closest(".lt-form-group");
    group.classList.add("has-error");
    if (message) {
      group.querySelector(".lt-error-message").innerText = message;
    }
  }

  function clearValidationError(input) {
    const group = input.closest(".lt-form-group");
    group.classList.remove("has-error");
  }

  // API submit function
  async function submitLead(payload) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errText = "API request failed";
        try {
          const errJson = await response.json();
          errText = errJson.error || errJson.message || errText;
        } catch (_) {}
        throw new Error(errText);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Modal Submit Action
  modalForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset feedback
    modalFeedback.style.display = "none";
    modalFeedback.className = "lt-form-feedback";
    
    let isValid = true;

    // Validate Name
    const nameVal = inputName.value.trim();
    if (!nameVal) {
      showValidationError(inputName, "Full Name is required.");
      isValid = false;
    } else {
      clearValidationError(inputName);
    }

    // Validate Phone
    const phoneVal = inputPhone.value.trim();
    if (!phoneVal) {
      showValidationError(inputPhone, "Contact Number is required.");
      isValid = false;
    } else if (!validatePhone(phoneVal)) {
      showValidationError(inputPhone, "Please enter a valid 10-digit mobile number.");
      isValid = false;
    } else {
      clearValidationError(inputPhone);
    }

    if (!isValid) return;

    // Disable button & show loader
    modalSubmit.disabled = true;
    modalSubmit.classList.add("loading");

    // Construct Payload
    const payload = {
      name: nameVal,
      phone: phoneVal,
      form_name: currentType === "WhatsApp" ? "Floating WhatsApp Enquiry" : "Floating Call Enquiry",
      lead_source: CONFIG.floatingLeadSource,
      button_type: currentType,
      ...getPageMetadata()
    };

    trackEvent("floating_form_submitted", { type: currentType });

    try {
      await submitLead(payload);

      trackEvent("floating_form_success", { type: currentType });

      // Action triggers after success
      if (currentType === "WhatsApp") {
        const textMessage = `Hello, my name is ${nameVal}. I submitted an enquiry through your website. My contact number is ${phoneVal}.`;
        const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
        
        // Success feedback
        modalFeedback.innerText = "Verification successful! Connecting to WhatsApp...";
        modalFeedback.className = "lt-form-feedback success";
        modalFeedback.style.display = "block";
        
        setTimeout(() => {
          closeModal();
          trackEvent("whatsapp_opened");
          window.open(waUrl, "_blank");
        }, 1200);

      } else {
        const callUrl = `tel:${CONFIG.callNumber}`;
        
        modalFeedback.innerText = "Request logged successfully! Starting call dialer...";
        modalFeedback.className = "lt-form-feedback success";
        modalFeedback.style.display = "block";
        
        setTimeout(() => {
          closeModal();
          trackEvent("call_started");
          window.location.href = callUrl;
        }, 1200);
      }

    } catch (error) {
      console.error("[Lead Submission Error]:", error);
      trackEvent("floating_form_error", { error: error.message });
      
      modalFeedback.innerText = `Error: ${error.message || "Connection timed out. Please try again."}`;
      modalFeedback.className = "lt-form-feedback error";
      modalFeedback.style.display = "block";

      modalSubmit.disabled = false;
      modalSubmit.classList.remove("loading");
    }
  });

  // Modal Close Events
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Trigger floating buttons click handlers
  fabWhatsApp.addEventListener("click", () => openModal("WhatsApp"));
  fabCall.addEventListener("click", () => openModal("Call"));

  // ==========================================
  // Task 1: Intercept Every Existing Form
  // ==========================================

  function setupFormInterception() {
    // 1. Contact Form Interception
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      // Ensure we bind after validator
      $(document).ready(function() {
        // Intercept submit
        $(contactForm).off("submit").on("submit", async function(e) {
          // If bootstrap validator has flagged errors, stop
          if (e.isDefaultPrevented()) {
            return;
          }

          e.preventDefault();

          // Get fields
          const fnameVal = $("#fname").val().trim();
          const lnameVal = $("#lname").val().trim();
          const fullName = `${fnameVal} ${lnameVal}`.trim();
          const emailInput = $("#email");
          const phoneInput = $("#phone");
          const messageVal = $("#message").val().trim();

          let formValid = true;

          // Double check email validation
          if (!validateEmail(emailInput.val())) {
            emailInput.closest(".form-group").addClass("has-error");
            emailInput.siblings(".help-block").text("Please enter a valid email address.").show();
            formValid = false;
          } else {
            emailInput.closest(".form-group").removeClass("has-error");
          }

          // Double check phone validation
          if (!validatePhone(phoneInput.val())) {
            phoneInput.closest(".form-group").addClass("has-error");
            phoneInput.siblings(".help-block").text("Please enter a valid 10-digit phone number.").show();
            formValid = false;
          } else {
            phoneInput.closest(".form-group").removeClass("has-error");
          }

          if (!formValid) return;

          // Elements
          const submitBtn = $(contactForm).find('button[type="submit"]');
          const msgSubmit = $("#msgSubmit");
          
          // Disable button & show loading state
          submitBtn.prop("disabled", true).addClass("btn-disabled").text("Processing...");
          msgSubmit.removeClass().addClass("h4 text-info").text("Sending inquiry...").show();

          // Build Payload
          const payload = {
            name: fullName,
            email: emailInput.val().trim(),
            phone: phoneInput.val().trim(),
            message: messageVal,
            form_name: "Contact Form",
            lead_source: CONFIG.leadSource,
            ...getPageMetadata()
          };

          try {
            // Post to API
            await submitLead(payload);

            // Forward to sendmail.php for backup emails (runs in background asynchronously)
            $.ajax({
              type: "POST",
              url: $(contactForm).attr("action") || "sendmail.php",
              data: $(contactForm).serialize(),
              success: function() {
                console.log("[Backup Email Sent]");
              },
              error: function(err) {
                console.warn("[Backup Email Failed]:", err);
              }
            });

            // Handle success
            contactForm.reset();
            msgSubmit.removeClass().addClass("h4 text-success").text("Message Sent Successfully!");
            submitBtn.prop("disabled", false).removeClass("btn-disabled").text("Submit Message");

          } catch (error) {
            console.error("[Contact API Error]:", error);
            msgSubmit.removeClass().addClass("h4 text-danger").text(`Error: ${error.message || "Failed to submit."}`);
            submitBtn.prop("disabled", false).removeClass("btn-disabled").text("Submit Message");
          }
        });
      });
    }

    // 2. Career Form Interception
    const careerForm = document.getElementById("careerForm");
    if (careerForm) {
      $(document).ready(function() {
        // Dynamically add success/error container if missing
        if (!document.getElementById("msgSubmitCareer")) {
          $(careerForm).find('button[type="submit"]').after('<div id="msgSubmitCareer" class="h4 mt-3 text-center" style="display:none;"></div>');
        }

        $(careerForm).off("submit").on("submit", async function(e) {
          if (e.isDefaultPrevented()) {
            return;
          }

          e.preventDefault();

          const nameVal = $(careerForm).find('input[name="name"]').val().trim();
          const emailInput = $(careerForm).find('input[name="email"]');
          const phoneInput = $(careerForm).find('input[name="phone"]');
          const positionVal = $(careerForm).find('select[name="position"]').val();
          const messageVal = $(careerForm).find('textarea[name="message"]').val().trim();
          const fileInput = $(careerForm).find('input[type="file"]')[0];

          let formValid = true;

          // Double check email validation
          if (!validateEmail(emailInput.val())) {
            emailInput.closest(".form-group").addClass("has-error");
            emailInput.siblings(".help-block").text("Please enter a valid email address.").show();
            formValid = false;
          } else {
            emailInput.closest(".form-group").removeClass("has-error");
          }

          // Double check phone validation
          if (!validatePhone(phoneInput.val())) {
            phoneInput.closest(".form-group").addClass("has-error");
            phoneInput.siblings(".help-block").text("Please enter a valid 10-digit phone number.").show();
            formValid = false;
          } else {
            phoneInput.closest(".form-group").removeClass("has-error");
          }

          if (!formValid) return;

          const submitBtn = $(careerForm).find('button[type="submit"]');
          const msgSubmit = $("#msgSubmitCareer");

          // Disable button & loading feedback
          submitBtn.prop("disabled", true).addClass("btn-disabled").text("Processing...");
          msgSubmit.removeClass().addClass("h4 text-info").text("Uploading resume & sending application...").show();

          // Prepare file reader promise
          const getBase64File = (file) => {
            return new Promise((resolve, reject) => {
              if (!file) resolve(null);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve({
                name: file.name,
                base64: reader.result.split(',')[1]
              });
              reader.onerror = error => reject(error);
            });
          };

          try {
            let fileData = null;
            if (fileInput && fileInput.files && fileInput.files[0]) {
              fileData = await getBase64File(fileInput.files[0]);
            }

            // Construct Career Form payload
            const payload = {
              name: nameVal,
              email: emailInput.val().trim(),
              phone: phoneInput.val().trim(),
              position: positionVal,
              message: messageVal,
              form_name: "Career Form",
              lead_source: CONFIG.leadSource,
              ...getPageMetadata()
            };

            if (fileData) {
              payload.resume_name = fileData.name;
              payload.resume_base64 = fileData.base64;
            }

            // Submit JSON lead data to API
            await submitLead(payload);

            // Forward to sendmail.php using FormData (to preserve actual email attachment receipt)
            const formData = new FormData(careerForm);
            
            $.ajax({
              type: "POST",
              url: $(careerForm).attr("action") || "sendmail.php",
              data: formData,
              processData: false,
              contentType: false,
              success: function() {
                console.log("[Career Backup Email & File Sent]");
              },
              error: function(err) {
                console.warn("[Career Backup Email Failed]:", err);
              }
            });

            // Success resets
            careerForm.reset();
            msgSubmit.removeClass().addClass("h4 text-success").text("Application Submitted Successfully!");
            submitBtn.prop("disabled", false).removeClass("btn-disabled").text("Submit Application");

          } catch (error) {
            console.error("[Career API Error]:", error);
            msgSubmit.removeClass().addClass("h4 text-danger").text(`Error: ${error.message || "Failed to submit application."}`);
            submitBtn.prop("disabled", false).removeClass("btn-disabled").text("Submit Application");
          }
        });
      });
    }
  }

  // Setup form submit handlers when jQuery is available
  function initFormInterception() {
    if (typeof jQuery === "undefined") {
      setTimeout(initFormInterception, 50);
    } else {
      setupFormInterception();
    }
  }
  initFormInterception();

})();
