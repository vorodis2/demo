



export class BCGSetka {
    constructor(par) {
        this.type = "BCGSetka";
        var self = this;
        this.par = par;

        this.uuid = calc.generateRendom(1)
        bObjects.objectUUID[this.uuid]=this

        this._material=pm.mat.getIDReturn(92)



        this.debug=false;
        this._boolDebug = false  

        var geometry0,mesh0

        this.meshDebag
        var ARC_HH = 1;
        var kolSvaz = 0;
        this.arraySher=[]    

        this.initDebag = function(){

            if(this.meshDebag)return;
            if(this.arraySher.length==0)return;
            


          
            geometry0 = new THREE.BufferGeometry();
            geometry0.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_HH * 3), 3));
            this.meshDebag=new THREE.Line(geometry0, pm.mat.getIDReturn(95))



        }   

        this.geometry

        this.init = function(gs){
            this.geometry=gs;
            this.arraySher=this.par.bCVershin.arraySher 
            this.arrayPont=this.par.bCVershin.array


            this.mesh=new THREE.Mesh(this.geometry, this._material)
           
            this.mesh.tkan = this.par.par;

            this.meshDebag=new THREE.Mesh(this.geometry, pm.mat.getIDReturn(55))            
            this.meshDebag.tkan = this.par.par;    


            this.position = this.geometry.attributes.position;
            this.par.contZ.add(this.mesh)
            

            visi3D.addChildMouse(this.mesh)


        } 

        this.kill = function(){

            //trace("ggggggggggggggggggggkillgggggggggggggggg")

         

        
            this.par.contZ.remove(this.mesh);
            visi3D.removeChildMouse(this.mesh)

            if(this.meshDebag.parent!==undefined)this.par.contZ.remove(this.meshDebag)
            visi3D.removeChildMouse(this.meshDebag)
           
          
            this.geometry.dispose()
        } 











        this.upDate=function(){
            this.dragDebag()
            this.drag();
        }

        ////////////////////////////////////
        /////////////////////////////////////
        var tikAlways=0
        var i,ro,bTik
        this.drag=function(){ 
            tikAlways=this.par.par.tikAlways
            if(tikAlways==0){
                this.drag1();
                return
            }
            bTik=false
            ro=0
            for (i = 0; i < this.arraySher.length; i++) {
                ro+=this.arraySher[i].getOtOld();
            }

            if(ro>tikAlways){
                for (i = 0; i < this.arraySher.length; i++) {
                    this.arraySher[i].vOld.copy(this.arraySher[i].content3d.position)
                }
                bTik=true   
            }


            //trace(bTik,ro,tikAlways)


            if(bTik)this.drag1();
        }
        let point
        this.drag1=function(){

            if(this.arraySher.length==0)return;

            for (i = 0; i < this.arraySher.length; i++) {
                this.arraySher[i].dragA2();
            }

            
            for (i = 0; i < this.arrayPont.length; i++) {
                this.arrayPont[i].korectPosition();
            }

            this.position = this.geometry.attributes.position;
            for (i = 0; i < this.arrayPont.length; i++) {
                point=this.arrayPont[i].vector
                for (var j = 0; j < this.arrayPont[i].array.length; j++) { 
                                    
                    this.position.setXYZ(this.arrayPont[i].array[j].index, point.x, point.y, point.z);
                }
            }
           

            this.position.needsUpdate = true;
            this.geometry.computeBoundingSphere()
            this.geometry.computeBoundingBox()

        }
        setTimeout(function() {
            self.drag()
        }, 2000);

        ///////-------------------------




        this.dragDebag=function(){
            if(this.meshDebag){
                if(this._boolDebug==false){
                    if(this.meshDebag.parent!==undefined)this.par.contZ.remove(this.meshDebag)
                }else{
                    if(this.meshDebag.parent==undefined)this.par.contZ.add(this.meshDebag)
                } 
            }
            
            
        }
    }

    set boolDebug(v) {
        if (this._boolDebug != v) {
            this._boolDebug = v;
            trace("ggggggggggggggggggggkillgggggggggggggggg")
            this.dragDebag()
/*
            if(this._boolDebug){
                if(this.meshDebag)this.content3d.add(this.meshDebag)
            }else{
                this.content3d.remove(this.meshDebag)
            }*/
        }
    }
    get boolDebug() { return this._boolDebug; }

    set material(v) {
        if (this._material != v) {
            this._material = v;
            console.warn("ggggggvvvvvvvvvvvvgggggg",v)
            if(this.mesh)this.mesh.material=this._material
        }
    }
    get material() { return this._material; }



}