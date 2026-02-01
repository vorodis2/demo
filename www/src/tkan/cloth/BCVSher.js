


export class BCVSPoint {
    constructor(sher, dist) {        
        this.sher=sher;
        this.dist=dist; 
        this.distPtrosent=1; 

        this.pn=new THREE.Vector3()
        this.pnWorld = new THREE.Vector3()
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

        this.vOld=new THREE.Vector3()

        this.debug=false

        this._scaleMass =this.par._scaleMass 

        this.c3d=new THREE.Object3D()
        this.par.c3d.add(this.c3d)

        let ro=0
        this.getOtOld=function(){
            ro=0
            ro+=Math.abs(this.content3d.position.x-this.vOld.x)
            ro+=Math.abs(this.content3d.position.y-this.vOld.y)
            ro+=Math.abs(this.content3d.position.z-this.vOld.z)
            return ro
        }

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

            this.final3_1()
            if(this.idArr==0){                
               // this.final3Position()
            }
        }

        //////////////////////////////////
        let ia,kolll
        this.dragA2=function(){

            if(this.par.par.par.boolMerging==false){
                kolll=this.arrP1.length
                for (ia = 0; ia< kolll; ia++) {
                    this.coo3d1.position.set(this.arrP1[ia].pn.x,this.arrP1[ia].pn.y,this.arrP1[ia].pn.z );
                    this.coo3d1.getWorldPosition(this.arrP1[ia].pnWorld); 
                }    

                return
            }

            kolll=this.arrP2.length
            for (ia = 0; ia< kolll; ia++) {
                this.coo3d1.position.set(this.arrP2[ia].pn.x,this.arrP2[ia].pn.y,this.arrP2[ia].pn.z );
                this.coo3d1.getWorldPosition(this.arrP2[ia].pnWorld); 
            }


        }




        let dd0,dd1
        let dd2=this.par.par.par.maxDisd2
        this.arrP2=[]
        this.arrP1=[]
        let pn=new THREE.Vector3()
        this.final3_1=function(){
            for (var i = 0; i < this.par.array.length; i++) {
                let dd0=calc.getDistance3d(this.par.array[i].v, this.v1)
                if(dd0<dd2){
                    
                    pn.set(this.par.array[i].v.x,this.par.array[i].v.y,this.par.array[i].v.z )
                    pn.sub(this.v1)

                    let hron=new BCVSPoint(this)
                    hron.distansForst=dd0;
                    hron.point=this.par.array[i];
                    hron.pn.set(pn.x,pn.y,pn.z)


                    this.arrP2.push(hron)
                    this.par.array[i].addSher(hron);
                }
            }

            for (var i = 0; i < this.arrayPoint.length; i++) {
                pn.set(this.arrayPoint[i].v.x,this.arrayPoint[i].v.y,this.arrayPoint[i].v.z )
                pn.sub(this.v1)
                let dd0=calc.getDistance3d(this.arrayPoint[i].v, this.v1)
                let hron=new BCVSPoint(this)
                hron.distansForst=dd0;
                hron.point=this.arrayPoint[i];
                hron.pn.set(pn.x,pn.y,pn.z)

                this.arrP1.push(hron)

                this.arrayPoint[i].addSher1(hron);
            }


           
        }



        this.final3Position=function(){
            let ppp=new THREE.Vector3()
            let oo=this.par.visi3Point(ppp, 3)
            this.coo3d.add(oo)

            
            this.content3d.add(oo)
            let cc=Math.random()*0xffffff
            for (let i = 0; i < this.arrayPoint.length; i++) {
                ppp.set(this.arrayPoint[i].v.x,this.arrayPoint[i].v.y,this.arrayPoint[i].v.z )
                ppp.sub(this.v1)
                let om=this.par.visi3Point(ppp, 0.2,0,cc)
                this.coo3d.add(om)
               
            }
            let cc1=0x999999
            for (let i = 0; i < this.arrP2.length; i++) {                
                let om=this.par.visi3Point(this.arrP2[i].pn, 0.1,0,cc1)
                om.scale.x=1.2
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

        this.coo3d1=new THREE.Object3D()
        this.coo3d.add(this.coo3d1)

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
            this.content3d.add(this.shape.c3d);
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
            
            //trace(oWord._debug)


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


