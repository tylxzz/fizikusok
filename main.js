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

function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parent != undefined) {
        createHTMLElement(tag, id, parent);
    }
}

function renderTableHeaders() {
    const tr = document.getElementById('ftr');
    createTableCell('th', 'Fizika területe', tr);
    createTableCell('th', 'Időszak', tr);
    const kepviselok = createTableCell('th', 'Képviselők', tr);
    kepviselok.colSpan = 2;
}

function renderTable(fizikusok) {
    const tbody = document.getElementById('ftbody');
    tbody.innerHTML = '';
    for(const fi of fizikusok) {
        const row = document.createElement('tr');
        tbody.appendChild(row);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        td1.innerHTML = fi.fizika;
        td2.innerHTML = fi.ido;
        td3.innerHTML = fi.tudos1;

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);

        if(fi.tudos2) {
            const td4 = document.createElement('td');
            td4.innerHTML = fi.tudos2 || '';
            row.appendChild(td3);
            row.appendChild(td4);
        }
        else {
            td3.colSpan = 2;
            row.appendChild(td3);
        }
    }
}