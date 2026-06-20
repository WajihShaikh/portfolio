jQuery(document).ready(function ($) {
	var $form = jQuery("form#contactpage");

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
			var actionUrl = $f.attr('action') || 'contact-form.php';
			var isGitHubPages = /github\.io$/i.test(window.location.hostname) || window.location.protocol === 'file:';

			// Disable submit while sending
			var $submit = jQuery('#submit');
			$submit.prop('disabled', true);

			if (isGitHubPages) {
				// Fallback to FormSubmit.co AJAX endpoint for static hosting
				var endpoint = 'https://formsubmit.co/ajax/shaikhwajih54@gmail.com';
				jQuery.ajax({
					method: 'POST',
					url: endpoint,
					dataType: 'json',
					accepts: 'application/json',
					data: $f.serialize(),
					success: function (data) {
						jQuery('#form_result').html('<span class="form-success">Thanks for contacting me! I will get back to you soon.</span>').show();
						$f[0].reset();
					},
					error: function () {
						jQuery('#form_result').html('<span class="form-error">There was an issue sending your message. Please email me at shaikhwajih54@gmail.com</span>').show();
					},
					complete: function () {
						$submit.prop('disabled', false);
					}
				});
			} else {
				// Server-side PHP handler (for non-static environments)
				jQuery.ajax({
					url: actionUrl,
					type: 'POST',
					data: $f.serialize(),
					success: function (response) {
						var t;
						try { t = jQuery.parseJSON(response); } catch (err) { t = response; }
						if (t && t.status === 'Success') {
							jQuery('#form_result').html('<span class="form-success">' + t.msg + '</span>').show();
							$f[0].reset();
						} else {
							jQuery('#form_result').html('<span class="form-error">' + (t && t.msg ? t.msg : 'There was an error sending your message.') + '</span>').show();
						}
					},
					error: function () {
						jQuery('#form_result').html('<span class="form-error">There was an issue sending your message. Please email me at shaikhwajih54@gmail.com</span>').show();
					},
					complete: function () {
						$submit.prop('disabled', false);
					}
				});
			}
			return false;
		}
	});
});
