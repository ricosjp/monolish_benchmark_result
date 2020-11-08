const search_axpy_data = (func, precision) => {
    const arch='cpu'
    const version = '74226f9cf5033de9ba8be64a1b37cbfdf1a33733'
    let x = [];
    let y = [];
    
    for(let i=0; i<json_data.length; i++){
        if( json_data[i].func == func && json_data[i].arch == arch && json_data[i].version == version && json_data[i].prec == precision) {
            if(json_data[i].size=='null'){
                x.push(json_data[i].size);
            }
            else{
                x.push(json_data[i].M);
            }
            y.push(json_data[i].perf);
        }
    }
    result = [x, y]

    return result;
};

const create_func_checkbox = () => {
    let p = document.createElement('p');
    p.innerHTML = '<form name = "select_func_form">';
    for (const a in func_list) {
        p.innerHTML += '<input type="checkbox" name="checked_func" value=' + func_list[a] + '>'+func_list[a]+'</input>';
    }
    p.innerHTML += '</select_func_form>';
    p.innerHTML += '<br>';
    p.innerHTML += '<br>';
    p.innerHTML += '<input type="button" value="Plot!" onclick="clickBtn()"/>'
    document.body.appendChild(p);
};

const clickBtn = () => {
	const arr1 = [];
	const checked_func = document.getElementsByName("checked_func");

    for (let i=0; i<checked_func.length; i++){
        if (checked_func[i].checked){
            plot_result(checked_func[i].value);
        }
    }

};

const plot_result = (func_name) =>{
    let plot_data_double = search_axpy_data(func_name, 'double');
    let plot_data_float = search_axpy_data(func_name, 'float');

    const trace1 = {
        x: plot_data_double[0],
        y: plot_data_double[1],
        name: func_name + '_double',
        type: 'scatter'
    };

    const trace2 = {
        x: plot_data_float[0],
        y: plot_data_float[1],
        name: func_name + '_float',
        type: 'scatter'
    };

    const data = [trace1, trace2];

    const layout = {
        title : func_name,
        yaxis: {
            title: 'Performance[GFLOPS]'
        },
        xaxis:{
            title: 'Size'
        }
    };
    const config = {};

    Plotly.newPlot('myDiv', data, layout, config);
}

///// main /////
let p = document.createElement('p');
 
p.innerHTML = '<button onclick="create_func_checkbox()">Start</button>';

document.body.appendChild(p);

