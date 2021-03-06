const sort_large = (a, b) => {
    return (a < b ? 1 : -1);
}
const sort_small = (a, b) => {
    return (a < b ? -1 : 1);
}

const delete_other_choice = (mychoice) =>{
    const choice_list = [
        "plot_area",
        "choice_area1",
        "choice_area2",
        "choice_area3",
        "choice_area4",
        "choice_area5",
    ];

    for (let choice of choice_list){
        if(mychoice != choice){
            if(document.getElementById(choice) != null){
                document.getElementById(choice).remove();
            }
        }
    }
}

///////////////////////////////////////////////////////////

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

const create_checkbox_br = (name, list) => {
    let text = '<p>'
    text += '<form name = "select_' + name + 'form">';
    for (const a in list) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + list[a] + '>' + list[a]+'</input><br>';
    }
    text += '</select_' + name +'_form>';
    text += '</p>'

    return text;
}

///////////////////////////////////////////////////////////

const create_checkbox_func = (name, vector, Dense, CRS) => {
    let text = '<p>'
    text += '<form name = "select_' + name + 'form">';

    text += '<b> vector </b> <br>';
    for (const a in vector) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + vector[a] + '>' + vector[a]+'</input> ';
    }

    text += '<br>'
    text += '<b> Dense </b> <br>';
    for (const a in Dense) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + Dense[a] + '>' + Dense[a]+'</input> ';
    }

    text += '<br>'
    text += '<b> CRS </b> <br>';
    for (const a in CRS) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + CRS[a] + '>' + CRS[a]+'</input> ';
    }

    text += '</select_' + name +'_form>';
    text += '</p>'

    return text;
}

///////////////////////////////////////////////////////////

const create_checkbox_with_option = (name, list, option) => {
    let text = '<p>'
    text += '<form name = "select_' + name + 'form">';
    for (const a in list) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + list[a] + '>' + option[a] + ' (' + list[a] + ')' +'</input>';
    }
    text += '</select_' + name +'_form>';
    text += '</p>'

    return text;
}

const create_checkbox_with_option_br = (name, list, option) => {
    let text = '<p>'
    text += '<form name = "select_' + name + 'form">';
    for (const a in list) {
        text += '<input type="checkbox" name=' + '"checked_' + name + '" value=' + list[a] + '>' + option[a] + ' (' + list[a] + ')' +'</input><br>';
    }
    text += '</select_' + name +'_form>';
    text += '</p>'

    return text;
}

///////////////////////////////////////////////////////////

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

const create_pulldown_with_option = (name, list, option) => {

    let text = '<p>';
    text += '<select name = "select_' + name + '" id = "select_' + name + '">';
    for (const a in list) {
        text += '<option value=' + list[a]  + '>' + option[a] + ' (' + list[a] +')' + ' </option>';
    }
    text += '</select>';
    text += '</p>';

    return text;
}
///// main /////
let p = document.createElement('p');
 
p.innerHTML += '<button onclick="create_choice1()">Performances</button>  ';
p.innerHTML += '<button onclick="create_choice2()">Version difference</button>  ';
p.innerHTML += '<button onclick="create_choice3()">Summary (vector)</button>  ';
p.innerHTML += '<button onclick="create_choice4()">Summary (Dense)</button>  ';
p.innerHTML += '<button onclick="create_choice5()">Summary (CRS)</button>  ';
p.innerHTML += '<br>';

document.body.appendChild(p);
