$(function () {
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
            "emptyPanes": "Aucun filtre",
            "loadMessage": "Chargement filtre",
            "title": "Filres actifs- %d",
            "showMessage": "Tout montrer",
            "collapseMessage": "Tout réduire"
        },
    }
    en = {
        "sSearch": "Search&nbsp;: ",
    }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    if (getCookie('i18n') == "fr") {
        lang = fr;
    } else {
        lang = en
    }

    var table = $('#dataTable').DataTable({
        searchPanes: true,
        responsive: true,
        pageLength: 25,
        language: lang,
        columnDefs: [
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true
                },
                targets: [0, 1, 2, 3, 4, 5]
            }
        ]
    });
    table.searchPanes.container().prependTo(table.table().container());
    table.searchPanes.resizePanes();
});

