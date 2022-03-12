/* formulaires */
(function() {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

/* dateîcker */
$(function() {
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
            autohide: true,
            
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
            pickLevel: 2,
            orientation: 'bottom'
        });
    };
});

/* select2 */
$('.select2').select2({
    theme: 'bootstrap-5'
});

$(function() {
    var fr = {
        searchPanes: {
            title: {
                _: 'Filtres séléctionnés - %d',
                0: 'Aucun filtre séléctionné',
                1: 'Filtre séléctionné - %d'
            }
        },
        "sProcessing": "Traitement en cours...",
        "sSearch": "Rechercher&nbsp;: ",
        "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
        "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoPostFix": "",
        "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
        "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
        "oPaginate": {
            "sFirst": "Premier",
            "sPrevious": "Pr&eacute;c&eacute;dent",
            "sNext": "Suivant",
            "sLast": "Dernier"
        },
        "oAria": {
            "sSortAscending": ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
        },
        "select": {
            "rows": {
                "_": "%d lignes sélectionnées",
                "0": "Aucune ligne sélectionnée",
                "1": "1 ligne sélectionnée"
            }
        },
        "searchPanes": {
            "clearMessage": "Tout effacer",
            "collapse": {
                "0": "SearchPanes",
                "_": "SearchPanes (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "",
            "loadMessage": "Chargement filtre",
            "title": "Filres actifs - %d",
            "showMessage": "Tout montrer",
            "collapseMessage": "Tout réduire"
        },
    }
    var table = $('#dataTable').DataTable({
        searchPanes: true,
        responsive: true,
        pageLength: 25,
        language: fr,
        columnDefs: [{
            searchPanes: {
                show: true,
                initCollapsed: true
            },
            /* targets: [0, 1, 2, 3] */
        }]
    });
    table.searchPanes.container().prependTo(table.table().container());
    table.searchPanes.resizePanes();
});

/* dynamic modal */

var modalWrap = null;
const showModalDetail = (title, description, lien) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }

    let desc = ""
    Object.keys(description).forEach(function(key) {
        desc += `<p><b>${key} :</b> ${description[key]}`
    });

    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${desc}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal" onclick="location.href = '${lien}';">Fiche</button>
          </div>
        </div>
      </div>
    </div>
  `;

    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

const showModalSupprimer = (title, description, lien) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }

    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer : ${description}</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-danger modal-success-btn" data-bs-dismiss="modal" onclick="location.href = '${lien}';">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
`;

    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

