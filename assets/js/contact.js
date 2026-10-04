(() => {
  const form = document.querySelector("[data-project-form]");
  if (!form || !window.fetch || !window.FormData) return;

  const submit = form.querySelector("button[type=submit]");
  const status = form.querySelector("[data-form-status]");
  const dialog = document.getElementById("inquiry-thanks");
  const controls = [...form.querySelectorAll("input:not([type=hidden]), select, textarea")];
  const textFields = ["name", "message"].map(name => form.elements.namedItem(name));
  const label = submit.textContent;
  let sending = false;
  let controller;

  const announce = (message, state = "") => {
    status.textContent = message;
    status.dataset.state = state;
  };
  const setBusy = busy => {
    form.setAttribute("aria-busy", String(busy));
    controls.forEach(control => { control.disabled = busy; });
    submit.disabled = busy;
    submit.textContent = busy ? "Sending your inquiry…" : label;
  };
  textFields.forEach(field => field.addEventListener("input", () => field.setCustomValidity("")));
  dialog?.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("close", () => submit.focus());

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (sending) return;
    textFields.forEach(field => field.setCustomValidity(field.value.trim() ? "" : "Please enter this detail, not just spaces."));
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (form.elements.namedItem("_honey")?.value) {
      announce("We couldn't send this inquiry. Please use the direct email link below.", "error");
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    payload.name = payload.name.trim();
    payload.message = payload.message.trim();
    payload._replyto = payload.email;
    sending = true;
    controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    setBusy(true);
    announce("Sending securely. Please keep this page open.");

    try {
      const response = await fetch(form.dataset.ajaxAction, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        credentials: "omit",
        redirect: "error",
        signal: controller.signal
      });
      const result = await response.json();
      const needsActivation = /activat|confirm (?:your|the) email/i.test(String(result?.message || ""));
      if (needsActivation) {
        announce("This contact route needs email verification before sending can be confirmed. Your details are still here; please use the direct email link below.", "error");
        return;
      }
      if (!response.ok || (result?.success !== true && result?.success !== "true")) {
        throw new Error("The service did not confirm acceptance.");
      }

      // Service acceptance is not an inbox-delivery guarantee.
      form.reset();
      announce("Thank you. Your project details have been submitted.", "success");
      if (typeof dialog?.showModal === "function") dialog.showModal();
    } catch {
      announce("We couldn't confirm your submission. Your details are still here. Please try again or use the direct email link below.", "error");
    } finally {
      clearTimeout(timer);
      controller = undefined;
      sending = false;
      setBusy(false);
    }
  });
  window.addEventListener("pagehide", () => controller?.abort());
  window.addEventListener("pageshow", () => { if (!sending) setBusy(false); });
})();
