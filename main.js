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

        row.appendChild(td1);
        row.appendChild(td2);

        if(fi.tudos1 && fi.tudos2) {
            td3.innerHTML = fi.tudos1;
            const td4 = document.createElement('td');
            td4.innerHTML = fi.tudos2 || '';
            row.appendChild(td3);
            row.appendChild(td4);
        }
        else if(fi.tudos1 || fi.tudos2) {
            td3.innerHTML = fi.tudos1 || fi.tudos2;
            td3.colSpan = 2;
            row.appendChild(td3);
        }
    }
}

function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    document.body.appendChild(form);

    const formValues = [
        {id: 'fizika', label: 'Terület megnevezése:'},
        {id: 'ido', label: 'Időszak:'},
        {id: 'tudos1', label: 'Első tudós:'},
        {id: 'tudos2', label: 'Második tudós:'},
    ];

    for(const field of formValues) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.name = field.id;

        const error = document.createElement('div');
        error.className = 'error';

        const br = document.createElement('br');
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');

        div.appendChild(label);
        div.appendChild(br);
        div.appendChild(input);
        div.appendChild(br1);
        div.appendChild(error);
        div.appendChild(br2);
        form.appendChild(div);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Hozzáadás';
    form.appendChild(button);
}

function validateFields(fizika, ido, tudos1, tudos2) {
    let valid = true;
    const errorMessages = document.querySelectorAll('.error');
    for(const error of errorMessages) {
        error.innerHTML = '';
    }

    valid = validateElement(fizika, 'Add meg a Terület megnevezésés') && valid;
    valid = validateElement(ido, 'Helyezd el az időben') && valid;

    if(tudos1.value === '' && tudos2.value === '') {
        valid = validateElement(tudos1, 'Legalább egy tudóst meg kell adni') && valid;
        valid = validateElement(tudos2, 'Legalább egy tudóst meg kell adni') && valid;
    }

    return valid;
}

function validateElement(element, errorMessages) {
    const error = element.parentElement.querySelector('.error');
    if(element.value === '') {
        error.innerHTML = errorMessages;
        return false;
    }
    else {
        error.innerHTML = '';
        return true;
    }
}
