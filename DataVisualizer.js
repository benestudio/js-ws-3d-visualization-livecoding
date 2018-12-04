class DataVisualizer {
  constructor({
    baseMapUrl,
    dataMapUrl,
    width,
    height,
    dataDepth,
  }) {
    this.baseMapUrl = baseMapUrl;
    this.dataMapUrl = dataMapUrl;
    this.width = width;
    this.height = height;
    this.dataDepth = dataDepth;
  }

  init() {
    this.scene = new THREE.Scene();

    // camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 50, 50);

    const rendererOptions = {
      antialias: true,
    };
    this.renderer = new THREE.WebGLRenderer(rendererOptions);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.setupLights();

    const material = new THREE.MeshPhongMaterial();

    const cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
    const cube = new THREE.Mesh(cubeGeometry, material);

    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.scene.add(cube);

    this.animate();
  }

  setupLights() {
    const lights = [];

    const light1 = new THREE.PointLight(0xffffff, 0.5, 0);
    const light2 = new THREE.PointLight(0xffffff, 0.5, 0);
    const light3 = new THREE.PointLight(0xffffff, 0.5, 0);

    light1.position.set(0, 200, 0);
    light2.position.set(100, 200, 100);
    light3.position.set(-100, -200, -100);

    lights.push(light1);
    lights.push(light2);
    lights.push(light3);

    for (let i = 0; i < lights.length; i++) {
      this.scene.add(lights[i]);
    }
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}
