var canvas,gl,program;
var textCtx, canvasText;
var x,y;
var camtype=0;
var models = {};
var zposx=0;
var zposz=0;

var cpos=0;
var ang=0;
var cameraPosition=[];
function initViewport(gl, canvas)
{
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function compileShader(gl, shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);

  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check if it compiled
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // Something went wrong during compilation; get the error
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }

  return shader;
}
////////////
function createShaderFromScriptTag(gl, scriptId, opt_shaderType) {
// look up the script tag by id.
var shaderScript = document.getElementById(scriptId);
if (!shaderScript) {
  throw("*** Error: unknown script element" + scriptId);
}

// extract the contents of the script tag.
var shaderSource = shaderScript.text;

// If we didn't pass in a type, use the 'type' from
// the script tag.
if (!opt_shaderType) {
  if (shaderScript.type == "x-shader/x-vertex") {
   opt_shaderType = gl.VERTEX_SHADER;
 } 
 else if (shaderScript.type == "x-shader/x-fragment") {
   opt_shaderType = gl.FRAGMENT_SHADER;
 }
 else if (!opt_shaderType) {
   throw("*** Error: shader type not set");
 }
}
return compileShader(gl, shaderSource, opt_shaderType);
};
/////////////////
function createProgram(gl, vertexShader, fragmentShader) {
  // create a program.
  var program = gl.createProgram();

  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // link the program.
  gl.linkProgram(program);

  // Check if it linked.
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
      // something went wrong with the link
      throw ("program filed to link:" + gl.getProgramInfoLog (program));
    }

    return program;
  };
//////////////////////////
function createProgramFromScripts(gl, vertexShaderId, fragmentShaderId) {
  var vertexShader = createShaderFromScriptTag(gl, vertexShaderId);
  var fragmentShader = createShaderFromScriptTag(gl, fragmentShaderId);
  return createProgram(gl, vertexShader, fragmentShader);
}
function Initialize()
{
  canvas = document.getElementById("canvas");

  gl = canvas.getContext("experimental-webgl");
  initViewport(gl, canvas);
  // setup a GLSL program
  program = createProgramFromScripts(gl,"2d-vertex-shader", "2d-fragment-shader");
  gl.useProgram(program);
  //glClearColor(1,1,0,1);

//makeModel('aqua', 0, 0, 0, 1.0, 1.0, 1.0, 0, 0, 0, 'aqua.data', 0);
//makeModel('aqua1', 4, 4, 4, 1.0, 1.0, 1.0, 0, 0, 0, 'cube.data', 0);
var grarr= new Array(1000);
makeModel('aqua', 0, 0, -900, 1800.0, 900.5, 2400.0, 0, 0, 0, 'aqua.data', 0);
//makeModel('bed', 1, -3.8 , 10, 400.0, 0.1, 4.0, 0, 0, 0, 'aqua1.data', 0);
makeModel('fish', 0, 0, 10, 1, 1, 1, 0, 0, 0, 'fish.data', 0);
makeModel('fish01', 39, -2, 30, 0.5, 0.5, 0.5, 0, 0, 0, 'fish.data', 0);

makeModel('fish21', 34, 3, 70, 70, 70, 70, 0, 0, 0, 'gfish.data', 0);
makeModel('fish22', 18, 13, 50, 70, 70, 70, 0, 0, 0, 'gfish.data', 0);

makeModel('fish23', -27, 14, 30, 70, 70, 70, 0, 0, 0, 'gfish.data', 0);
makeModel('fish24', -14, -2, 20, 70, 70, 70, 0, 0, 0, 'gfish.data', 0);


makeModel('rock1', 10, -10, 20, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock2', 13, -10, 20, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock0', 16, -10, 20, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock7', 19, -10, 20, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);

makeModel('rock3', -15, -10, 40, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock4', -17, -10, 40, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock5', 10, -10, 60, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);
makeModel('rock6', 12, -10, 60, 1, 1, 1, 0, 0, 0, 'RockSet.data', 0);

for(var i=0;i<100;i++){
  makeModel(i, 1, -14, -200+i*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=100;i<200;i++){
  makeModel(i, 60, -14, -200+(i-100)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=200;i<300;i++){
  makeModel(i, -50, -14, -200+(i-200)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=300;i<400;i++){
  makeModel(i, -100, -14, -200+(i-300)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=400;i<500;i++){
  makeModel(i, -150, -14, -200+(i-400)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=500;i<600;i++){
  makeModel(i, 110, -14, -200+(i-500)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}
for(var i=600;i<700;i++){
  makeModel(i, 165, -14, -200+(i-600)*10, 50, 5, 5, 0, 0, 0, 'Grass_01.data', 0);

}

makeModel('fish11', 24, 13, 20, 0.2, 0.2, 0.2, 0, 0, 0, 'ORCA.data', 0);
makeModel('fish12', 15, -2, 40, 0.2, 0.2, 0.2, 0, 0, 0, 'ORCA.data', 0);
makeModel('fish13', -4, 14, 60, 0.2, 0.2, 0.2, 0, 0, 0, 'ORCA.data', 0);
makeModel('fish14', -5, -3,80, 0.2, 0.2, 0.2, 0, 0, 0, 'ORCA.data', 0);


document.onkeydown = handleKeyDown;
document.onmousemove = handlemouse;
 setInterval(drawScene, 10); //(1000/15) fps
 //drawScene();
 


}



function openFile(name, x_pos, y_pos, z_pos, x_scale, y_scale, z_scale, speed_x, speed_y, speed_z, filename, iscoin){
  var datastring;
  $.ajax({
    url : filename,
    dataType: "text",
    success : function (data) {
      datastring = data;
      createModel(name, x_pos, y_pos, z_pos, x_scale, y_scale, z_scale, speed_x, speed_y, speed_z, datastring, filename, iscoin);
    }
  });
}

function makeModel(name, x_pos, y_pos, z_pos, x_scale, y_scale, z_scale, speed_x, speed_y, speed_z, filename, iscoin){
  openFile(name, x_pos, y_pos, z_pos, x_scale, y_scale, z_scale, speed_x, speed_y, speed_z, filename, iscoin);
}

function createModel(name, x_pos, y_pos, z_pos, x_scale, y_scale, z_scale, speed_x, speed_y, speed_z, filedata, filename, iscoin) //Create object from blender
{
  if(!models[name]){
    var vertex_buffer_data = [];
    var color=0;
    var color_buffer_data = [];
    var points = [];
    var len=0;
    var line;
    var a,b,c;
    var start=0;
    var lines = filedata.split('\n');
    for (var j=0; j<lines.length; j++){
      var words = lines[j].split(' ');
      if(words[0] == "v"){

        var cur_point = {};
        cur_point['x']=parseFloat(words[1]);
        cur_point['y']=parseFloat(words[2]);
        cur_point['z']=parseFloat(words[3]);
          //console.log(words);
          points.push(cur_point);
        }
      }
    //console.log(color);
    var temp;
    var lines = filedata.split('\n');
    for (var jj=0; jj<lines.length; jj++){
      var words = lines[jj].split(' ');
      if(words[0] == "f"){
        color++;
        var t = [];
        var linemod = lines[jj].substring(1);
        var j,ans=0,tt=0,state=0;
        for(j=0;j<linemod.length;j++){
          if(linemod[j]==' '){
            ans=0;
            state=1;
          }
          else if(linemod[j]=='/' && ans!=0 && state==1){
            t.push(ans);
            state=0;
          }
          else if(linemod[j]!='/'){
            ans=ans*10+linemod.charCodeAt(j)-'0'.charCodeAt(0);
          }
        }
        t.push(ans);
        var my_triangle = {};
        my_triangle['p1'] = t[0]-1;
        my_triangle['p2'] = t[1]-1;
        my_triangle['p3'] = t[2]-1;
        vertex_buffer_data.push(points[my_triangle['p1']]['x']*x_scale + x_pos);
        vertex_buffer_data.push(points[my_triangle['p1']]['y']*y_scale + y_pos);
        vertex_buffer_data.push(points[my_triangle['p1']]['z']*z_scale + z_pos);
        vertex_buffer_data.push(points[my_triangle['p2']]['x']*x_scale + x_pos);
        vertex_buffer_data.push(points[my_triangle['p2']]['y']*y_scale + y_pos);
        vertex_buffer_data.push(points[my_triangle['p2']]['z']*z_scale + z_pos);
        vertex_buffer_data.push(points[my_triangle['p3']]['x']*x_scale + x_pos);
        vertex_buffer_data.push(points[my_triangle['p3']]['y']*y_scale + y_pos);
        vertex_buffer_data.push(points[my_triangle['p3']]['z']*z_scale + z_pos);
      }
      if(words[0] == 'c'){

        var r1,g1,b1,r2,g2,b2,r3,g3,b3;
        r1 = words[1]; g1 = words[2]; b1 = words[3];
        r2 = words[4]; g2 = words[5]; b2 = words[6];
        r3 = words[7]; g3 = words[8]; b3 = words[9];      
        color_buffer_data.push(r1/255.0);
        color_buffer_data.push(g1/255.0);
        color_buffer_data.push(b1/255.0);
        color_buffer_data.push(1.0);
        color_buffer_data.push(r2/255.0);
        color_buffer_data.push(g2/255.0);
        color_buffer_data.push(b2/255.0);
        color_buffer_data.push(1.0);
        color_buffer_data.push(r3/255.0);
        color_buffer_data.push(g3/255.0);
        color_buffer_data.push(b3/255.0);
        color_buffer_data.push(1.0);
      }
    }
//console.log(color);
    /*if(filename=="cylinder.data"){
      var res = "";
      for(var vertex in vertex_buffer_data){
        res += vertex_buffer_data[vertex] + ", ";
      }
      console.log(res);
    }*/
     var mymodel = {'center':[x_pos,y_pos,z_pos], 'scale':[x_scale,y_scale,z_scale], 'speed':[speed_x, speed_y, speed_z], 'name':name, 'filedata':filedata, 'filename':filename, 'iscoin':iscoin,'vertexdata':vertex_buffer_data,'colordata':color_buffer_data};
   models[name] = mymodel;
  }
  else{
    vertex_buffer_data=models[name].vertexdata;
    color_buffer_data=models[name].colordata;
   /* for(var j=0;j<vertex_buffer_data.length;j++){
     
      if(j%3==0)
        vertex_buffer_data[j]+=x_pos;
      else if(j%3==1)
        vertex_buffer_data[j]+=y_pos;
      else
        vertex_buffer_data[j]+=z_pos;
    }*/

  }
   gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  var vertexColor = gl.getAttribLocation(program, "a_color");
  var colorbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_buffer_data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(vertexColor);
  gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
  
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_buffer_data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  var u_matrix = gl.getUniformLocation(program, "u_matrix");
  if(models[name].name=='fish'){
    gl.uniformMatrix4fv(u_matrix, false, getCamera(false));
var p_matrix = gl.getUniformLocation(program, "p_matrix");
    gl.uniformMatrix4fv(p_matrix, false, makeTranslation(zposx*Math.sin(Math.PI/180),0,zposz*Math.cos(Math.PI/180)));

  }
  else{
    gl.uniformMatrix4fv(u_matrix, false, getCamera(false));
var p_matrix = gl.getUniformLocation(program, "p_matrix");
    gl.uniformMatrix4fv(p_matrix, false, makeTranslation(0,0,0));

  }


    
   // console.log(vertex_buffer_data.length);
   //gl.drawElements(gl.TRIANGLES, vertex_buffer_data.length/3, gl.UNSIGNED_SHORT, 0);
   gl.drawArrays(gl.TRIANGLES, 0, vertex_buffer_data.length/3);
  
}

 function drawScene(){
  //console.log(models);

//zpos++;
for(var key in models){
  var model = models[key];
  // console.log(model);
 /* if(model['name']=='fish')
     cammat=makeTranslation(0,0,zpos);
  */createModel(model['name'], model['center'][0], model['center'][1], model['center'][2], model['scale'][0],  model['scale'][1],  model['scale'][2], model['speed'][0], model['speed'][1], model['speed'][2], model['filedata'], model['filename'], model['iscoin']);

}
}
function handleKeyDown(event) {
        //currentlyPressedKeys[event.keyCode] = true;
        //alert('hi');
        if (event.keyCode == 38 && camtype==2) {
          //alert('hi');
          for(var key in models){
            var model = models[key];
            if(model['name']=='fish'){
              zposx+=0.1;
              zposz+=0.1;

              cpos+=0.1;
            }
          }
        }
         if (event.keyCode == 38 && camtype==1) {
          //alert('hi');
          for(var key in models){
            var model = models[key];
            if(model['name']=='fish'){
              zposx+=0.1;
              zposz+=0.1;

              cpos+=0.1;
            }
          }
        }
         if (event.keyCode == 38 && camtype==0) {
              cpos+=0.1;
        }

        if(event.keyCode == 70){
          camtype=0;
        }
        if(event.keyCode == 69){
          camtype=1;
        }
        if(event.keyCode == 72){
          camtype=2;
        }
        if(event.keyCode == 65) {
          //camtype=2;
          ang+=1;
        }
        if(event.keyCode == 68){
          //camtype=2;
          ang-=1;
        }
      }


      function handlemouse(event) {
        //currentlyPressedKeys[event.keyCode] = true;
        //alert('hi');

        x=event.clientX;
        y=event.clientY;
       // console.log(x);
        //console.log(y);

      }

      function makeScale(sx, sy, sz) {
        return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
        ];
      }
      function makeTranslation(tx, ty, tz) {
        return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1
        ];
      }
      function makePerspective(fieldOfViewInRadians, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        var rangeInv = 1.0 / (near - far);

        return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
        ];
      };

      function matrixMultiply(mat1, mat2){
        return [
        mat1[0]*mat2[0]+mat1[1]*mat2[4]+mat1[2]*mat2[8]+mat1[3]*mat2[12],
        mat1[0]*mat2[1]+mat1[1]*mat2[5]+mat1[2]*mat2[9]+mat1[3]*mat2[13],
        mat1[0]*mat2[2]+mat1[1]*mat2[6]+mat1[2]*mat2[10]+mat1[3]*mat2[14],
        mat1[0]*mat2[3]+mat1[1]*mat2[7]+mat1[2]*mat2[11]+mat1[3]*mat2[15],
        mat1[4]*mat2[0]+mat1[5]*mat2[4]+mat1[6]*mat2[8]+mat1[7]*mat2[12],
        mat1[4]*mat2[1]+mat1[5]*mat2[5]+mat1[6]*mat2[9]+mat1[7]*mat2[13],
        mat1[4]*mat2[2]+mat1[5]*mat2[6]+mat1[6]*mat2[10]+mat1[7]*mat2[14],
        mat1[4]*mat2[3]+mat1[5]*mat2[7]+mat1[6]*mat2[11]+mat1[7]*mat2[15],
        mat1[8]*mat2[0]+mat1[9]*mat2[4]+mat1[10]*mat2[8]+mat1[11]*mat2[12],
        mat1[8]*mat2[1]+mat1[9]*mat2[5]+mat1[10]*mat2[9]+mat1[11]*mat2[13],
        mat1[8]*mat2[2]+mat1[9]*mat2[6]+mat1[10]*mat2[10]+mat1[11]*mat2[14],
        mat1[8]*mat2[3]+mat1[9]*mat2[7]+mat1[10]*mat2[11]+mat1[11]*mat2[15],
        mat1[12]*mat2[0]+mat1[13]*mat2[4]+mat1[14]*mat2[8]+mat1[15]*mat2[12],
        mat1[12]*mat2[1]+mat1[13]*mat2[5]+mat1[14]*mat2[9]+mat1[15]*mat2[13],
        mat1[12]*mat2[2]+mat1[13]*mat2[6]+mat1[14]*mat2[10]+mat1[15]*mat2[14],
        mat1[12]*mat2[3]+mat1[13]*mat2[7]+mat1[14]*mat2[11]+mat1[15]*mat2[15]
        ];
      }

      function getCamera(isdottedline){
 /* var cameraMatrix = makeScale(1, 1, 1);
  cameraMatrix = matrixMultiply(cameraMatrix, makeScale(0.1, 0.1, 0.1));
   cameraMatrix = matrixMultiply(cameraMatrix, makeXRotation(-90 * (Math.PI/180)));
cameraMatrix = matrixMultiply(cameraMatrix, makeYRotation(0 * (Math.PI/180)));
 cameraMatrix = matrixMultiply(cameraMatrix, makeZRotation(0 * (Math.PI/180)));
 cameraMatrix = matrixMultiply(cameraMatrix, makeTranslation(0,0,0));
 */
 var aspect = gl.canvas.width / gl.canvas.height;
 var zNear = 0.1;
 var zFar = 2300;
 var fieldOfViewRadians=1.5;
 var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    // Compute the position of the first F
    var radius=0;
    var fPosition = [1000 * Math.sin(ang*Math.PI/180), 0, 1000*Math.cos(ang*Math.PI/180)];
    // Use matrix math to compute a position on a circle where
    // the camera is
    var cameraAngleRadians=0;
    var cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);
    // Get the camera's postion from the matrix we computed
     cameraPosition = [
    1.3+cpos*Math.sin(ang*Math.PI/180),0,2+cpos*Math.cos(ang*Math.PI/180)
    ];
   // console.log(cameraPosition);
   var up = [0, 1, 0];
    // Compute the camera's matrix using look at.
    var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
    // Make a view matrix from the camera matrix
    var viewMatrix = m4.inverse(cameraMatrix);
    // Compute a view projection matrix
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
     //viewProjectionMatrix = m4.multiply(viewProjectionMatrix, cammat);


    return viewProjectionMatrix;
  }
  function makeXRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
    ];
  };

  function makeYRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
    ];
  };

  function makeZRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    ];
  }
  function normalize(v) {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  // make sure we don't divide by 0.
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
}

function subtractVectors(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]];
}

var m4 = {
  lookAt: function(cameraPosition, target, up) {
    var zAxis = normalize(
      subtractVectors(cameraPosition, target));
    var xAxis = cross(up, zAxis);
    var yAxis = cross(zAxis, xAxis);
    return [
    xAxis[0], xAxis[1], xAxis[2], 0,
    yAxis[0], yAxis[1], yAxis[2], 0,
    zAxis[0], zAxis[1], zAxis[2], 0,
    cameraPosition[0],
    cameraPosition[1],
    cameraPosition[2],
    1,
    ];
  },
  perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);
    return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
    ];
  },
  projection: function(width, height, depth) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
    ];
  },
  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },
  translation: function(tx, ty, tz) {
    return [
    1,  0,  0,  0,
    0,  1,  0,  0,
    0,  0,  1,  0,
    tx, ty, tz, 1,
    ];
  },
  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
    ];
  },
  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
    ];
  },
  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    ];
  },
  scaling: function(sx, sy, sz) {
    return [
    sx, 0,  0,  0,
    0, sy,  0,  0,
    0,  0, sz,  0,
    0,  0,  0,  1,
    ];
  },
  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },
  xRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },
  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },
  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },
  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
  inverse: function(m) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;
    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
    (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
    (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
    (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
    (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
      (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
      (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
      (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
      (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
      (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
      (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
      (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
      (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
      (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
      (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
      (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
      (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
    ];
  },
  vectorMultiply: function(v, m) {
    var dst = [];
    for (var i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (var j = 0; j < 4; ++j)
        dst[i] += v[j] * m[j * 4 + i];
    }
    return dst;
  },
};
