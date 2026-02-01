/*
import { BCVSher } from './BCVSher.js';
import { BCVBlok } from './BCVBlok.js';*/


export class CGVershinS {
    constructor(par, geom) {
        this.type = "CGVershinS";
        var self = this;        
        var geometry=geom;
        this.par=par
        this.debug=true





        if(this.debug){
            this.cd=new THREE.Object3D()
            this.par.cd.add(this.cd)
            
        }
  
        var pos=geometry.attributes.position.array;
        var ind=geometry.index.array;

        this.array=[]   
        this.objectP={}
        this.init=function(){
            this.parser()
        }

      


        this.aP=[]     
        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }







      

        let gt=new CGGroup(this)



        this.parser=function(){
            this.array.length=0
            this.objectP={}

            let s0='';
            let s1='';
            let s2='';

            for (var i = 0; i < ind.length; i+=3) {   

                s0 = this.getIndName(ind[i])
                s1 = this.getIndName(ind[i+1])                
                s2 = this.getIndName(ind[i+2])





                if(this.objectP[s0]==undefined){
                    this.objectP[s0]=new CGBlok(this)
                    this.objectP[s0].name=s0;
                    this.objectP[s0].idArr=this.array.length
                    
                    this.array.push(this.objectP[s0])
                    
                    this.objectP[s0].v.copy(this.getVector(ind[i]))
                }
                this.objectP[s0].set(i,ind[i])



                if(this.objectP[s1]==undefined){
                    this.objectP[s1]=new CGBlok(this)
                    this.objectP[s1].name=s1;
                    this.objectP[s1].idArr=this.array.length                    
                    this.array.push(this.objectP[s1])
                    
                    this.objectP[s1].v.copy(this.getVector(ind[i+1]))
                }
                this.objectP[s1].set(i+1,ind[i+1])


                if(this.objectP[s2]==undefined){
                    this.objectP[s2]=new CGBlok(this)
                    this.objectP[s2].name=s2;
                    this.objectP[s2].idArr=this.array.length
                    this.array.push(this.objectP[s2])
                    this.objectP[s2].v.copy(this.getVector(ind[i+2]))
                }
                this.objectP[s2].set(i+2,ind[i+2])

                
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
                this.objectP[s1].setPoint(this.objectP[s2])/**/



                
            } 

/*
            for (var i = 0; i < ind.length; i+=3) {  
                let pp0=new THREE.Vector3()
                let pp1=new THREE.Vector3()

               
                var index=ind[i]
                pp0.x = pos[index*3]  
                pp0.y = pos[index*3+1]
                pp0.z = pos[index*3+2] 
                

                var index=ind[i+1]
                pp1.x = pos[index*3]  
                pp1.y = pos[index*3+1]
                pp1.z = pos[index*3+2] 



                gt.dLine(pp0, pp1,0.1,0x880000)
            }*/

            
            let clusters = kMeans5(geom, 5)
            


            this.clusters=clusters

            let oq={}
            var ss,ob,ss1,sName
             var i = 0
              /*for (var i = 0; i < clusters.length; i++) {
               
                let a=clusters[i]
               //trace("--qqq-a-",a)
                for (var j = 0; j < a.length; j++) {
                
                    ss= a[j].name

                    ob=this.objectP[ss]
                    sName=i+"_"+j
                    //trace("--qqq--",ss,ob)
                    if(ob){

                        for (var k = 0; k < ob.aBlok.length; k++) {
                            let ab=ob.aBlok[k];
                            
                            for (var ki = i+1; ki < clusters.length; ki++) {
                                let a1=clusters[ki]
                                
                                for (var j1 = 0; j1 < a1.length; j1++) {
                                    ss1= this.getV3Name(a1[j1]);
                                    if(ss1==ab.name){
                                        if(oq[sName]==undefined){
                                            oq[sName]={}
                                            oq[sName][sName]=1
                                        }
                                        oq[sName][ki+"_"+j1]=1                                      
                                    }
                                   
                                }  
                            }
                            
                        }                         
                    }                  
                }
            }*/
            trace("qqqqqqqqqqqq",oq)

        }


        this.getVector = function(index){
            v3.x = pos[index*3]  
            v3.y = pos[index*3+1]
            v3.z = pos[index*3+2] 
            return v3;
        }
        let np=100
        let v3=new THREE.Vector3()
        this.getIndName=function(index){
            v3.x = pos[index*3]  
            v3.y = pos[index*3+1]
            v3.z = pos[index*3+2] 
            return this.getV3Name(v3);
        }
        this.getV3Name=function(v3){    
            let s=''
            s=(Math.round(v3.x*np)/np)+"_"+(Math.round(v3.y*np)/np)+"_"+(Math.round(v3.z*np)/np)           
            return s
        }


function kMeans5(geometry, kol) {
  // Получаем все точки из геометрии
  const posAttr = geometry.attributes.position;
  const points = [];

  for (let i = 0; i < posAttr.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    v.name=self.getV3Name(v)
    points.push(v);
  }

  // Случайные начальные центроиды
  const centroids = [];
  let ss=''
  let kkk=(points.length-1)/kol
  for (let i = 0; i < kol; i++) {
    var ii=Math.floor(Math.random() * points.length)
    var ii=Math.floor(i*kkk)
    if(points[ii]==undefined){
        ii=Math.floor(Math.random() * points.length)
    }
    

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





        this.init()



        this.dragPart=function(_kol=100){
            let kol=_kol
            this.clear();
            this.aP.length=0
            let ii
            let kkk=(this.array.length-1)/kol
            for (var i = 0; i < kol; i++) {                
                ii=Math.floor(i*kkk)
                //ii=Math.floor(Math.random()*this.array.length)
                if(i==0)ii=0


                if(this.array[ii].b0==false){  
                    let gg=new CGGroup(this)                    
                    gg.forstPoint = this.array[ii]
                    this.aP.push(gg);
                    gg.dragModel()

                                    
                }                
            }
            this.dragPart1()
                     
        }

        this.dragPart1=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].b0=false
            }
            let b=true;
            let d=0
            for (var i = 0; i < this.aP.length; i++) {
                if(self.aP[i].drag()!=null){
                    d++
                }
            }
            for (var j = 0;j < 77; j++){
                for (var i = 0; i < this.aP.length; i++) {
                    if(self.aP[i].drag()!=null){
                        d++
                    }
                }
            } 
            self.par.ddff() 
            setTimeout(function() {
                //self.dragPart1();


            }, 100);/**/
        }


    }


}


export class CGGroup {
    constructor(par) {
        this.type = "CGGroup";
        var self = this;        
        this.par=par;
        this.array=[];
        this.name='xz'
        this.forstPoint

        this.cd=new THREE.Object3D()
        this.par.cd.add(this.cd)
        




        this.set = function(blok, d){ 
          
            if(this.objIn[blok.name])return false;
            let oo={
                blok:blok,
                distance:d
            }
            blok.b1 = false
            this.arIn.push(oo);
            this.objIn[blok.name]=oo
            
        }
        this.objIn={}; 
        this.arIn=[]; 
        var kkk=0
        this.dragModel = function(){ 
            this.objIn={}; 
            this.arIn=[]; 
            kkk=0

           


            for (var i = 0; i < this.par.array.length; i++) {
                this.par.array[i].b1=false
            }

            this.dragLavel(this.forstPoint,4,0,0)




            for (var i = 0; i < this.par.array.length; i++) {
                this.par.array[i].b1=false
            }



            //
            //this.plus1(this.forstPoint, 0)
            this.arIn.sort(function(a,b){
                return a.distance-b.distance
            })
            
            this.setIz(this.forstPoint)           
        }


        var aColor=[0xff0000,0x00ff00,0x0000ff]
        this.dragLavel = function(blok,p,sah,dist){
            
           
            if(sah>=p)return
              
            blok.b1=true
            for (var i = 0; i < blok.aBlok.length; i++) { 
                if(blok.aBlok[i].point.b1==false){
                    this.dLine(blok.v, blok.aBlok[i].point.v, 0.1, aColor[sah],dist)                    
                    blok.aBlok[i].point.b1=true
                } 
            }
            let na=sah+1


            this.setIz(blok, dist)
            for (var i = 0; i < blok.aBlok.length; i++) {
                let dd=dist+blok.aBlok[i].distance
                this.dragLavel(blok.aBlok[i].point, p, na,dd) 
                blok.aBlok[i].point.b1=true
            }
        }

        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };
        
        var boxGeometry = new THREE.BoxGeometry(1, 1, 1,1,1,1);
        this.dLine = function(p0,p1,s,c){ 
         
            medod3D.c3d.add(this.cd)

            let dd=p0.distanceToSquared(p1)
            dd=this.getDistance3d(p0,p1)


            let pc = new THREE.Vector3()
            pc.copy(p0)
            pc.x+=p1.x;
            pc.y+=p1.y;
            pc.z+=p1.z;
            pc.x/=2;
            pc.y/=2;
            pc.z/=2;



            var m= new THREE.MeshBasicMaterial({ color: c })
            var mesh=new THREE.Mesh(boxGeometry, m)  
            mesh.scale.set(s*2,s*2,s*2) 
            this.cd.add(mesh)
            mesh.position.copy(p1)

            var m= new THREE.MeshBasicMaterial({ color: c })
            var mesh=new THREE.Mesh(boxGeometry, m)  
            mesh.scale.set(s*2,s*2,s*2) 
            this.cd.add(mesh)
            mesh.position.copy(p0)



            let mesh1=new THREE.Mesh(boxGeometry, m)  
            mesh1.scale.set(s,s,dd) 
            let c3d2=new THREE.Object3D() 
            c3d2.add(mesh1)
            this.cd.add(c3d2)
            //mesh1.position.x=dd/2

            c3d2.position.copy(pc)
            c3d2.position.x+=Math.random()*0.1
            c3d2.position.y+=Math.random()*0.1
            c3d2.position.z+=Math.random()*0.1
            

            c3d2.lookAt(p1)///**/

            this.par.cd.add(this.cd)

        }






        this.plus1=function(blok, distance){ 
            if(this.objIn[blok.name]==undefined){
                if(blok.b1==false){
                    this.set(blok, distance)
                }                
            }  
            let aa=[]
            for (var i = 0; i < blok.aBlok.length; i++) {
                if(blok.aBlok[i].point.b1===false){                    
                    let dd=distance + blok.aBlok[i].distance;  
                    if(this.objIn[blok.aBlok[i].point.name]==undefined){
                        aa.push(blok.aBlok[i])
                        this.set(blok.aBlok[i].point, dd)
                        //this.plus1(blok.aBlok[i].point, dd);
                    }
                }                
            }
            for (var i = 0; i < aa.length; i++) {
                let dd=distance + aa[i].distance; 
                this.plus1(aa[i].point, dd);
            }

        }


        this.drag=function(){ 
            
            let o=null
            for (var i = kkk; i < this.arIn.length; i++) {

                if(this.arIn[i].blok.b0==false){
                    this.setIz(this.arIn[i].blok)
                    break;
                }
            }            
            kkk++

            trace("@@@@@DDD3333dddd===",kkk,this.array, this.par.array) 
            return o
        }


        this.setIz = function(blok){ 
            blok.b0 = true
            this.array.push(blok);
        }





    }
}



export class CGBlok {
    constructor(par) {
        this.type = "CGBlok";
        var self = this;        
        this.par=par;
        
        this.name='xz'
        this.aBlok=[];   
        this.array=[];
        this.aObj={};
        this.v=new THREE.Vector3()
        this.kol=0
        this.vector=new THREE.Vector3()

        this.b0=false
        this.b1=false
        this.clear=function(){
            this.b0=false
            this.b1=false
        }


        this.set=function(ii,index){
            let oi={ii:ii, index:index}
            this.array.push(oi);
            this.kol= this.array.length
        }

        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };



        this.setPoint=function(setPoint){            
            if(this.aObj[setPoint.name]!=undefined)return
            let d=this.getDistance3d(setPoint.v,this.v)



            //if(d==0)return
            let o={
                name:setPoint.name,
                point:setPoint,
                distance:d
            }


            this.aObj[setPoint.name]=o
            this.aBlok.push(o);
        }

    }
}




export class CGTest {
    constructor(par, obj) {
        this.type = "CGBlok";

        this.obj=obj


        this.dCont=new DCont(menuBig.dCont)


        this.dCont.x=55;
        this.dCont.y=155;

        new DPanel(this.dCont)




    }
}
