/*
import { BCVSher } from './BCVSher.js';
import { BCVBlok } from './BCVBlok.js';*/
import { ConvexGeometry } from './ConvexGeometry.js';
export class CGVershinS {
    constructor(par, _geom) {
        this.type = "CGVershinS";
        var self = this;
        var geom = _geom;
        this.par = par
        this.debug = this.par.debug 





        if (this.debug) {
            this.cd = new THREE.Object3D()
            this.par.cd.add(this.cd)

        }

        var pos = geom.attributes.position.array;
        var ind = geom.index.array;

        this.array = []
        this.objectP = {}
        this.init = function() {

        }




        this.aP = []
        this.clear = function() {
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }











        this.parser = function(kol, kol2, pro2, pro3,pro4) {
            this.array.length = 0
            this.objectP = {}

            let s0 = '';
            let s1 = '';
            let s2 = '';

            for (var i = 0; i < ind.length; i += 3) {

                s0 = this.getIndName(ind[i])
                s1 = this.getIndName(ind[i + 1])
                s2 = this.getIndName(ind[i + 2])





                if (this.objectP[s0] == undefined) {
                    this.objectP[s0] = new CGBlok(this)
                    this.objectP[s0].name = s0;
                    this.objectP[s0].idArr = this.array.length

                    this.array.push(this.objectP[s0])

                    this.objectP[s0].v.copy(this.getVector(ind[i]))
                }
                this.objectP[s0].set(i, ind[i])



                if (this.objectP[s1] == undefined) {
                    this.objectP[s1] = new CGBlok(this)
                    this.objectP[s1].name = s1;
                    this.objectP[s1].idArr = this.array.length
                    this.array.push(this.objectP[s1])

                    this.objectP[s1].v.copy(this.getVector(ind[i + 1]))
                }
                this.objectP[s1].set(i + 1, ind[i + 1])


                if (this.objectP[s2] == undefined) {
                    this.objectP[s2] = new CGBlok(this)
                    this.objectP[s2].name = s2;
                    this.objectP[s2].idArr = this.array.length
                    this.array.push(this.objectP[s2])
                    this.objectP[s2].v.copy(this.getVector(ind[i + 2]))
                }
                this.objectP[s2].set(i + 2, ind[i + 2])


                this.objectP[s0].setPoint(this.objectP[s1])
                this.objectP[s0].setPoint(this.objectP[s2])




                this.objectP[s1].setPoint(this.objectP[s0])
                this.objectP[s1].setPoint(this.objectP[s2])



                this.objectP[s2].setPoint(this.objectP[s0])
                this.objectP[s2].setPoint(this.objectP[s1])

                this.objectP[s1].setPoint(this.objectP[s0])
                this.objectP[s2].setPoint(this.objectP[s0])
                this.objectP[s0].setPoint(this.objectP[s1])
                this.objectP[s2].setPoint(this.objectP[s1])
                this.objectP[s0].setPoint(this.objectP[s2])
                this.objectP[s1].setPoint(this.objectP[s2])




            }

            let clusters = kMeans5(geom, kol)
            this.clusters = clusters;


            // let clusters = kMeans6(geom, kol)
            //  this.clusters = clusters;

            for (var i = 0; i < clusters.length; i++) {
                this.aP[i] = new CGGroup(this, clusters[i])
                this.aP[i].idArr = i
                this.aP[i].drag()

            }
             
            let k=this.aP.length;
            if(kol2 && kol2>=2){
          
                for (var i = 0; i < k; i++) {
                
                    this.aP[i].delim(pro2*1,kol2*1)//kol2, pro2)//pro2,kol2)//0.5,2
                }
            }
            
            if(pro3 && pro3>=0){

                for (var i = 0; i < k; i++) {
                    
                    this.aP[i].plusTest(pro3*1, pro4*1)//0.5)
                }
            }


            this.arrayArray = [];
            for (var i = 0; i < this.aP.length; i++) {                
                this.arrayArray.push(this.aP[i].cluster)
            } 
            //this.par.ddTest()



        }

        this.plusGrop = function(a) {
            
            this.aP.push(new CGGroup(this,a))
            this.aP[this.aP.length-1].idArr = this.aP.length-1
            this.aP[this.aP.length-1].drag()
        }


        this.getVector = function(index) {
            v3.x = pos[index * 3]
            v3.y = pos[index * 3 + 1]
            v3.z = pos[index * 3 + 2]

            v3.add(this.par.pointPlus)

            return v3;
        }
        let np = 100
        let v3 = new THREE.Vector3()
        this.getIndName = function(index) {
           /* v3.x = pos[index * 3]
            v3.y = pos[index * 3 + 1]
            v3.z = pos[index * 3 + 2]*/
            return this.getV3Name(this.getVector(index));
        }
        this.getV3Name = function(v3) {
            let s = ''
            s = (Math.round(v3.x * np) / np) + "_" + (Math.round(v3.y * np) / np) + "_" + (Math.round(v3.z * np) / np)
            return s
        }


        function kMeans6(geometry, kol) {
            // Получаем все точки из геометрии
            let a=[]
            const centroids = [];
            const centroids1 = [];
            let kkk = (self.array.length - 1) / kol

            for (var i = 0; i < kol; i++) {
                var ii = Math.floor(kkk * i)
                centroids.push(self.array[ii].v);

               
         
            }

            let dd,d;
            var ii=-1
            let kol1=centroids.length
            let kol2=self.array.length
            let kf=0
            let bbb
            for (var k = 0; k < 75; k++) {  
                kf=0

                for (var i = 0; i < kol1; i++) {                
                    if(centroids1[i]==undefined)centroids1[i]={a:[], r:-1, kp:3}

                    dd=99999999999999999999999
                    ii=-1
                    for (var j = 0; j < kol2; j++) {
                        if(self.array[j].bb4===true){

                            continue
                        }
                        d=self.getDistance3d(centroids[i], self.array[j].v)
                      
                        if(d<dd){
                            dd=d;
                            ii=j;
                        }
                    }

                    if(ii!=-1){

                        bbb=false
                        if(centroids1[i].r==-1){
                            bbb=true
                            if(self.array[ii].bb4==false){
                                if(centroids1[i].kp==0){
                                    let dddd=0
                                    for (var i = 0; i < centroids1[i].a.length; i++) {
                                        dddd+= self.getDistance3d(centroids1[i].a[i],centroids[i])
                                    }
                                    dddd/=centroids1[i].a.length;
                                    centroids1[i].r=dddd
                                }
                            }

                        }else{
                            if(centroids1[i].r*1.2>dd)continue

                        }

                        if(self.array[ii].bb4==false){


                        }


                        

                        if(bbb){
                            centroids1[i].a.push(self.array[ii].v)

                            if(self.array[ii].bb4===undefined){
                                self.array[ii].bb4=false
                            }else{
                                self.array[ii].bb4=true
                            }
                            kf++
                        }
                        
                       


                        
                        
                    }   

                }
                if(kf==0)break
           
            }

            let centroids2 = [];
      

            for (var i = 0; i < centroids1.length; i++) {
                if(centroids1 && centroids1[i] && centroids1[i].a.length>4){
                    centroids2.push(centroids1[i].a)
                }
            }
          
            return centroids2
        }





        function kMeans5(geometry, kol) {
            // Получаем все точки из геометрии
          /*  const posAttr = geometry.attributes.position;
            const points = [];

            for (let i = 0; i < posAttr.count; i++) {
                const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
                points.push(v);
                v.name = self.getV3Name(v)
            }*/

         
            const points = [];

            for (let i = 0; i < self.array.length; i++) {
                
                const v = self.array[i].v
                points.push(v);
                v.name = self.getV3Name(v)
            }
            



            // Случайные начальные центроиды
            const centroids = [];
            let kkk = (points.length - 1) / kol
            for (let i = 0; i < kol; i++) {
                //var ii=Math.floor(Math.random() * points.length)
                var ii = Math.floor(kkk * i)
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

        this.kMeans = function(points, k) {
            return kMeans(points, k)
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




        this.getAnticonvexityPercent = function(points) {
            return getAnticonvexityPercent(points)
        }

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
        this.getDistance3d = function(p1, p2) {
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
        };
    }


}


export class CGGroup {
    constructor(par, cluster) {
        this.type = "CGGroup";
        var self = this;
        this.par = par;
        this.array = [];
        this.name = 'xz';
        this.forstPoint;
        this.idArr = -1

        this.debug = this.par.debug 
        if (this.debug) {
            this.cd = new THREE.Object3D()
            this.par.cd.add(this.cd)
        }




        this.cluster = cluster

        this.prsent = 0.5

        this.drag = function(b) {
         
            this.geometry = new ConvexGeometry(this.cluster);

            this.color = "#ff0000"
            this.prosent = this.par.getAnticonvexityPercent(this.cluster)
            this.prosent = this.prosent / 100
            let ccww = new THREE.Color(this.prosent, 0, 0)

            this.color = "#" + ccww.getHexString()
            this.prsent = 0.5

            this.testIn()

            if (this.idArr == 0) {
                this.color = "#00ff00"

            }
             if (this.prosent > 0.525) {
                this.color = "#00ff00"

            }

            

            if (b) return  
        }

        this.prsent1=1

        this.plusTest = function(prosent,p) {
            if(this.prosent<prosent){
                this.prsent1=p
                this.plus()
            }
            
        }


        this.cliner = function(a) {
            for (var i = 0; i < a.length; i++) {
                if(a[i].name==undefined){
                    a[i].name=this.getV3Name(a[i])
                }
            }

            for (var i = 0; i < a.length; i++) {
                
                for (var j = a.length - 1; j > i; j--) {
                    if(a[i].name==a[j].name){
                        a.splice(j,1)
                    }
                }                
            }
        }

        //phisPlus|200|2|0.5|0.37|0.3
        //20,29,31|0;100;5,33|0;100;5


        this.delim = function(prosent,kol) {
            if(this.prosent>prosent){

                let a=this.par.kMeans(this.cluster, kol)
                
                if(a && a[0]&&a[0].length>=4){
                    this.cliner(a[0])
                    if(a[0].length>=4){
                        this.cluster=a[0];

                        for (var i = 1; i < a.length; i++) {
                            if(a && a[i]){
                                this.cliner(a[i])
                                if(a[i].length>=4){
                                    this.par.plusGrop(a[i])
                                }
                            }
                        }
                    }
                }

                this.drag();
               
            }
        }


        let ot = {}
        let otGeometry = {};
        this.testIn = function() { //проверяем на левые елаементы
            ot = {}
            otGeometry = {};
            for (var i = 0; i < this.cluster.length; i++) {
                ot[this.cluster[i].name] = this.cluster[i]
            }


            for (var i = 0; i < this.geometry.attributes.position.array.length; i += 3) {
                let v = new THREE.Vector3()
                v.x = this.geometry.attributes.position.array[i]
                v.y = this.geometry.attributes.position.array[i + 1]
                v.z = this.geometry.attributes.position.array[i + 2]

                let ss = self.par.getV3Name(v)
                v.name = ss
                otGeometry[ss] = v
            }


            let ap = [0, 0]
            let nn
            let nn1 = 0
            // for (var i = 0; i < this.cluster.length; i++) {
            for (var s in otGeometry) {

                nn = this.testIn1(otGeometry[s])
                nn1++

            }

        }
        this.testIn1 = function(o) {
            let r = 1;
            let oo = this.par.objectP[o.name]
            if (oo) {
                for (var i = 0; i < oo.aBlok.length; i++) {
                    if (ot[oo.aBlok[i].name]) {

                    } else {
                        r = -1
                    }
                }
            }
            return r
        }

        this.plus = function() {
            let r = 0
            for (var s in otGeometry) {
                r += this.testIn2(otGeometry[s])
            }

            if (r != 0) {
                this.drag(true)
            }
        }

        this.testIn2 = function(o) {
            let r = 0;
            let iii = -1
            let ddd = -1
            let oo = this.par.objectP[o.name]
            if (oo) {
                for (var i = 0; i < oo.aBlok.length; i++) {

                    if (ot[oo.aBlok[i].point.name] == undefined) {
                        let d = this.getDistance3d(oo.aBlok[i].point.v, oo.v)
                        if (ddd < d) {
                            iii = i;
                            ddd = d
                        }

                    }
                }

                if (iii != -1) {
               
                    this.cluster.push(getP01P(oo.aBlok[iii].point.v, oo.v, this.prsent1))                        
                    r = 1
                }
            }
            return r
        }

        function getP01P(p1, p2, percent) {
            return new THREE.Vector3().lerpVectors(p2, p1, percent);
        }

        this.getP01P = function(p1, p2, prosemt) {
            let r


            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
        };

        this.getDistance3d = function(p1, p2) {
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
        };

    }
}



export class CGBlok {
    constructor(par) {
        this.type = "CGBlok";
        var self = this;
        this.par = par;

        this.name = 'xz'
        this.aBlok = [];
        this.array = [];
        this.aObj = {};
        this.v = new THREE.Vector3()
        this.kol = 0
        this.vector = new THREE.Vector3()

        this.b0 = false
        this.b1 = false
        this.clear = function() {
            this.b0 = false
            this.b1 = false
        }


        this.set = function(ii, index) {
            let oi = { ii: ii, index: index }
            this.array.push(oi);
            this.kol = this.array.length
        }

        this.getDistance3d = function(p1, p2) {
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
        };



        this.setPoint = function(setPoint) {
            if (this.aObj[setPoint.name] != undefined) return
            let d = this.getDistance3d(setPoint.v, this.v)



            //if(d==0)return
            let o = {
                name: setPoint.name,
                point: setPoint,
                distance: d
            }


            this.aObj[setPoint.name] = o
            this.aBlok.push(o);
        }

    }
}




export class CGTest {
    constructor(par, obj) {
        this.type = "CGBlok";

        this.obj = obj


        this.dCont = new DCont(menuBig.dCont)


        this.dCont.x = 55;
        this.dCont.y = 155;

        new DPanel(this.dCont)




    }
}