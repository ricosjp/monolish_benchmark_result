const search_line_data = (func, arch, precision, version, y_axis) => {
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
            y.push(json_data[i][y_axis]);
        }
    }
    result = [x, y, version, y_axis];

    return result;
};

const plot_line = (funcs, archs, precs, version, y_axis) =>{

    let plot_data = [];
    let y_title;

    if(y_axis == 'perf'){
        y_title = 'Performance [GFLOPS]'
    }
    if(y_axis == 'memspeed'){
        y_title = 'Memory Bandwidth [GB/s]'
    }
    if(y_axis == 'time'){
        y_title = 'Time [sec]'
    }

    const layout = {
        title: 'version: ' + version,
        yaxis: {
            title: y_title,
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

                const plot_element_data = search_line_data(funcs[i], archs[j], precs[k], version, y_axis);

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

    if(document.getElementById("version_print") != null){
        document.getElementById("version_print").remove()
    }

    let tmp = document.createElement('h3');
    tmp.id = 'version_print'
    tmp.innerHTML += 'This commit is <a href="https://gitlab.ritc.jp/ricos/monolish/-/commit/' + version + '" target="_blank">here</a>';
    document.body.insertBefore(tmp, myDiv);
}

////////////////////////////////////////////
////////////////////////////////////////////

const search_bar_data = (func, arch, precision, size, version, y_axis) => {
    let data = [];
    
    for(let i=0; i<json_data.length; i++){
        if( json_data[i].func == func && json_data[i].arch == arch && json_data[i].version == version && json_data[i].prec == precision){
            if(json_data[i].size == size || json_data[i].M == size) {
                return json_data[i][y_axis];
            }
        }
    }
    return null;
};

const plot_bar = (func, arch, prec, size, y_axis) =>{

    let y_title;

    if(y_axis == 'perf'){
        y_title = 'Performance [GFLOPS]'
    }
    if(y_axis == 'memspeed'){
        y_title = 'Memory Bandwidth [GB/s]'
    }
    if(y_axis == 'time'){
        y_title = 'Time [sec]'
    }

    const layout = {
        title: 'size: ' + size + 'prec: ' + prec + 'arch: ' + arch,
        yaxis: {
            title: y_title,
        },
        width: 700,
        height: 700,
        automargin: true,
    };

    const config = {};

    let dataY = [];
    // create plot data
    for(let i=0; i< version_list.length; i++){
                dataY.push(search_bar_data(func, arch, prec, size, version_list[i], y_axis));
    }

    let dataX = [];
    for(let i=0; i< version_list.length; i++){
        dataX.push(pipeline_list[i] + '( ' + version_list[i] + ')');
    }
    dataX.sort(sort_small);

    const plot_data = [
        {
            x: dataX,
            y: dataY,
            type: 'bar'
        }
    ];

    Plotly.newPlot('myDiv', plot_data, layout, config);

    if(document.getElementById("version_print") != null){
        document.getElementById("version_print").remove()
    }

}
