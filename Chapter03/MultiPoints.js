// 顶点着色器程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

// 片元着色器程序
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function initVertexBuffers(gl) {
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return -1;
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");

  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
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

  // 设置顶点位置
  const n = initVertexBuffers(gl);
  if (n < 0) {
    return;
  }

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三个点
  gl.drawArrays(gl.POINTS, 0, n);
}

main();
