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

    let plot_area = document.createElement('div');
    plot_area.id = 'plot_area'
    document.body.insertBefore(plot_area, myDiv);

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
        title: 'size: ' + size + ', prec: ' + prec + ', arch: ' + arch,
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

    Plotly.newPlot('plot_area', plot_data, layout, config);

    if(document.getElementById("version_print") != null){
        document.getElementById("version_print").remove()
    }

}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

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

        let text = '';

        // create menu
        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area2'

        // delete other choice
        delete_other_choice(choice_area.id);

        text += '<h2>Difference of Versions</h2>';

        // y-axis
        text += '<h3>y-axis</h3>';
        text += create_pulldown('yaxis', yaxis_list);

        // func
        text += '<h3>Function</h3>';
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
