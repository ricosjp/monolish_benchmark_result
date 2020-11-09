const create_checkbox = (e, name, list) => {
    let text = '<form name = "select_' + name + 'form">';
    for (const a in list) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + list[a] + '>' + list[a]+'</input>';
    }
    text += '</select_' + name +'_form>';

    e.innerHTML = text

    document.body.appendChild(e);
}

const create_pulldown = (e, name, list) => {

    let text = '<select name = "select_' + name + '" id = "select_' + name + '">';
    for (const a in list) {
        text += '<option value=' + list[a] + '>' + list[a] + ' </option>';
    }
    text += '</select>';

    e.innerHTML = text;

    document.body.appendChild(e);
}
