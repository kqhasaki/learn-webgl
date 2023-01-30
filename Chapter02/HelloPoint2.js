// 顶点着色器程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

// 片元着色器程序
const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

function getColor(x, y) {
  if (x >= 0 && y >= 0) {
    return [1.0, 0.0, 0.0, 1.0];
  }
  if (x < 0 && y < 0) {
    return [0.0, 1.0, 0.0, 1.0];
  }
  return [1.0, 1.0, 1.0, 1.0];
}

const g_points = [];
function click(ev, gl, canvas, a_Position, u_FragColor) {
  let x = ev.clientX;
  let y = ev.clientY;
  const rect = ev.target.getBoundingClientRect();
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  g_points.push({
    x,
    y,
    color: getColor(x, y),
  });

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (const point of g_points) {
    gl.vertexAttrib3f(a_Position, point.x, point.y, 0.0);
    gl.uniform4f(u_FragColor, ...point.color);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

function main() {
  const canvas = document.getElementById("webgl");

  // 获取WebGL绘图上下文
  const gl = getWebGLContext(canvas);
  if (!gl) {
    return;
  }

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    return;
  }

  // 获取attribute变量的存储位置
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    return;
  }
  // // 将顶点位置传输给attribute变量
  // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  gl.vertexAttrib1f(a_PointSize, 5.0);

  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  canvas.onmousedown = (ev) => {
    click(ev, gl, canvas, a_Position, u_FragColor);
  };

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // // 绘制一个点
  // gl.drawArrays(gl.POINTS, 0, 1);
}

main();
