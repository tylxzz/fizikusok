/**
 * 
 * @param {'td' | 'th'} tagName 
 * @param {string} innerHTML 
 * @param {HTMLTableRowElement} parent 
 * @returns {HTMLTableCellElement}
 */
function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

/**
 * 
 * @param {string} tag 
 * @param {string} id 
 * @param {HTMLElement} parent 
 * @returns {HTMLElement}
 */
function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

/**
 * 
 * @param {string} tag 
 * @param {string} id 
 * @param {string} parentid 
 * @returns {HTMLElement | undefined}
 */
function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parent != undefined) {
        createHTMLElement(tag, id, parent);
    }
}

/**
 * @returns {HTMLTableCellElement}
 */
function renderTableHeaders() {
    const tr = document.getElementById('ftr');
    createTableCell('th', 'Fizika területe', tr);
    createTableCell('th', 'Időszak', tr);
    const kepviselok = createTableCell('th', 'Képviselők', tr);
    kepviselok.colSpan = 2;
}

/**
 * 
 * @param {Array} fizikusok 
 */
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
 /**
  * @returns {HTMLElement}
  */
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

/**
 * 
 * @param {*} fizika 
 * @param {*} ido 
 * @param {*} tudos1 
 * @param {*} tudos2 
 * @returns {bool}
 */
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

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} errorMessages 
 * @returns {bool}
 */
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