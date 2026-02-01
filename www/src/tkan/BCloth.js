


import { BCGeomBody } from './cloth/BCGeomBody.js';

export class BCloth {
    constructor(par, fun, objSave) {
        this.type = "BCloth";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.uuid = calc.generateRendom(1)
        bObjects.objectUUID[this.uuid]=this


        this.objSave=objSave
        this.param = this.par.param;
        this.content3d = new THREE.Object3D()
        visi3D.addChildMouse(this.content3d)
        window.oWord.content3d.add(this.content3d);

        this._scaleMass = 100
        this._frequency = 0.95
        this._frequency1 = 1.1

        this._kolJoint=9;
        this._kolJoint1=5;

        this.v2Collision="00000111";
        this.wh=1;
        this.scaleWH=0.9;
        this.boolSphere = true;
        this.boolMerging = false;
        this.tikAlways=2

        this.maxDisd=4;
        this.maxDisd1=5;
        this.maxDisd2=6;

        var tkan
        if(objSave){
            if(objSave.kolJoint!=undefined)this.kolJoint=objSave.kolJoint
            if(objSave.kolJoint1!=undefined)this.kolJoint1=objSave.kolJoint1;    
            if(objSave.frequency!=undefined)this._frequency=objSave.frequency
            if(objSave.frequency1!=undefined)this._frequency1=objSave.frequency1    
            if(objSave.scaleMass!=undefined)this._scaleMass=objSave.scaleMass 

            if(objSave.v2Collision!=undefined)this.v2Collision=objSave.v2Collision     
            if(objSave.wh!=undefined)this.wh=objSave.wh  
            if(objSave.scaleWH!=undefined)this.scaleWH=objSave.scaleWH 
            if(objSave.boolSphere!=undefined)this.boolSphere=objSave.boolSphere  


            if(objSave.maxDisd!=undefined)this.maxDisd=objSave.maxDisd  
            if(objSave.maxDisd1!=undefined)this.maxDisd1=objSave.maxDisd1         
            if(objSave.maxDisd2!=undefined)this.maxDisd2=objSave.maxDisd2    
            if(objSave.boolMerging!=undefined)this.boolMerging=objSave.boolMerging    

            if(objSave.tikAlways!=undefined)this.tikAlways=objSave.tikAlways    
        };
        

        this.par.oStatik={
            kolJoint:this.kolJoint,
            v2Collision:this.v2Collision,
            wh:this.wh,
            scaleWH:this.scaleWH,
            boolSphere:this.boolSphere,
           
            kolJoint1:this.kolJoint1,

            maxDisd:this.maxDisd,
            maxDisd1:this.maxDisd1,
            maxDisd2:this.maxDisd2,


            /*kh:this._kh,
            sw:this._sw,
            sh:this._sh,
            boolSah:this.boolSah,
            boolSphere:this.boolSphere,
            wh:this.wh,
            v2Collision:this.v2Collision,
            boolDebug:this.boolDebug,
            kol:this.kol,*/
        }


        this.osw = this._sw / this._kw
        this.osh = this._sh / this._kh





        this._sahMorf=920
 

        this.par.oDinamik={
            frequency:this._frequency,
            frequency1:this._frequency1,
            scaleMass:this._scaleMass,
            boolMerging:this.boolMerging,
            tikAlways:this.tikAlways,
          /*  scale:this._scale,
            frequency:this._frequency,
            frequencyCentr:this._frequencyCentr,
            scaleTexterX:this._scaleTexterX,
            scaleTexterY:this._scaleTexterY,
            scaleMass:this._scaleMass,*/
        }



        let tblok;

        this.position = new THREE.Vector3(300,200,300)

        this.bhBlok = null
      //  this.tChoth = new TChoth(this)

        this.bCGeomBody = new BCGeomBody(this)

        if(objSave){
          
            if(objSave.gb){
                this.bCGeomBody.aO=objSave.gb.a
            }
        }
        this.init = function(bhBlok) {
            if (this.bhBlok) {
                return
            }
            this.bhBlok = bhBlok



           
           
            
        }
        this.boolC=false;
        this.oS=null;
        //////////////////////////////////////////////////////////////

        this.post_loadModel = function() {
            this.bhBlok.active=false
            
            self.bCGeomBody.init(self.par.c3dLoadForst)

            this.dragBlok()
            this.boolC=true;
            if(this.oS){
                this.setObjPlus(this.oS)
                this.oS=null
            }

              
        }

        this.dragBlok = function() {
            if(!this.par.blok_){
                return;
            } 


            self.bCGeomBody.bcGSetBlok.setC3DCokerk(this.par.blok_, this.par.blok_c3d, this.par.uuidSvaz);           
            self.bCGeomBody.bCVershin.setC3DCokerk(this.par.blok_, this.par.blok_c3d);            
        }   

        
        this.dragToObj = function(tip) {    
            if(tip==0){
                for (var s in this.par.oStatik) {
                    this[s]=this.par.oStatik[s]
                }
                let o = this.par.getObj();

                o.gb=undefined
               
                let oGet=this.par.jointKorekt.jPlus.getObjNa()//

              
                this.par.jointKorekt.jPlus.clearJoints();
                
                this.par.kill();

                let blok = bObjects.creat(o.id, o);
                bObjects.add(blok);

                blok.setObj(o,undefined,undefined,true);

                this.par.fun('dragModel');
                this.par.fun('activeObject',blok);
            }
            if(tip==1){
                for (var s in this.par.oDinamik) {
                    this[s]=this.par.oDinamik[s]
                }
            }
        }


        /////////////////////////////////


        this.kill = function() {
            visi3D.removeChildMouse(this.content3d)
            window.oWord.content3d.remove(this.content3d);  
            this.bCGeomBody.kill()          
        }
    



        this.getObjPlus = function(o) {
            let op = {}
            o.scaleMass=this._scaleMass;
            o.kolJoint=this._kolJoint;
            o.frequency=this._frequency;

            o.gb = this.bCGeomBody.getObj();

            o.v2Collision = this.v2Collision
            o.wh = this.wh
            o.scaleWH = this.scaleWH
            o.boolSphere = this.boolSphere

            o.kolJoint1=this._kolJoint1;
            o.frequency1=this._frequency1;

            o.maxDisd=this.maxDisd;
            o.maxDisd1=this.maxDisd1;
            o.boolMerging=this.boolMerging;
            o.maxDisd2=this.maxDisd2;

            o.tikAlways=this.tikAlways;

            if(this.par.uuidSvaz)o.uuidSvaz=this.par.uuidSvaz;

            
        }


        this.setObjPlus = function(o, _parent, op, boolUuid) {     
            if(this.boolC==false){
                this.oS=o
                return
            }
            
            if (o.gb) {
                this.bCGeomBody.setObj(o.gb)  
            }
            
            if(o.uuidSvaz){
                
                let kyklaSvaz=bObjects.getUUID(o.uuidSvaz)  
               

                if(kyklaSvaz){
                    kyklaSvaz.addPipe(this.par);
                    return;
                }
                setTimeout(function() {                    
                    let kyklaSvaz =  bObjects.getUUID(o.uuidSvaz)                
                    if(kyklaSvaz){
                        kyklaSvaz.addPipe(self.par);
                        return;
                    }
                }, 100);
            }
        }


        this.getProsent = function(e) {
            return oo        
        } 

        this.upDate = function() {   
            this.bCGeomBody.upDate() 
        }

        this._boolStop=false
        this.dboolStop = function() {            
          
        } 
      
    }


    set scaleMass(v) {
        if (this._scaleMass != v) {
            this._scaleMass = v;            
            if(this.bCGeomBody && this.bCGeomBody.bCVershin.scaleMass!=undefined){
                this.bCGeomBody.bCVershin.scaleMass=this._scaleMass
            }
        }
    }
    get scaleMass() { return this._scaleMass; }

    set frequency(v) {
        if (this._frequency != v) {
            this._frequency = v;            
            if(this.bCGeomBody && this.bCGeomBody.bCVershin.frequency!=undefined){
                this.bCGeomBody.bCVershin.frequency=this._frequency
            }
        }
    }
    get frequency() { return this._frequency; }

    set kolJoint(vv) {
        let v=Math.round(vv)
        if(v<2)v=2
        if (this._kolJoint !=v) {
            this._kolJoint = v;            
            
        }
    }
    get kolJoint() { return this._kolJoint; }



    set kolJoint1(vv) {
        let v=Math.round(vv)
        if(v<2)v=2
        if (this._kolJoint1 !=v) {
            this._kolJoint1 = v;            
            
        }
    }
    get kolJoint1() { return this._kolJoint1; }


    set frequency1(v) {
        if (this._frequency1 != v) {
            this._frequency1 = v;            
            if(this.bCGeomBody && this.bCGeomBody.bcGSetBlok.frequency1!=undefined){

                this.bCGeomBody.bcGSetBlok.frequency1=this._frequency1
            }
        }
    }
    get frequency1() { return this._frequency1; }


    set boolDebug(v) {
        if (this._boolDebug != v) {
            this._boolDebug = v;
            if(this.bCGeomBody && this.bCGeomBody.bcGSetka)this.bCGeomBody.bcGSetka.boolDebug=this._boolDebug
            
            trace(">>>>>eeeeeeee>>>",v)    
        }
    }
    get boolDebug() { return this._boolDebug; }










/*


    set boolStop(v) {
        if (this._boolStop != Math.round(v)) {
            this._boolStop = Math.round(v);
            this.dboolStop()

        }
    }
    get boolStop() { return this._boolStop; }


*/
   



   
}

