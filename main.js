const create_choice1 = () => {
    // checkbox func
    let func_msg = document.createElement('h3');
    func_msg.innerHTML = '関数名 (複数選択可)';
    document.body.appendChild(func_msg);

    let func_box = document.createElement('p');
    create_checkbox(func_box, 'func', func_list);

    // checkbox arch
    let arch_msg = document.createElement('h3');
    arch_msg.innerHTML = 'Architecture (複数選択可, 選ばなければすべて)';
    document.body.appendChild(arch_msg);

    let arch_box = document.createElement('p');
    create_checkbox(arch_box, 'arch', arch_list);

    // checkbox prec
    let prec_msg = document.createElement('h3');
    prec_msg.innerHTML = 'Precision (複数選択可, 選ばなければすべて)';
    document.body.appendChild(prec_msg);

    let prec_box = document.createElement('p');
    create_checkbox(prec_box, 'prec', prec_list);

    // pulldown version
    let version_msg = document.createElement('h3');
    version_msg.innerHTML = 'Version';
    document.body.appendChild(version_msg);

    let version_menu = document.createElement('p');
    create_pulldown(version_menu, 'version', version_list);

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

    plot_result(funcs, archs, precs, version);

};

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
