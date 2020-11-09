const search_data = (func, arch, precision, version) => {
    let x = [];
    let y = [];
    
    for(let i=0; i<json_data.length; i++){
        if( json_data[i].func == func && json_data[i].arch == arch && json_data[i].version == version && json_data[i].prec == precision) {
            if(json_data[i].size==null){
                x.push(json_data[i].M);
            }
            else{
                x.push(json_data[i].size);
            }
            y.push(json_data[i].perf);
        }
    }
    result = [x, y, version]

    return result;
};

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

const create_choice = () => {

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
    e.innerHTML += '<br><input type="button" value="Plot!" onclick="PlotBtn()"/>'
    document.body.appendChild(e);

};

const PlotBtn = () => {
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

const plot_result = (funcs, archs, precs, version) =>{

    let plot_data = [];

    const layout = {
        title: 'version: ' + version,
        yaxis: {
            title: 'Performance[GFLOPS]',
            autorange: 'true'
        },
        xaxis:{
            title: 'Size',
            type: 'log',
            autorange: 'true'
        },
        width: 700,
        height: 700,
        automargin: true,
        legend:{
            orientation: 'h'
        }
    };

    const config = {};

    // create plot data
    for(let i=0; i< funcs.length; i++){
        for(let j=0; j< archs.length; j++){
            for(let k=0; k< precs.length; k++){

                const plot_element_data = search_data(funcs[i], archs[j], precs[k], version);

                const plot_element = {
                    x: plot_element_data[0],
                    y: plot_element_data[1],
                    name: funcs[i] + '_' + precs[k] + '_' + archs[j],
                    type: 'scatter'
                };

                plot_data.push(plot_element);
            }
        }
    }

    Plotly.newPlot('myDiv', plot_data, layout, config);
}

///// main /////
let p = document.createElement('p');
 
p.innerHTML = '<button onclick="create_choice()">Start</button><br>';

document.body.appendChild(p);

