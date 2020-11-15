const search_vector_data = (func, arch, precision, size, version, y_axis) => {
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

const plot_vector_all = (arch, prec, size, y_axis, version) =>{

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

    let dataX = kind_vector_list.sort();

    let dataY = [];
    // create plot data
    for(let i=0; i< dataX.length; i++){
        dataY.push(search_vector_data(dataX[i], arch, prec, size, version, y_axis));
    }


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

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

const PlotBtn3 = () => {

	const yaxis = document.getElementById("select_yaxis").value;
	const size = document.getElementById("select_size").value;
	const arch = document.getElementById("select_arch").value;
	const prec = document.getElementById("select_prec").value;
	const version = document.getElementById("select_version").value;

    plot_vector_all(arch, prec, size, yaxis, version);

};

const create_choice3 = () => {

    if(document.getElementById("choice_area2") == null){


        // delete other choice
        if(document.getElementById("choice_area1") != null){
            document.getElementById("choice_area1").remove();
        }
        if(document.getElementById("choice_area3") != null){
            document.getElementById("choice_area3").remove();
        }
        if(document.getElementById("choice_area4") != null){
            document.getElementById("choice_area4").remove();
        }
        if(document.getElementById("choice_area5") != null){
            document.getElementById("choice_area5").remove();
        }
        if(document.getElementById("choice_areaGOMA") != null){
            document.getElementById("choice_areaGOMA").remove();
        }

        let text = '';

        // create menu
        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area3'

        // y-axis
        text += '<h3>y-axis</h3>';
        text += create_pulldown('yaxis', yaxis_list);

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

        // version
        text += '<h3>Pipeline ID (Version)</h3>';
        text += create_pulldown_with_option('version', version_list, pipeline_list);

        text += '<br><input type="button" value="Plot!" onclick="PlotBtn3()"/>'

        choice_area.innerHTML+=text;
        document.body.appendChild(choice_area);
    }
};
