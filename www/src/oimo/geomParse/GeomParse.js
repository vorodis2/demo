import { ConvexGeometry  } from './ConvexGeometry.js';
import { CGVershinS  } from './CGVershinS.js';

export class GeomParse {
    constructor(par, c3d, textPar, fun,pointPlus) {
        this.type = "GeomParse";
        var self = this;
        this.par = par;
        this.c3d = c3d;
        this.textPar = textPar;
        self.fun=fun
        this.debug=false
        this.pointPlus=pointPlus
        if(!pointPlus)this.pointPlus=new THREE.Vector3()
        let aP=textPar.split("|");

        let cgv

        if(this.debug){
            this.cd=new THREE.Object3D();
            this.par.content3d.add(this.cd);
            this.cd.position.x=111;
        }

        
        


        function open(c){
            
            //var  geometry = new THREE.SphereGeometry(51, 22, 22);
            // var  geometry = new THREE.BoxGeometry(55, 55, 55,8,8,8);
            var  geometry=c.geometry

            if(self.debug){
                let m=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({ wireframe: true, color: 0x555555 }))               
                self.cd.add(m)
            }
            let originalPoints=[]
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                originalPoints.push(new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]));
            }
            let kol2=0
            let pro2=0.5
            let pro3=-1
            let pro4=1

            let kol=25
            if(aP[1] && aP[1]!='0'){                
                kol = Math.round(pos.length/(aP[1]*1)) 
                if(aP[2] && aP[2]!='0')  kol2= aP[2]*1  
                if(aP[3] && aP[3]!='0')  pro2= aP[3]*1  
                if(aP[4] && aP[4]!='0')  pro3= aP[4]*1  
                if(aP[4] && aP[4]!='0')  pro4= aP[5]*1               
            }
            trace(">>>>>>>",aP,kol,kol2,pro2,pro3,pro4)


            

            cgv = new CGVershinS(self, geometry)//расхерачиваем вершины!!
            //kol=3
            cgv.parser(kol,kol2,pro2,pro3,pro4)

            self.clusters=cgv.arrayArray;
            if(self.fun)self.fun("creatArray", self.clusters)
            trace(">>>>>>>",self.clusters)

            
            //vvvv(cgv.clusters)
            //cgv.dragPart(96);
/*

            var clusters = splitGeometryIntoConvexParts3333(geometry, 15)
            //trace("ddddd",kol,clusters)
            //vvvv(clusters)

             var clusters = kMeans5(geometry, 96)
             trace("ddddввd",kol,clusters)
             clustersPlus1(clusters,7,91)
             trace("ddddввd",kol,clusters)
            vvvv(clusters)
             kol=55
*/


/*
            var clusters = kMeans5(geometry, 8);            
            trace("ddddввd",kol,clusters)  
            vvvv(clusters)
           let oq={}
            var ss,ob,ss1,sName
            for (var i = 0; i < clusters.length; i++) {
                //var i = 0
                let a=clusters[i]
                for (var j = 0; j < a.length; j++) {
                    ss= cgv.getV3Name(a[j]);
                    ob=cgv.objectP[ss]
                    sName=i+"_"+j
                    if(ob){
                        for (var k = 0; k < ob.aBlok.length; k++) {
                            let ab=ob.aBlok[k];
                            
                            for (var ki = i+1; ki < clusters.length; ki++) {
                                let a1=clusters[ki]
                               // trace(a1)
                                for (var j1 = 0; j1 < a1.length; j1++) {*/
                                /*    ss1= cgv.getV3Name(a1[j1]);
                                    if(ss1==ab.name){
                                        if(oq[sName]==undefined){
                                            oq[sName]={}
                                            oq[sName][sName]=1
                                        }
                                        oq[sName][ki+"_"+j1]=1

                                      
                                    }
                                   /**/ /*
                                }  
                            }
                            
                        }                         
                    }                    
                }
            }





            trace(oq)
             let v3=new THREE.Vector3()
            for (var s in oq) {
                let a=[]
                for (var s1 in oq[s]) {
                    let ss=s1.split("_")
                    a.push(clusters[ss[0]][ss[1]]) 
                }
                v3.set(0,0,0)
                for (var i = 0; i < a.length; i++) {
                    v3.x+=a[i].x
                    v3.y+=a[i].y
                    v3.z+=a[i].z
                }

                v3.set(v3.x/a.length,v3.y/a.length,v3.z/a.length)

                for (var i = 0; i < a.length; i++) {
                    a[i].set(v3.x,v3.y,v3.z)
                    //break
                }
                trace('wawww',v3)
            }

            trace('wwwwwwwwwww',oq)    

            vvvv(clusters)*/


/*
            дальше я хочу





дальше я хочу
метод getIndex(
clusters//результат kMeans2,
geometry
)
возволщаються массив с обьектами 
{
    arra
}





*/            



            /*trace("dddddcgv==",cgv)*/




          //  var clusters = kMeans(originalPoints, kol);
           // trace("ddddd",kol,clusters)
            //vvvv(clusters)


           // var clusters = splitGeometryByEdgeDistance(geometry, 5)
           // vvvv(clusters)
           // trace("ddddd",kol,clusters)
/*
            
            for (var i = 0; i < clusters.length; i++) {
                visiConvexGeometry(clusters[i])
            }

            for (var i = 0; i < clusters.length; i++) {
                setPhisicGeometry(clusters[i])
            }*/

        }
       
        this.ddff = function(){
            var clusters = []
            
            for (var i = 0; i < cgv.aP.length; i++) {                
                clusters[i]=cgv.aP[i].cluster;  
            }

            vvvv(clusters)
        }





        function vvvvClear(){
            for (var i = 0; i < am.length; i++) {
                self.cd.remove(am[i]);                
            }
        }





        function vvvv(clusters){
            vvvvClear()
            for (var i = 0; i < clusters.length; i++) {
                visiConvexGeometry(clusters[i],i)
            }

            for (var i = 0; i < clusters.length; i++) {
                setPhisicGeometry(clusters[i])
            }
        }

       


        function setPhisicGeometry(cg){

            let o={}
            o.tip='convexHull';
            o.a=cg

            let shepe=self.par.getShape(o,undefined,self.par.arrShepes.length)//this.getShape(this.obj.arrShepes[i],undefined,i)

            self.par.arrShepes.push(shepe);
            self.par.hron.addShapes(shepe);
            /*let a=[]
            for (var i = 0; i < cg.length; i++) {
                a.push(new OIMO.Vec3(cg[i].x,cg[i].y,cg[i].z))

                
            }
            var sc = new OIMO.ShapeConfig();
            sc.geometry = new OIMO.ConvexHullGeometry(a);
            b.addShape(new oimo_dynamics_rigidbody_Shape(sc));
            trace("dddd==",i,cg[i])*/
        }



        var aColor=[0x0000ff]//,0xff0000,0x00ff00,0xf0ff00]
        let am=[]
        function visiConvexGeometry(cg,fi){
            if(!self.debug)return
            const geometry = new ConvexGeometry(cg);
              //  console.warn(geometry)
            var color = 0xffffff*Math.random();
            if(aColor[fi])color =aColor[fi]
            else{
                let cc=getAnticonvexityPercent(cg)
                let pp=cc/100
                let ccww=new THREE.Color(pp, 0,0)

                color = "#"+ccww.getHexString()

                trace("fff==",getAnticonvexityPercent(cg),pp,color)
            }
            visiConvexG1(geometry,color)
        }
        function visiConvexG1(g,c){   
            if(!self.debug)return
            var material = new THREE.MeshBasicMaterial({
              color:c,
              transparent: true,
              opacity: 0.5,
              side: THREE.DoubleSide
            });
            var mesh = new THREE.Mesh(g, material);
            self.cd.add(mesh);


            var material = new THREE.MeshBasicMaterial({
              color:c,
          
               wireframe: true,
                  
                side: THREE.DoubleSide,
              opacity: 0.5,
              
            });
            var mesh = new THREE.Mesh(g, material);
            self.cd.add(mesh);

            am.push(mesh)
        }

        this.ddTest = function(){
            var clusters = []
            
            for (var i = 0; i < cgv.aP.length; i++) {  
                visiCG(cgv.aP[i])  
                setPhisicGeometry(cgv.aP[i].cluster)
            }        
        }
        function visiCG(cg){
            visiConvexG1(cg.geometry,cg.color)        

        }    


        function parse(c){            
            if(c && c.geometry){
                open(c);
            }
            for (var i = 0; i < c.children.length; i++) {
                parse(c.children[i])
            }
        }








         parse(this.c3d)

function getAnticonvexityPercent(points) {
  if (points.length < 4) return 0;

  // 1. Построить выпуклую оболочку
  const convexGeo = new ConvexGeometry(points);
  convexGeo.computeBoundingBox();

  const posAttr = convexGeo.attributes.position;
  const convexIndices = new Set();

  // Соберём вершины, реально использованные в оболочке
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    convexIndices.add(`${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`);
  }

  // 2. Сравнить: какие исходные точки НЕ используются в выпуклой оболочке
  let insideCount = 0;

  for (const p of points) {
    const key = `${p.x.toFixed(5)},${p.y.toFixed(5)},${p.z.toFixed(5)}`;
    if (!convexIndices.has(key)) {
      insideCount++;
    }
  }

  // 3. Процент "внутренних" точек
  return (insideCount / points.length) * 100;
}

function kMeans6(geometry, k = 6) {
  const posAttr = geometry.attributes.position;
  const totalPoints = posAttr.count;

  // Собираем массив точек
  const points = [];
  for (let i = 0; i < totalPoints; i++) {
    points.push(new THREE.Vector3(
      posAttr.getX(i),
      posAttr.getY(i),
      posAttr.getZ(i)
    ));
  }

  const targetSize = Math.ceil(totalPoints / k);
  const clusters = Array.from({ length: k }, () => []);
  const centers = [];

  // Случайные начальные центры
  const shuffled = [...points].sort(() => Math.random() - 0.5);
  for (let i = 0; i < k; i++) {
    centers.push(shuffled[i].clone());
  }

  const assigned = new Set();

  while (assigned.size < totalPoints) {
    const distances = [];

    for (let i = 0; i < totalPoints; i++) {
      if (assigned.has(i)) continue;

      const p = points[i];
      const dists = centers.map((c, idx) => ({ idx, dist: c.distanceToSquared(p) }));
      dists.sort((a, b) => a.dist - b.dist);
      distances.push({ pointIndex: i, order: dists });
    }

    // Присваиваем каждой точке ближайший непереполненный кластер
    for (const item of distances) {
      for (const { idx } of item.order) {
        if (clusters[idx].length < targetSize) {
          clusters[idx].push(points[item.pointIndex]);
          assigned.add(item.pointIndex);
          break;
        }
      }
    }

    // Обновляем центры
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) continue;
      const sum = new THREE.Vector3();
      for (const p of clusters[i]) sum.add(p);
      centers[i] = sum.divideScalar(clusters[i].length);
    }
  }

  return clusters;
}
function clustersPlus1(clusters, kolPlus = 1, nClosest = 3) {
  const k = clusters.length;

  for (let iter = 0; iter < kolPlus; iter++) {
    // 1. Find the smallest cluster
    let minIndex = 0;
    let minSize = clusters[0].length;
    for (let i = 1; i < k; i++) {
      if (clusters[i].length < minSize) {
        minSize = clusters[i].length;
        minIndex = i;
      }
    }

    const targetCluster = clusters[minIndex];
    const targetSet = new Set(targetCluster.map(p => `${p.x},${p.y},${p.z}`));

    // 2. Collect distances from other clusters
    const candidatePoints = [];

    for (let i = 0; i < k; i++) {
      if (i === minIndex) continue;

      for (const p of clusters[i]) {
        let minDist = Infinity;

        for (const q of targetCluster) {
          const dist = p.distanceToSquared(q);
          if (dist < minDist) minDist = dist;
        }

        candidatePoints.push({ point: p, dist: minDist });
      }
    }

    // 3. Sort and pick N closest
    candidatePoints.sort((a, b) => a.dist - b.dist);

    const additions = [];
    for (let i = 0; i < Math.min(nClosest, candidatePoints.length); i++) {
      const key = `${candidatePoints[i].point.x},${candidatePoints[i].point.y},${candidatePoints[i].point.z}`;
      if (!targetSet.has(key)) {
        additions.push(candidatePoints[i].point.clone());
      }
    }

    // 4. Add to smallest cluster
    targetCluster.push(...additions);
  }

  return clusters;
}

function clustersPlus111(clusters, kolPlus = 1) {
  const k = clusters.length;

  for (let iter = 0; iter < kolPlus; iter++) {
    // Find smallest cluster
    let minIndex = 0;
    let minSize = clusters[0].length;
    for (let i = 1; i < k; i++) {
      if (clusters[i].length < minSize) {
        minSize = clusters[i].length;
        minIndex = i;
      }
    }

    const targetCluster = clusters[minIndex];
    const targetSet = new Set(targetCluster.map(p => `${p.x},${p.y},${p.z}`));

    // Find closest points from other clusters
    const additions = [];

    for (let i = 0; i < k; i++) {
      if (i === minIndex) continue;

      let closest = null;
      let minDist = Infinity;

      for (const p of clusters[i]) {
        for (const q of targetCluster) {
          const dist = p.distanceToSquared(q);
          if (dist < minDist) {
            minDist = dist;
            closest = p;
          }
        }
      }

      // Avoid adding duplicates
      if (closest && !targetSet.has(`${closest.x},${closest.y},${closest.z}`)) {
        additions.push(closest.clone());
      }
    }

    // Add to smallest cluster
    targetCluster.push(...additions);
  }

  return clusters;
}

function kMeans5(geometry, kol) {
  // Получаем все точки из геометрии
  const posAttr = geometry.attributes.position;
  const points = [];

  for (let i = 0; i < posAttr.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    points.push(v);
  }

  // Случайные начальные центроиды
  const centroids = [];
  let kkk=(points.length-1)/kol
  for (let i = 0; i < kol; i++) {
    //var ii=Math.floor(Math.random() * points.length)
    var ii=kkk*i
    if(points[ii]==undefined){

        ii=Math.floor(Math.random() * points.length)
    }
    trace(ii)
    centroids.push(points[ii].clone());
  }




  const assignments = new Array(points.length);
  let changed = true;

  // Итерации
  while (changed) {
    changed = false;

    // Назначение точек ближайшему центроиду
    for (let i = 0; i < points.length; i++) {
      let minDist = Infinity;
      let best = 0;
      for (let j = 0; j < kol; j++) {
        const d = points[i].distanceToSquared(centroids[j]);
        if (d < minDist) {
          minDist = d;
          best = j;
        }
      }
      if (assignments[i] !== best) {
        assignments[i] = best;
        changed = true;
      }
    }

    // Обновление центроидов
    const sums = Array(kol).fill(0).map(() => new THREE.Vector3());
    const counts = Array(kol).fill(0);
    for (let i = 0; i < points.length; i++) {
      const group = assignments[i];
      sums[group].add(points[i]);
      counts[group]++;
    }
    for (let j = 0; j < kol; j++) {
      if (counts[j] > 0) {
        centroids[j].copy(sums[j].divideScalar(counts[j]));
      }
    }
  }

  // Сборка кластеров
  const clusters = Array(kol).fill(0).map(() => []);
  for (let i = 0; i < points.length; i++) {
    clusters[assignments[i]].push(points[i]);
  }

  return clusters;
}
























function kMeans3(geometry, kol) {
  const posAttr = geometry.attributes.position;
  const indexAttr = geometry.index;
  const points = [];

  for (let i = 0; i < posAttr.count; i++) {
    points.push(new THREE.Vector3().fromBufferAttribute(posAttr, i));
  }

  // Шаг 1: обычный kMeans
  const centroids = [];
  for (let i = 0; i < kol; i++) {
    centroids.push(points[Math.floor(Math.random() * points.length)].clone());
  }

  const assignments = new Array(points.length);
  let changed = true;

  while (changed) {
    changed = false;
    for (let i = 0; i < points.length; i++) {
      let minDist = Infinity;
      let best = 0;
      for (let j = 0; j < kol; j++) {
        const d = points[i].distanceToSquared(centroids[j]);
        if (d < minDist) {
          minDist = d;
          best = j;
        }
      }
      if (assignments[i] !== best) {
        assignments[i] = best;
        changed = true;
      }
    }

    const sums = Array(kol).fill(0).map(() => new THREE.Vector3());
    const counts = Array(kol).fill(0);
    for (let i = 0; i < points.length; i++) {
      const group = assignments[i];
      sums[group].add(points[i]);
      counts[group]++;
    }
    for (let j = 0; j < kol; j++) {
      if (counts[j] > 0) centroids[j].copy(sums[j].divideScalar(counts[j]));
    }
  }

  // Шаг 2: Сборка кластеров
  const clusters = Array(kol).fill(0).map(() => []);
  const indexClusters = Array(kol).fill(0).map(() => []);

  for (let i = 0; i < points.length; i++) {
    clusters[assignments[i]].push(points[i]);
    indexClusters[assignments[i]].push(i);
  }

  // Шаг 3: Анализ связей в каждом кластере и стягивание
  for (let k = 0; k < kol; k++) {
    const pointIndices = new Set(indexClusters[k]);
    const edges = new Map(); // индекс -> Set соседей

    if (indexAttr) {
      const idx = indexAttr.array;
      for (let i = 0; i < idx.length; i += 3) {
        const a = idx[i], b = idx[i + 1], c = idx[i + 2];
        const tri = [a, b, c];
        for (let u = 0; u < 3; u++) {
          const v1 = tri[u], v2 = tri[(u + 1) % 3];
          if (pointIndices.has(v1) && pointIndices.has(v2)) {
            if (!edges.has(v1)) edges.set(v1, new Set());
            if (!edges.has(v2)) edges.set(v2, new Set());
            edges.get(v1).add(v2);
            edges.get(v2).add(v1);
          }
        }
      }
    }

    const visited = new Set();
    for (let i of indexClusters[k]) {
      if (visited.has(i)) continue;
      if (!edges.has(i)) continue; // нет связей — одиночная точка

      const group = [];
      const queue = [i];
      visited.add(i);

      while (queue.length) {
        const current = queue.pop();
        group.push(current);
        const neighbors = edges.get(current);
        if (!neighbors) continue;
        for (let n of neighbors) {
          if (!visited.has(n)) {
            visited.add(n);
            queue.push(n);
          }
        }
      }

      if (group.length >= 4) { // только если есть объём
        const center = new THREE.Vector3();
        for (let id of group) center.add(points[id]);
        center.divideScalar(group.length);

        for (let id of group) {
          points[id].lerp(center, 0.5); // стягиваем на 50%
        }
      }
    }
  }

  // Шаг 4: Возвращаем готовые точки по кластерам
  const finalClusters = Array(kol).fill(0).map(() => []);
  for (let i = 0; i < points.length; i++) {
    finalClusters[assignments[i]].push(points[i]);
  }

  return finalClusters;
}




function kMeans2(geometry, kol) {
  // Получаем все точки из геометрии
  const posAttr = geometry.attributes.position;
  const points = [];

  for (let i = 0; i < posAttr.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    points.push(v);
  }

  // Случайные начальные центроиды
  const centroids = [];
  for (let i = 0; i < kol; i++) {
    var ii=Math.floor(Math.random() * points.length)
    //var ii=Math.floor(Math.abs(Math.sin(i))*100)%(points.length-1)
    if(points[ii]==undefined){

        ii=Math.floor(Math.random() * points.length)
    }
    trace(ii)
    centroids.push(points[ii].clone());
  }




  const assignments = new Array(points.length);
  let changed = true;

  // Итерации
  while (changed) {
    changed = false;

    // Назначение точек ближайшему центроиду
    for (let i = 0; i < points.length; i++) {
      let minDist = Infinity;
      let best = 0;
      for (let j = 0; j < kol; j++) {
        const d = points[i].distanceToSquared(centroids[j]);
        if (d < minDist) {
          minDist = d;
          best = j;
        }
      }
      if (assignments[i] !== best) {
        assignments[i] = best;
        changed = true;
      }
    }

    // Обновление центроидов
    const sums = Array(kol).fill(0).map(() => new THREE.Vector3());
    const counts = Array(kol).fill(0);
    for (let i = 0; i < points.length; i++) {
      const group = assignments[i];
      sums[group].add(points[i]);
      counts[group]++;
    }
    for (let j = 0; j < kol; j++) {
      if (counts[j] > 0) {
        centroids[j].copy(sums[j].divideScalar(counts[j]));
      }
    }
  }

  // Сборка кластеров
  const clusters = Array(kol).fill(0).map(() => []);
  for (let i = 0; i < points.length; i++) {
    clusters[assignments[i]].push(points[i]);
  }

  return clusters;
}



function kMeans4(geometry, kol) {
  const posAttr = geometry.attributes.position;
  const points = [];

  for (let i = 0; i < posAttr.count; i++) {
    points.push(new THREE.Vector3().fromBufferAttribute(posAttr, i));
  }

  // Создаём bbox по всем точкам
  const bbox = new THREE.Box3().setFromPoints(points);

  // Шаг вдоль диагонали
  const centroids = [];
  for (let i = 0; i < kol; i++) {
    const t = i / (kol - 1); // от 0 до 1
    const p = new THREE.Vector3().lerpVectors(bbox.min, bbox.max, t);
    centroids.push(p);
  }

  // Привязка точек к ближайшему центру
  const assignments = new Array(points.length);
  let changed = true;

  while (changed) {
    changed = false;
    for (let i = 0; i < points.length; i++) {
      let minDist = Infinity;
      let best = 0;
      for (let j = 0; j < kol; j++) {
        const d = points[i].distanceToSquared(centroids[j]);
        if (d < minDist) {
          minDist = d;
          best = j;
        }
      }
      if (assignments[i] !== best) {
        assignments[i] = best;
        changed = true;
      }
    }

    const sums = Array(kol).fill(0).map(() => new THREE.Vector3());
    const counts = Array(kol).fill(0);
    for (let i = 0; i < points.length; i++) {
      sums[assignments[i]].add(points[i]);
      counts[assignments[i]]++;
    }
    for (let j = 0; j < kol; j++) {
      if (counts[j] > 0) {
        centroids[j].copy(sums[j].divideScalar(counts[j]));
      }
    }
  }

  const clusters = Array(kol).fill(0).map(() => []);
  for (let i = 0; i < points.length; i++) {
    clusters[assignments[i]].push(points[i]);
  }

  return clusters;
}








        function kMeans(points, k) {
              const centroids = [];
              for (let i = 0; i < k; i++) {
                centroids.push(points[Math.floor(Math.random() * points.length)].clone());
              }

              let changed = true;
              let assignments = new Array(points.length).fill(0);

              while (changed) {
                changed = false;
                for (let i = 0; i < points.length; i++) {
                  let minDist = Infinity;
                  let closest = 0;
                  for (let j = 0; j < k; j++) {
                    const dist = points[i].distanceToSquared(centroids[j]);
                    if (dist < minDist) {
                      minDist = dist;
                      closest = j;
                    }
                  }
                  if (assignments[i] !== closest) {
                    assignments[i] = closest;
                    changed = true;
                  }
                }

                const sums = new Array(k).fill(0).map(() => new THREE.Vector3());
                const counts = new Array(k).fill(0);

                for (let i = 0; i < points.length; i++) {
                  sums[assignments[i]].add(points[i]);
                  counts[assignments[i]]++;
                }

                for (let j = 0; j < k; j++) {
                  if (counts[j] > 0) centroids[j].copy(sums[j].divideScalar(counts[j]));
                }
              }

              const clusters = new Array(k).fill(0).map(() => []);
              for (let i = 0; i < points.length; i++) {
                clusters[assignments[i]].push(points[i]);
              }

              return clusters;
            }

function splitGeometryByConnectivity(geometry, numParts) {
    if (!geometry || !(geometry instanceof THREE.BufferGeometry)) {
        console.error("Invalid input: geometry must be an instance of THREE.BufferGeometry.");
        return [];
    }
    if (numParts <= 0) {
        console.warn("numParts must be greater than 0. Returning original geometry as a single part.");
        const positions = geometry.attributes.position.array;
        const allVertices = [];
        for (let i = 0; i < positions.length; i += 3) {
            allVertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
        }
        return [allVertices];
    }

    const adjacencyList = buildAdjacencyList(geometry);
    const numVertices = geometry.attributes.position.count;
    const positionsArray = geometry.attributes.position.array;

    // 1. Инициализация меток (кластеров)
    const labels = new Array(numVertices);
    const labelCounts = new Array(numParts).fill(0); // Сколько вершин в каждом кластере

    // Случайно присваиваем начальные метки
    for (let i = 0; i < numVertices; i++) {
        const label = Math.floor(Math.random() * numParts);
        labels[i] = label;
        labelCounts[label]++;
    }

    let changed = true;
    let iterations = 0;
    const maxIterations = 50; // Ограничение на количество итераций, чтобы избежать бесконечного цикла

    // 2. Итеративное распространение меток
    while (changed && iterations < maxIterations) {
        changed = false;
        iterations++;

        const shuffledVertices = Array.from({ length: numVertices }, (_, i) => i);
        // Важно перемешивать вершины, чтобы избежать предвзятости порядка обработки
        for (let i = shuffledVertices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledVertices[i], shuffledVertices[j]] = [shuffledVertices[j], shuffledVertices[i]];
        }

        for (const vertexIndex of shuffledVertices) {
            const neighbors = adjacencyList.get(vertexIndex);
            if (!neighbors || neighbors.size === 0) continue;

            const neighborLabelCounts = new Map();
            for (const neighborIndex of neighbors) {
                const neighborLabel = labels[neighborIndex];
                neighborLabelCounts.set(neighborLabel, (neighborLabelCounts.get(neighborLabel) || 0) + 1);
            }

            let maxCount = -1;
            let newLabel = labels[vertexIndex]; // Сохраняем текущую метку на случай, если ни у кого нет большинства

            // Находим метку, которая встречается чаще всего среди соседей
            for (const [label, count] of neighborLabelCounts.entries()) {
                if (count > maxCount) {
                    maxCount = count;
                    newLabel = label;
                } else if (count === maxCount) {
                    // Tie-breaking: можно выбрать случайно или по наименьшему индексу метки
                    if (newLabel === undefined || label < newLabel) { // Выбираем метку с наименьшим индексом при равенстве
                         newLabel = label;
                    }
                }
            }

            if (labels[vertexIndex] !== newLabel) {
                labelCounts[labels[vertexIndex]]--; // Уменьшаем счетчик старой метки
                labels[vertexIndex] = newLabel;
                labelCounts[newLabel]++; // Увеличиваем счетчик новой метки
                changed = true;
            }
        }
    }
    console.log(`LPA finished in ${iterations} iterations.`);

    // 3. Создание фрагментов (наборов точек)
    const clusters = new Array(numParts).fill(null).map(() => []);
    const tempVertex = new THREE.Vector3();

    for (let i = 0; i < numVertices; i++) {
        const label = labels[i];
        tempVertex.set(positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2]);
        clusters[label].push(tempVertex.clone());
    }

    // 4. Фильтрация пустых кластеров
    return clusters.filter(cluster => cluster.length > 3); // ConvexGeometry требует минимум 4 точки
}


// Пример построения списка смежности (Adjacency List)
function buildAdjacencyList(geometry) {
    const adjacency = new Map(); // Map<vertexIndex, Set<neighborVertexIndex>>

    const positions = geometry.attributes.position.array;
    const indices = geometry.index ? geometry.index.array : null;

    const addEdge = (u, v) => {
        if (!adjacency.has(u)) adjacency.set(u, new Set());
        adjacency.get(u).add(v);
    };

    if (indices) {
        // Индексированная геометрия
        for (let i = 0; i < indices.length; i += 3) {
            const a = indices[i];
            const b = indices[i + 1];
            const c = indices[i + 2];

            addEdge(a, b); addEdge(b, a);
            addEdge(b, c); addEdge(c, b);
            addEdge(c, a); addEdge(a, c);
        }
    } else {
        // Неиндексированная геометрия (каждый набор из 3 вершин - это уникальный треугольник)
        for (let i = 0; i < positions.length / 3; i += 3) { // Итерация по треугольникам
            const a = i;
            const b = i + 1;
            const c = i + 2;

            addEdge(a, b); addEdge(b, a);
            addEdge(b, c); addEdge(c, b);
            addEdge(c, a); addEdge(a, c);
        }
    }
    return adjacency;
}


function splitGeometryIntoConvexParts3333(geometry, numParts) {
    if (!geometry || !(geometry instanceof THREE.BufferGeometry)) {
        console.error("Invalid input: geometry must be an instance of THREE.BufferGeometry.");
        return [];
    }
    if (numParts <= 0) {
        console.warn("numParts must be greater than 0. Returning original geometry as a single part.");
        const positions = geometry.attributes.position.array;
        const allVertices = [];
        for (let i = 0; i < positions.length; i += 3) {
            allVertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
        }
        return [allVertices];
    }

    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;

    // 1. Генерация точек-центров (Seed Points)
    const seedPoints = [];
    for (let i = 0; i < numParts; i++) {
        const x = THREE.MathUtils.randFloat(boundingBox.min.x, boundingBox.max.x);
        const y = THREE.MathUtils.randFloat(boundingBox.min.y, boundingBox.max.y);
        const z = THREE.MathUtils.randFloat(boundingBox.min.z, boundingBox.max.z);
        seedPoints.push(new THREE.Vector3(x, y, z));
    }

    // Инициализация кластеров для хранения вершин
    const clusters = new Array(numParts).fill(null).map(() => []);

    const positions = geometry.attributes.position.array;
    const tempVertex = new THREE.Vector3(); // Временный вектор для избежания повторных аллокаций

    // 2. Кластеризация вершин исходной геометрии
    for (let i = 0; i < positions.length; i += 3) {
        tempVertex.set(positions[i], positions[i + 1], positions[i + 2]);

        let minDistanceSq = Infinity;
        let closestSeedIndex = -1;

        for (let j = 0; j < numParts; j++) {
            const distanceSq = tempVertex.distanceToSquared(seedPoints[j]);
            if (distanceSq < minDistanceSq) {
                minDistanceSq = distanceSq;
                closestSeedIndex = j;
            }
        }
        // Добавляем клонированную вершину, чтобы избежать мутаций
        if (closestSeedIndex !== -1) {
            clusters[closestSeedIndex].push(tempVertex.clone());
        }
    }

    // 3. Возвращаем массив точек для ConvexGeometry
    // Проверяем, что в кластерах есть точки, иначе ConvexGeometry может выдать ошибку.
    return clusters.filter(cluster => cluster.length > 0);
}

            function splitGeometryByEdgeDistance(bufferGeometry, k = 5) {
  const posAttr = bufferGeometry.attributes.position;
  const indexAttr = bufferGeometry.index;

  const vertexCount = posAttr.count;
  const positionArray = posAttr.array;
  const indexArray = indexAttr.array;

  // Convert index list to adjacency list
  const adjacency = Array.from({ length: vertexCount }, () => new Set());

  for (let i = 0; i < indexArray.length; i += 3) {
    const a = indexArray[i];
    const b = indexArray[i + 1];
    const c = indexArray[i + 2];
    adjacency[a].add(b).add(c);
    adjacency[b].add(a).add(c);
    adjacency[c].add(a).add(b);
  }

  // Choose k seed indices (evenly spread)
  const seedIndices = [];
  const step = Math.floor(vertexCount / k);
  for (let i = 0; i < k; i++) {
    seedIndices.push(i * step);
  }

  // Initialize labels and visited
  const clusterLabels = new Array(vertexCount).fill(-1);
  const queueList = [];

  for (let clusterId = 0; clusterId < k; clusterId++) {
    const seed = seedIndices[clusterId];
    clusterLabels[seed] = clusterId;
    queueList.push([seed]);
  }

  let active = true;
  while (active) {
    active = false;

    for (let clusterId = 0; clusterId < k; clusterId++) {
      const queue = queueList[clusterId];
      const nextQueue = [];

      for (const v of queue) {
        for (const neighbor of adjacency[v]) {
          if (clusterLabels[neighbor] === -1) {
            clusterLabels[neighbor] = clusterId;
            nextQueue.push(neighbor);
            active = true;
          }
        }
      }

      queueList[clusterId] = nextQueue;
    }
  }

  // Rebuild clusters as arrays of Vector3
  const clusters = Array.from({ length: k }, () => []);

  for (let i = 0; i < vertexCount; i++) {
    const clusterId = clusterLabels[i];
    if (clusterId >= 0) {
      const x = positionArray[i * 3];
      const y = positionArray[i * 3 + 1];
      const z = positionArray[i * 3 + 2];
      clusters[clusterId].push(new THREE.Vector3(x, y, z));
    }
  }

  return clusters;
}

function buildAdjacencyList(geometry) {
    const adjacency = new Map();
    const indices = geometry.index ? geometry.index.array : null;
    const numVertices = geometry.attributes.position.count;

    for (let i = 0; i < numVertices; i++) {
        adjacency.set(i, new Set());
    }

    const addEdge = (u, v) => {
        // Убедимся, что обе вершины существуют в Map, прежде чем добавлять ребро
        if (!adjacency.has(u)) adjacency.set(u, new Set());
        if (!adjacency.has(v)) adjacency.set(v, new Set());
        adjacency.get(u).add(v);
        adjacency.get(v).add(u);
    };

    if (indices) {
        // Индексированная геометрия
        for (let i = 0; i < indices.length; i += 3) {
            const a = indices[i];
            const b = indices[i + 1];
            const c = indices[i + 2];

            addEdge(a, b);
            addEdge(b, c);
            addEdge(c, a);
        }
    } else {
        // Неиндексированная геометрия: каждая тройка вершин - это уникальный треугольник.
        // Вершины с одинаковыми координатами будут считаться разными вершинами графа,
        // если они не делят один и тот же треугольник.
        // Это может привести к несвязным графам для казалось бы связных 3D-моделей.
        // Рекомендуется конвертировать в индексированную BufferGeometry при загрузке.
        // (Например: new THREE.BufferGeometry().fromGeometry(oldGeometry) или с помощью BufferGeometryUtils.mergeVertices)
        console.warn("Using non-indexed BufferGeometry. Graph connectivity might not be as expected if vertices are duplicated but not shared via indices.");
        for (let i = 0; i < numVertices; i += 3) {
            const a = i;
            const b = i + 1;
            const c = i + 2;

            addEdge(a, b);
            addEdge(b, c);
            addEdge(c, a);
        }
    }
    return adjacency;
}

/**
 * Вычисляет топологические дистанции (количество рёбер) от указанной стартовой вершины
 * до всех достижимых вершин в THREE.BufferGeometry.
 *
 * @param {THREE.BufferGeometry} geometry Исходная геометрия.
 * @param {number} startVertexIndex Индекс стартовой вершины.
 * @returns {Map<number, number>} Map, где ключ - индекс вершины, значение - кратчайшая дистанция (количество рёбер) от startVertexIndex.
 */
function getTopologicalDistancesFromVertex(geometry, startVertexIndex) {
    const numVertices = geometry.attributes.position.count;

    if (startVertexIndex < 0 || startVertexIndex >= numVertices) {
        console.error(`Invalid startVertexIndex: ${startVertexIndex}. Must be within [0, ${numVertices - 1}].`);
        return new Map();
    }

    const adjacencyList = buildAdjacencyList(geometry);
    const distances = new Map(); // Map<vertexIndex, distance>
    const queue = [];
    const visited = new Set();

    // Инициализация для стартовой вершины
    distances.set(startVertexIndex, 0);
    queue.push(startVertexIndex);
    visited.add(startVertexIndex);

    let head = 0; // Используем указатель для эффективности вместо shift()
    while (head < queue.length) {
        const currentVertex = queue[head++]; // Извлекаем вершину из очереди
        const currentDistance = distances.get(currentVertex);

        const neighbors = adjacencyList.get(currentVertex);

        if (neighbors) { // Проверяем, есть ли соседи у текущей вершины
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    distances.set(neighbor, currentDistance + 1);
                    queue.push(neighbor);
                }
            }
        }
    }

    return distances;
}

    }

}


