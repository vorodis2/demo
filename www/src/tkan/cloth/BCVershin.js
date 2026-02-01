
import { BCVSher } from './BCVSher.js';
import { BCVBlok } from './BCVBlok.js';


export class BCVershin {
    constructor(par) {
        this.type = "BCVershin";
        var self = this;
        this.par = par;
        var geometry=null;

        this._frequency=this.par.par._frequency
        this._scaleMass=this.par.par._scaleMass


        this.debug=this.par.debug
        this.content3d = new THREE.Object3D()
        
        this.par.content3d.add(this.content3d);

        this.debug = false

        this.c3d=new THREE.Object3D()
        this.c3d.position.x=100;
        //this.c3d.rotation.x=Math.PI
        this.par.par.par.c3dLoad.add(this.c3d)
        this.array=[]
        this.objectP={}
        var pos=[]
        var ind=[]
        this.setGeom=function(g){
            geometry=g;
            pos=geometry.attributes.position.array
            ind=geometry.index.array
            this.parser()
            this.creatSher()
            this.creatBody()
        }


        this.parser=function(){
            this.array.length=0
            this.objectP={}

            let s //= this.getIndName(ind[0])

            for (var i = 0; i < ind.length; i++) {
                s = this.getIndName(ind[i])
                if(this.objectP[s]==undefined){
                    this.objectP[s]=new BCVBlok(this)
                    this.objectP[s].name=s;
                    this.objectP[s].idArr=this.array.length
                    this.array.push(this.objectP[s])
                    this.objectP[s].v.set(v3.x, v3.y, v3.z)



                }
                this.objectP[s].set(i,ind[i])


            }

            
          
            

            this.visiMod()
            
        }

        this.kill = function() {
            this.bCVershin.kill()

        }
         this.stopImpuls = function() { 
            
            for (var i = this.arraySher.length - 1; i >= 0; i--) {                 
                oWord.metod.stopImpuls(this.arraySher[i].body)  
            }            
        }

        let oc={}
        let tt=new THREE.SphereGeometry(1,16,16)
        this.visi3Point=function(v,s,r,color){
            if(this.debug==false)return
            console.warn("tttt",this.debug) 
           /* if(color==undefined){
                let ax1=new THREE.AxesHelper(s)     
                ax1.position.copy(v)
                if(r)ax1.rotation.set(r,r,r) 
                this.c3d.add(ax1)
                return ax1
            }*/
            if(oc[color]==undefined)oc[color]=new THREE.MeshPhongMaterial({color:color})

          
            let m=new THREE.Mesh(tt,oc[color])
            m.position.copy(v)    
            m.scale.set(s,s,s)     
            this.c3d.add(m)


            return m
        }
 

        this.kill = function() {
            for (var i = 0; i < this.arraySher.length; i++) {
                this.arraySher[i].kill()
            }
        }


        let np=100
        let v3=new THREE.Vector3()
        this.getIndName=function(index){
            v3.x= pos[index*3]  
            v3.y= pos[index*3+1]
            v3.z= pos[index*3+2] 
            let s=''
            s=Math.round(v3.x*np)+"_"+Math.round(v3.y*np)+"_"+Math.round(v3.z*np)            
            return s
        }


        this.visiMod=function(){
            let mm = new THREE.Mesh(geometry, pm.mat.getIDReturn(56))   
            this.c3d.add(mm)
        }

        

        ///////////////////////////////
        //////////////////////////////

        this.position = new THREE.Vector3(300,120,300)
        this.creatBody=function(){
           
            for (var i = 0; i < this.arraySher.length; i++) {
                this.arraySher[i].creatBody(this.position)
            }
            for (var i = 0; i < this.arraySher.length; i++) {
                this.arraySher[i].creatBody1(this.position)
            }


            
        }



        this.upDate = function() {
            for (var i = 0; i < this.arraySher.length; i++) {
                this.arraySher[i].update()
            }
        }





        ///////////////////////////////


        this.blok_=null;
        this.blok_c3d=null;
        this.setC3DCokerk = function(blok_, blok_c3d) {
            this.blok_=blok_;
            this.blok_c3d=blok_c3d;
     
            this.dragBlok()   

        }

        var _c1,_c2,_v1,_q1,_ax





        this.dragBlok = function() {
            



            if(_c1==undefined){
                _v1=new THREE.Vector3()
                _q1=new THREE.Quaternion()

                _c1=new THREE.Object3D()
                _c2=new THREE.Object3D()
                _c1.add(_c2)
                _ax=new THREE.AxesHelper(1000)
                _c2.add(_ax)

            }
         
            this.blok_c3d.getWorldPosition(_v1)   // this.blok_.bhBlok.getPosition()
            this.blok_c3d.getWorldQuaternion(_q1)//this.blok_.bhBlok.getRotation()

            bMenedsher.coroktV3(_v1)

            _c1.position.set(_v1.x,_v1.y,_v1.z )
            _c1.quaternion.set(_q1.x,_q1.y,_q1.z,_q1.w )








            bObjects.content3d.add(_c1)

            for (var i = 0; i < this.arraySher.length; i++) {
                
                _v1=this.arraySher[i].v1;

                _c2.position.set(_v1.x,_v1.y,_v1.z)

                _ax.getWorldPosition(_v1)

                bMenedsher.coroktV3(_v1)
                this.arraySher[i].setXYZ(_v1.x, _v1.y,_v1.z) 

                _q1=this.arraySher[i].quaternion;
                _c2.quaternion.set(_q1.x,_q1.y,_q1.z,_q1.w)
                _ax.getWorldQuaternion(_q1)
                this.arraySher[i].setRotationXYZ(_q1.x,_q1.y,_q1.z,_q1.w)


                //this.setXYZ(v.x,v.y,v.z)
            //this.setRotationXYZ(this.quaternion.x,this.quaternion.y,this.quaternion.z,this.quaternion.w) /* */
            }
            bObjects.content3d.remove(_c1)


          
        }






        //////////////////////////////




        let kol=0
        this.creatSher=function(){
            kol=this.array.length
            for (var i = 0; i < kol; i++) {                  
                if(this.array[i].array.length<4){                    
                    this.visi3Point(this.array[i].v,0.2)  
                }
            }
            this.creatSher1(0)
        }

        this.arraySher=[]


        this.sahpoisk=this.par.par.maxDisd

        var maxDisd=38;


        this.creatSher1=function(sah){
            maxDisd=this.par.par.maxDisd
            for (var i = 0; i < kol; i++) {  
                if(this.array[i].bool) continue               
                if(this.array[i].array.length<4){                     
                    this.creatSher2(i,sah)
                    return
                }
            }
            maxDisd=this.par.par.maxDisd1
            for (var i = 0; i < kol; i++) {  
                if(this.array[i].bool) continue               
                if(this.array[i].array.length==4){ 
                    
                    this.creatSher2(i,sah)
                    return
                }
            }
            
            for (var i = 0; i < kol; i++) {  
                if(this.array[i].bool) continue               
                if(this.array[i].array.length==5){ 
                    
                    this.creatSher2(i,sah)
                    return
                }
            }
            
            this.corect()    
               
        }

        this.clear1=function(){
            for (var i = 0; i < kol; i++) {                  
                this.array[i].bool1=false                
                   
            }
            bb.clear()
        } 

        

        let dist,dist1,_in
        this.getIndex = function(v){
            _in=-1
            dist=999999999;
            for (var i = 0; i < kol; i++) {  
                if(this.array[i].bool==true)continue
                if(this.array[i].bool1==true)continue    
                dist1=this.getDistance3d(v, this.array[i].v)
                if(dist1>maxDisd)continue

                if(dist>dist1){
                    dist=dist1
                    _in=i
                }
            }
            return _in
        }
        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };

        

        this.drag11=function(sah){
            
            
            let index=this.getIndex(oNa.v);
            
            if(index!=-1){
                bb.set(this.array[index]);
                this.drag11(sah)
            }else{               

                let bCVSher=new BCVSher(this);
                for (var i = 0; i < bb.array.length; i++) {
                    bb.array[i].bool=true
                    bCVSher.set(bb.array[i])

                }
                bCVSher.final(sah+1);

                bCVSher.idArr=this.arraySher.length
                this.arraySher.push(bCVSher)
                

                
                this.creatSher1(sah+1)                    
                
                
                
                //this.visi3Point(bCVSher.v,20);
            }
            
        }

        var oNa
        var bb=new BCVSher(this)
        this.creatSher2=function(index,sah){
            oNa=this.array[index]
            this.clear1();

            bb.set(oNa)
            this.drag11(sah)
            
        }  

        //////////    
        this.corect=function(){
            
           /*  
            return*/
            for (var i = 0; i < this.arraySher.length; i++) {                  
                this.arraySher[i].poiscArr()           
                   
            }  
            let b1=true
            for (var j = 0; j < 122; j++) {  
                
                let nn=j*0.15
                
                for (var i = 0; i < this.arraySher.length; i++) {                  
                    if(this.arraySher[i].plusDist(nn) == true)b=true
                } 
                let b=false
                for (var i = 0; i < this.array.length; i++) {
                    if(this.array[i].boolFinal==false)b=true
                }

                if(b==false)break
            }



            for (var i = 0; i < this.arraySher.length; i++) {    
             
                this.arraySher[i].final2()
                this.visi3Point(this.arraySher[i].v1,3);  

            }
            for (var i = 0; i < this.arraySher.length; i++) {   
                this.arraySher[i].poiscArrS()
            }

            for (var i = 0; i < this.arraySher.length; i++) {   
                this.arraySher[i].poiscArrS1()
            }

            //this.еее(6,7)

        } 

        this.еее=function(e1,e2){
            let tt1=this.arraySher[e1]
            let tt2=this.arraySher[e2]

            tt1.final2()
            //this.visi3Point(tt1.v1,3); 

            tt2.final2()
            //this.visi3Point(tt2.v1,7); 

            let n=calc3d.getPointBetweenObjects(tt1, tt2)

            

            
            this.visi3Point(n,0.2,null,0xff0000); 


            const pointVector = calc3d.getLocalPoint(tt1.v1,tt1.quaternion, n)
            let ddd=this.visi3Point(pointVector,212); 
            tt1.c3d.add(ddd)
        }
        


    }

    set frequency(v) {
        if (this._frequency != v) {
            this._frequency = v;
            let gg
            for (var i = 0; i < this.arraySher.length; i++) {   
                for (var j = 0;j < this.arraySher[i].arrJoint.length; j++) {                      
                    gg = this.arraySher[i].arrJoint[j].getSpringDamper()
                    gg.frequency = v 
                                       
                }
            }
         
        }
    }
    get frequency() { return this._frequency; }

    set scaleMass(v) {
        if (this._scaleMass != v) {
            this._scaleMass = v;
            
            for (var i = 0; i < this.arraySher.length; i++) {   
                                  
                this.arraySher[i].scaleMass = v                  
                
            }         
        }
    }
    get scaleMass() { return this._scaleMass; }




}


