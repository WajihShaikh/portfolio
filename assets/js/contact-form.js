jQuery(document).ready(function ($) {
	var $form = jQuery("form#contactpage");

	function showFormResult(message, type) {
		var $result = jQuery("#form_result");
		$result.empty().append(jQuery("<span>").addClass("form-" + type).text(message)).show();
	}

	function showThankYouModal() {
		var $modal = jQuery("#thankYouModal");
		if ($modal.length) {
			$modal.modal("show");
		}
	}

	function setSubmitState($submit, isSending) {
		if (isSending) {
			$submit.prop("disabled", true).attr("data-original-text", $submit.text()).text("Sending...");
		} else {
			var originalText = $submit.attr("data-original-text") || "Submit";
			$submit.prop("disabled", false).text(originalText).removeAttr("data-original-text");
		}
	}

	function handleSuccessfulSubmission($f, $submit, message) {
		showFormResult(message, "success");
		$f[0].reset();
		showThankYouModal();
		setSubmitState($submit, false);
	}

	$form.validate({
		rules: {
			name: { required: true },
			phone: { required: true },
			emailHelp: { required: true, email: true }
		},
		errorElement: "span",
		errorPlacement: function (error, element) {
			error.appendTo(element.parent());
		},
		submitHandler: function (form) {
			var $f = jQuery(form);
			var actionUrl = $f.attr("action") || "contact-form.php";
			var isGitHubPages = /github\.io$/i.test(window.location.hostname) || window.location.protocol === "file:";
			var $submit = $f.find("#submit, button[type='submit']");

			setSubmitState($submit, true);

			if (isGitHubPages) {
				jQuery.ajax({
					method: "POST",
					url: "https://formsubmit.co/ajax/shaikhwajih54@gmail.com",
					dataType: "json",
					accepts: "application/json",
					data: $f.serialize(),
					success: function (data) {
						var message = data && data.success ? "Thanks for contacting me! I will get back to you soon." : "Your message has been sent successfully. I will get back to you soon.";
						handleSuccessfulSubmission($f, $submit, message);
					},
					error: function () {
						showFormResult("There was an issue sending your message. Please email me at shaikhwajih54@gmail.com", "error");
						setSubmitState($submit, false);
					}
				});
			} else {
				jQuery.ajax({
					url: actionUrl,
					type: "POST",
					data: $f.serialize(),
					success: function (response) {
						var t;
						try {
							t = jQuery.parseJSON(response);
						} catch (err) {
							t = response;
						}

						if (t && t.status === "Success") {
							handleSuccessfulSubmission($f, $submit, t.msg || "Your message has been sent successfully. I will get back to you soon.");
						} else {
							showFormResult(t && t.msg ? t.msg : "There was an error sending your message.", "error");
							setSubmitState($submit, false);
						}
					},
					error: function () {
						showFormResult("There was an issue sending your message. Please email me at shaikhwajih54@gmail.com", "error");
						setSubmitState($submit, false);
					}
				});
			}

			return false;
		}
	});
});
