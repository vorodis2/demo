
import { BCGSetka } from './BCGSetka.js';
import { BCGSetBlok } from './BCGSetBlok.js';
import { BCVershin } from './BCVershin.js';
import { Calc3d } from './Calc3d.js';
export class BCGeomBody {
    constructor(par, fun, objSave) {
        this.type = "BCGeomBody";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.uuid = calc.generateRendom(1);
        bObjects.objectUUID[this.uuid]=this

        this.content3d = new THREE.Object3D()
        visi3D.addChildMouse(this.content3d)
        window.oWord.content3d.add(this.content3d);

        this.contZ = new THREE.Object3D()   
        this.content3d.add(this.contZ);
        bMenedsher.coroktV3(this.contZ.position, false)

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

            this.bcGSetka.init(gs)
            this.bcGSetBlok.init()
            //this.bcGSetBlok.init()
        }

        this.kill = function() {
            this.bCVershin.kill()
            this.bcGSetBlok.kill()
            this.bcGSetka.kill()

            visi3D.removeChildMouse(this.content3d)
            window.oWord.content3d.remove(this.content3d);
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
