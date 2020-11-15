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

    //get version
	const yaxis = document.getElementById("select_version").value;

    //get yaxis
	const y_axis = document.getElementById("select_yaxis").value;

    // plot!!
    plot_line(funcs, archs, precs, version, y_axis);

};

const create_choice1 = () => {

    if(document.getElementById("choice_area1") == null){

        // delete other choice
        if(document.getElementById("choice_area2") != null){
            document.getElementById("choice_area2").remove();
        }
        if(document.getElementById("choice_area3") != null){
            document.getElementById("choice_area3").remove();
        }

        let text = '';

        // create menu
        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area1'

        text += '<h3>y-axis</h3>';
        text += create_pulldown('yaxis', yaxis_list);

        text += '<h3>Function (複数選択可)</h3>';
        text += create_checkbox('func', func_list.sort());

        text += '<h3>Archtecture (複数選択可, 選ばなければすべて)</h3>';
        spec_list = [cpu_type_list[0], gpu_type_list[0]];
        text += create_checkbox_with_option('arch', arch_list, spec_list);

        text += '<h3>Precision (複数選択可, 選ばなければすべて)</h3>';
        text += create_checkbox('prec', prec_list);

        text += '<h3>Version</h3>';
        text += create_pulldown_with_option('version', version_list, pipeline_list);

        // plot button
        text += '<br><input type="button" value="Plot!" onclick="PlotBtn1()"/>'

        choice_area.innerHTML += text;


        document.body.appendChild(choice_area);

        // create plot button
    }
};

////////////////////////////////////////////
////////////////////////////////////////////
const PlotBtn2 = () => {

	const yaxis = document.getElementById("select_yaxis").value;
	const func = document.getElementById("select_func").value;
	const size = document.getElementById("select_size").value;
	const arch = document.getElementById("select_arch").value;
	const prec = document.getElementById("select_prec").value;

    plot_bar(func, arch, prec, size, yaxis);

};

const create_choice2 = () => {

    if(document.getElementById("choice_area2") == null){


        // delete other choice
        if(document.getElementById("choice_area1") != null){
            document.getElementById("choice_area1").remove();
        }
        if(document.getElementById("choice_area3") != null){
            document.getElementById("choice_area3").remove();
        }

        let text = '';

        // create menu
        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area2'

        // y-axis
        text += '<h3>y-axis</h3>';
        text += create_pulldown('yaxis', yaxis_list);

        // func
        text += '<h3>y-axis</h3>';
        text += create_pulldown('func', func_list.sort());

        // Size
        text += '<h3>Size</h3>';
        let size_list = Array.from(new Set(Vsize_list.concat(Msize_list)));
        text += create_pulldown('size', size_list.sort(sort_large));

        // arch
        text += '<h3>Archtecture</h3>';
        text += create_pulldown('arch', arch_list.sort());

        // prec
        text += '<h3>Precision</h3>';
        text += create_pulldown('prec', prec_list.sort());

        text += '<br><input type="button" value="Plot!" onclick="PlotBtn2()"/>'

        choice_area.innerHTML+=text;
        document.body.appendChild(choice_area);
    }
};

////////////////////////////////////////////
////////////////////////////////////////////
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
        text += '<br><input type="button" value="ごまちゃんぷろっと" onclick="PlotBtn2()"/>';

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
