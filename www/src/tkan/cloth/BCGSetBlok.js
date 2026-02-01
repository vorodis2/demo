



export class BCGSetBlok {
    constructor(par) {
        this.type = "BCGSetBlok";
        var self = this;
        this.par = par;

        this.uuid = calc.generateRendom(1)
        bObjects.objectUUID[this.uuid]=this


        this.array=[]

        this._frequency1=this.par.par._frequency1

        let bi=false
        this.init = function(){
            if(bi)return
            if(this.par.bCVershin.arraySher.length==0){
                return
            }

            if(this.blok==undefined){
                return
            }

            bi=true
            this.arraySher=this.par.bCVershin.arraySher; 
        
            if(this.par.par.par.object.obj.marks)
            for (var i = 0; i < this.par.par.par.object.obj.marks.array.length; i++) {
                if(this.par.par.par.object.obj.marks.array[i].type==5){
                    let oo1=this.par.par.par.object.obj.marks.array[i]
                    
                    if(oo1.aBool[0]){
                        let oo=new BCGSBlok(this, this.par.par.par.object.obj.marks.array[i])
                        this.array.push(oo)
                    }                    
                }
            }

            
        } 

        this.blok    
        this.setC3DCokerk = function(b, c3d,uuidSvaz){
            if(this.blok)return
            this.uuidSvaz=uuidSvaz;
            this.blok=b;
            this.c3d=c3d;
            this.init();
        }

        this.kill = function(){

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].kill()
            }

            

        } 



    }

    set frequency1(v) {
        if (this._frequency1 != v) {
            this._frequency1 = v; 
                     
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].ddd()
            }
        }
    }
    get frequency1() { return this._frequency1; }


}

export class BCGSBlok {
    constructor(par, o) {
        this.type = "BCGSBlok";
        var self = this;
        this.par = par;
        this.obj=o
        this.uuid = calc.generateRendom(1)
        bObjects.objectUUID[this.uuid]=this;

        this.posLocal=new THREE.Vector3(o.position.x,-o.position.y,o.position.z )

        this.position=new THREE.Vector3()

        this.position.copy(this.par.c3d.position)

        this.position.add(this.posLocal)
        this.position.add(this.par.blok.bhBlok.hron.position)
        
        this.arrJoint=[]    

        





        
        this.arrS=[]
        for (var i = 0; i < this.par.arraySher.length; i++) {
            this.arrS[i]=this.par.arraySher[i]
            this.arrS[i].dinDist1=calc.getDistance3d(this.arrS[i].v, this.posLocal)           
        }

        this.arrS.sort(function(a,b){
            return a.dinDist1-b.dinDist1
        })

        let kols=this.par.par.par._kolJoint1

        


        for (var i = 0; i < kols; i++) {  
            if(this.arrS[i]!==undefined){//working
                let sherIn= this.arrS[i] 

                let pp=new THREE.Vector3()
                let pp1=new THREE.Vector3()
                pp.copy(this.arrS[i].v)
                pp.sub(this.posLocal)              
                
                
                var jc = new OIMO.SphericalJointConfig();
                jc.rigidBody1 = sherIn.body
                jc.rigidBody2 = this.par.blok.bhBlok.body  

                jc.localAnchor1 = new OIMO.Vec3(pp1.x,pp1.y,pp1.z)
                jc.localAnchor2 = new OIMO.Vec3(this.position.x+pp.x,this.position.y+pp.y,this.position.z+pp.z)

                jc.allowCollision = true;
                jc.springDamper.frequency = this.par._frequency1;

                let mouseJoint = new OIMO.SphericalJoint(jc);
                mouseJoint.idArr = i                    
                this.arrJoint.push(mouseJoint)
                oWord.mJoint.add(mouseJoint)
            }
        }

        this.ddd = function(){
            
            for (var i = 0; i < this.arrJoint.length; i++) {
                let gg = this.arrJoint[i].getSpringDamper();
                gg.frequency = this.par._frequency1 
            }
        } 

        this.kill = function(){
            let kyklaSvaz=bObjects.getUUID(this.par.uuidSvaz)  
            if(kyklaSvaz){
                kyklaSvaz.oPipe=null;
                kyklaSvaz.index=-1;
                
            }/**/

            for (var i = 0; i < this.arrJoint.length; i++) {
                oWord.mJoint.add(this.arrJoint[i])
               
            }

  

        } 

    }
}