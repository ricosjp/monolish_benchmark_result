const search_axpy_data = (func, arch, precision) => {
    const version = '74226f9cf5033de9ba8be64a1b37cbfdf1a33733'
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
    result = [x, y]

    return result;
};

const create_func_checkbox = () => {

    // checkbox func
    let p1 = document.createElement('p');
    p1.innerHTML = '<form name = "select_func_form">';
    for (const a in func_list) {
        p.innerHTML += '<input type="checkbox" name="checked_func" value=' + func_list[a] + '>'+func_list[a]+'</input>';
    }
    p1.innerHTML += '</select_func_form>';
    document.body.appendChild(p1);

    // checkbox arch
    let p2 = document.createElement('p');
    p2.innerHTML = '<form name = "select_arch_form">';
    for (const a in arch_list) {
        p2.innerHTML += '<input type="checkbox" name="checked_arch" value=' + arch_list[a] + '>'+arch_list[a]+'</input>';
    }
    p2.innerHTML += '</select_arch_form>';
    document.body.appendChild(p2);

    // checkbox func
    let p3 = document.createElement('p');
    p3.innerHTML = '<form name = "select_prec_form">';
    for (const a in prec_list) {
        p3.innerHTML += '<input type="checkbox" name="checked_prec" value=' + prec_list[a] + '>'+prec_list[a]+'</input>';
    }
    p3.innerHTML += '</select_prec_form>';
    p3.innerHTML += '<br>';
    p3.innerHTML += '<br>';
    p3.innerHTML += '<input type="button" value="Plot!" onclick="clickBtn()"/>'
    document.body.appendChild(p3);
};

const clickBtn = () => {
	const funcs = [];
	const checked_func = document.getElementsByName("checked_func");
    for (let i=0; i<checked_func.length; i++){
        if (checked_func[i].checked){
            funcs.push(checked_func[i].value);
        }
    }

	const archs = [];
	const checked_arch = document.getElementsByName("checked_arch");
    for (let i=0; i<checked_arch.length; i++){
        if (checked_arch[i].checked){
            archs.push(checked_arch[i].value);
        }
    }

	const precs = [];
	const checked_prec = document.getElementsByName("checked_prec");
    for (let i=0; i<checked_prec.length; i++){
        if (checked_prec[i].checked){
            precs.push(checked_prec[i].value);
        }
    }

    plot_result(funcs, archs, precs);

};

const plot_result = (funcs, archs, precs) =>{

    let plot_data = [];

    const layout = {
        yaxis: {
            title: 'Performance[GFLOPS]'
        },
        xaxis:{
            title: 'Size'
        }
    };

    const config = {};

    // create plot data
    for(let i=0; i< funcs.length; i++){
        for(let j=0; j< archs.length; j++){
            for(let k=0; k< precs.length; k++){

                const plot_element_data = search_axpy_data(funcs[i], archs[j], precs[k]);

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
 
p.innerHTML = '<button onclick="create_func_checkbox()">Start</button>';

document.body.appendChild(p);

