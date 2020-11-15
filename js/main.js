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

////////////
/// goma ///
////////////
const PlotBtn3 = () => {

    let func_msg = document.createElement('h3');
    func_msg.innerHTML = 'つかれちゃったからプロットはおやすみ';
    document.body.appendChild(func_msg);

};

const create_choiceGOMA = () => {

    if(document.getElementById("choice_areaGOMA") == null){

        // delete other choice
        if(document.getElementById("choice_area1") != null){
            document.getElementById("choice_area1").remove();
        }
        if(document.getElementById("choice_area2") != null){
            document.getElementById("choice_area2").remove();
        }

        let text = '';

        let choice_area = document.createElement('div');
        choice_area.id = 'choice_areaGOMA'

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
// p.innerHTML += '<button onclick="create_choice3()">Vector Summary</button>  ';
// p.innerHTML += '<button onclick="create_choice4()">Dense Summary</button>  ';
// p.innerHTML += '<button onclick="create_choice5()">CRS Summary</button>  ';
p.innerHTML += '<button onclick="create_choiceGOMA()">きゅっきゅっ</button>  ';
p.innerHTML += '<br>';

document.body.appendChild(p);
