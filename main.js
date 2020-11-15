const sort_large = (a, b) => {
    return (a < b ? 1 : -1);
}
const sort_small = (a, b) => {
    return (a < b ? -1 : 1);
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

////////////
/// goma ///
////////////
const PlotBtn3 = () => {

    let func_msg = document.createElement('h3');
    func_msg.innerHTML = 'つかれちゃったからプロットはおやすみ';
    document.body.appendChild(func_msg);

};

const create_choice3 = () => {

    if(document.getElementById("choice_area3") == null){

        // delete other choice
        if(document.getElementById("choice_area1") != null){
            document.getElementById("choice_area1").remove();
        }
        if(document.getElementById("choice_area2") != null){
            document.getElementById("choice_area2").remove();
        }

        let text = '';

        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area3'

        text += '<h3>きゅきゅきゅっきゅきゅっきゅきゅっっきゅきゅ</h3>';
        text += '<br><input type="button" value="ごまちゃんぷろっと" onclick="PlotBtn3()"/>';

        choice_area.innerHTML+=text;
        document.body.appendChild(choice_area);
    }
};


///// main /////
let p = document.createElement('p');
 
p.innerHTML += '<button onclick="create_choice1()">折れ線グラフかくよ</button>  ';
p.innerHTML += '<button onclick="create_choice2()">バージョンの違いをかくよ</button>  ';
p.innerHTML += '<button onclick="create_choice3()">きゅっきゅっ</button>  ';
p.innerHTML += '<br>';

document.body.appendChild(p);
