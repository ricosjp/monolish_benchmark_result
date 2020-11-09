const create_checkbox = (name, list) => {
    let text = '<p>'
    text += '<form name = "select_' + name + 'form">';
    for (const a in list) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + list[a] + '>' + list[a]+'</input>';
    }
    text += '</select_' + name +'_form>';
    text += '</p>'

    return text;
}

const create_pulldown = (name, list) => {

    let text = '<p>';
    text += '<select name = "select_' + name + '" id = "select_' + name + '">';
    for (const a in list) {
        text += '<option value=' + list[a] + '>' + list[a] + ' </option>';
    }
    text += '</select>';
    text += '</p>';

    return text;
}
