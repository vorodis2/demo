

import { BLOKPipe } from '../BLOKPipe.js';
import { BCloth } from './BCloth.js';
import { JointKorekt } from '../joint/JointKorekt.js';

export class BLOKCloth extends BLOKPipe {
    constructor(mO, o, idArr, fun) {
        super(mO, o, idArr, fun)
        this.type = "BLOKCloth";
        var self = this;
        
        this.oStatik={}
        this.oDinamik={}
        this.cloth=undefined
        this.post_init1 = function() {
            if(this.cloth!=undefined)return
            
            
            this.cloth = new BCloth(this, undefined, this.objSave);            
            self.cloth.init(self.bhBlok)        
            this.jointKorekt = new JointKorekt(this, function(s, p, p1) {
                self.fun(s,p,p1)
            })
            this.dragMaterial()
       

            for (var i = this.c3dLoad.children.length - 1; i >= 0; i--) {
                this.c3dLoad.children[i].parent.remove(this.c3dLoad.children[i])
            }
            this.bVisi.c3d.visible=false
        } 

        this.post_loadModel = function() {
            if(this.cloth==undefined)this.post_init1()
            this.cloth.post_loadModel()

            
        }

        this.dragToObj = function(tip) {    
            this.cloth.dragToObj(tip) 
        }


        this.inLine = function(bLineEntr) {            
            this.cloth.inLine(bLineEntr)
        }

        this.postKill = function() {

            this.isNotChes=true
            this.cloth.kill();
            this.fun('dragModel');
           
        }


        this.uuidSvaz

        this.blok_=null;
        this.blok_c3d=null;
        this.setC3DCokerk = function(blok_, blok_c3d, uuid) {
            this.uuidSvaz=uuid;
            this.blok_=blok_;
            this.blok_c3d=blok_c3d;
            if(this.cloth==undefined)return
            this.cloth.dragBlok()
            this.stopImpuls()    

        }


        this.upDate = function() {
            if(this.jointKorekt)this.jointKorekt.upDate()  
            if(this.cloth)this.cloth.upDate()   
            if(this.bhBlok.active){
                //this.bhBlok.setPosition(9999,9999,9999)
                //oWord.remove(this.bhBlok) 
            }
              
        }  


        this.getObjPlus=function(o){
            this.cloth.getObjPlus(o)
        }   


        this.setObjPlus=function(o, _parent, op, boolUuid){

            this.cloth.setObjPlus(o, _parent, op, boolUuid)
            setTimeout(function() {
                self.stopImpuls()
            }, 13 );
            
        } 


        this.getParKoren=function(){
            
            return this
        }  


        this.dboolStop = function() {            
            this.cloth.boolStop = this._boolStop
        }

        this.stopImpuls = function() { 
            if(this.cloth && this.cloth.bCGeomBody && this.cloth.bCGeomBody && this.cloth.bCGeomBody.bCVershin){
                this.cloth.bCGeomBody.bCVershin.stopImpuls()
            }
                       
        }
        this.dragMaterial=function(){
            
            this.cloth.bCGeomBody.bcGSetka.material=this.material;
            this.isMaterial1()
          //  setTimeout(function(){
                // trace("####dwwwww!!",this.material,self.material1)
                // if(self.material1){

                //     self.cloth.bCGeomBody.bcGSetka.material=self.material1;
                // }
           // },1000)
        }

        this.isMaterial1=function(){
            if(self.cloth && self.cloth.bCGeomBody && self.cloth.bCGeomBody.bcGSetka &&self.material1){

                self.cloth.bCGeomBody.bcGSetka.material=self.material1;
            }

        }


        this.post_setParamEnt = function(s,p){

            if(s=='aObject' && this.cloth)this.cloth.boolDebug=p;
           
        }
    }
}



