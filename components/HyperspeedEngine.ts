import * as THREE from "three";
import {
    BloomEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
    SMAAEffect,
    SMAAPreset,
} from "postprocessing";

/* ── helpers ────────────────────────────────────────────── */
export const random = (base: number | [number, number]): number => {
    if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
    return Math.random() * base;
};

export const pickRandom = <T>(arr: T | T[]): T => {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
};

export const lerp = (current: number, target: number, speed = 0.1, limit = 0.001): number => {
    const change = (target - current) * speed;
    return Math.abs(change) < limit ? target - current : change;
};

const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

/* ── distortion map ─────────────────────────────────────── */
export function buildDistortions() {
    const mountainUniforms = {
        uFreq: { value: new THREE.Vector3(3, 6, 10) },
        uAmp: { value: new THREE.Vector3(30, 30, 20) },
    };
    const xyUniforms = {
        uFreq: { value: new THREE.Vector2(5, 2) },
        uAmp: { value: new THREE.Vector2(25, 15) },
    };
    const LongRaceUniforms = {
        uFreq: { value: new THREE.Vector2(2, 3) },
        uAmp: { value: new THREE.Vector2(35, 10) },
    };
    const turbulentUniforms = {
        uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
        uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
    };
    const deepUniforms = {
        uFreq: { value: new THREE.Vector2(4, 8) },
        uAmp: { value: new THREE.Vector2(10, 20) },
        uPowY: { value: new THREE.Vector2(20, 2) },
    };

    return {
        mountainDistortion: {
            uniforms: mountainUniforms,
            getDistortion: `
        uniform vec3 uAmp; uniform vec3 uFreq;
        #define PI 3.14159265358979
        float nsin(float val){ return sin(val)*0.5+0.5; }
        vec3 getDistortion(float progress){
          float f=0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(f*PI*uFreq.x+uTime)*uAmp.x,
            nsin(progress*PI*uFreq.y+uTime)*uAmp.y - nsin(f*PI*uFreq.y+uTime)*uAmp.y,
            nsin(progress*PI*uFreq.z+uTime)*uAmp.z - nsin(f*PI*uFreq.z+uTime)*uAmp.z
          );
        }`,
            getJS: (progress: number, time: number) => {
                const f = 0.02, u = mountainUniforms;
                return new THREE.Vector3(
                    Math.cos(progress * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x - Math.cos(f * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x,
                    nsin(progress * Math.PI * u.uFreq.value.y + time) * u.uAmp.value.y - nsin(f * Math.PI * u.uFreq.value.y + time) * u.uAmp.value.y,
                    nsin(progress * Math.PI * u.uFreq.value.z + time) * u.uAmp.value.z - nsin(f * Math.PI * u.uFreq.value.z + time) * u.uAmp.value.z
                ).multiply(new THREE.Vector3(2, 2, 2)).add(new THREE.Vector3(0, 0, -5));
            },
        },
        xyDistortion: {
            uniforms: xyUniforms,
            getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float f=0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(f*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+PI/2.+uTime)*uAmp.y - sin(f*PI*uFreq.y+PI/2.+uTime)*uAmp.y,
            0.
          );
        }`,
            getJS: (progress: number, time: number) => {
                const f = 0.02, u = xyUniforms;
                return new THREE.Vector3(
                    Math.cos(progress * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x - Math.cos(f * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x,
                    Math.sin(progress * Math.PI * u.uFreq.value.y + time + Math.PI / 2) * u.uAmp.value.y - Math.sin(f * Math.PI * u.uFreq.value.y + time + Math.PI / 2) * u.uAmp.value.y,
                    0
                ).multiply(new THREE.Vector3(2, 0.4, 1)).add(new THREE.Vector3(0, 0, -3));
            },
        },
        LongRaceDistortion: {
            uniforms: LongRaceUniforms,
            getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float f=0.0125;
          return vec3(
            sin(progress*PI*uFreq.x+uTime)*uAmp.x - sin(f*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+uTime)*uAmp.y - sin(f*PI*uFreq.y+uTime)*uAmp.y,
            0.
          );
        }`,
            getJS: (progress: number, time: number) => {
                const f = 0.0125, u = LongRaceUniforms;
                return new THREE.Vector3(
                    Math.sin(progress * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x - Math.sin(f * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x,
                    Math.sin(progress * Math.PI * u.uFreq.value.y + time) * u.uAmp.value.y - Math.sin(f * Math.PI * u.uFreq.value.y + time) * u.uAmp.value.y,
                    0
                ).multiply(new THREE.Vector3(1, 1, 0)).add(new THREE.Vector3(0, 0, -5));
            },
        },
        turbulentDistortion: {
            uniforms: turbulentUniforms,
            getDistortion: `
        uniform vec4 uFreq; uniform vec4 uAmp;
        float nsin(float v){ return sin(v)*0.5+0.5; }
        #define PI 3.14159265358979
        float getDistX(float p){ return cos(PI*p*uFreq.r+uTime)*uAmp.r + pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g; }
        float getDistY(float p){ return -nsin(PI*p*uFreq.b+uTime)*uAmp.b + -pow(nsin(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a; }
        vec3 getDistortion(float progress){
          return vec3(getDistX(progress)-getDistX(0.0125), getDistY(progress)-getDistY(0.0125), 0.);
        }`,
            getJS: (progress: number, time: number) => {
                const u = turbulentUniforms;
                const getX = (p: number) =>
                    Math.cos(Math.PI * p * u.uFreq.value.x + time) * u.uAmp.value.x +
                    Math.pow(Math.cos(Math.PI * p * u.uFreq.value.y + time * (u.uFreq.value.y / u.uFreq.value.x)), 2) * u.uAmp.value.y;
                const getY = (p: number) =>
                    -nsin(Math.PI * p * u.uFreq.value.z + time) * u.uAmp.value.z -
                    Math.pow(nsin(Math.PI * p * u.uFreq.value.w + time / (u.uFreq.value.z / u.uFreq.value.w)), 5) * u.uAmp.value.w;
                return new THREE.Vector3(
                    getX(progress) - getX(progress + 0.007),
                    getY(progress) - getY(progress + 0.007),
                    0
                ).multiply(new THREE.Vector3(-2, -5, 0)).add(new THREE.Vector3(0, 0, -10));
            },
        },
        deepDistortion: {
            uniforms: deepUniforms,
            getDistortion: `
        uniform vec2 uFreq; uniform vec2 uAmp; uniform vec2 uPowY;
        float nsin(float v){ return sin(v)*0.5+0.5; }
        #define PI 3.14159265358979
        float getDX(float p){ return sin(p*PI*uFreq.x+uTime)*uAmp.x; }
        float getDY(float p){ return pow(abs(p*uPowY.x),uPowY.y)+sin(p*PI*uFreq.y+uTime)*uAmp.y; }
        vec3 getDistortion(float progress){
          return vec3(getDX(progress)-getDX(0.02), getDY(progress)-getDY(0.02), 0.);
        }`,
            getJS: (progress: number, time: number) => {
                const u = deepUniforms;
                const getX = (p: number) => Math.sin(p * Math.PI * u.uFreq.value.x + time) * u.uAmp.value.x;
                const getY = (p: number) => Math.pow(p * u.uPowY.value.x, u.uPowY.value.y) + Math.sin(p * Math.PI * u.uFreq.value.y + time) * u.uAmp.value.y;
                return new THREE.Vector3(
                    getX(progress) - getX(progress + 0.01),
                    getY(progress) - getY(progress + 0.01),
                    0
                ).multiply(new THREE.Vector3(-2, -4, 0)).add(new THREE.Vector3(0, 0, -10));
            },
        },
    };
}

export type DistortionMap = ReturnType<typeof buildDistortions>;
export type DistortionKey = keyof DistortionMap;

/* ── GLSL shaders ───────────────────────────────────────── */
// NOTE: This file is .ts (not .tsx) so angle brackets in GLSL strings are safe.
const INC = "#include <getDistortion_vertex>";

export const carLightsFragment = [
    "#define USE_FOG;",
    THREE.ShaderChunk["fog_pars_fragment"],
    "varying vec3 vColor; varying vec2 vUv; uniform vec2 uFade;",
    "void main() {",
    "  vec3 color = vec3(vColor);",
    "  float alpha = smoothstep(uFade.x, uFade.y, vUv.x);",
    "  gl_FragColor = vec4(color, alpha);",
    "  if (gl_FragColor.a < 0.0001) discard;",
    THREE.ShaderChunk["fog_fragment"],
    "}",
].join("\n");

export const carLightsVertex = [
    "#define USE_FOG;",
    THREE.ShaderChunk["fog_pars_vertex"],
    "attribute vec3 aOffset; attribute vec3 aMetrics; attribute vec3 aColor;",
    "uniform float uTravelLength; uniform float uTime;",
    "varying vec2 vUv; varying vec3 vColor;",
    INC,
    "void main() {",
    "  vec3 t = position.xyz;",
    "  float radius = aMetrics.r, myLength = aMetrics.g, speed = aMetrics.b;",
    "  t.xy *= radius; t.z *= myLength;",
    "  t.z += myLength - mod(uTime*speed + aOffset.z, uTravelLength);",
    "  t.xy += aOffset.xy;",
    "  float progress = abs(t.z / uTravelLength);",
    "  t.xyz += getDistortion(progress);",
    "  vec4 mvPosition = modelViewMatrix * vec4(t, 1.);",
    "  gl_Position = projectionMatrix * mvPosition;",
    "  vUv = uv; vColor = aColor;",
    THREE.ShaderChunk["fog_vertex"],
    "}",
].join("\n");

export const sideSticksVertex = [
    "#define USE_FOG;",
    THREE.ShaderChunk["fog_pars_vertex"],
    "attribute float aOffset; attribute vec3 aColor; attribute vec2 aMetrics;",
    "uniform float uTravelLength; uniform float uTime; varying vec3 vColor;",
    "mat4 rotY(in float a){ return mat4(cos(a),0,sin(a),0, 0,1,0,0, -sin(a),0,cos(a),0, 0,0,0,1); }",
    INC,
    "void main(){",
    "  vec3 t = position.xyz;",
    "  float w=aMetrics.x, h=aMetrics.y;",
    "  t.xy *= vec2(w,h);",
    "  float time = mod(uTime*60.*2.+aOffset, uTravelLength);",
    "  t = (rotY(3.14/2.) * vec4(t,1.)).xyz;",
    "  t.z += -uTravelLength + time;",
    "  float progress = abs(t.z / uTravelLength);",
    "  t.xyz += getDistortion(progress);",
    "  t.y += h/2.; t.x += -w/2.;",
    "  vec4 mvPosition = modelViewMatrix * vec4(t, 1.);",
    "  gl_Position = projectionMatrix * mvPosition;",
    "  vColor = aColor;",
    THREE.ShaderChunk["fog_vertex"],
    "}",
].join("\n");

export const sideSticksFragment = [
    "#define USE_FOG;",
    THREE.ShaderChunk["fog_pars_fragment"],
    "varying vec3 vColor;",
    "void main(){ gl_FragColor = vec4(vColor, 1.);",
    THREE.ShaderChunk["fog_fragment"],
    "}",
].join("\n");

export const roadVertex = [
    "#define USE_FOG;",
    "uniform float uTime;",
    THREE.ShaderChunk["fog_pars_vertex"],
    "uniform float uTravelLength; varying vec2 vUv;",
    INC,
    "void main() {",
    "  vec3 t = position.xyz;",
    "  vec3 d = getDistortion((t.y + uTravelLength/2.) / uTravelLength);",
    "  t.x += d.x; t.z += d.y; t.y += -d.z;",
    "  vec4 mvPosition = modelViewMatrix * vec4(t, 1.);",
    "  gl_Position = projectionMatrix * mvPosition;",
    "  vUv = uv;",
    THREE.ShaderChunk["fog_vertex"],
    "}",
].join("\n");

const roadMarkings_vars = [
    "uniform float uLanes; uniform vec3 uBrokenLinesColor;",
    "uniform vec3 uShoulderLinesColor; uniform float uShoulderLinesWidthPercentage;",
    "uniform float uBrokenLinesWidthPercentage; uniform float uBrokenLinesLengthPercentage;",
].join("\n");

const roadMarkings_fragment = [
    "uv.y = mod(uv.y + uTime * 0.05, 1.);",
    "float laneWidth = 1.0 / uLanes;",
    "float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;",
    "float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;",
    "float brokenLines = step(1.0-brokenLineWidth, fract(uv.x*2.0)) * step(laneEmptySpace, fract(uv.y*10.0));",
    "float sideLines = step(1.0-brokenLineWidth, fract((uv.x - laneWidth*(uLanes-1.0))*2.0)) + step(brokenLineWidth, uv.x);",
    "brokenLines = mix(brokenLines, sideLines, uv.x);",
].join("\n");

const roadBaseFragment = [
    "#define USE_FOG;",
    "varying vec2 vUv; uniform vec3 uColor; uniform float uTime;",
    "ROAD_MARKINGS_VARS",
    THREE.ShaderChunk["fog_pars_fragment"],
    "void main() { vec2 uv = vUv; vec3 color = vec3(uColor);",
    "ROAD_MARKINGS_FRAGMENT",
    "gl_FragColor = vec4(color, 1.);",
    THREE.ShaderChunk["fog_fragment"],
    "}",
].join("\n");

export const islandFragment = roadBaseFragment.replace("ROAD_MARKINGS_VARS", "").replace("ROAD_MARKINGS_FRAGMENT", "");
export const roadFragment = roadBaseFragment.replace("ROAD_MARKINGS_VARS", roadMarkings_vars).replace("ROAD_MARKINGS_FRAGMENT", roadMarkings_fragment);

/* ── CarLights ──────────────────────────────────────────── */
export class CarLights {
    webgl: HyperspeedApp; options: any; colors: any; speed: any; fade: THREE.Vector2; mesh!: THREE.Mesh;
    constructor(webgl: HyperspeedApp, options: any, colors: any, speed: any, fade: THREE.Vector2) {
        this.webgl = webgl; this.options = options; this.colors = colors; this.speed = speed; this.fade = fade;
    }
    init() {
        const o = this.options;
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = o.lightPairsPerRoadWay * 2;
        const laneWidth = o.roadWidth / o.lanesPerRoad;
        const aOffset: number[] = [], aMetrics: number[] = [], aColor: number[] = [];
        let colors = this.colors;
        colors = Array.isArray(colors) ? colors.map((c: number) => new THREE.Color(c)) : new THREE.Color(colors);
        for (let i = 0; i < o.lightPairsPerRoadWay; i++) {
            const radius = random(o.carLightsRadius), length = random(o.carLightsLength), speed = random(this.speed);
            let laneX = (i % o.lanesPerRoad) * laneWidth - o.roadWidth / 2 + laneWidth / 2;
            laneX += random(o.carShiftX) * laneWidth;
            const offsetY = random(o.carFloorSeparation) + radius * 1.3;
            const offsetZ = -random(o.length);
            const carWidth = random(o.carWidthPercentage) * laneWidth;
            aOffset.push(laneX - carWidth / 2, offsetY, offsetZ, laneX + carWidth / 2, offsetY, offsetZ);
            aMetrics.push(radius, length, speed, radius, length, speed);
            const color = pickRandom<THREE.Color>(colors);
            aColor.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }
        instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
        instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
        instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
        const material = new THREE.ShaderMaterial({
            fragmentShader: carLightsFragment, vertexShader: carLightsVertex, transparent: true,
            uniforms: Object.assign({ uTime: { value: 0 }, uTravelLength: { value: o.length }, uFade: { value: this.fade } }, this.webgl.fogUniforms, o.distortion.uniforms),
        });
        material.onBeforeCompile = (s) => { s.vertexShader = s.vertexShader.replace(INC, o.distortion.getDistortion); };
        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
    }
    update(time: number) { (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time; }
}

/* ── LightsSticks ───────────────────────────────────────── */
export class LightsSticks {
    webgl: HyperspeedApp; options: any; mesh!: THREE.Mesh;
    constructor(webgl: HyperspeedApp, options: any) { this.webgl = webgl; this.options = options; }
    init() {
        const o = this.options;
        const geometry = new THREE.PlaneGeometry(1, 1);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        const total = o.totalSideLightSticks;
        instanced.instanceCount = total;
        const stickoffset = o.length / (total - 1);
        const aOffset: number[] = [], aColor: number[] = [], aMetrics: number[] = [];
        let colors = o.colors.sticks;
        colors = Array.isArray(colors) ? colors.map((c: number) => new THREE.Color(c)) : new THREE.Color(colors);
        for (let i = 0; i < total; i++) {
            aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
            const color = pickRandom<THREE.Color>(colors);
            aColor.push(color.r, color.g, color.b);
            aMetrics.push(random(o.lightStickWidth), random(o.lightStickHeight));
        }
        instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
        instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
        instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));
        const material = new THREE.ShaderMaterial({
            fragmentShader: sideSticksFragment, vertexShader: sideSticksVertex, side: THREE.DoubleSide,
            uniforms: Object.assign({ uTravelLength: { value: o.length }, uTime: { value: 0 } }, this.webgl.fogUniforms, o.distortion.uniforms),
        });
        material.onBeforeCompile = (s) => { s.vertexShader = s.vertexShader.replace(INC, o.distortion.getDistortion); };
        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
    }
    update(time: number) { (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time; }
}

/* ── Road ───────────────────────────────────────────────── */
export class Road {
    webgl: HyperspeedApp; options: any; uTime: { value: number };
    constructor(webgl: HyperspeedApp, options: any) { this.webgl = webgl; this.options = options; this.uTime = { value: 0 }; }
    createPlane(side: number, _w: number, isRoad: boolean) {
        const o = this.options;
        const geometry = new THREE.PlaneGeometry(isRoad ? o.roadWidth : o.islandWidth, o.length, 20, 100);
        let uniforms: any = { uTravelLength: { value: o.length }, uColor: { value: new THREE.Color(isRoad ? o.colors.roadColor : o.colors.islandColor) }, uTime: this.uTime };
        if (isRoad) {
            uniforms = Object.assign(uniforms, {
                uLanes: { value: o.lanesPerRoad }, uBrokenLinesColor: { value: new THREE.Color(o.colors.brokenLines) },
                uShoulderLinesColor: { value: new THREE.Color(o.colors.shoulderLines) },
                uShoulderLinesWidthPercentage: { value: o.shoulderLinesWidthPercentage },
                uBrokenLinesLengthPercentage: { value: o.brokenLinesLengthPercentage },
                uBrokenLinesWidthPercentage: { value: o.brokenLinesWidthPercentage },
            });
        }
        const material = new THREE.ShaderMaterial({
            fragmentShader: isRoad ? roadFragment : islandFragment, vertexShader: roadVertex,
            side: THREE.DoubleSide, uniforms: Object.assign(uniforms, this.webgl.fogUniforms, o.distortion.uniforms),
        });
        material.onBeforeCompile = (s) => { s.vertexShader = s.vertexShader.replace(INC, o.distortion.getDistortion); };
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -o.length / 2;
        mesh.position.x += (o.islandWidth / 2 + o.roadWidth / 2) * side;
        this.webgl.scene.add(mesh);
        return mesh;
    }
    init() {
        this.createPlane(-1, this.options.roadWidth, true);
        this.createPlane(1, this.options.roadWidth, true);
        this.createPlane(0, this.options.islandWidth, false);
    }
    update(time: number) { this.uTime.value = time; }
}

/* ── HyperspeedApp ──────────────────────────────────────── */
export interface HyperspeedOptions {
    onSpeedUp?: (e: Event) => void;
    onSlowDown?: (e: Event) => void;
    distortion?: string;
    length?: number;
    roadWidth?: number;
    islandWidth?: number;
    lanesPerRoad?: number;
    fov?: number;
    fovSpeedUp?: number;
    speedUp?: number;
    carLightsFade?: number;
    totalSideLightSticks?: number;
    lightPairsPerRoadWay?: number;
    shoulderLinesWidthPercentage?: number;
    brokenLinesWidthPercentage?: number;
    brokenLinesLengthPercentage?: number;
    lightStickWidth?: [number, number];
    lightStickHeight?: [number, number];
    movingAwaySpeed?: [number, number];
    movingCloserSpeed?: [number, number];
    carLightsLength?: [number, number];
    carLightsRadius?: [number, number];
    carWidthPercentage?: [number, number];
    carShiftX?: [number, number];
    carFloorSeparation?: [number, number];
    colors?: {
        roadColor?: number; islandColor?: number; background?: number;
        shoulderLines?: number; brokenLines?: number;
        leftCars?: number[]; rightCars?: number[]; sticks?: number | number[];
    };
}

export const DEFAULT_OPTIONS: Required<HyperspeedOptions> = {
    onSpeedUp: () => { }, onSlowDown: () => { },
    distortion: "turbulentDistortion",
    length: 400, roadWidth: 10, islandWidth: 2, lanesPerRoad: 3,
    fov: 90, fovSpeedUp: 150, speedUp: 2, carLightsFade: 0.4,
    totalSideLightSticks: 20, lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05, brokenLinesWidthPercentage: 0.1, brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5], lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80], movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2], carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5], carShiftX: [-0.8, 0.8], carFloorSeparation: [0, 5],
    colors: {
        roadColor: 0x080808, islandColor: 0x0a0a0a, background: 0x000000,
        shoulderLines: 0x131318, brokenLines: 0x131318,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3,
    },
};

export class HyperspeedApp {
    options: any; container: HTMLElement;
    renderer: THREE.WebGLRenderer; composer: EffectComposer; camera: THREE.PerspectiveCamera;
    scene: THREE.Scene; fogUniforms: any; clock: THREE.Clock; assets: any; disposed: boolean;
    road: Road; leftCarLights: CarLights; rightCarLights: CarLights; leftSticks: LightsSticks;
    fovTarget: number; speedUpTarget: number; speedUp: number; timeOffset: number;

    constructor(container: HTMLElement, options: any) {
        this.options = options;
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.composer = new EffectComposer(this.renderer as any);
        container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.set(0, 8, -5);

        this.scene = new THREE.Scene();
        this.scene.background = null;
        const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } };
        this.clock = new THREE.Clock(); this.assets = {}; this.disposed = false;

        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.leftSticks = new LightsSticks(this, options);

        this.fovTarget = options.fov; this.speedUpTarget = 0; this.speedUp = 0; this.timeOffset = 0;
        this.tick = this.tick.bind(this); this.init = this.init.bind(this); this.setSize = this.setSize.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this); this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this); this.onTouchEnd = this.onTouchEnd.bind(this);
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    onWindowResize() {
        const w = this.container.offsetWidth, h = this.container.offsetHeight;
        this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.composer.setSize(w, h);
    }

    initPasses() {
        const rp = new RenderPass(this.scene, this.camera);
        const bp = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: 1 } as any));
        const sp = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM } as any));
        (rp as any).renderToScreen = false; (bp as any).renderToScreen = false; (sp as any).renderToScreen = true;
        this.composer.addPass(rp); this.composer.addPass(bp); this.composer.addPass(sp);
    }

    init() {
        this.initPasses();
        const o = this.options;
        this.road.init();
        this.leftCarLights.init(); this.leftCarLights.mesh.position.setX(-o.roadWidth / 2 - o.islandWidth / 2);
        this.rightCarLights.init(); this.rightCarLights.mesh.position.setX(o.roadWidth / 2 + o.islandWidth / 2);
        this.leftSticks.init(); this.leftSticks.mesh.position.setX(-(o.roadWidth + o.islandWidth / 2));

        this.container.addEventListener("mousedown", this.onMouseDown);
        this.container.addEventListener("mouseup", this.onMouseUp);
        this.container.addEventListener("mouseout", this.onMouseUp);
        this.container.addEventListener("touchstart", this.onTouchStart, { passive: true });
        this.container.addEventListener("touchend", this.onTouchEnd, { passive: true });
        this.tick();
    }

    onMouseDown(e: Event) { this.options.onSpeedUp?.(e); this.fovTarget = this.options.fovSpeedUp; this.speedUpTarget = this.options.speedUp; }
    onMouseUp(e: Event) { this.options.onSlowDown?.(e); this.fovTarget = this.options.fov; this.speedUpTarget = 0; }
    onTouchStart(e: Event) { this.options.onSpeedUp?.(e); this.fovTarget = this.options.fovSpeedUp; this.speedUpTarget = this.options.speedUp; }
    onTouchEnd(e: Event) { this.options.onSlowDown?.(e); this.fovTarget = this.options.fov; this.speedUpTarget = 0; }

    update(delta: number) {
        const lp = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lp, 0.00001);
        this.timeOffset += this.speedUp * delta;
        const time = this.clock.elapsedTime + this.timeOffset;
        this.rightCarLights.update(time); this.leftCarLights.update(time);
        this.leftSticks.update(time); this.road.update(time);
        const fc = lerp(this.camera.fov, this.fovTarget, lp);
        if (fc !== 0) this.camera.fov += fc * delta * 6;
        if (this.options.distortion?.getJS) {
            const d = this.options.distortion.getJS(0.025, time);
            this.camera.lookAt(new THREE.Vector3(this.camera.position.x + d.x, this.camera.position.y + d.y, this.camera.position.z + d.z));
        }
        this.camera.updateProjectionMatrix();
    }

    render(delta: number) { this.composer.render(delta); }

    dispose() {
        this.disposed = true;
        this.renderer.dispose(); this.composer.dispose(); this.scene.clear();
        window.removeEventListener("resize", this.onWindowResize.bind(this));
        this.container.removeEventListener("mousedown", this.onMouseDown);
        this.container.removeEventListener("mouseup", this.onMouseUp);
        this.container.removeEventListener("mouseout", this.onMouseUp);
        this.container.removeEventListener("touchstart", this.onTouchStart);
        this.container.removeEventListener("touchend", this.onTouchEnd);
    }

    setSize(w: number, h: number, updateStyles: boolean) { this.composer.setSize(w, h, updateStyles); }

    tick() {
        if (this.disposed) return;
        const canvas = this.renderer.domElement;
        if (canvas.clientWidth !== canvas.width || canvas.clientHeight !== canvas.height) {
            this.composer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        const delta = this.clock.getDelta();
        this.render(delta); this.update(delta);
        requestAnimationFrame(this.tick.bind(this));
    }
}
