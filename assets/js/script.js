/* formulaires */
/* validation */
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

/* dateîcker */
$(function () {
  //titre label
  const getDatePickerTitle = elem => {
    // From the label or the aria-label
    const label = elem.nextElementSibling;
    let titleText = '';
    if (label && label.tagName === 'LABEL') {
      titleText = label.textContent;
    } else {
      titleText = elem.getAttribute('aria-label') || '';
    }
    return titleText;
  }

  const elems = document.querySelectorAll('.datepicker_input');
  for (const elem of elems) {
    const datepicker = new Datepicker(elem, {
      language: "fr",
      title: getDatePickerTitle(elem),
      autohide: true
    });
  };

  const elems2 = document.querySelectorAll('.datepicker_input_year');
  for (const elem of elems2) {
    const datepicker = new Datepicker(elem, {
      language: "fr",
      title: getDatePickerTitle(elem),
      autohide: true,
      format: 'yyyy',
      startView: 2,
      pickLevel: 2
    });
  };
});

/* select2 */
$( '.select2' ).select2( {
  theme: 'bootstrap-5'
});



