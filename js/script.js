let sinusX = [0];
let sinusX_old = [];
let sinusTrace;
let dataSinus;
let displaySinus = true;
let cosinusY1 = [0];
let cosinusY2 = [1];
let cosinusY1_old = [];
let cosinusY2_old = [];
let cosinusTrace;
let dataCosinus;
let displayCosinus = true;
let updateData = true;
let source;
let graph = document.getElementById('graph')
if(typeof(EventSource) !== "undefined")
{
    source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
}
else
{
    document.getElementById("fetchedData").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function fetchData()
{
    source.addEventListener("message", function(e)
    {
        listenerFunctionContent(e);
    });
}

function listenerFunctionContent(e)
{
    let data = JSON.parse(e.data);

    let amplitude = document.querySelector('amplitude-buttons').getAmplitude();
    if(+data.x == 0)
    {
        cosinusY1[0] = data.y1;
        cosinusY2[0] = data.y2;
    }
    else
    {
        sinusX.push(data.x);
        cosinusY1.push(data.y1*amplitude);
        cosinusY2.push(data.y2*amplitude);
    }

    if(updateData == true)
    {
        drawGraphs();
    }
}


function endGraph()
{
    updateData = false;

    sinusX_old = sinusX.slice();
    cosinusY1_old = cosinusY1.slice();
    cosinusY2_old = cosinusY2.slice();
}

function addSin()
{
    if(displaySinus == true)
    {
        displaySinus = false;
    }
    else
    {
        displaySinus = true;
    }

    drawGraphs();
}

function addCos()
{
    if(displayCosinus == true)
    {
        displayCosinus = false;
    }
    else
    {
        displayCosinus = true;
    }
    drawGraphs();
}


function drawGraphs()
{
    sinusTrace = {
        x: (updateData == true) ? sinusX : sinusX_old,
        y: (updateData == true) ? cosinusY1 : cosinusY1_old,
        line: {
            color: '75DDDD',
            width: 4
        },
        type: 'log',
        name: 'Sinus',
    };

    cosinusTrace = {
        x: (updateData == true) ? sinusX : sinusX_old,
        y: (updateData == true) ? cosinusY2 : cosinusY2_old,
        line: {
            color: 'AA3E98' ,
            width: 4
        },
        type: 'log',
        name: 'Cosinus',
    };

    dataSinus = [sinusTrace];
    dataCosinus = [cosinusTrace];


    Plotly.newPlot(graph, [], []);

    if(displaySinus == true && displayCosinus == true)
    {
        Plotly.addTraces(graph, dataSinus);
        Plotly.addTraces(graph, dataCosinus);
    }
    else if(displaySinus == true && displayCosinus == false)
    {
        Plotly.addTraces(graph, dataSinus);
    }
    else if(displaySinus == false && displayCosinus == true)
    {
        Plotly.addTraces(graph, dataCosinus);
    }
}
  