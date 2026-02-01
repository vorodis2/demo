

import { BLOKPipe } from '../BLOKPipe.js';
import { Tkan } from './Tkan.js';
import { JointKorekt } from '../joint/JointKorekt.js';

export class BLOKTkan extends BLOKPipe {
    constructor(mO, o, idArr, fun) {
        super(mO, o, idArr, fun)
        this.type = "BLOKTkan";
        var self = this;
        var key = "© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";

        this.oStatik={}
        this.oDinamik={}

        this.post_init1 = function() {
            
            
            this.tkan = new Tkan(this, undefined, this.objSave);            
            self.tkan.init(self.bhBlok)        
            this.jointKorekt = new JointKorekt(this, function(s, p, p1) {
                self.fun(s,p,p1)
            })
            this.dragMaterial()
        } 

        this.dragToObj = function(tip) {    
            this.tkan.dragToObj(tip) 
        }


        this.inLine = function(bLineEntr) {            
            this.tkan.inLine(bLineEntr)
        }

        this.postKill = function() {
            this.isNotChes=true
            this.tkan.kill();
            this.fun('dragModel');
           
        }


        this.upDate = function() {
            if(this.jointKorekt)this.jointKorekt.upDate()  
            if(this.tkan)this.tkan.upDate()      
        }  


        this.getObjPlus=function(o){
            this.tkan.getObjPlus(o)
        }   

        this.setObjPlus=function(o, _parent, op, boolUuid){
            
            this.tkan.setObjPlus(o, _parent, op, boolUuid)
            setTimeout(function() {
                self.stopImpuls()
            }, 13 );
            
        } 


        this.getParKoren=function(){
            
            return this
        }  


        this.dboolStop = function() {            
            this.tkan.boolStop = this._boolStop
        }  
        this.stopImpuls = function() { 
            for (var i = this.tkan.array.length - 1; i >= 0; i--) {
                 
                oWord.metod.stopImpuls(this.tkan.array[i].body)  
            } 
            
        }



        this.dragMaterial=function(){
            this.tkan.tChoth.material=this.material;
        }

        this.post_setParamEnt = function(s,p){
            if(s=='aObject' && this.tkan)this.tkan.tChoth.boolDebug=p
           
        }

    }
}



