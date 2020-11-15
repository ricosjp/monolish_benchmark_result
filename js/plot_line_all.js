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

    let plot_area = document.createElement('div');
    plot_area.id = 'plot_area'
    document.body.insertBefore(plot_area, myDiv);

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

    Plotly.newPlot('plot_area', plot_data, layout, config);

    if(document.getElementById("version_print") != null){
        document.getElementById("version_print").remove()
    }

    let tmp = document.createElement('h3');
    tmp.id = 'version_print'
    tmp.innerHTML += 'This commit is <a href="https://gitlab.ritc.jp/ricos/monolish/-/commit/' + version + '" target="_blank">here</a>';
    document.body.insertBefore(tmp, plot_area);
}
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
	const version = document.getElementById("select_version").value;

    //get yaxis
	const y_axis = document.getElementById("select_yaxis").value;

    // plot!!
    plot_line(funcs, archs, precs, version, y_axis);

};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

const create_choice1 = () => {

    if(document.getElementById("choice_area1") == null){

        let text = '';

        // create menu
        let choice_area = document.createElement('div');
        choice_area.id = 'choice_area1'

        // delete other choice
        delete_other_choice(choice_area.id);

        text += '<h2>Plot Results</h2>';

        text += '<h3>y-axis</h3>';
        text += create_pulldown('yaxis', yaxis_list);

        text += '<h3>Function (複数選択可)</h3>';
        text += create_checkbox_func('func', kind_vector_list.sort(), kind_Dense_list.sort(), kind_CRS_list.sort());

        text += '<h3>Archtecture (複数選択可, 選ばなければすべて)</h3>';
        spec_list = [cpu_type_list[0], gpu_type_list[0]];
        text += create_checkbox_with_option_br('arch', arch_list, spec_list);

        text += '<h3>Precision (複数選択可, 選ばなければすべて)</h3>';
        text += create_checkbox_br('prec', prec_list);

        text += '<h3>Pipeline ID (Version)</h3>';
        text += create_pulldown_with_option('version', version_list, pipeline_list);

        // plot button
        text += '<br><input type="button" value="Plot!" onclick="PlotBtn1()"/>'

        choice_area.innerHTML += text;


        document.body.appendChild(choice_area);

        // create plot button
    }
};

