let fizikusok = [
    {
        fizika: 'Optika',
        ido: 'XI. század',
        tudos1: 'Alhazen'
    },
    {
        fizika: 'Asztronómia',
        ido: 'reneszánsz',
        tudos1: 'Kepler',
        tudos2: 'Galilei'
    },
    {
        fizika: 'Kvantumfizika',
        ido: 'XIX-XX. század',
        tudos1: 'Max Planck',
        tudos2: 'Albert Einstein'
    },
    {
        fizika: 'Modern fizika',
        ido: 'XX-XXI. század',
        tudos1: 'Richard Feynman',
        tudos2: 'Stephen Hawking'
    }
];

const table = createHTMLElement('table', 'ftable', document.body);
createHTMLElementWithParentId('thead', 'fthead', 'ftable');
createHTMLElementWithParentId('tr', 'ftr', 'fthead');
renderTableHeaders();
createHTMLElementWithParentId('tbody', 'ftbody', 'ftable');

renderTable(fizikusok);

generateForm();

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    const fizika = document.getElementById('fizika');
    const ido = document.getElementById('ido');
    const tudos1 = document.getElementById('tudos1');
    const tudos2 = document.getElementById('tudos2');

    const fizikavalue = fizika.value;
    const idovalue = ido.value;
    const tudos1value = tudos1.value;
    const tudos2value = tudos2.value;

    if(validateFields(fizika, ido, tudos1, tudos2)) {
        const newfizikusok = {
            fizika: fizikavalue,
            ido: idovalue,
            tudos1: tudos1value,
            tudos2: tudos2value
        }
        fizikusok.push(newfizikusok);
        form.reset();
        renderTable(fizikusok);
    }
})