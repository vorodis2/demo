


export class Calc3d {
    constructor(par) {
        this.type = "Calc3d";
        
        window.calc3d=this;


     this.getPointBetweenObjects=function(_o1, _o2){   
        const o1 = {
          quaternion: _o1.quaternion, // Поворот первого объекта
          radius: _o1.distansPoint, // Радиус первого объекта
          vector: _o1.v1 // Позиция первого объекта
        };
        const o2 = {
          quaternion: _o2.quaternion, // Поворот второго объекта
          radius: _o2.distansPoint, // Радиус второго объекта
          vector: _o2.v1 // Позиция второго объекта
        };
        return getPointBetweenObjects1(o1, o2)
    }


    let v0=new THREE.Vector3()//не жрет ресурсы, если в нутри писать то оно в памети весит!!!!
    let dd//аналогично
    function getPointBetweenObjects1(o1, o2) {
        v0.copy(o1.vector)
        v0.sub(o2.vector)
        dd=o2.radius/(o1.radius + o2.radius)
        v0.x=v0.x*dd+o2.vector.x
        v0.y=v0.y*dd+o2.vector.y
        v0.z=v0.z*dd+o2.vector.z
        return v0
    }


    this.getLocalPoint = function(v3,quaternion, point) {
            const localPoint = point.clone();
            localPoint.sub(v3);  
            const invertedQuaternion = quaternion.clone().invert();
            localPoint.applyQuaternion(invertedQuaternion);
            return localPoint;
        }



    this.getAveragePlaneNormalQuaternion=function(points){
        return getAveragePlaneQuaternion(points)
    }

/**
 * Вычисляет кватернион, поворачивающий (0,1,0) к нормали усреднённой плоскости по точкам.
 * @param {Array<{x: number, y: number, z: number}>} points 
 * @returns {THREE.Quaternion}
 */
function getAveragePlaneQuaternion(points) {
  const vectors = points.map(p => new THREE.Vector3(p.x, p.y, p.z));
  const center = new THREE.Vector3();
  vectors.forEach(v => center.add(v));
  center.divideScalar(vectors.length);

  // Центрируем точки
  const centered = vectors.map(v => v.clone().sub(center));

  // Ковариационная матрица 3x3
  let xx = 0, xy = 0, xz = 0;
  let yy = 0, yz = 0, zz = 0;

  for (const v of centered) {
    xx += v.x * v.x;
    xy += v.x * v.y;
    xz += v.x * v.z;
    yy += v.y * v.y;
    yz += v.y * v.z;
    zz += v.z * v.z;
  }

  const cov = [
    [xx, xy, xz],
    [xy, yy, yz],
    [xz, yz, zz],
  ];

  // Получаем собственный вектор с минимальной дисперсией
  const normal = smallestEigenVector(cov);
  const normalVec = new THREE.Vector3(...normal).normalize();

  // Поворот от (0,1,0) к normal
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normalVec);

  return quaternion;
}

/**
 * Находит собственный вектор с минимальным собственным значением 3x3 симметричной матрицы.
 * (Метод Якоби — простая реализация)
 * @param {number[][]} m 3x3 симметричная матрица
 * @returns {number[]} собственный вектор (длина 3)
 */
function smallestEigenVector(m) {
  // Начальные ортогональные векторы
  let v0 = [1, 0, 0];
  let v1 = [0, 1, 0];
  let v2 = [0, 0, 1];
  let V = [v0, v1, v2];

  let A = m.map(row => row.slice()); // копия матрицы

  const n = 3;
  const maxIter = 50;
  const eps = 1e-10;

  for (let iter = 0; iter < maxIter; iter++) {
    // Найдём наибольший внедиагональный элемент
    let p = 0, q = 1;
    let max = Math.abs(A[0][1]);
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const abs = Math.abs(A[i][j]);
        if (abs > max) {
          max = abs;
          p = i;
          q = j;
        }
      }
    }

    if (max < eps) break; // всё, достаточно близко

    const theta = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    // Обновляем матрицу A
    const Ap = A.map(row => row.slice());
    for (let i = 0; i < n; i++) {
      const aip = cos * Ap[i][p] - sin * Ap[i][q];
      const aiq = sin * Ap[i][p] + cos * Ap[i][q];
      A[i][p] = A[p][i] = aip;
      A[i][q] = A[q][i] = aiq;
    }

    A[p][p] = cos * cos * Ap[p][p] - 2 * sin * cos * Ap[p][q] + sin * sin * Ap[q][q];
    A[q][q] = sin * sin * Ap[p][p] + 2 * sin * cos * Ap[p][q] + cos * cos * Ap[q][q];
    A[p][q] = A[q][p] = 0;

    // Обновляем собственные векторы
    for (let i = 0; i < n; i++) {
      const vip = cos * V[i][p] - sin * V[i][q];
      const viq = sin * V[i][p] + cos * V[i][q];
      V[i][p] = vip;
      V[i][q] = viq;
    }
  }

  // Найдём индекс минимального собственного значения (диагональ A)
  let minIndex = 0;
  for (let i = 1; i < n; i++) {
    if (A[i][i] < A[minIndex][i]) minIndex = i;
  }

  return V.map(row => row[minIndex]);
}

    }
}