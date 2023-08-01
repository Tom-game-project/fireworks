
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; 
window.addEventListener('DOMContentLoaded', init);

function init() {
    const width = 960;
    const height = 540;
    let canvasElement = document.getElementById('myCanvas')
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // シーンを作成
    const scene = new THREE.Scene();
    // フォグを設定
    // new THREE.Fog(色, 開始距離, 終点距離);
    scene.fog = new THREE.Fog(0x000000, 50, 2000);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    // カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
    camera.position.set(0, 0, 1000);
    // カメラコントローラーを作成
    const controls = new OrbitControls(camera, canvasElement);
    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    
    // 箱を作成
    //const geometry = new THREE.SphereGeometry(30, 30, 30);
    //const material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
    //const box = new THREE.Mesh(geometry, material);
    //scene.add(box);
    // マテリアルを作成する
    const material = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load("sprite.png"),
    });
    material.fog=true;
    const sprite = new THREE.Sprite(material);
    
    // ビルボードを作成
    for (let i = 0; i < 1000; i++) {
        const sprite = new THREE.Sprite(material);
        // ランダムな座標に配置
        sprite.position.x = 500 * (Math.random() - 0.5);
        sprite.position.y = 500 * Math.random() - 0.5;
        sprite.position.z = 500 * (Math.random() - 0.5);
        // 必要に応じてスケールを調整

        scene.add(sprite);
    }

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1); // ライトの方向
    // シーンに追加
    scene.add(light);

    // 地面を作成
    // 地面を作成
    {
        // 床のテクスチャー
        const texture = new THREE.TextureLoader().load("imgs/floor.png");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // リピート可能に
        texture.repeat.set(10, 10); // 10x10マスに設定
        texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.0,
                metalness: 0.6,
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true; // 影の設定
        scene.add(floor);
    }

    const plane = new THREE.AxesHelper(300);
    scene.add(plane);

    // 初回実行
    tick();

    function tick() {
        // カメラコントローラーを更新
        controls.update();
        requestAnimationFrame(tick);

        // 箱を回転させる
        //box.rotation.x += 0.01;
        //box.rotation.y += 0.01;
        //box.rotation.z += 0.01;

        // レンダリング
        renderer.render(scene, camera);
    }
}
