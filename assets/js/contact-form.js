jQuery(function ($) {
	var $form = $("form#contactpage");

	if (!$form.length) {
		return;
	}

	function showFormResult(message, type) {
		$("#form_result").empty().append($("<span>").addClass("form-" + type).text(message)).show();
	}

	function showThankYouModal() {
		var $modal = $("#thankYouModal");
		if ($modal.length && typeof $modal.modal === "function") {
			$modal.modal("show");
		}
	}

	function setSubmitState($submit, isSending) {
		if (isSending) {
			$submit.prop("disabled", true).attr("data-original-text", $submit.text()).text("Sending...");
			return;
		}

		var originalText = $submit.attr("data-original-text") || "Submit";
		$submit.prop("disabled", false).text(originalText).removeAttr("data-original-text");
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function validateForm($f) {
		var name = $.trim($f.find("[name='name']").val());
		var email = $.trim($f.find("[name='email']").val());
		var phone = $.trim($f.find("[name='phone']").val());
		var subject = $.trim($f.find("[name='subject']").val());
		var comments = $.trim($f.find("[name='comments']").val());

		if (!name || !email || !phone || !subject || !comments) {
			showFormResult("Please complete all required fields.", "error");
			return false;
		}

		if (!isValidEmail(email)) {
			showFormResult("Please enter a valid email address.", "error");
			return false;
		}

		return true;
	}

	function handleSuccessfulSubmission($f, $submit, message) {
		showFormResult(message, "success");
		$f[0].reset();
		showThankYouModal();
		setSubmitState($submit, false);
	}

	$form.on("submit", function (event) {
		event.preventDefault();

		var $f = $(this);
		var $submit = $f.find("#submit, button[type='submit']");
		var actionUrl = $f.attr("action") || "https://formsubmit.co/shaikhwajih54@gmail.com";
		var isStaticHost = /github\.io$/i.test(window.location.hostname) || window.location.protocol === "file:";

		if (!validateForm($f)) {
			return false;
		}

		setSubmitState($submit, true);

		$.ajax({
			method: "POST",
			url: isStaticHost ? "https://formsubmit.co/ajax/shaikhwajih54@gmail.com" : actionUrl,
			dataType: isStaticHost ? "json" : undefined,
			accepts: isStaticHost ? "application/json" : undefined,
			data: $f.serialize(),
			success: function (response) {
				var result = response;

				if (!isStaticHost && typeof response === "string") {
					try {
						result = $.parseJSON(response);
					} catch (err) {
						result = response;
					}
				}

				if (isStaticHost || (result && result.status === "Success")) {
					handleSuccessfulSubmission($f, $submit, result && result.msg ? result.msg : "Your message has been sent successfully. I will get back to you soon.");
					return;
				}

				showFormResult(result && result.msg ? result.msg : "There was an error sending your message.", "error");
				setSubmitState($submit, false);
			},
			error: function () {
				showFormResult("There was an issue sending your message. Please email me at shaikhwajih54@gmail.com", "error");
				setSubmitState($submit, false);
			}
		});

		return false;
	});
});
