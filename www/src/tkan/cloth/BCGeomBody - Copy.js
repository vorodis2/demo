
import { BCGSetka } from './BCGSetka.js';
import { BCGSetBlok } from './BCGSetBlok.js';
export class BCGeomBody {
    constructor(par, fun, objSave) {
        this.type = "BCGeomBody";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.uuid = calc.generateRendom(1)
        bObjects.objectUUID[this.uuid]=this



        this.debug=true

        this.objSave=objSave
        this.modifier
        if(window.calc3d==undefined){
            new Calc3d()
        }

        this.bCVershin=new BCVershin(this)
        this.bcGSetka = new BCGSetka(this)
        this.bcGSetBlok = new BCGSetBlok(this)
        var gs
        var count
        this.init = function(o3d) {
            let gs1=this.getForcGeom(o3d)
            gs=gs1.clone();
            let _o3d=new THREE.Object3D()
            _o3d.rotation.x=Math.PI
            gs.applyQuaternion(_o3d.quaternion)
            this.bCVershin.setGeom(gs) 

            this.bcGSetka.init()
            //this.bcGSetBlok.init()
        }

        this.kill = function() {
            this.bCVershin.kill()
            this.bcGSetBlok.kill()
        }

        this.upDate = function() {
          /*  for (var i = 0; i < this.array.length; i++) {
                this.array[i].update()
            }*/
            this.bCVershin.upDate()
            this.bcGSetka.upDate()
            //this.tChoth.upDate()

        }

        this.getParKoren = function() {
            return this.par.par
        }

        this.getForcGeom = function(o3d) {            
            if(o3d && o3d.geometry)return o3d.geometry
            for (var i = 0; i < o3d.children.length; i++) {
                let gg=this.getForcGeom(o3d.children[i])
                if(gg)return gg                
            }
            return null
        } 


        this.getObj = function() {
            let o = {}
            o.a=[]
            for (var i = 0; i < this.bCVershin.arraySher.length; i++) {
                

                let p = this.bCVershin.arraySher[i].body.getPosition()
                let q = this.bCVershin.arraySher[i].body.getOrientation()
                let oo={}
                oo.p = { x: Math.round(p.x), y: Math.round(p.y), z: Math.round(p.z) }
                oo.q = { x: q.x,   y: q.y,  z: q.z,  z: q.w}
                oo.i = i;
                o.a.push(oo);
            
            }
           
            


            return o;
        }

        this.aO
        this.setObj = function(o) {
            if(o && o.a){
                this.aO=o.a
            } 
            
        }


    }
}

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
        visi3D.addChildMouse(this.content3d)
        window.oWord.content3d.add(this.content3d);

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
                    this.objectP[s]=new BCVBlok()
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
                _ax=new THREE.Object3D()
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





export class BCVBlok {
    constructor() {
        this.type = "BCVBlok";
        var self = this;
        this.bool=false;
        this.bool1=false;
        this.boolFinal=false;

        this.idArr=-1
        this.name="f"
        this.array=[]
        this.v=new THREE.Vector3()
        this.set=function(ii,index){
            let oi={ii:ii, index:index}
            this.array.push(oi);
        }



    }
}



export class BCVSher {
    constructor(par) {
        this.type = "BCVSher";
        var self = this;
        this.par=par
        this.idArr=-1
        this.name="f"
        this.array=[]
        this.arrayPoint=[]
        this.uuid=calc.generateRendom(1)
        this.v=new THREE.Vector3()
        this.v1=new THREE.Vector3()

        this.debug=this.par.debug

        this._scaleMass =this.par._scaleMass 

        this.c3d=new THREE.Object3D()
        this.par.c3d.add(this.c3d)


        this.set=function(blok){
            blok.bool1=true
            this.array.push(blok)
            this.dragV()
            
        }

        let ii,dd
        this.distans=99999
        this.dragV=function(){ 
            this.v.set(0,0,0)
            for (ii = 0; ii < this.array.length; ii++) {
                this.v.x+=this.array[ii].v.x;
                this.v.y+=this.array[ii].v.y;
                this.v.z+=this.array[ii].v.z;
            }

            this.v.x/=this.array.length
            this.v.y/=this.array.length
            this.v.z/=this.array.length            
        }


        this.clear=function(){    
            this.array.length=0
        }
        this.kill = function() {
            
            
            this.clear()
            for (var i = 0; i < avDebug.length; i++) {
                if(avDebug[i].parent)avDebug[i].parent.remove(avDebug[i])
            }
            if(this.shape.c3d)this.content3d.remove(this.shape.c3d)
            window.oWord.content3d.remove(this.content3d);    

          

            for (var i = 0; i < this.arrJoint.length; i++) {
                oWord.mJoint.remove( this.arrJoint[i])
             } 


            window.oWord.physicsWorld.removeRigidBody(this.body); 
            //this.content3d.add(this.shape.c3d)
        }


        this.final=function(sa){
            this.distans=0.001
            for (ii = 0; ii < this.array.length; ii++) {
                dd=this.par.getDistance3d(this.v,this.array[ii].v )
                if(dd>this.distans){
                    this.distans=dd
                }
            }
        }

        
        let cc= 0xffffff*Math.random()

        let avDebug=[]
        let av=[]
        this.distansPoint=0.001
        this.final2 = function(sa){
            this.distansPoint=0.001
            
            for (ii = 0; ii < this.arrayPoint.length; ii++) {
                dd=this.par.getDistance3d(this.v, this.arrayPoint[ii].v )
                if(dd>this.distansPoint){
                    this.distansPoint=dd
                }  
                if(this.debug==true){
                    let mmm=this.par.visi3Point(this.arrayPoint[ii].v,0.1,0,cc);     
                    avDebug.push(mmm)   
                }             
                         
            }

            this.v1.set(0,0,0)
            for (ii = 0; ii < this.arrayPoint.length; ii++) {
                this.v1.x+=this.arrayPoint[ii].v.x;
                this.v1.y+=this.arrayPoint[ii].v.y;
                this.v1.z+=this.arrayPoint[ii].v.z;

                av.push(this.arrayPoint[ii].v)
            }

            this.v1.x/=this.arrayPoint.length
            this.v1.y/=this.arrayPoint.length
            this.v1.z/=this.arrayPoint.length

            let q = calc3d.getAveragePlaneNormalQuaternion(av)
            let yv=new THREE.Vector3()
            this.quaternion=q
            let qi=new THREE.Quaternion(q.x,q.y,q.z,q.w)
            qi.invert()
            this.coo3d.quaternion.set(qi.x,qi.y,qi.z,qi.w)


            if(this.debug==true){
                let m,m2
                m2=new THREE.Mesh(new THREE.SphereGeometry(this.distansPoint,16,16),pm.mat.getIDReturn(93))
                m2.position.copy(this.v1)
                m2.quaternion.set(q.x, q.y, q.z, q.w) 
                this.par.c3d.add(m2)
                avDebug.push(m2)

                this.mmmm= m=new THREE.Mesh(new THREE.SphereGeometry(this.distansPoint,16,16),pm.mat.getIDReturn(92))          
                m.scale.set(0.1,2,0.1) 
               
                this.c3d.position.copy(this.v1) 
                this.c3d.quaternion.set(q.x, q.y, q.z, q.w)        
                this.c3d.add(m)
                avDebug.push(m2)

            }

            if(this.idArr==0){
                this.final3Position()
            }
        }

//////////////////////////////////
        this.final3Position=function(){
            let ppp=new THREE.Vector3()
            let oo=this.par.visi3Point(ppp, 3)
            this.coo3d.add(oo)

       
            this.content3d.add(oo)
            let cc=Math.random()*0xffffff
            for (let i = 0; i < this.arrayPoint.length; i++) {
                ppp.set(this.arrayPoint[i].v.x,this.arrayPoint[i].v.y,this.arrayPoint[i].v.z )
                ppp.sub(this.v1)
                let om=this.par.visi3Point(ppp, 0.1,0,cc)
                this.coo3d.add(om)

             
            }


            
        }

////////////////////////////////
        this.mmmm

        this.plusDist=function(d){            
            let b=false
            for (var i = 0; i < ar.length; i++) {                 
                if(ar[i].d<d){                    
                    if(ar[i].bbb==undefined ){                    
                        ar[i].bbb=true
                        if(this.par.array[ar[i].i].boolFinal==false){
                            this.arrayPoint.push(this.par.array[ar[i].i])
                            this.par.array[ar[i].i].boolFinal=true;  
                            b=true
                        } 
                    }
                }else{
                    return
                }
            }
            return b
        }



        var ar=[]
        this.poiscArr=function(){ 
            let d=1
            for (var i = 0; i < this.par.array.length; i++) {                
                let o={i:i, d:d}
                o.d=this.par.getDistance3d(this.v,this.par.array[i].v)
                ar.push(o)
            }
            ar.sort(function(a,b){
                return a.d-b.d
            })

        
        }

        var arS=[]
        this.poiscArrS=function(){ 
            let d=1
            for (var i = 0; i < this.par.arraySher.length; i++) {                
                if(this.uuid==this.par.arraySher[i].uuid)continue
                let o={i:i, d:d, uuid:this.par.arraySher[i].uuid}
                o.d=this.par.getDistance3d(this.v,this.par.arraySher[i].v)
                arS.push(o)
            }
            arS.sort(function(a,b){
                return a.d-b.d
            })

           
        }

        this.arrSvaz=[]    
        let kolS=3 
        kolS = this.par.par.par.kolJoint

        this.poiscArrS1=function(){ 
            

            for (var i = 0; i < arS.length; i++) {
                this.poiscArrS122(arS[i])
            }   

        }

        this.poiscArrS122=function(tt){ 
            
            if(this.arrSvaz.length>kolS)return

            for (var i = 0; i < this.arrSvaz.length; i++) {
                if(this.arrSvaz[i].quaternion!=undefined){
                    if(tt.uuid==this.arrSvaz[i].uuid)return
                }
            }    



            let ob= this.par.arraySher[tt.i]   
            
            

            let n=calc3d.getPointBetweenObjects(this, ob)

            

            let object={}
            this.arrSvaz.push(object)
            ob.arrSvaz.push( this )            
         
            
            this.par.visi3Point(n,0.2,null,0xff0000); 
 
            
            object.idArr=tt.i    

            const pointVector = calc3d.getLocalPoint(ob.v1,ob.quaternion, n)
            
            object.idArr=tt.i 
            object.pIn={x:pointVector.x,y:pointVector.y,z:pointVector.z }
     

            const pointNa = calc3d.getLocalPoint(this.v1,this.quaternion, n)
         
            
            object.pNa={x:pointNa.x,y:pointNa.y,z:pointNa.z }
           
        }
        this.arrJoint=[]
        this.wh=this.par.par.par.wh
        var scaleWH=this.par.par.par.scaleWH*2
       

        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)

        this.coo3d=new THREE.Object3D()
        this.content3d.add(this.coo3d)

        this.body
        this.creatBody=function(p){
          
           // let o = { tip: "cylinder", w: this.distansPoint*2, h: this.wh, d: this.wh }
            let o = { tip: "box", w: this.distansPoint*scaleWH, h: this.wh, d: this.distansPoint*scaleWH }
            if(this.par.par.par.boolSphere){
                o = { tip: "cylinder", w: this.distansPoint*scaleWH, h: this.wh, d: this.wh }
            }


            
            this.bodyConfig = new OIMO.RigidBodyConfig()
            //this.bodyConfig.type = OIMO.RigidBodyType.STATIC
            this.bodyConfig.type = OIMO.RigidBodyType.DYNAMIC;


           // if(this.idArr == 0)this.bodyConfig.type = OIMO.RigidBodyType.DYNAMIC;
           
            this.body = new OIMO.RigidBody(this.bodyConfig)
            
            this.shape = this.par.par.par.bhBlok.getShape(o);
            

            let sss=0.001
            this.shape.sMass*=sss
           
            this.body.addShape(this.shape);
            this.content3d.add(this.shape.c3d)
            this.shape.mesh.tkan = this.par.par.par
            this.shape.v2Collision = parseInt(this.par.par.par.v2Collision, 2); //1 
            
            this.body._mass*=sss
            this.body._type*=sss

            let v=new THREE.Vector3()
            if(p)v.copy(p)
            v.add(this.v1)  

            let q=new THREE.Quaternion(this.quaternion.x,this.quaternion.y,this.quaternion.z,this.quaternion.w)    
            

            if(this.par.par.aO && this.par.par.aO[this.idArr]){

                if(this.par.par.aO[this.idArr].p){
                    v.x=this.par.par.aO[this.idArr].p.x;
                    v.y=this.par.par.aO[this.idArr].p.y;
                    v.z=this.par.par.aO[this.idArr].p.z;
                    
                }

                if(this.par.par.aO[this.idArr].q){
                    q.x=this.par.par.aO[this.idArr].q.x;
                    q.y=this.par.par.aO[this.idArr].q.y;
                    q.z=this.par.par.aO[this.idArr].q.z;
                    q.w=this.par.par.aO[this.idArr].q.w;
                  
                }
                
            }  
             
            this.setXYZ(v.x,v.y,v.z)
            this.setRotationXYZ(q.x,q.y,q.z,q.w) 
            this.dragMass()
        }

        this.setPositionJoint=function(){

        }



        this.creatBody1=function(){

            if(this.idArr !==3330){
                for (var i = 0; i < this.arrSvaz.length; i++) {  
                    if(this.arrSvaz[i].quaternion==undefined){//working
                        let sherIn= this.par.arraySher[this.arrSvaz[i].idArr]  
                        
                        var jc = new OIMO.SphericalJointConfig();
                        jc.rigidBody1 = sherIn.body
                        jc.rigidBody2 = this.body                       

                        jc.localAnchor1 = new OIMO.Vec3(this.arrSvaz[i].pIn.x,this.arrSvaz[i].pIn.y,this.arrSvaz[i].pIn.z)
                        jc.localAnchor2 = new OIMO.Vec3(this.arrSvaz[i].pNa.x,this.arrSvaz[i].pNa.y,this.arrSvaz[i].pNa.z)

                        jc.allowCollision = false;
                        jc.springDamper.frequency = this.par.frequency;

                        let mouseJoint = new OIMO.SphericalJoint(jc);
                        mouseJoint.idArr = i                    
                        this.arrJoint.push(mouseJoint)
                        oWord.mJoint.add(mouseJoint)

                    }
                }
            }



            





            window.oWord.physicsWorld.addRigidBody(this.body);


        }


        this.dragMass = function() {
            if(this.old_mass==undefined){                
                this.old_mass=this.body._mass;
                this.old_invMass=this.body._invMass;
            }

            this.body._mass=this.old_mass*this.par._scaleMass/100
            this.body._invMass=this.old_invMass*this.par._scaleMass/100     
        }




        this.positStart = new THREE.Vector3()
        this.setXYZ = function(x, y, z) {
            this.body.setPosition(new OIMO.Vec3(x, y, z))
            this.content3d.position.set(x, y, z)
            this.positStart.set(x, y, z) 
        }
        this.setRotationXYZ = function(x, y, z, w) {
            this.body.setOrientation(new OIMO.Quat(x, y, z,w))
            this.content3d.quaternion.set(x, y, z, w)            
        }


         let p, q
        this.update = function(b) {
            if(!this.body)return
            if (this.body.isSleeping() == true) {
                return
            }
            p = this.body.getPosition()
            
            this.content3d.position.set(p.x, p.y, p.z);
            q = this.body.getOrientation();
            this.content3d.quaternion.set(q.x, q.y, q.z, q.w);
        }






    }

    set scaleMass(v) {
        if (this._scaleMass != v) {
            this._scaleMass = v;
            this.dragMass()         
        }
    }
    get scaleMass() { return this._scaleMass; }


}



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