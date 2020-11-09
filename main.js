const create_choice1 = () => {
    let text = '';

    // create menu
    let choice_area = document.createElement('div');

    text += '<h3>Function (複数選択可)</h3>';
    text += create_checkbox('func', func_list);

    text += '<h3>Archtecture (複数選択可, 選ばなければすべて)</h3>';
    text += create_checkbox('arch', arch_list);

    text += '<h3>Precision (複数選択可, 選ばなければすべて)</h3>';
    text += create_checkbox('prec', arch_list);

    text += '<h3>Version</h3>';
    text += create_pulldown('version', version_list);

    choice_area.innerHTML += text;

    document.body.appendChild(choice_area);

    // create plot button
    let e = document.createElement('p');
    e.innerHTML += '<br><input type="button" value="Plot!" onclick="PlotBtn1()"/>'
    document.body.appendChild(e);
};

const PlotBtn1 = () => {
    //get func
	let funcs = [];
	const checked_func = document.getElementsByName("checked_func");
    for (let i=0; i<checked_func.length; i++){
        if (checked_func[i].checked){
            funcs.push(checked_func[i].value);
        }
    }

    //get arch
	let archs = [];
	const checked_arch = document.getElementsByName("checked_arch");
    for (let i=0; i<checked_arch.length; i++){
        if (checked_arch[i].checked){
            archs.push(checked_arch[i].value);
        }
    }
    if(archs.length==0){
        archs = arch_list;
    }

    //get prec
	let precs = [];
	const checked_prec = document.getElementsByName("checked_prec");
    for (let i=0; i<checked_prec.length; i++){
        if (checked_prec[i].checked){
            precs.push(checked_prec[i].value);
        }
    }
    if(precs.length==0){
        precs = prec_list;
    }

	const version = document.getElementById("select_version").value;

    // plot!!
    plot_result(funcs, archs, precs, version);

};

////////////////////////////////////////////
////////////////////////////////////////////

const create_choice2 = () => {
    // checkbox func
    let func_msg = document.createElement('h3');
    func_msg.innerHTML = 'きゅきゅきゅっきゅきゅっきゅきゅっっきゅきゅ';
    document.body.appendChild(func_msg);

    let e = document.createElement('p');
    e.innerHTML += '<br><input type="button" value="Plot!" onclick="PlotBtn2()"/>'
    document.body.appendChild(e);
};


const PlotBtn2 = () => {
    let func_msg = document.createElement('h3');
    func_msg.innerHTML = 'つかれちゃったからプロットはおやすみ';
    document.body.appendChild(func_msg);
};


///// main /////
let p = document.createElement('p');
 
p.innerHTML += '<button onclick="create_choice1()">折れ線グラフかくよ</button>  ';
p.innerHTML += '<button onclick="create_choice2()">きゅっきゅっ</button>  ';
p.innerHTML += '<br>';

document.body.appendChild(p);
