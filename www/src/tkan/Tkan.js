import { TBlok } from './TBlok.js';
import { TChoth } from './TChoth.js';
export class Tkan {
    constructor(par, fun, objSave) {
        this.type = "Tkan";
        var self = this;
        this.par = par;
        //this.fun = fun;
        this.uuid = Math.random()//calc.generateRendom(1)
       // bObjects.objectUUID[this.uuid]=this


        this.objSave = objSave
      
        this.content3d = new THREE.Object3D()
        //visi3D.addChildMouse(this.content3d)
        //window.oWord.content3d.add(this.content3d);
        this.baxGeom = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3)
        this.sphereGeometry = new THREE.SphereGeometry(0.5, 12, 12)
        this.mat0 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xff0000 })
        this.scalePh = 0.5;
        this.array = []
        this.arr = []
        let vv = new THREE.Vector3()


        this._kw = 10
        this._kh = 10
        this._sw = 100
        this._sh = 100
        this.boolSah=false;
        this.boolSphere=false;
        this.wh=1;
        this.v2Collision="00000111";

        this.boolDebug = false;
        this.kol = 4;


        this._scaleMass = 100
        this._scale = 1
        this._frequency = 1
        this._frequencyCentr = 1
        this._zdvigY = 0

        this._scaleTexterX = 1
        this._scaleTexterY = 1

        this.tikAlways=2;
        
        var tkan
        if(objSave && objSave.tkan){
            tkan=objSave.tkan
            if(tkan.kw)this._kw=tkan.kw;
            if(tkan.kh)this._kh=tkan.kh;
            if(tkan.sw)this._sw=tkan.sw;
            if(tkan.sh)this._sh=tkan.sh;
            if(tkan.boolSah!=undefined)this.boolSah=tkan.boolSah
            if(tkan.boolSphere!=undefined)this.boolSphere=tkan.boolSphere  
            if(tkan.wh!=undefined)this.wh=tkan.wh   
            if(tkan.v2Collision!=undefined)this.v2Collision=tkan.v2Collision   

            //if(tkan.boolDebug!=undefined)this.boolDebug=tkan.boolDebug       
            if(tkan.kol!=undefined)this.kol=tkan.kol 

            if(tkan.scaleMass!=undefined)this._scaleMass=tkan.scaleMass
            if(tkan.frequency!=undefined)this._frequency=tkan.frequency    
            if(tkan.frequencyCentr!=undefined)this._frequencyCentr=tkan.frequencyCentr    
            if(tkan.scaleTexterX!=undefined)this._scaleTexterX=tkan.scaleTexterX   
            if(tkan.scaleTexterY!=undefined)this._scaleTexterY=tkan.scaleTexterY   

            if(tkan.tikAlways!=undefined)this.tikAlways=tkan.tikAlways       

        };


        this.oStatik={
            kw:this._kw,
            kh:this._kh,
            sw:this._sw,
            sh:this._sh,
            boolSah:this.boolSah,
            boolSphere:this.boolSphere,
            wh:this.wh,
            v2Collision:this.v2Collision,
            //boolDebug:this.boolDebug,
            kol:this.kol,
        }


        this.osw = this._sw / this._kw
        this.osh = this._sh / this._kh






 

        this.oDinamik={
            zdvigY:this._zdvigY,
            scale:this._scale,
            frequency:this._frequency,
            frequencyCentr:this._frequencyCentr,
            scaleTexterX:this._scaleTexterX,
            scaleTexterY:this._scaleTexterY,
            scaleMass:this._scaleMass,
            tikAlways:this.tikAlways,
        }



        let tblok;

        this.position = new THREE.Vector3(0,0,0)

        this.bhBlok = null
        this.tChoth = new TChoth(this)
        this.init = function(bhBlok) {
            if (this.bhBlok) {
                return
            }
            this.bhBlok = bhBlok
            this.drag()
            
        }

        this.kill = function() {
            visi3D.removeChildMouse(this.content3d)
            window.oWord.content3d.remove(this.content3d);
            for (var i = 0; i < this.arrayChesh.length; i++) {
                this.arrayChesh[i].kill()
            }          
        }


        this.dragToObj = function(tip) {    
            if(tip==0){
                for (var s in this.oStatik) {
                    this[s]=this.oStatik[s]
                }
                let o = this.par.getObj();
               
                let oGet=this.par.jointKorekt.jPlus.getObjNa()//

              
                this.par.jointKorekt.jPlus.clearJoints();
             
                this.par.kill();
               
                let blok = bObjects.creat(o.id, o);
                bObjects.add(blok);
            
                bObjects.objectUUID[o.tkan.uuid]=null
                 
                blok.setObj(o,undefined,undefined,true);
                
       
           
                if(oGet && oGet.array){
                  
                    for (var i = 0; i < oGet.array.length; i++) {
                        let oo=bObjects.getUUID(oGet.array[i].o2.uuid)
                        
                        if(oo){
                            let rrr=oo.par.jointKorekt.jPlus.addObjects(oGet.array[i].o2, oGet.array[i].o1,oGet.array[i].o2.pl, oGet.array[i].o1.pl)
                          
                        }
                    }

                }
                


                this.par.fun('dragModel');
                this.par.fun('activeObject',blok);

            }
            if(tip==1){
                for (var s in this.oDinamik) {
                    this[s]=this.oDinamik[s]
                }
            }


        }



        this.clear = function() {
            this.arr.length = 0
            this.array.length = 0
            for (var i = 0; i < this.arrayChesh.length; i++) {
                this.arrayChesh[i].clear()
            }
        }

        let ps=null
        this.drag = function() {
            this.clear()
            var sahh=0

            if(tkan && tkan.pp){
                this.position.set(tkan.pp.x,tkan.pp.y,tkan.pp.z)
            }

            for (var i = 0; i < this._kh; i++) {
                this.arr[i] = []
                for (var j = 0; j < this._kw; j++) {
                    ps=null
                    if(tkan && tkan.array[sahh]){
                        ps=tkan.array[sahh]                       
                        
                    }

                    tblok = this.getTBlok();
                    tblok.ii = i;
                    tblok.jj = j;
                    tblok.setIJ(i / (this._kh - 1), j / (this._kw - 1))
                    this.arr[i][j] = tblok                    
                    vv.x = this.position.x + i * this.osw-this._sw/2
                    vv.y = this.position.y
                    vv.z = this.position.z + j * this.osh-this._sh/2
                    
                    
                    
                    if(ps){
                     
                        tblok.setXYZ(ps.p.x, ps.p.y, ps.p.z)
                        tblok.setRotationXYZ(ps.q.x, ps.q.y, ps.q.z, ps.q.w)
                        
                    }else{
                        tblok.setXYZ(vv.x, vv.y, vv.z)
                    }


                    tblok.active = true
                    if (j != 0) tblok.setTBlok(this.arr[i][j - 1], true)
                    if (i != 0) tblok.setTBlok(this.arr[i - 1][j], false)
                    sahh++    
                }
            }
            this.dragDin()
            this.tChoth.drag()
        }


        this.dragDin = function() {
            for (var i = 0; i < this.arrayChesh.length; i++) {
                this.arrayChesh[i].dragDin()
            }
        }

        this.arrayChesh = []
        this.getTBlok = function() {
            if (this.arrayChesh[this.array.length] == undefined) {
                this.arrayChesh[this.array.length] = new TBlok(this);
                this.arrayChesh[this.array.length].idArrChesh = this.array.length;
                this.arrayChesh[this.array.length].init()
            }
            let tb = this.arrayChesh[this.array.length]
            this.array.push(this.arrayChesh[this.array.length])
            return tb;
        }

        this.bLineEntr = null
        this.inLine = function(bLineEntr) {
            this.bLineEntr = bLineEntr
            let sah = 1
            let sahDin = 0
            let distans = bLineEntr.beVisi.distans;
            let a = this.arr[0]
            let k = a.length / sah
            for (var i = 0; i < a.length; i++) {
                let d = -distans / 2 + distans * (i / a.length)
                if (sahDin == 0)
                    if (a[i]) a[i].setLine(bLineEntr, d)
                sahDin++;
                if (sahDin >= sah) sahDin = 0
            }
        }



        this.getObjPlus = function(o) {
            let op = {}
            if (this.bLineEntr !== null) {
                op.bLineEntr = { idArrChesh: this.bLineEntr.par.idArrChesh }
            }
            op.kw=this._kw;
            op.kh=this._kh;
            op.sw=this._sw;
            op.sh=this._sh;
            op.boolSah=this.boolSah;
            op.boolSphere=this.boolSphere;
            op.wh=this.wh;
            op.v2Collision=this.v2Collision;
            //op.boolDebug=this.boolDebug;
            op.kol=this.kol;
            op.scaleMass=this.scaleMass;

            op.zdvigY=this.zdvigY;
            op.scale=this.scale;
            op.frequency=this.frequency;
            op.frequencyCentr=this.frequencyCentr;
            op.scaleTexterX=this.scaleTexterX;
            op.scaleTexterY=this.scaleTexterY;
        
            op.tikAlways=this.tikAlways;

            op.uuid=this.uuid;
            
            let pp={x:0,y:0,z:0}
            op.array = []
            for (var i = 0; i < this.array.length; i++) {
                let oo = {}
                let p = this.array[i].body.getPosition()
                let q = this.array[i].body.getOrientation()
                oo.p = { x: Math.round(p.x), y: Math.round(p.y), z: Math.round(p.z) }
                oo.q = { x: q.x,   y: q.y,  z: q.z,  z: q.w}
                oo.i = this.array[i].ii;
                oo.j = this.array[i].jj;
                op.array.push(oo)

                pp.x+=oo.p.x;
                pp.y+=oo.p.y;
                pp.z+=oo.p.z;


            }
            pp.x/=this.array.length;
            pp.y/=this.array.length;
            pp.z/=this.array.length;

            op.pp=pp
            o.tkan = op
        }


        this.setObjPlus = function(o, _parent, op, boolUuid) {
            

            if (o.tkan) {
                if(boolUuid && o.tkan.uuid!=undefined){   
   
                    if(bObjects.getUUID(o.tkan.uuid)==null){

                        this.uuid=o.tkan.uuid
                        bObjects.objectUUID[this.uuid]=this
                        
                    }                
                }

              
            }
        }


        this.getProsent = function(e) {    
            let oo= this.tChoth.getProsent(e)            
            return oo        
        }


        this.getInfoJoint = function(o) {
            
            
            let oi={}
            

            oi.v={x:0, y:0,z:0}
            oi.body=this.array[0].body
            if(o && o.o1 && o.o1.p){ 
                let xx=o.o1.p.x
                let yy = o.o1.p.y
                if(xx==1){
                    xx=0.999
                }
                if(yy==1){
                    yy=0.999
                }




                let ss=Math.floor(yy*this._kh)
                let sss=ss*this._kw
                let sss1=Math.floor(xx*this._kw)
                let sss2=sss+sss1

                
                if(this.array[sss2])oi.body=this.array[sss2].body 
               

                let www=this._sw*xx//от начала
                //sss1 положение
                let www1= this._sw/this._kw;//размер ячейки
                let www2= (sss1+1)*www1-www1/2;//положение точки
                let www3= www-www2;               
          


                oi.v.x=www3;          

                www=this._sh*yy;                
                www1= this._sh/this._kh;
                www2= (ss+1)*www1-www1/2;
                www3= -(www-www2);   
                oi.v.z=www3;             
            }




            
            oi.blok=this.par
            return oi 
        }





        this.upDate = function() {

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].update()
            }
            this.tChoth.upDate()

        }

        this._boolStop=false
        this.dboolStop = function() {            
            for (var i = 0; i < this.arrayChesh.length; i++) {
                this.arrayChesh[i].stopBlok(this._boolStop)
            }
        } 
      
    }

    set boolStop(v) {
        if (this._boolStop != Math.round(v)) {
            this._boolStop = Math.round(v);
            this.dboolStop()

        }
    }
    get boolStop() { return this._boolStop; }



    set kw(v) {
        if (this._kw != Math.round(v)) {
            this._kw = Math.round(v);
            //this.drag()

        }
    }
    get kw() { return this._kw; }

    set kh(v) {
        if (this._kh != Math.round(v)) {
            this._kh =  Math.round(v);
            //this.drag()

        }
    }
    get kh() { return this._kh; }

    
    set sw(v) {
        if (this._sw != Math.round(v)) {
            this._sw = Math.round(v);
            //this.drag()

        }
    }
    get sw() { return this._sw; }

    set sh(v) {
        if (this._sh != Math.round(v)) {
            this._sh =  Math.round(v);
            //this.drag()

        }
    }
    get sh() { return this._sh; }


    set scaleMass(v) {
        if (this._scaleMass != v) {
            this._scaleMass = v;
            this.dragDin()
        }
    }
    get scaleMass() { return this._scaleMass; }

    set scale(v) {
        if (this._scale != v) {
            this._scale = v;
            this.dragDin()
        }
    }
    get scale() { return this._scale; }

    set frequency(v) {
        if (this._frequency != v) {
            this._frequency = v;
            this.dragDin()
        }
    }
    get frequency() { return this._frequency; }

    set frequencyCentr(v) {
        if (this._frequencyCentr != v) {
            this._frequencyCentr = v;
            this.dragDin()
        }
    }
    get frequencyCentr() { return this._frequencyCentr; }


    set zdvigY(v) {
        if (this._zdvigY != v) {
            this._zdvigY = v;
            this.dragDin()
        }
    }
    get zdvigY() { return this._zdvigY; }

    set scaleTexterX(v) {
        if (this._scaleTexterX != v) {
            this._scaleTexterX = v;
            this.upDate()
        }
    }
    get scaleTexterX() { return this._scaleTexterX; }

    set scaleTexterY(v) {
        if (this._scaleTexterY != v) {
            this._scaleTexterY = v;
            this.upDate()
        }
    }
    get scaleTexterY() { return this._scaleTexterY; }


}

